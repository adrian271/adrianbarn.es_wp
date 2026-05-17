# Headless WordPress + Next.js Personal Site — Setup Plan

This is a handoff document for converting an in-progress Next.js personal site into a headless WordPress setup. WordPress (with WPGraphQL) lives on DreamHost; the Next.js frontend lives on Vercel.

## Architecture overview

- **Backend (CMS):** WordPress on DreamHost, accessed at a subdomain like `cms.yourdomain.com`
- **API layer:** WPGraphQL plugin exposes a `/graphql` endpoint
- **Frontend:** Next.js (App Router) on Vercel, at the root domain
- **Caching strategy:** ISR with on-demand revalidation via webhook from WP to Next
- **Images:** Served from DreamHost, optimized and cached by Next.js `<Image>` on Vercel's edge

Expected traffic is low (~100 viewers/day), so DreamHost shared hosting is sufficient.

---

## Part 1: DreamHost WordPress setup (manual, learning-focused)

The user wants to do this part by hand without Claude automation. The steps below are a checklist they can work through. **Do not run these for the user** — they're for the user to execute themselves.

### 1.1 Subdomain and hosting

1. In the DreamHost panel, go to **Websites → Manage Websites** and add a new subdomain (e.g. `cms.yourdomain.com`).
2. Choose to host it on the existing plan (not Cloudflare-proxied initially — keep it simple).
3. Enable Let's Encrypt SSL for the subdomain. Wait for it to provision (can take a few minutes).
4. Verify the subdomain loads (will be a blank or default page until WP is installed).

### 1.2 Install WordPress

1. Use DreamHost's **One-Click Installs** for WordPress on the new subdomain. (Doing it manually is also fine if learning is the goal — download from wordpress.org, create a MySQL database in the panel, edit `wp-config.php`.)
2. Run through the WP install wizard. Use a strong admin password; do not use `admin` as the username.
3. Log into `/wp-admin` and confirm everything works.

### 1.3 Initial WordPress hardening

1. **Settings → Permalinks:** set to "Post name" (`/%postname%/`). This is required for REST/GraphQL to work cleanly.
2. **Settings → Discussion:** disable comments globally if the frontend won't show them (likely the case here).
3. **Settings → Reading:** can leave as-is for now.
4. Delete the default "Hello World" post and sample page.
5. Delete unused themes (keep only one default Twenty-something theme as a fallback).
6. Delete the Akismet and Hello Dolly plugins unless they're wanted.

### 1.4 Install required plugins

Install and activate these plugins from the WP admin (**Plugins → Add New**):

1. **WPGraphQL** — exposes the `/graphql` endpoint
2. **WPGraphQL for ACF** — if planning to use Advanced Custom Fields (install ACF first if so)
3. **Advanced Custom Fields** (free version is fine) — for structured content fields
4. **WPGraphQL Smart Cache** — caches GraphQL responses on the WP side; helpful on shared hosting
5. **WP Super Cache** or **W3 Total Cache** — general WP caching. Configure to *exclude* `/graphql` and `/wp-json/` from page cache (these should be cached by the GraphQL Smart Cache plugin, not the page cache, to avoid stale API responses).

### 1.5 Verify the GraphQL endpoint works

1. Visit `https://cms.yourdomain.com/graphql` in a browser. It should return a JSON error like `"GraphQL Request must include at least one of those two parameters: \"query\" or \"queryId\""`. That error is expected and means the endpoint is alive.
2. In WP admin, go to **GraphQL → GraphiQL IDE** and run a test query:
   ```graphql
   {
     posts {
       nodes {
         title
         slug
       }
     }
   }
   ```
3. Confirm it returns results.

### 1.6 Create a must-use plugin for custom code

Must-use plugins live in `wp-content/mu-plugins/` and auto-activate. This is where custom post types and the revalidation webhook will live.

1. Using DreamHost's file manager or SFTP, navigate to `wp-content/`.
2. Create a folder named `mu-plugins` if it doesn't exist.
3. Inside, create a file called `site-customizations.php` with this starter content:

   ```php
   <?php
   /**
    * Plugin Name: Site Customizations
    * Description: Custom post types, fields, and Vercel revalidation webhook.
    */

   // Code will be added in later steps.
   ```

### 1.7 Register custom post types

Decide what custom post types are needed beyond the built-in Post and Page. Common picks for a personal site: `project`, `note`, `talk`. Add to `site-customizations.php`:

```php
add_action('init', function() {
    register_post_type('project', [
        'label' => 'Projects',
        'public' => true,
        'show_in_rest' => true, // required for block editor
        'show_in_graphql' => true,
        'graphql_single_name' => 'project',
        'graphql_plural_name' => 'projects',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
        'has_archive' => true,
        'menu_icon' => 'dashicons-portfolio',
    ]);

    // Add more CPTs here as needed.
});
```

