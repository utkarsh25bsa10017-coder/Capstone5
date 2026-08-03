import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import prisma from '@/lib/prisma'
import { categorizeCommit, categorizePR } from '@/lib/utils'

const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET

function verifySignature(payload: string, signature: string): boolean {
  if (!WEBHOOK_SECRET) return true // Allow in development
  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET)
  const digest = 'sha256=' + hmac.update(payload).digest('hex')
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest))
}

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get('x-hub-signature-256') || ''
    const event = req.headers.get('x-github-event') || ''
    const payload = await req.text()

    if (!verifySignature(payload, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const data = JSON.parse(payload)

    // Find project by repository
    const repoFullName = data.repository?.full_name
    if (!repoFullName) {
      return NextResponse.json({ error: 'No repository in payload' }, { status: 400 })
    }

    const [githubOwner, githubRepo] = repoFullName.split('/')
    const project = await prisma.project.findFirst({
      where: { githubOwner, githubRepo, isActive: true },
    })

    if (!project) {
      return NextResponse.json({ message: 'Project not found or inactive' }, { status: 200 })
    }

    // Handle different event types
    switch (event) {
      case 'push':
        await handlePushEvent(project.id, data)
        break
      case 'pull_request':
        await handlePullRequestEvent(project.id, data)
        break
      case 'release':
        await handleReleaseEvent(project.id, data)
        break
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

async function handlePushEvent(projectId: string, data: any) {
  const commits = data.commits || []
  const ref = data.ref // e.g., "refs/heads/main"
  const branch = ref.replace('refs/heads/', '')

  for (const commit of commits) {
    await prisma.commit.upsert({
      where: { projectId_sha: { projectId, sha: commit.id } },
      create: {
        projectId,
        sha: commit.id,
        message: commit.message,
        author: commit.author?.name || 'Unknown',
        authorEmail: commit.author?.email || '',
        date: new Date(commit.timestamp),
        url: commit.url,
        category: categorizeCommit(commit.message),
      },
      update: {},
    })
  }
}

async function handlePullRequestEvent(projectId: string, data: any) {
  const pr = data.pull_request
  if (!pr) return

  await prisma.pullRequest.upsert({
    where: { projectId_number: { projectId, number: pr.number } },
    create: {
      projectId,
      number: pr.number,
      title: pr.title,
      body: pr.body || '',
      author: pr.user?.login || 'Unknown',
      state: pr.state,
      mergedAt: pr.merged_at ? new Date(pr.merged_at) : null,
      url: pr.html_url,
      labels: pr.labels?.map((l: any) => l.name) || [],
      category: categorizePR(pr.title, pr.labels?.map((l: any) => l.name) || []),
    },
    update: {
      state: pr.state,
      mergedAt: pr.merged_at ? new Date(pr.merged_at) : null,
      labels: pr.labels?.map((l: any) => l.name) || [],
    },
  })
}

async function handleReleaseEvent(projectId: string, data: any) {
  const release = data.release
  if (!release) return

  await prisma.release.upsert({
    where: { projectId_tagName: { projectId, tagName: release.tag_name } },
    create: {
      projectId,
      version: release.tag_name.replace(/^v/, ''),
      tagName: release.tag_name,
      description: release.body || '',
      isDraft: release.draft,
      isPrerelease: release.prerelease,
      publishedAt: release.published_at ? new Date(release.published_at) : null,
    },
    update: {
      description: release.body || '',
      isDraft: release.draft,
      isPrerelease: release.prerelease,
      publishedAt: release.published_at ? new Date(release.published_at) : null,
    },
  })
}