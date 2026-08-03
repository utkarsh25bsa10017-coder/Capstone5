'use client'

import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Github, FileText, Clock, TrendingUp, ArrowRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { formatRelativeTime, cn } from '@/lib/utils'

const mockProjects = [
  {
    id: '1',
    name: 'changelogai',
    description: 'Main repository for ChangelogAI',
    githubRepo: 'changelogai',
    githubOwner: 'myorg',
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
    changelogsCount: 12,
    lastRelease: 'v2.1.0',
  },
  {
    id: '2',
    name: 'api-docs',
    description: 'Public API documentation',
    githubRepo: 'api-docs',
    githubOwner: 'myorg',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    changelogsCount: 5,
    lastRelease: 'v1.3.0',
  },
  {
    id: '3',
    name: 'mobile-app',
    description: 'React Native mobile application',
    githubRepo: 'mobile-app',
    githubOwner: 'myorg',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    changelogsCount: 8,
    lastRelease: 'v3.0.0-beta.1',
  },
]

const mockChangelogs = [
  {
    id: '1',
    title: 'ChangelogAI v2.1.0',
    version: 'v2.1.0',
    status: 'published',
    projectName: 'changelogai',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: '2',
    title: 'API Docs v1.3.0',
    version: 'v1.3.0',
    status: 'published',
    projectName: 'api-docs',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: '3',
    title: 'Mobile App v3.0.0-beta.1',
    version: 'v3.0.0-beta.1',
    status: 'draft',
    projectName: 'mobile-app',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    publishedAt: null,
  },
]

export default function DashboardPage() {
  const { data: session } = useSession()

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {session?.user?.name || 'User'}. Here's what's happening with your projects.
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/projects/new">
            <Button className="gap-2" asChild>
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </Link>
          <Link href="/dashboard/changelogs/new">
            <Button variant="outline" className="gap-2" asChild>
              <FileText className="h-4 w-4" />
              Create Changelog
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Github className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProjects.length}</div>
            <p className="text-xs text-muted-foreground">Active repositories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Changelogs Created</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockChangelogs.filter(c => c.status === 'published').length}
            </div>
            <p className="text-xs text-muted-foreground">Published this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft Changelogs</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockChangelogs.filter(c => c.status === 'draft').length}
            </div>
            <p className="text-xs text-muted-foreground">Ready to publish</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">~24h</div>
            <p className="text-xs text-muted-foreground">Estimated hours saved</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Projects</CardTitle>
            <Link href="/dashboard/projects" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {mockProjects.map((project) => (
                <Link
                  key={project.id}
                  href={`/dashboard/projects/${project.id}`}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Github className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {project.githubOwner}/{project.githubRepo}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{project.lastRelease}</p>
                    <p className="text-xs text-muted-foreground">
                      Updated {formatRelativeTime(project.updatedAt)}
                    </p>
                  </div>
                </Link>
              ))}
              <Link
                href="/dashboard/projects/new"
                className="flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed hover:bg-accent transition-colors text-primary"
              >
                <Plus className="h-4 w-4" />
                Add Project
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Changelogs</CardTitle>
            <Link href="/dashboard/changelogs" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {mockChangelogs.map((changelog) => (
                <Link
                  key={changelog.id}
                  href={`/dashboard/changelogs/${changelog.id}`}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">{changelog.title}</p>
                      <p className="text-sm text-muted-foreground">{changelog.projectName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={
                      changelog.status === 'published' ? 'success' :
                      changelog.status === 'draft' ? 'secondary' : 'outline'
                    }>
                      {changelog.status}
                    </Badge>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
              <Link
                href="/dashboard/changelogs/new"
                className="flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed hover:bg-accent transition-colors text-primary"
              >
                <Plus className="h-4 w-4" />
                Create Changelog
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Start Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Connect GitHub',
                desc: 'Install the ChangelogAI GitHub App and grant access to your repositories.',
                step: '1',
                href: '/settings/integrations',
              },
              {
                title: 'Create a Project',
                desc: 'Select a repository and configure your changelog preferences.',
                step: '2',
                href: '/dashboard/projects/new',
              },
              {
                title: 'Generate Changelog',
                desc: 'Pick a version range, review AI-categorized changes, and publish.',
                step: '3',
                href: '/dashboard/changelogs/new',
              },
            ].map((item) => (
              <Link
                key={item.step}
                href={item.href}
                className="relative p-4 rounded-lg border hover:bg-accent transition-colors group"
              >
                <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}