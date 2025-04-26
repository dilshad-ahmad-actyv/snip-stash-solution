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
git clone https://github.com/yourusername/snip-stash.git
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

## Testing

Run the test suite:

```bash
npm run test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

```I'll break down the complete tech stack used in this SnipStash application:

**Frontend Stack:**
1. **Next.js 14** (React Framework)
   - App Router for routing
   - Server and Client Components
   - Built-in API routes

2. **React 18**
   - Hooks (useState, useEffect)
   - Client-side components

3. **TypeScript**
   - Type safety
   - Better developer experience
   - Enhanced code quality

4. **TailwindCSS**
   - Utility-first CSS framework
   - Responsive design
   - Custom styling

5. **React Query**
   - Data fetching and caching
   - Server state management
   - Real-time updates

6. **React Syntax Highlighter**
   - Code syntax highlighting
   - Multiple language support
   - Custom themes

7. **React Hook Form**
   - Form handling
   - Form validation
   - Better performance

**Backend Stack:**
1. **Next.js API Routes**
   - RESTful API endpoints
   - Server-side routing
   - API middleware

2. **Prisma ORM**
   - Database modeling
   - Type-safe database queries
   - Database migrations
   - Schema management

3. **PostgreSQL**
   - Relational database
   - Data persistence
   - ACID compliance

4. **NextAuth.js**
   - Authentication system
   - Session management
   - OAuth support
   - JWT handling

5. **Zod**
   - Schema validation
   - Runtime type checking
   - API request/response validation

**Development Tools:**
1. **ESLint**
   - Code linting
   - Code style enforcement

2. **TypeScript Compiler**
   - Static type checking
   - Code compilation

3. **Prettier**
   - Code formatting
   - Consistent code style

**Key Features of the Stack:**
1. **Full-Stack TypeScript**
   - End-to-end type safety
   - Shared types between frontend and backend

2. **Server-Side Rendering (SSR)**
   - Better SEO
   - Faster initial page loads
   - Improved performance

3. **API Routes**
   - Backend functionality within Next.js
   - No separate backend server needed
   - Simplified deployment

4. **Database Integration**
   - Type-safe database access with Prisma
   - Efficient database queries
   - Automatic migrations

5. **Modern Authentication**
   - Secure user authentication
   - Session management
   - Protected routes

This tech stack was chosen for:
- Modern development practices
- Type safety across the application
- Excellent developer experience
- Production-ready performance
- Easy deployment
- Scalability
- Strong community support

Would you like me to explain any specific part of the tech stack in more detail?
```
