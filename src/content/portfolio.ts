/**
 * Section copy for the portfolio. Shaped to mirror the eventual WPGraphQL
 * shape (project nodes with title/role/years/copy/bullets/tags) so swapping
 * the data source to WordPress later is a loader change, not a UI change.
 */

export type ProjectNode = {
  id: string;
  icon?: string;
  title: string;
  role: string;
  years: string;
  kicker?: string;
  headline: string; // may contain inline markup tokens — components decide how to render
  copy: string;
  bullets?: string[];
  tags?: string[];
};

export const lander = {
  mark: "adrianbarn.es",
  kicker: "Principal Software Engineer · 10+ Years",
  name: { first: "Adrian", last: "Barnes" },
  blurb:
    "I build customer-facing products and internal platforms — most recently at <strong>Oracle Cloud Infrastructure</strong>, where I co-led UI delivery for a new first-party product on a pre-release framework. Deep in TypeScript and React; comfortable through Node, GraphQL, and the cloud when the problem calls for it.",
  meta: [
    { label: "Based in", value: "San Juan Capistrano, CA" },
    { label: "Currently", value: "Open to new work" },
    { label: "Stack", value: "TS · React · Node · GraphQL" },
    { label: "Also", value: "AI workflow lead · MCP" },
  ],
} as const;

export const oracle: ProjectNode = {
  id: "oracle",
  icon: "/assets/logos/oracle.svg",
  title: "Oracle Cloud Infrastructure",
  role: "Principal MTS · IC-4",
  years: "2022 — 2026",
  headline: "Shipped <em>1.0</em> on a pre-release framework.",
  copy: "Co-led UI delivery for <strong>Resource Analytics</strong>, a new first-party OCI product. We had four engineers, minimal documentation, and a framework that wasn't quite finished — so I reverse-engineered components, wrote the standards, and authored the docs other Oracle teams ended up adopting.",
  bullets: [
    "GenAI prototypes presented by Clay Magouyrk at <strong>CloudWorld 2023</strong>",
    "Replaced a weeks-long manual schematic process with a tool that runs in <strong>under a minute</strong>",
    "Internal lead for AI-assisted development — Codex + MCP across Jira, Bitbucket, Confluence",
    "Zero-trust ADW/OAC provisioning with Dropwizard backends and JUnit coverage",
  ],
  tags: [
    "TypeScript",
    "React",
    "Internal Framework",
    "Java · Dropwizard",
    "Codex / MCP",
  ],
};

export const tenant: ProjectNode & { floorplanEmbedUrl: string } = {
  id: "tenant",
  icon: "/assets/logos/tenant.svg",
  title: "Tenant Inc.",
  role: "Senior Software Engineer",
  years: "2021 — 2022",
  headline: "A floorplan editor, built without <em>a map library</em>.",
  copy: "Solo-built the <strong>Property Map</strong> — an operator-facing, multi-floor interactive map for self-storage facilities with pan, zoom, drag, drop, and rotate. I skipped the geographic mapping libraries and adapted Vue Draggable Resizable as the core primitive, layering domain logic on top.",
  bullets: [
    "Led the shared component library (Hummingbird) as an internal NPM module + Storybook",
    "Introduced Vuex with persisted state to consolidate fragmented state management",
    "Designed a plugin pattern so features load conditionally per customer subscription",
    "Contributed Python to the supporting API",
  ],
  tags: ["Vue 2", "Vuex", "Storybook", "Python"],
  floorplanEmbedUrl: "https://property-map-editor-testing.netlify.app",
};

export const soberlink: ProjectNode = {
  id: "soberlink",
  icon: "/assets/logos/soberlink.svg",
  title: "Soberlink Healthcare",
  role: "Senior Software Engineer",
  years: "2020 — 2021",
  headline: "Identity, with <em>unbeatable</em> reliability.",
  copy: "Hired as the sole frontend engineer at a .NET healthcare company that wanted to modernize on Vue. I built the frontend layer from the ground up alongside an emerging design language — partnering closely with a designer who was creating the system from scratch.",
  bullets: [
    "End-to-end ownership of signup, MFA, login, and account management flows",
    "Vue 3 · TypeScript · PostCSS — shipped and still business-critical today",
    "Extracted the UI into a shared library + Storybook for reuse across other Soberlink products",
  ],
};

