# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains a full SaaS Admin Dashboard (SocialOne) built with React + Vite, Redux Toolkit, Axios, Recharts, and React Hook Form.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5 (api-server artifact)
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── saas-dashboard/         # SaaS Admin Dashboard (React + Vite) — main app at /
│   │   ├── src/
│   │   │   ├── store/          # Redux Toolkit store (auth, company, agents, applications slices)
│   │   │   ├── services/       # Axios client + interceptors (api.ts)
│   │   │   ├── hooks/          # React Query hooks (use-auth, use-company, use-agents)
│   │   │   ├── components/
│   │   │   │   ├── layout/     # AppLayout, Sidebar, Header
│   │   │   │   ├── modals/     # CreateCompanyModal
│   │   │   │   └── ui/         # Shared UI components (Button, Card, Input, etc.)
│   │   │   ├── pages/          # Login, Signup, Dashboard, WhatsAppDashboard, Agents, Chat
│   │   │   └── App.tsx         # Router + Redux Provider + protected routes
│   │   └── public/images/      # AI-generated auth background and logo
│   ├── api-server/             # Express API server at /api
│   └── mockup-sandbox/         # Design prototyping at /__mockup
├── lib/
│   ├── api-spec/               # OpenAPI spec + Orval codegen config
│   ├── api-client-react/       # Generated React Query hooks
│   ├── api-zod/                # Generated Zod schemas from OpenAPI
│   └── db/                     # Drizzle ORM schema + DB connection
├── scripts/                    # Utility scripts
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── tsconfig.json
└── package.json
```

## SaaS Dashboard Features

### Authentication
- Login page (POST `http://89.116.122.211:5002/login/all`)
- Signup page (POST `http://89.116.122.211:5002/login/signup`)
- Token + userId + companyId + role stored in Redux + localStorage
- Axios interceptor auto-attaches Bearer token; 401 → auto logout

### Pages
- **/login** — Split-screen login with branded hero panel
- **/signup** — Registration form
- **/dashboard** — Welcome page with WhatsApp/Facebook/Instagram service cards; auto-shows Create Organization modal if companyId is null
- **/whatsapp-dashboard** — Metrics cards (Total Conversations, Messages Sent, Message Rate, Active Agents) + Message Trends area chart + Active Agents bar chart (Recharts)
- **/agents** — Data table of agents (GET `http://89.116.122.211:5002/user/getAll?search=ACTIVE`) + Add Agent modal (POST to user/create)
- **/chat** — Chat UI with conversation list + message thread (mocked data)

### Global Layout
- Sidebar: Logo, nav links (Dashboard, WhatsApp, Agents, Chat)
- Header: Search bar, notification bell, profile dropdown with logout

### Redux Slices
- `authSlice` — token, userId, companyId, role, isAuthenticated
- `companySlice` — company data
- `agentSlice` — agents list
- `applicationSlice` — applications

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck`
- **`emitDeclarationOnly`** — only `.d.ts` files emitted during typecheck

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build`
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly`
