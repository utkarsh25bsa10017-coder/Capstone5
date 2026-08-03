'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Plus, Github, Search, Loader2, Trash2, Edit, ExternalLink } from 'lucide-react'
import { formatRelativeTime, cn } from '@/lib/utils'
import Link from 'next/link'

const mockProjects = [
  {
    id: '1',
    name: 'changelogai',
    description: 'Main repository for ChangelogAI',
    githubRepo: 'changelogai',
    githubOwner: 'myorg',
    githubUrl: 'https://github.com/myorg/changelogai',
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
    changelogsCount: 12,
    lastRelease: 'v2.1.0',
    isActive: true,
  },
  {
    id: '2',
    name: 'api-docs',
    description: 'Public API documentation',
    githubRepo: 'api-docs',
    githubOwner: 'myorg',
    githubUrl: 'https://github.com/myorg/api-docs',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    changelogsCount: 5,
    lastRelease: 'v1.3.0',
    isActive: true,
  },
  {
    id: '3',
    name: 'mobile-app',
    description: 'React Native mobile application',
    githubRepo: 'mobile-app',
    githubOwner: 'myorg',
    githubUrl: 'https://github.com/myorg/mobile-app',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    changelogsCount: 8,
    lastRelease: 'v3.0.0-beta.1',
    isActive: false,
  },
]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    githubOwner: '',
    githubRepo: '',
  })

  const filteredProjects = mockProjects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.githubRepo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.githubOwner.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsCreating(false)
    setDialogOpen(false)
    setFormData({ name: '', description: '', githubOwner: '', githubRepo: '' })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage your GitHub repositories and generate changelogs.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="My Awesome Project"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of the project"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="githubOwner">GitHub Owner</Label>
                    <Input
                      id="githubOwner"
                      value={formData.githubOwner}
                      onChange={(e) => setFormData({ ...formData, githubOwner: e.target.value })}
                      placeholder="myorg"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="githubRepo">Repository Name</Label>
                    <Input
                      id="githubRepo"
                      value={formData.githubRepo}
                      onChange={(e) => setFormData({ ...formData, githubRepo: e.target.value })}
                      placeholder="my-repo"
                      required
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Make sure you've installed the ChangelogAI GitHub App and granted access to this repository.
                </p>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                  Create Project
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {project.githubOwner}/{project.githubRepo}
                    </p>
                  </div>
                </div>
                <span className={cn('text-xs px-2 py-1 rounded-full', project.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800')}>
                  {project.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
            </CardHeader>
            <CardContent className="space-y-4 pt-0">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold">{project.changelogsCount}</p>
                  <p className="text-xs text-muted-foreground">Changelogs</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-2xl font-bold">{project.lastRelease}</p>
                  <p className="text-xs text-muted-foreground">Last Release</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <p className="text-sm font-medium">{formatRelativeTime(project.updatedAt)}</p>
                  <p className="text-xs text-muted-foreground">Last Sync</p>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Link
                  href={`/dashboard/projects/${project.id}`}
                  className="flex-1 btn-outline"
                >
                  <Button variant="outline" className="w-full gap-1" asChild>
                    <Edit className="h-3.5 w-3.5" />
                    Manage
                  </Button>
                </Link>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost"
                >
                  <Button variant="ghost" className="gap-1" asChild>
                    <ExternalLink className="h-3.5 w-3.5" />
                    View on GitHub
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
        <div className="col-span-1">
          <Card className="border-dashed hover:border-primary hover:bg-accent transition-colors cursor-pointer">
            <CardContent className="flex h-64 flex-col items-center justify-center gap-4 p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Plus className="h-8 w-8" />
              </div>
              <p className="font-medium">Add New Project</p>
              <p className="text-sm text-muted-foreground text-center">
                Connect a GitHub repository to start generating changelogs
              </p>
              <Button variant="outline" className="gap-2 w-full" onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4" />
                Create Project
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {filteredProjects.length === 0 && searchQuery && (
        <Card>
          <CardContent className="py-12 text-center">
            <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No projects found</h3>
            <p className="text-muted-foreground">Try adjusting your search query</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}