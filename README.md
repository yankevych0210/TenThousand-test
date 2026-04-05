# Forms Lite 

A Google Forms clone built with React, TypeScript, RTK Query, and NestJS GraphQL.

## Tech Stack

- **Monorepo**: pnpm workspaces
- **Client**: React 19, TypeScript, Vite, Redux Toolkit, RTK Query
- **Server**: NestJS, `@nestjs/graphql`, Apollo Server 5
- **Styling**: CSS Modules

## Setup & Running

1. Install dependencies:
```bash
pnpm install
```

2. Start the dev servers (runs both client and server):
```bash
pnpm dev
```

- Server is at `http://localhost:3000` (Playground at `/graphql`)
- Client is at `http://localhost:5173`

*Note: Data is stored in-memory during development and resets on restart.*

## Scripts

- `pnpm dev`: Start both server and client
- `pnpm typecheck`: Run TypeScript compilation check
- `pnpm codegen`: Generate GraphQL types (make sure the server is running)

## Routes

| URL | Description |
|---|---|
| `/` | Homepage — list of all forms |
| `/forms/new` | Form Builder — create a new form |
| `/forms/:id/edit` | Form Builder — edit an existing form |
| `/forms/:id/fill` | Form Filler — fill out a form |
| `/forms/:id/responses` | Responses — view all submissions |
