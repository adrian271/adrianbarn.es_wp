# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status: pre-implementation

The repo currently contains only `headless-wp-nextjs-plan.md` — a handoff document describing the intended architecture. There is no Next.js project, no `package.json`, no source code, and no committed history yet. Before suggesting commands or referencing code paths, read the plan; do not invent files or scripts that don't exist.

## Intended architecture

A personal site (`adrianbarn.es`) built as headless WordPress + Next.js:

- **CMS:** WordPress on DreamHost shared hosting, served from a subdomain (e.g. `cms.yourdomain.com`)
- **API:** WPGraphQL plugin exposing `/graphql`; ACF (with WPGraphQL for ACF) for structured fields
- **Frontend:** Next.js App Router on Vercel at the root domain
- **Cache invalidation:** WP fires a `transition_post_status` hook → POSTs to a Next.js `/api/revalidate` route → `revalidateTag` / `revalidatePath`. Shared secret via `x-webhook-secret` header.
- **Images:** Stored on DreamHost under `/wp-content/uploads/`, rendered through `next/image` with that hostname allowlisted in `next.config.js`.

Expected traffic is ~100 viewers/day, so shared hosting is sufficient and ISR keeps DreamHost out of the hot path.

## Working with this project

**Do not automate Part 1 of the plan.** The WordPress / DreamHost setup (subdomain, WP install, plugin install, ACF field groups, `mu-plugins/site-customizations.php`) is explicitly marked as user-driven — the user wants to do it by hand for learning. Treat that section as a checklist for the user to execute, not as tasks to perform on their behalf.

**Part 2 (Next.js) is the collaborative scope.** When the Next.js project is initialized, the plan specifies:
- App Router, native `fetch()` (no GraphQL client library required)
- `lib/wordpress.ts` as the single data layer with a `fetchGraphQL<T>()` helper that passes `next: { revalidate, tags }` to `fetch`
- Hand-written TypeScript interfaces for WP types (not codegen — the personal-site scale doesn't justify it)
- `dangerouslySetInnerHTML` for WP post content is acceptable here because the content source is the user's own WP install

**Env vars** (shared between WP `wp-config.php` and Next.js `.env.local` / Vercel):
- `WORDPRESS_GRAPHQL_URL` — the `/graphql` endpoint
- `REVALIDATE_SECRET` — mirrored in WP as `VERCEL_REVALIDATE_SECRET`; must match for the webhook to authenticate

## Open questions blocking implementation

The plan lists four questions the user needs to answer before GraphQL queries and route components can be written: which custom post types exist, what ACF fields each needs, whether pages like "about" come from WP or are hardcoded, and whether nav comes from a WP menu. If asked to start building the Next.js data layer or routes without these answers, surface the open questions first.

## Sanity MCP note

A Sanity MCP server is available in this environment. It is **not** part of this project's architecture — the CMS is WordPress. Ignore Sanity tools unless the user explicitly pivots away from the WP plan.
