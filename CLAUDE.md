# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
yarn install

# Development (frontend only)
yarn dev                    # Runs on localhost:8080

# Development (full stack with serverless API)
vercel dev                  # Runs on localhost:3000

# Build
yarn build                  # Outputs to /build

# Testing
yarn test                   # Run tests in watch mode
yarn test --run             # Run tests once
yarn test src/__tests__/Quote.test.tsx  # Run single test file

# Linting
yarn lint
```

## Architecture

This is a React application that displays random quotes from the German TV series "Stromberg". It uses Vite for bundling and is deployed on Vercel.

### Frontend (src/)
- **React 19** with TypeScript and React Router for client-side routing
- **Tailwind CSS v4** via `@tailwindcss/vite` plugin
- Routes defined in `src/routes.ts` (home, impressum, datenschutz)
- Custom hooks in `src/hooks/` (useEventListener, useInterval, useIsMobile, useScrollToTop)

### Backend (api/)
- Single Vercel serverless function (`api/proxy.js`) that proxies requests to an external quote API
- Uses `QUOTE_API_URL` environment variable for the quote source

### Testing
- Vitest with React Testing Library and jsdom
- Test files in `src/__tests__/` mirror component structure
- Setup file: `src/setupTests.ts`
