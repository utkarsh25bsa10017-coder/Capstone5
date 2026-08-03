'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, FileText, Search, Loader2, Eye, Download, Trash2, Copy } from 'lucide-react'
import { formatRelativeTime, cn, CATEGORY_LABELS, CATEGORY_COLORS } from '@/lib/utils'
import Link from 'next/link'

const mockChangelogs = [
  {
    id: '1',
    title: 'ChangelogAI v2.1.0',
    version: 'v2.1.0',
    status: 'published',
    projectName: 'changelogai',
    projectId: '1',
    content: '## Features\n- New AI categorization engine\n- Custom template support\n\n## Fixes\n- Fixed export to PDF issue\n- Resolved sync timing bug',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    categories: {
      feature: 3,
      fix: 2,
      docs: 1,
    },
  },
  {
    id: '2',
    title: 'API Docs v1.3.0',
    version: 'v1.3.0',
    status: 'published',
    projectName: 'api-docs',
    projectId: '2',
    content: '## Features\n- Added OpenAPI 3.1 support\n- New webhook documentation\n\n## Fixes\n- Fixed authentication examples\n\n## Docs\n- Updated getting started guide',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    categories: {
      feature: 2,
      fix: 1,
      docs: 1,
    },
  },
  {
    id: '3',
    title: 'Mobile App v3.0.0-beta.1',
    version: 'v3.0.0-beta.1',
    status: 'draft',
    projectName: 'mobile-app',
    projectId: '3',
    content: '## Features\n- Complete UI redesign\n- Dark mode support\n- Offline sync\n\n## Fixes\n- Fixed crash on iOS 17\n- Resolved memory leak\n\n## Breaking Changes\n- Minimum iOS version now 15.0\n- API v1 deprecated',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5),
    publishedAt: null,
    categories: {
      feature: 3,
      fix: 2,
      breaking: 2,
    },
  },
]

export default function ChangelogsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [previewChangelog, setPreviewChangelog] = useState<typeof mockChangelogs[0] | null>(null)

  const filteredChangelogs = mockChangelogs.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.version.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)
    await new Promise((r) => setTimeout(r, 1000))
    setIsCreating(false)
    setDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Changelogs</h1>
          <p className="text-muted-foreground">Create, manage, and publish your release notes.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Changelog
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Generate New Changelog</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreate}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Project</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a project" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">changelogai</SelectItem>
                      <SelectItem value="2">api-docs</SelectItem>
                      <SelectItem value="3">mobile-app</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Version Range</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select version range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="latest">Since last release (v2.1.0 → HEAD)</SelectItem>
                      <SelectItem value="v2.0.0..v2.1.0">v2.0.0 → v2.1.0</SelectItem>
                      <SelectItem value="custom">Custom range...</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Release Version</label>
                  <Input placeholder="v2.2.0" defaultValue="v2.2.0" />
                </div>
                <p className="text-xs text-muted-foreground">
                  We&apos;ll fetch commits and PRs from the selected range and categorize them automatically.
                </p>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isCreating}>
                  {isCreating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                  Generate Changelog
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search changelogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {filteredChangelogs.map((changelog) => (
          <Card key={changelog.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground flex-shrink-0">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold truncate">{changelog.title}</h3>
                      <Badge variant={
                        changelog.status === 'published' ? 'success' :
                        changelog.status === 'draft' ? 'secondary' : 'outline'
                      }>
                        {changelog.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{changelog.version}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {changelog.projectName} • {formatRelativeTime(changelog.createdAt)}
                      {changelog.publishedAt && <span> • Published {formatRelativeTime(changelog.publishedAt)}</span>}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {Object.entries(changelog.categories).map(([cat, count]) => (
                      <Badge key={cat} variant="outline" className={cn(CATEGORY_COLORS[cat], 'text-xs h-5 px-2')}>
                        {CATEGORY_LABELS[cat] || cat}: {count}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="ghost" size="icon">
                    <Link href={`/dashboard/changelogs/${changelog.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                  {changelog.status === 'draft' && (
                    <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredChangelogs.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-semibold mb-2">No changelogs found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery || statusFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'Create your first changelog to get started'}
            </p>
            {!searchQuery && statusFilter === 'all' && (
              <Button className="gap-2 mt-2" onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4" />
                Create Changelog
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {previewChangelog && (
        <Dialog open={!!previewChangelog} onOpenChange={(open) => !open && setPreviewChangelog(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>{previewChangelog.title}</DialogTitle>
            </DialogHeader>
            <div className="prose max-h-[60vh] overflow-y-auto p-4">
              {previewChangelog.content.split('\n').map((line, i) => (
                <p key={i} className="whitespace-pre-wrap">{line}</p>
              ))}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setPreviewChangelog(null)}>Close</Button>
              <Button>Publish</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}