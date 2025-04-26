# SnipStash - Smart Code Snippet Organizer

SnipStash is a professional-grade code snippet management system that helps developers organize, categorize, and quickly access their code snippets. It features smart auto-categorization, powerful search capabilities, and a modern user interface.

## Features

- 🔐 Secure authentication
- 📝 Save and organize code snippets
- 🤖 Smart auto-categorization
- 🏷️ Custom tagging system
- 🔍 Advanced search and filtering
- 📋 Quick copy to clipboard
- ✨ Syntax highlighting
- 📱 Responsive design

## Tech Stack

- **Frontend:**

  - Next.js 14 (React)
  - TypeScript
  - TailwindCSS
  - React Query
  - React Syntax Highlighter
  - React Hook Form

- **Backend:**
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL
  - NextAuth.js
  - Zod

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/dilshad-ahmad-actyv/snip-stash-solution.git
cd snip-stash
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Update the .env file with your configuration:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/snipstash"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

5. Run database migrations:

```bash
npx prisma migrate dev
```

6. Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
snip-stash/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── components/        # React components
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript types
├── prisma/                # Database schema and migrations
├── public/                # Static assets
└── styles/                # Global styles
```

## Features in Detail

### Smart Categorization

The application automatically categorizes code snippets based on pattern recognition:

- Loops (for, while)
- API calls (fetch, axios)
- Error handling (try/catch)
- Array operations (map, filter)
- Debugging (console.log)

### Security

- JWT-based authentication
- CSRF protection
- Input validation
- Rate limiting
- XSS prevention