import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { TooltipProvider } from '@/components/ui/tooltip'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'ChangelogAI - Automated Changelog & Release Notes Generator',
  description: 'Generate beautiful changelogs and release notes automatically from your GitHub commits and PRs. Save hours of manual work.',
  keywords: ['changelog', 'release notes', 'github', 'automation', 'developer tools', 'saas'],
  authors: [{ name: 'ChangelogAI' }],
  creator: 'ChangelogAI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://changelogai.dev',
    title: 'ChangelogAI - Automated Changelog Generator',
    description: 'Generate beautiful changelogs and release notes automatically from your GitHub commits and PRs.',
    siteName: 'ChangelogAI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChangelogAI - Automated Changelog Generator',
    description: 'Generate beautiful changelogs and release notes automatically from your GitHub commits and PRs.',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <TooltipProvider>
          <Providers>{children}</Providers>
        </TooltipProvider>
      </body>
    </html>
  )
}