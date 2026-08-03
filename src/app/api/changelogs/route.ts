import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prisma from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const projectId = searchParams.get('projectId')

    const changelogs = await prisma.changelog.findMany({
      where: {
        userId: session.user.id,
        ...(status && { status }),
        ...(projectId && { projectId }),
      },
      include: {
        project: {
          select: { name: true, githubOwner: true, githubRepo: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(changelogs)
  } catch (error) {
    console.error('Error fetching changelogs:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, content, version, projectId, status = 'draft' } = body

    if (!title || !content || !version || !projectId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const project = await prisma.project.findFirst({
      where: { id: projectId, userId: session.user.id },
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    const changelog = await prisma.changelog.create({
      data: {
        title,
        content,
        version,
        status,
        projectId,
        userId: session.user.id,
        publishedAt: status === 'published' ? new Date() : null,
      },
    })

    return NextResponse.json(changelog, { status: 201 })
  } catch (error) {
    console.error('Error creating changelog:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}