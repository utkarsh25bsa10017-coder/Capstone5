# ChangelogAI - Automated Changelog & Release Notes Generator

> Generate beautiful, categorized changelogs automatically from your GitHub commits and PRs. Save hours of manual work every release cycle.

![ChangelogAI](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?style=for-the-badge&logo=prisma)
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-4-000?style=for-the-badge&logo=nextauth)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-4169E1?style=for-the-badge&logo=postgresql)

## 🚀 Features

- **🤖 AI-Powered Categorization** - Automatically classifies commits and PRs into Features, Fixes, Breaking Changes, Docs, Chores, and more
- **🔐 Secure GitHub Integration** - Uses GitHub Apps for granular, secure repository access (no personal tokens needed)
- **📝 Custom Templates** - Create branded changelog templates with your logo, colors, and structure
- **📤 Multi-format Export** - Export to Markdown, HTML, JSON, or PDF
- **🚀 Release Management** - Create GitHub releases directly from generated changelogs
- **👥 Team Collaboration** - Review and edit changelogs together with comments and approvals
- **📢 Slack & Email Notifications** - Automatically notify your team and users on new releases
- **🔍 Version Detection** - Automatically detects version bumps from package.json, Cargo.toml, go.mod, and more
- **🔒 Private & Secure** - SOC 2 compliant. Your code stays on GitHub - we only read commit metadata

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS + Radix UI |
| Database | PostgreSQL (Vercel Postgres / Neon) |
| ORM | Prisma 5 |
| Authentication | NextAuth.js v4 (Google OAuth) |
| Deployment | Vercel |
| Package Manager | npm |

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or cloud)
- Google Cloud Console project for OAuth
- GitHub App (for repository access)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/changelogai.git
   cd changelogai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your credentials:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/changelogai"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-min-32-chars"
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"
   ANTHROPIC_API_KEY="your-anthropic-key"
   ENCRYPTION_KEY="your-32-char-encryption-key"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google OAuth API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Secret to `.env`

### GitHub App Setup (for repository access)

1. Go to [GitHub Developer Settings](https://github.com/settings/apps)
2. Create a new GitHub App
3. Configure permissions:
   - Repository contents: Read
   - Metadata: Read
   - Pull requests: Read
   - Commits: Read
4. Install the app on your repositories
5. Copy App ID, Client ID, and generate Private Key

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth endpoints
│   │   ├── projects/      # Project CRUD
│   │   ├── changelogs/    # Changelog CRUD
│   │   └── github/        # GitHub webhooks
│   ├── auth/              # Auth pages (signin, etc.)
│   ├── dashboard/         # Protected dashboard pages
│   ├── settings/          # User settings
│   ├── pricing/           # Pricing page
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # Reusable UI components (shadcn/ui style)
│   └── header.tsx         # Main navigation header
├── lib/
│   ├── auth.ts            # NextAuth configuration
│   ├── prisma.ts          # Prisma client
│   ├── utils.ts           # Utility functions
│   └── encryption.ts      # Encryption helpers
├── middleware.ts          # Auth protection middleware
└── types/                 # TypeScript types
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push schema changes to database
npm run db:studio    # Open Prisma Studio
npm run db:migrate   # Run migrations
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

**Required Vercel Environment Variables:**
- `DATABASE_URL` (Vercel Postgres or Neon)
- `NEXTAUTH_URL` (your production URL)
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `ENCRYPTION_KEY`

### Database Setup for Production

**Vercel Postgres:**
1. Create Vercel Postgres database in Vercel dashboard
2. Copy connection string to `DATABASE_URL`
3. Run `npx prisma migrate deploy` in build step

**Neon:**
1. Create Neon project
2. Copy connection string
3. Add to Vercel environment variables

## 📖 API Documentation

### Projects
- `GET /api/projects` - List user's projects
- `POST /api/projects` - Create new project

### Changelogs
- `GET /api/changelogs` - List changelogs (with filters)
- `POST /api/changelogs` - Create new changelog

### Webhooks
- `POST /api/github/webhook` - GitHub webhook endpoint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Prisma](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

---

Built with ❤️ for developers who value their time.