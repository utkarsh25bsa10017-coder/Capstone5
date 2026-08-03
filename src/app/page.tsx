import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Github, Zap, Shield, Clock, CheckCircle } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Changelog</span><span className="text-foreground">AI</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Pricing
            </Link>
            <Link href="/auth/signin">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/auth/signin">
              <Button size="sm">Get Started Free</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 flex items-center justify-center gap-2">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  <Zap className="mr-1.5 h-3.5 w-3.5" />
                  New: GitHub App Integration
                </span>
              </div>
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Automate Your <span className="text-primary">Changelogs</span> & Release Notes
              </h1>
              <p className="mb-8 text-lg text-muted-foreground max-w-2xl mx-auto">
                Generate beautiful, categorized changelogs automatically from your GitHub commits and PRs. 
                Save hours of manual work every release cycle.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/auth/signin">
                  <Button size="lg" className="w-full sm:w-auto gap-2" asChild>
                    <span>Start Free Trial</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    View Pricing
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                No credit card required · 14-day free trial · Cancel anytime
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 border-y bg-muted/30">
          <div className="container px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Github, label: 'GitHub Integration', desc: 'Connect repos in one click' },
                { icon: Zap, label: 'AI Categorization', desc: 'Auto-detect features, fixes, docs' },
                { icon: Clock, label: 'Save Hours', desc: 'Generate in seconds, not hours' },
                { icon: Shield, label: 'Secure & Private', desc: 'Your code never leaves GitHub' },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">{label}</p>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                How It Works
              </h2>
              <p className="text-muted-foreground">
                From GitHub to polished changelog in three simple steps
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Connect GitHub',
                  desc: 'Install our GitHub App and select repositories to track. Zero code changes required.',
                },
                {
                  step: '02',
                  title: 'Generate Changelog',
                  desc: 'Select a version range. Our AI categorizes commits/PRs into Features, Fixes, Docs, and more.',
                },
                {
                  step: '03',
                  title: 'Publish & Share',
                  desc: 'Export to Markdown, publish to your website, or send to Slack/Email. Customizable templates included.',
                },
              ].map(({ step, title, desc }) => (
                <Card key={step} className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 text-6xl font-bold text-primary/10">{step}</div>
                  <CardHeader>
                    <CardTitle>{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/30">
          <div className="container px-4">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Features
              </h2>
              <p className="text-muted-foreground">
                Everything you need to maintain professional changelogs
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Smart Categorization', desc: 'AI automatically classifies commits and PRs into Features, Fixes, Breaking Changes, Docs, Chores, and more.', icon: CheckCircle },
                { title: 'Custom Templates', desc: 'Create branded changelog templates with your logo, colors, and structure. Match your company style perfectly.', icon: CheckCircle },
                { title: 'GitHub App', desc: 'Secure, granular repository access. No personal tokens needed. Install once, use across all your projects.', icon: CheckCircle },
                { title: 'Multi-format Export', desc: 'Export to Markdown, HTML, JSON, or PDF. Integrate with your docs site, blog, or internal tools.', icon: CheckCircle },
                { title: 'Release Management', desc: 'Create GitHub releases directly from generated changelogs. Tag, attach assets, and notify users.', icon: CheckCircle },
                { title: 'Team Collaboration', desc: 'Review and edit changelogs together. Comment on entries, assign sections, and approve before publishing.', icon: CheckCircle },
                { title: 'Slack & Email Notifications', desc: 'Automatically notify your team and users when new releases are published. Customizable messages.', icon: CheckCircle },
                { title: 'Version Detection', desc: 'Automatically detects version bumps from package.json, Cargo.toml, go.mod, and more.', icon: CheckCircle },
                { title: 'Private & Secure', desc: 'SOC 2 compliant. Your code stays on GitHub. We only read commit metadata, never your source code.', icon: CheckCircle },
              ].map(({ title, desc, icon: Icon }) => (
                <Card key={title} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 mb-4">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-2 font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Automate Your Changelogs?
              </h2>
              <p className="mb-8 text-muted-foreground">
                Join hundreds of teams saving hours every release cycle. Start your free 14-day trial today.
              </p>
              <Link href="/auth/signin">
                <Button size="lg" className="gap-2" asChild>
                  <span>Start Free Trial</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <span className="text-primary">Changelog</span><span className="text-foreground">AI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Automated changelog generation for modern development teams.
              </p>
            </div>
            <nav>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><Link href="#" className="hover:text-foreground">Features</Link></li>
                <li><Link href="#" className="hover:text-foreground">Integrations</Link></li>
                <li><Link href="#" className="hover:text-foreground">Changelog</Link></li>
              </ul>
            </nav>
            <nav>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">About</Link></li>
                <li><Link href="#" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="#" className="hover:text-foreground">Careers</Link></li>
                <li><Link href="#" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </nav>
            <nav>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-foreground">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-foreground">Security</Link></li>
              </ul>
            </nav>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © 2024 ChangelogAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}