Note the `show_in_graphql`, `graphql_single_name`, and `graphql_plural_name` keys — WPGraphQL won't expose a CPT without these.

After saving, refresh WP admin. A "Projects" menu item should appear in the sidebar.

### 1.8 ACF field groups

1. In WP admin, go to **ACF → Field Groups → Add New**.
2. Create field groups appropriate to the design. Example for projects: `tech_stack` (text), `live_url` (URL), `repo_url` (URL), `year` (number), `featured` (true/false).
3. In each field group's settings, ensure **Show in GraphQL** is enabled and set a **GraphQL Field Name** (e.g. `projectFields`).
4. Set the location rules to attach the field group to the relevant post type.
5. Save and test in GraphiQL:
   ```graphql
   {
     projects {
       nodes {
         title
         projectFields {
           techStack
           liveUrl
         }
       }
     }
   }
   ```

### 1.9 Add the revalidation webhook (will be wired up after Next.js is deployed)

Add this to `site-customizations.php`, but the URL and secret will be filled in once the Next.js side exists:

```php
add_action('transition_post_status', function($new_status, $old_status, $post) {
    // Only fire when something becomes or stops being published
    if ($new_status !== 'publish' && $old_status !== 'publish') {
        return;
    }

    // Skip autosaves and revisions
    if (wp_is_post_revision($post->ID) || wp_is_post_autosave($post->ID)) {
        return;
    }

    $webhook_url = defined('VERCEL_REVALIDATE_URL') ? VERCEL_REVALIDATE_URL : '';
    $secret = defined('VERCEL_REVALIDATE_SECRET') ? VERCEL_REVALIDATE_SECRET : '';

    if (empty($webhook_url) || empty($secret)) {
        return;
    }

    $body = [
        'postType' => $post->post_type,
        'slug' => $post->post_name,
    ];

    wp_remote_post($webhook_url, [
        'headers' => [
            'Content-Type' => 'application/json',
            'x-webhook-secret' => $secret,
        ],
        'body' => json_encode($body),
        'blocking' => false,
        'timeout' => 5,
    ]);
}, 10, 3);
```

Then in `wp-config.php` (above the "stop editing" line), add:

```php
define('VERCEL_REVALIDATE_URL', 'https://yoursite.com/api/revalidate');
define('VERCEL_REVALIDATE_SECRET', 'long-random-string-shared-with-vercel');
```

Generate the secret with something like `openssl rand -hex 32` in a terminal. Keep it out of Git.

### 1.10 Add some real content

Before wiring up Next.js, populate WordPress with a few real posts, projects, and pages. This makes development against real data possible.

---

## Part 2: Next.js frontend (collaborative with Claude)

The user already has an in-progress Next.js design. The work here is integrating it with the WordPress backend.

### 2.1 Dependencies

The site is using Next.js App Router. No additional libraries are strictly required — the native `fetch()` handles GraphQL fine. Optional but useful:

- `graphql-request` — slightly nicer ergonomics for GraphQL calls (optional)
- `@types/wordpress__blocks` — if rendering Gutenberg block content (probably not needed)

For a minimal setup, stick with native `fetch()`.

### 2.2 Environment variables

Add to `.env.local` (and to Vercel project settings before deploy):

```
WORDPRESS_GRAPHQL_URL=https://cms.yourdomain.com/graphql
REVALIDATE_SECRET=<same-long-random-string-as-in-wp-config>
```

Add `.env.local` to `.gitignore` if not already there.

### 2.3 `next.config.js` image configuration

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.yourdomain.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
}

module.exports = nextConfig
```

### 2.4 The WordPress data layer

Create `lib/wordpress.ts` with typed fetch functions. Pattern:

```ts
const endpoint = process.env.WORDPRESS_GRAPHQL_URL!

async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {},
  tags: string[] = []
): Promise<T> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600, tags },
  })

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status}`)
  }

  const json = await res.json()
  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`)
  }

  return json.data
}

export interface Project {
  title: string
  slug: string
  content: string
  projectFields: {
    techStack: string
    liveUrl: string | null
    repoUrl: string | null
    year: number
    featured: boolean
  }
  featuredImage: {
    node: {
      sourceUrl: string
      altText: string
      mediaDetails: { width: number; height: number }
    }
  } | null
}

