import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatRelativeTime(date: Date | string): string {
  const now = new Date()
  const then = new Date(date)
  const diffMs = now.getTime() - then.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSecs < 60) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(date)
}

export function generateVersion(previousVersion?: string): string {
  if (!previousVersion) return '1.0.0'
  const parts = previousVersion.split('.').map(Number)
  parts[2] = (parts[2] || 0) + 1
  return parts.join('.')
}

export function categorizeCommit(message: string): string {
  const lower = message.toLowerCase()
  if (lower.startsWith('feat') || lower.includes('feature')) return 'feature'
  if (lower.startsWith('fix') || lower.includes('bug')) return 'fix'
  if (lower.startsWith('docs')) return 'docs'
  if (lower.startsWith('chore') || lower.includes('maintenance')) return 'chore'
  if (lower.startsWith('refactor')) return 'refactor'
  if (lower.startsWith('test')) return 'test'
  if (lower.startsWith('perf')) return 'performance'
  if (lower.startsWith('ci') || lower.startsWith('build')) return 'ci'
  return 'other'
}

export function categorizePR(title: string, labels: string[]): string {
  const text = `${title} ${labels.join(' ')}`.toLowerCase()
  if (text.includes('feature') || text.includes('feat') || text.includes('enhancement')) return 'feature'
  if (text.includes('fix') || text.includes('bug') || text.includes('hotfix')) return 'fix'
  if (text.includes('doc')) return 'docs'
  if (text.includes('refactor')) return 'refactor'
  if (text.includes('test')) return 'test'
  if (text.includes('perf')) return 'performance'
  if (text.includes('ci') || text.includes('build') || text.includes('deploy')) return 'ci'
  if (text.includes('chore') || text.includes('maintenance')) return 'chore'
  return 'other'
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str
  return str.slice(0, length - 3) + '...'
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const CATEGORY_LABELS: Record<string, string> = {
  feature: 'Features',
  fix: 'Bug Fixes',
  docs: 'Documentation',
  chore: 'Chores',
  refactor: 'Refactoring',
  test: 'Tests',
  performance: 'Performance',
  ci: 'CI/CD',
  other: 'Other',
}

export const CATEGORY_COLORS: Record<string, string> = {
  feature: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  fix: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  docs: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  chore: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400',
  refactor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  test: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  performance: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
  ci: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400',
  other: 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-400',
}