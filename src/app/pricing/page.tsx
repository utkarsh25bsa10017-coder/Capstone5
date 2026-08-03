import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, X, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for indie developers and small projects',
    features: [
      '1 Project',
      '10 Changelogs/month',
      'GitHub Public Repos only',
      'Markdown Export',
      'Basic Templates',
      'Community Support',
    ],
    notIncluded: [
      'Private Repositories',
      'AI Categorization',
      'Custom Templates',
      'Slack/Email Notifications',
      'Team Collaboration',
      'Priority Support',
    ],
    cta: 'Start Free',
    variant: 'outline',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For professional developers and growing teams',
    features: [
      'Unlimited Projects',
      'Unlimited Changelogs',
      'Private & Public Repositories',
      'AI-Powered Categorization',
      'Custom Templates',
      'Markdown, HTML, PDF Export',
      'Slack & Email Notifications',
      'Release Management',
      'Version Detection',
      'Email Support',
    ],
    notIncluded: [
      'Team Collaboration',
      'SSO/SAML',
      'Audit Logs',
      'Dedicated Support',
    ],
    cta: 'Start Free Trial',
    variant: 'default',
    popular: true,
  },
  {
    name: 'Team',
    price: '$79',
    period: '/month',
    description: 'For teams that need collaboration and security',
    features: [
      'Everything in Pro',
      'Up to 10 Team Members',
      'Team Workspaces',
      'Collaborative Editing',
      'Review & Approval Workflow',
      'SSO/SAML Authentication',
      'Audit Logs',
      'Priority Email Support',
      'Custom Domain for Changelogs',
      'API Access',
    ],
    notIncluded: [
      'Unlimited Team Members',
      'Dedicated Account Manager',
      'Custom SLA',
      'On-premise Deployment',
    ],
    cta: 'Contact Sales',
    variant: 'outline',
    popular: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations with advanced needs',
    features: [
      'Everything in Team',
      'Unlimited Team Members',
      'Dedicated Account Manager',
      'Custom SLA & Contracts',
      'On-premise Deployment Option',
      'Advanced Security & Compliance',
      'Custom Integrations',
      '24/7 Phone Support',
      'Training & Onboarding',
      'Migration Assistance',
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    variant: 'outline',
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="text-primary">Changelog</span><span className="text-foreground">AI</span>
          </div>
          <nav className="flex items-center gap-4">
            <a href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Home
            </a>
            <a href="/auth/signin">
              <Button variant="ghost" size="sm">Sign In</Button>
            </a>
            <a href="/auth/signin">
              <Button size="sm">Get Started</Button>
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 lg:py-32 text-center">
          <div className="container px-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
              <Sparkles className="mr-1.5 h-3.5 w-3.5" />
              Simple, transparent pricing
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Choose the plan that's right for you
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              All plans include a 14-day free trial. No credit card required. Cancel anytime.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container px-4">
            <div className="grid gap-8 lg:grid-cols-4">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={cn(
                    'relative flex flex-col',
                    plan.popular && 'ring-2 ring-primary'
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                      Most Popular
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle>{plan.name}</CardTitle>
                    <div className="mt-4 flex items-baseline justify-center gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                      {plan.notIncluded.map((feature) => (
                        <li key={feature} className="flex items-start gap-3 text-muted-foreground">
                          <X className="h-5 w-5 flex-shrink-0 mt-0.5" />
                          <span className="text-sm line-through">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button
                      className="w-full"
                      variant={plan.variant}
                      size="lg"
                      asChild
                    >
                      <a href="/auth/signin">{plan.cta}</a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/30">
          <div className="container px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Everything you need to know about our pricing and plans.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  q: 'Can I change plans later?',
                  a: 'Yes, you can upgrade or downgrade at any time. Upgrades take effect immediately, while downgrades take effect at the end of your billing cycle.',
                },
                {
                  q: 'What happens after the 14-day trial?',
                  a: 'You\'ll be prompted to choose a plan. If you don\'t upgrade, your account will be downgraded to the Free plan with limited features.',
                },
                {
                  q: 'Is my code secure?',
                  a: 'Absolutely. We use GitHub Apps for secure, granular access. We only read commit metadata (messages, authors, dates) - never your actual source code.',
                },
                {
                  q: 'Do you offer discounts for non-profits or students?',
                  a: 'Yes! We offer 50% off for non-profits, educational institutions, and open-source projects. Contact us to learn more.',
                },
                {
                  q: 'What payment methods do you accept?',
                  a: 'We accept all major credit cards, PayPal, and bank transfers for annual Enterprise plans. All payments are processed securely through Stripe.',
                },
                {
                  q: 'Can I cancel my subscription?',
                  a: 'Yes, you can cancel anytime from your settings. You\'ll continue to have access until the end of your billing period. No refunds for partial months.',
                },
              ].map((faq, i) => (
                <Card key={i} className="text-left">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
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
                Ready to get started?
              </h2>
              <p className="mb-8 text-muted-foreground">
                Join thousands of developers who automate their changelogs with ChangelogAI.
              </p>
              <a href="/auth/signin">
                <Button size="lg" className="gap-2" asChild>
                  <span>Start Free Trial</span>
                  <Sparkles className="h-4 w-4" />
                </Button>
              </a>
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
                <li><a href="/pricing" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground">Features</a></li>
                <li><a href="#" className="hover:text-foreground">Integrations</a></li>
                <li><a href="#" className="hover:text-foreground">Changelog</a></li>
              </ul>
            </nav>
            <nav>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </nav>
            <nav>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground">Security</a></li>
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