export async function getAllProjects(): Promise<Project[]> {
  const query = `
    query AllProjects {
      projects(first: 100) {
        nodes {
          title
          slug
          content
          projectFields {
            techStack
            liveUrl
            repoUrl
            year
            featured
          }
          featuredImage {
            node {
              sourceUrl
              altText
              mediaDetails { width height }
            }
          }
        }
      }
    }
  `
  const data = await fetchGraphQL<{ projects: { nodes: Project[] } }>(
    query,
    {},
    ['projects']
  )
  return data.projects.nodes
}

// Repeat the pattern for getProjectBySlug, getAllPosts, getPostBySlug, getPageBySlug, etc.
```

Define interfaces by hand rather than generating from the schema — for a personal site, it's faster and gives a better feel for the data shape.

### 2.5 Route structure

Suggested App Router layout (adjust to match the in-progress design):

- `app/page.tsx` — home
- `app/about/page.tsx` — fetches the "about" Page by slug from WP
- `app/projects/page.tsx` — projects index, calls `getAllProjects()`
- `app/projects/[slug]/page.tsx` — individual project; use `generateStaticParams` to pre-build
- `app/blog/page.tsx` — posts index
- `app/blog/[slug]/page.tsx` — individual post

Each dynamic route:

```ts
export async function generateStaticParams() {
  const projects = await getAllProjects()
  return projects.map((p) => ({ slug: p.slug }))
}
```

### 2.6 Revalidation API route

Create `app/api/revalidate/route.ts`:

```ts
import { revalidateTag, revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-webhook-secret')
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const { postType, slug } = await req.json()

  switch (postType) {
    case 'post':
      revalidateTag('posts')
      if (slug) revalidatePath(`/blog/${slug}`)
      break
    case 'project':
      revalidateTag('projects')
      if (slug) revalidatePath(`/projects/${slug}`)
      break
    case 'page':
      if (slug) revalidatePath(`/${slug}`)
      break
  }

  return NextResponse.json({ revalidated: true, postType, slug })
}
```

### 2.7 Image rendering

Anywhere a WordPress image is rendered:

```tsx
import Image from 'next/image'

{project.featuredImage && (
  <Image
    src={project.featuredImage.node.sourceUrl}
    alt={project.featuredImage.node.altText}
    width={project.featuredImage.node.mediaDetails.width}
    height={project.featuredImage.node.mediaDetails.height}
  />
)}
```

### 2.8 Rendering post content (HTML from WP)

WordPress returns `content` as an HTML string. Render it with `dangerouslySetInnerHTML`:

```tsx
<div
  className="prose"
  dangerouslySetInnerHTML={{ __html: post.content }}
/>
```

This is safe because the content comes from a trusted source (the user's own WP install). Consider Tailwind's `@tailwindcss/typography` plugin for nice default prose styling.

---

## Part 3: Deployment and wiring

### 3.1 Deploy Next.js to Vercel

1. Push the Next.js project to GitHub.
2. Import it into Vercel as a new project.
3. Add the env vars (`WORDPRESS_GRAPHQL_URL`, `REVALIDATE_SECRET`) in Vercel's project settings.
4. Deploy. Verify the preview URL renders content fetched from WordPress.

### 3.2 Wire up the webhook

1. In `wp-config.php` on DreamHost, set `VERCEL_REVALIDATE_URL` to the final production URL (`https://yoursite.com/api/revalidate`).
2. Set `VERCEL_REVALIDATE_SECRET` to the same value used in Vercel's env vars.
3. Test: publish or update a post in WP admin, then check the post appears on the frontend within a couple of seconds.

### 3.3 DNS cutover

Only after verifying everything works on the Vercel preview URL:

1. In the domain registrar (or DreamHost's DNS panel if managed there), point the root domain to Vercel per Vercel's instructions (usually an A record to `76.76.21.21` or a CNAME for `www`).
2. Add the custom domain in Vercel's project settings.
3. Wait for DNS propagation and SSL provisioning.

Keep the WP subdomain (`cms.yourdomain.com`) pointing to DreamHost — it's unaffected.

---

## Open questions for the user

1. What custom post types match the existing design? (project, note, talk, something else?)
2. What ACF fields does each post type need? (Depends on the design.)
3. Are pages like "about" going to be hardcoded in Next.js, or pulled from WP Pages?
4. Is the navigation hardcoded, or should it come from a WP menu?

These should be answered before writing the GraphQL queries and route components, since they determine the data shape.

---

## Things deliberately skipped (for now)

- Preview mode for drafts (can add later — not urgent)
- Search (Algolia or static index — add when there's enough content)
- Comments and forms (use a third-party service if/when needed)
- WP menu integration (hardcode nav initially)
- Sitemap and SEO meta (add via Next.js Metadata API once content exists)

These can all be layered on later without restructuring anything above.
