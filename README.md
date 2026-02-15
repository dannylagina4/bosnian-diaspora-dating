# Bosnian Diaspora Dating Monorepo

Production-oriented starter monorepo for a dating platform using **pnpm + Turborepo**.

## Stack

- **Monorepo**: pnpm workspaces + Turborepo
- **API**: NestJS + TypeScript + Prisma + PostgreSQL + Redis + BullMQ + JWT auth
- **Web**: Next.js (App Router)
- **Mobile**: Expo React Native
- **Shared packages**: `types`, `ui`, `config`, `utils`

## Folder structure

```txt
.
├── apps
│   ├── api
│   │   ├── prisma/schema.prisma
│   │   └── src
│   │       ├── auth
│   │       ├── users
│   │       ├── profiles
│   │       └── common
│   ├── web
│   └── mobile
├── packages
│   ├── config
│   ├── types
│   ├── ui
│   └── utils
├── docker-compose.yml
├── pnpm-workspace.yaml
└── turbo.json
```

## Quick start

### 1) Install dependencies

```bash
pnpm install
```

### 2) Start infrastructure (Postgres + Redis)

```bash
docker compose up -d
```

### 3) Configure API env

```bash
cp apps/api/.env.example apps/api/.env
```

### 4) Generate Prisma client + run migration

```bash
pnpm --filter @bdd/api prisma:generate
pnpm --filter @bdd/api prisma:migrate --name init
```

### 5) Start all apps in dev mode

```bash
pnpm dev
```

## Useful scripts

- `pnpm dev` - run all `dev` tasks via Turbo
- `pnpm build` - build all packages/apps
- `pnpm --filter @bdd/api dev` - run Nest API only
- `pnpm --filter @bdd/web dev` - run Next.js app only
- `pnpm --filter @bdd/mobile dev` - run Expo app only

## Backend modules included

- `auth`
  - Email/password JWT login/register
  - Phone OTP placeholder endpoint
  - Google OAuth placeholder endpoint
- `users`
  - Basic list users endpoint
- `profiles`
  - Upsert and fetch profile endpoint

## Notes for production hardening

- Add rate limiting, request logging, and security headers.
- Add JWT guard + refresh token flow.
- Replace placeholder OAuth/OTP with provider integrations.
- Add queue workers for async jobs (emails, notifications, moderation).
- Add CI, migrations pipeline, and secret management.