export const blast: ProjectNode = {
  id: "blast",
  icon: "/assets/logos/blast.svg",
  title: "Investable Games · Blast",
  role: "Software Engineer",
  years: "2018 — 2020",
  kicker: "— Level Up Your Stack",
  headline: "Save more than just <em>the princess.</em>",
  copy: "The primary web engineer at an early-stage fintech. Stood up the marketing site on a tight seed-raise timeline (with Optimizely A/B testing baked in), then expanded it into a Craft CMS + GraphQL property non-technical staff could manage themselves.",
  bullets: [
    "Architected <strong>Learn & Earn</strong> on Gatsby — sponsored-content savings product",
    "Reused the foundation for white-label sign-up funnels (incl. Junior Achievement)",
    "Contributed to Rails backend: Campaigns, Missions, and admin tooling",
    "Mentored a junior engineer through the project lifecycle",
  ],
};

export const billabong: ProjectNode & {
  brands: Array<{ name: string; role: string; active?: boolean }>;
} = {
  id: "billabong",
  icon: "/assets/logos/billabong.svg",
  title: "Billabong Group International",
  role: "Senior Frontend Engineer",
  years: "2016 — 2018",
  kicker: "Direct-to-Consumer · Multi-Brand Platform",
  headline: "Performance Boardshorts.",
  copy: "Frontend engineer on Billabong Group's DTC team — a shared CakePHP + Tomcat e-commerce codebase with per-brand template overrides. Led a near-complete rebuild of the RVCA site, then drove WCAG remediation across the portfolio.",
  brands: [
    { name: "Billabong", role: "Lead rebuild", active: true },
    { name: "RVCA", role: "Site rebuild" },
    { name: "Element", role: "UI updates" },
    { name: "Von Zipper", role: "UI updates" },
    { name: "All", role: "WCAG · SEO · GTM" },
  ],
};

export type Fin = { name: string; mat: string; color1: string; accent: string };

export const futures: ProjectNode & { fins: Fin[] } = {
  id: "futures",
  icon: "/assets/logos/futures.svg",
  title: "Futures Fins",
  role: "Generalist → Web Developer",
  years: "2004 — 2016",
  headline: "Twelve Years. One Surf Co.",
  copy: "Where it started. <strong>Twelve years</strong> at a surf-industry hardgoods manufacturer — generalist engineer growing into the company's web development function as the need emerged. Built and maintained the corporate site, then led development of the Magento/PHP e-commerce storefront.",
  fins: [
    {
      name: "MB2",
      mat: "Honeycomb / Carbon",
      color1: "#1a1a1a",
      accent: "#d8e858",
    },
    {
      name: "Jordy (Large)",
      mat: "Honeycomb",
      color1: "#1a1a1a",
      accent: "#5ec85e",
    },
    { name: "F4", mat: "Techflex", color1: "#1a1a1a", accent: "#d8e858" },
    {
      name: "John John",
      mat: "Techflex",
      color1: "#1a1a1a",
      accent: "#3a8fd0",
    },
  ],
};

export const contact = {
  kicker: "— Let's build something",
  headline: "Got a hard <em>frontend</em><br/>problem?",
  email: "hello@adrianbarn.es",
  phone: "+19493066000",
  phoneDisplay: "949 · 306 · 6000",
  linkedin: "https://linkedin.com/in/adrian-barnes-software-engineer",
  linkedinHandle: "/in/adrian-barnes-software-engineer",
  location: "San Juan Capistrano, CA",
} as const;

/** Sections used by the side dot nav. `light` means the section uses a light
 *  background, so the nav dots should swap to dark. */
export const SECTIONS: Array<{ id: string; label: string; light: boolean }> = [
  { id: "intro", label: "Intro", light: false },
  { id: "oracle", label: "Oracle", light: true },
  { id: "tenant", label: "Tenant", light: true },
  { id: "soberlink", label: "Soberlink", light: true },
  { id: "blast", label: "Blast", light: false },
  { id: "billabong", label: "Billabong", light: false },
  { id: "futures", label: "Futures", light: true },
  { id: "contact", label: "Contact", light: false },
];
