/**
 * Case-study content for the long-form portfolio. Shape mirrors the eventual
 * WPGraphQL nodes (id, num, company, role, year, phases, metrics, stack) so
 * swapping the data source to WordPress later is a loader change, not a UI
 * change.
 */

export type Bullet = readonly [label: string, html: string];

export type Phase = {
  prose: string;
  bullets?: Bullet[];
};

export type Metric = {
  value: string;
  label: string;
};

export type MockupKey =
  | "oracle"
  | "tenant"
  | "soberlink"
  | "blast"
  | "billabong"
  | "futures";

export type HeroVisualKind = MockupKey;

/**
 * Slide types for the per-project media carousel. `placeholder` slots are
 * stand-ins for real screenshots/video/iframe content that will be filled in
 * later.
 */
export type MediaItem =
  | { type: "image"; src: string; alt?: string; caption?: string }
  | { type: "youtube"; id: string; caption?: string }
  | { type: "vimeo"; id: string; caption?: string }
  | {
      type: "video";
      src: string;
      poster?: string;
      caption?: string;
      autoplay?: boolean;
      loop?: boolean;
    }
  | { type: "iframe"; src: string; allow?: string; caption?: string }
  | { type: "embed"; html: string; caption?: string }
  | {
      type: "mockup";
      component: MockupKey;
      background?: string;
      caption?: string;
    }
  | { type: "placeholder"; label: string; caption?: string };

export type CaseStudy = {
  id: string;
  num: string;
  company: string;
  shortName: string;
  role: string;
  year: string;
  duration: string;
  team: string;
  location: string;
  summary: string;
  /** May contain inline `<em>` markup. */
  titleHtml: string;

  bg: string;
  ink: string;
  rule: string;
  accent: string;
  heroBg: string;
  heroTone: "dark" | "light";
  heroVisual: HeroVisualKind;
  bodyTone: "dark" | "light";
  mockup: MockupKey;

  problem: Phase;
  approach: Phase;
  built: Phase;
  outcome: Phase & { metrics: Metric[] };

  stack: string[];

  /** Top-of-body media carousel. Mix of brand mockups + placeholders today;
   *  real screenshots / video / iframes get dropped in later. */
  gallery?: MediaItem[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "oracle",
    num: "01",
    company: "Oracle Cloud Infrastructure",
    shortName: "Oracle",
    role: "Principal MTS · IC-4",
    year: "2022 — 2026",
    duration: "4 years",
    team: "4 engineers",
    location: "Remote · Austin TX HQ",
    titleHtml: "Principal-level solutions at an Enterprise Giant.",
    summary:
      "Greenfield Product, AI Automation, Acceleration and Tiger Team Solutions.",
    bg: "#fafafa",
    ink: "#1a1f1c",
    rule: "#e3e3e3",
    accent: "#a4262c",
    heroBg: "#7a1d22",
    heroTone: "dark",
    heroVisual: "oracle",
    bodyTone: "light",
    mockup: "oracle",

    problem: {
      prose:
        "Oracle's Resource Analytics was a brand-new first-party product on the OCI Console — and our team was given a pre-release internal framework, four engineers, and a launch date. The framework's documentation was sparse, several components hadn't been built yet, and Oracle had strict accessibility, theming, and compartment-isolation requirements that the framework didn't yet enforce.",
      bullets: [
        [
          "Stack",
          "Pre-release internal framework with sparse documentation and partial component coverage",
        ],
        [
          "Team",
          "Four UI engineers, one tech lead, one PM — no dedicated designer for the first quarter",
        ],
        [
          "Stakes",
          "First-party OCI product. Customer-facing. Subject to Oracle's enterprise compliance bar",
        ],
      ],
    },

    approach: {
      prose:
        "I treated the framework gaps as my problem to solve, not theirs. I reverse-engineered the source to understand component contracts, wrote our team's internal standards document so we'd all build the same way, and proactively authored framework documentation that other Oracle product teams ended up adopting. When a piece was missing entirely, I built it.",
      bullets: [
        [
          "Standards",
          "Authored team conventions for routing, data fetching, and component composition",
        ],
        [
          "Docs",
          "Wrote framework docs that other Oracle product teams adopted as canonical",
        ],
        [
          "Tooling",
          "Bootstrapped JUnit + Dropwizard test coverage on the Java backend",
        ],
        [
          "AI",
          "Became internal lead for AI-assisted development — Codex with MCP across Jira, Bitbucket, and Confluence",
        ],
      ],
    },

    built: {
      prose:
        "The team shipped Resource Analytics 1.0 on time. Beyond the launch surface, I owned several adjacent surfaces: a GenAI prototype demoed at CloudWorld by CEO Clay Magouyrk, and a network schematic generator that replaced a weeks-long manual workflow with one that runs in under a minute.",
      bullets: [
        [
          "Launch",
          "Resource Analytics 1.0 — Inventory dashboards, drilldowns, accounts, and tags",
        ],
        [
          "Keynote",
          "GenAI prototypes presented by Clay Magouyrk at CloudWorld 2023",
        ],
        [
          "Internal",
          "Zero-trust ADW/OAC provisioning workflow with end-to-end test coverage",
        ],
        [
          "Tool",
          "Network schematic generator — from weeks of manual work to under one minute",
        ],
      ],
    },

    outcome: {
      prose:
        "Resource Analytics shipped on the pre-release framework, our docs became reference material across OCI, and the AI-assisted development practice I led became a model adopted by adjacent teams.",
      metrics: [
        { value: "1.0", label: "On-time launch" },
        {
          value: "<1 min",
          label: "Schematic generation (down from weeks)",
        },
        { value: "CloudWorld", label: "Keynote-featured demos" },
      ],
    },

    stack: [
      "TypeScript",
      "React",
      "Internal Framework",
      "Java",
      "Dropwizard",
      "JUnit",
      "Codex",
      "MCP",
      "Jira API",
      "Bitbucket API",
    ],
    gallery: [
      {
        type: "video",
        src: "/portfolio-assets/oracle/oracle-cloudworld-2023-clay-magouryk.mp4",
        caption:
          "Adrian Barnes' GenAI demo featured in Clay Magouyrk's CloudWorld 2023 keynote",
      },
      {
        type: "image",
        src: "/portfolio-assets/oracle/oracle-resource-analytics-instance-details.png",
        caption: "Resource Analytics - Instance details",
      },
      {
        type: "image",
        src: "/portfolio-assets/oracle/oracle-resource-analytics-regions.png",
        caption: "Resource Analytics - Regions",
      },

      {
        type: "image",
        src: "/portfolio-assets/oracle/oracle-resource-analytics-sql-developer.png",
        caption: "Resource Analytics - ADW SQL Developer",
      },
      {
        type: "image",
        src: "/portfolio-assets/oracle/oracle-resource-analytics-connections-graph.png",
        caption: "Resource Analytics - Connections Graph",
      },
      {
        type: "image",
        src: "/portfolio-assets/oracle/oracle-resource-analytics-graph-studio.png",
        caption: "Resource Analytics - Graph Studio",
      },
      {
        type: "image",
        src: "/portfolio-assets/oracle/oracle-resource-analytics-discovery-dashboard.png",
        caption: "Resource Analytics - Discovery Dashboard",
      },
      // {
      //   type: "mockup",
      //   component: "oracle",
      //   background: "#fff",
      //   caption: "Inventory Growth dashboard — primary surface",
      // },

      // {
      //   type: "placeholder",
      //   label: "Resource Drilldown",
      //   caption:
      //     "Multi-pane navigation between compartments, regions, and lifecycle states",
      // },
      // {
      //   type: "placeholder",
      //   label: "Schematic Generator",
      //   caption:
      //     "Network topology output — replaces a weeks-long manual process",
      // },
      // {
      //   type: "placeholder",
      //   label: "CloudWorld GenAI Demo",
      //   caption: "Drop in YouTube id when uploaded",
      // },
      // {
      //   type: "placeholder",
      //   label: "Codex + MCP Workflow",
      //   caption:
      //     "AI-assisted development integration across Jira, Bitbucket, Confluence",
      // },
    ],
  },

  {
    id: "tenant",
    num: "02",
    company: "Tenant Inc.",
    shortName: "Tenant",
    role: "Senior Software Engineer",
    year: "2021 — 2022",
    duration: "1 year",
    team: "Small product team",
    location: "Remote · Irvine CA",
    titleHtml:
      "Lead Engineer, Project Owner, offshore liason, standards-setter.",
    summary:
      "Solo-built an interactive multi-floor Property Map for self-storage operators — without a single map library.",
    bg: "#fdfdfd",
    ink: "#1a2e35",
    rule: "#e3e3e3",
    accent: "#2cb1bc",
    heroBg: "#0e4a52",
    heroTone: "dark",
    heroVisual: "tenant",
    bodyTone: "light",
    mockup: "tenant",

    problem: {
      prose:
        "Tenant's customers — self-storage facility operators — needed to manage hundreds of units laid out across multiple floors and buildings. The existing tooling was a flat spreadsheet. They wanted a spatial, interactive operator view: pan, zoom, drag units, drop new ones, rotate stairs, switch between floors. The catch: no geographic data, no real coordinates, no map library that fit.",
      bullets: [
        [
          "Domain",
          "Self-storage facilities — irregular multi-floor layouts, custom unit shapes",
        ],
        [
          "Constraints",
          "Vue 2 frontend, no native mapping primitives, operator-grade interactivity required",
        ],
        [
          "Scope",
          "Solo build — design partnership but I was the only engineer on the Property Map",
        ],
      ],
    },

    approach: {
      prose:
        'I skipped Mapbox, Leaflet, and the rest of the geographic mapping libraries — none of them modeled "a building with floors," they modeled "the Earth." Instead I adapted Vue Draggable Resizable as the primitive and layered the spatial logic, snapping, rotation, and floor switching on top.',
      bullets: [
        [
          "Primitive",
          "Vue Draggable Resizable as the unit/object base — wrapped with domain logic",
        ],
        [
          "State",
          "Introduced Vuex with persisted state to consolidate fragmented store patterns",
        ],
        [
          "Components",
          "Led the shared component library (Hummingbird) as an internal NPM module with Storybook",
        ],
        [
          "Plugins",
          "Designed a feature-plugin pattern so customers loaded only their subscribed features",
        ],
      ],
    },

    built: {
      prose:
        "I shipped the Property Map — a multi-floor, interactive operator view with pan, zoom, drag-and-drop units, rotation, snapping, and per-floor switching. It became the visual centerpiece of the operator experience. Along the way I contributed to the supporting Python API and stewarded Hummingbird through its v1 release.",
      bullets: [
        [
          "Property Map",
          "Multi-floor interactive editor — pan, zoom, drag, rotate, snap",
        ],
        [
          "Hummingbird",
          "Internal Vue component library + Storybook, used across the product",
        ],
        [
          "API",
          "Python contributions to the supporting endpoints and validation layer",
        ],
      ],
    },

    outcome: {
      prose:
        "The Property Map shipped and became the spatial source-of-truth for Tenant's customers. Hummingbird stabilized cross-team UI consistency. The Vuex consolidation reduced our state-related bug volume and made onboarding new engineers materially faster.",
      metrics: [
        { value: "Multi-floor", label: "Interactive editor — solo build" },
        { value: "Hummingbird", label: "Shared component library + Storybook" },
        { value: "Vuex", label: "Consolidated app-wide state management" },
      ],
    },

    stack: [
      "Vue 2",
      "Vuex",
      "Vue Draggable Resizable",
      "Storybook",
      "Python",
      "TypeScript",
    ],
    gallery: [
      {
        type: "iframe",
        src: "https://property-map-editor-testing.netlify.app",
        caption: "Property Map — live demo of the operator editor",
      },
      {
        type: "video",
        src: "portfolio-assets/tenant/tenant-inc-hummingbird-property-map.mp4",
        caption: "Property Map — live demo of the operator editor",
      },
    ],
  },

  {
    id: "soberlink",
    num: "03",
    company: "Soberlink Healthcare",
    shortName: "Soberlink",
    role: "Senior Software Engineer",
    year: "2020 — 2021",
    duration: "1 year",
    team: "Sole frontend engineer",
    location: "Cypress, CA",
    summary:
      "Built the frontend layer from scratch alongside an emerging design system at a healthcare company modernizing from .NET.",
    titleHtml: "Identity, with <em>unbeatable</em> reliability.",
    bg: "#ffffff",
    ink: "#1a2e3a",
    rule: "#e3e3e3",
    accent: "#1668b2",
    heroBg: "#1668b2",
    heroTone: "dark",
    heroVisual: "soberlink",
    bodyTone: "light",
    mockup: "soberlink",

    problem: {
      prose:
        "Soberlink — a healthcare company best known for its FDA-cleared remote alcohol monitoring devices — wanted to modernize its .NET stack. They had a designer creating their first proper design system from scratch, no Vue frontend to speak of, and a critical-path requirement: build an identity layer (signup, MFA, login, account) that real patients and clinicians would depend on every day.",
      bullets: [
        [
          "Stakes",
          "Healthcare-grade reliability. Court-admissible monitoring data. Cannot fail.",
        ],
        [
          "State",
          "Greenfield Vue layer. Design system being born in parallel.",
        ],
        [
          "Role",
          "Hired as the sole frontend engineer for the modernization effort.",
        ],
      ],
    },

    approach: {
      prose:
        "I partnered tightly with the designer — building components as the design language emerged, and pushing back where the implementation gave us better information than the static mock. We chose Vue 3 with TypeScript and PostCSS, and from day one I extracted everything reusable into a private component library backed by Storybook so future Soberlink products could consume it.",
      bullets: [
        [
          "Cadence",
          "Daily designer/engineer pairing — design decisions made in code, not Figma",
        ],
        [
          "Library",
          "Extracted reusable UI into a private library + Storybook from day one",
        ],
        [
          "Quality",
          "End-to-end type safety, accessible by default, focus management for MFA flows",
        ],
      ],
    },

    built: {
      prose:
        "I shipped the full identity surface: account creation, MFA setup, login, password reset, account management. Each flow is healthcare-grade and remains business-critical infrastructure today.",
      bullets: [
        [
          "Signup",
          "New user account creation with verification + invitation flows",
        ],
        ["MFA", "Multi-factor enrollment and challenge flows — TOTP and SMS"],
        ["Login", "Persistent session management with recovery paths"],
        [
          "Account",
          "Self-service account management for patients and clinical admins",
        ],
      ],
    },

    outcome: {
      prose:
        "The Vue 3 frontend shipped and is still running Soberlink's identity surfaces — five years later, real patients and clinicians use it daily. The component library spawned and stabilized adjacent Soberlink products.",
      metrics: [
        { value: "5+ yrs", label: "Still business-critical in production" },
        { value: "Vue 3 + TS", label: "Established the modern frontend stack" },
        { value: "Library", label: "Spawned reusable UI across products" },
      ],
    },

    stack: [
      "Vue 3",
      "TypeScript",
      "PostCSS",
      "Storybook",
      "Vite",
      ".NET (API)",
    ],
    gallery: [
      {
        type: "image",
        src: "/portfolio-assets/soberlink/soberlink-component-library-reimagined.png",
        caption: "Compliance alert + monitoring device",
      },
      // {
      //   type: "iframe",
      //   src: "/portfolio-assets/soberlink/soberlink-component-library.html",
      //   caption: "Compliance alert + monitoring device",
      // },
      // {
      //   type: "placeholder",
      //   label: "Signup Flow",
      //   caption: "Account creation with verification and invitations",
      // },
      // {
      //   type: "placeholder",
      //   label: "MFA Enrollment",
      //   caption: "TOTP / SMS enrollment with focus management",
      // },
      // {
      //   type: "placeholder",
      //   label: "Press Coverage Embed",
      //   caption: "Forbes / BBC / Psychology Today — iframe or screenshot",
      // },
    ],
  },

  {
    id: "blast",
    num: "04",
    company: "Investable Games · Blast",
    shortName: "Blast",
    role: "Software Engineer",
    year: "2018 — 2020",
    duration: "2 years",
    team: "Web team of 2",
    location: "Costa Mesa, CA",
    summary:
      "Primary web engineer at an early-stage fintech turning mobile games into savings accounts.",
    titleHtml: "Save more than just <em>the princess.</em>",
    bg: "#0a0418",
    ink: "#e8e9f0",
    rule: "rgba(255,255,255,0.12)",
    accent: "#3effd0",
    heroBg: "#1a0a3a",
    heroTone: "dark",
    heroVisual: "blast",
    bodyTone: "dark",
    mockup: "blast",

    problem: {
      prose:
        "Blast was an early-stage fintech where playing mobile games earned real money into an FDIC-insured savings account. We had a seed-stage runway, a marketing site to ship before the raise closed, and a non-technical content team that wanted to keep editing the site without engineering on the critical path.",
      bullets: [
        ["Timing", "Marketing site needed live before the seed raise closed"],
        [
          "Audience",
          "Non-technical content team needed self-service editing post-launch",
        ],
        [
          "Adjacent",
          "Product surfaces — Learn & Earn, white-label partner funnels — followed quickly",
        ],
      ],
    },

    approach: {
      prose:
        "I stood up the marketing site fast on a stack our content team could own (Craft CMS + GraphQL), wired Optimizely A/B testing into the bones, and then expanded the same foundation into Gatsby-based product surfaces. I contributed to the Rails backend where the web team's needs touched core systems — Missions, Campaigns, and admin tooling.",
      bullets: [
        [
          "Marketing",
          "Craft CMS + GraphQL — content team self-serve, Optimizely A/B baked in",
        ],
        [
          "Product",
          "Gatsby for Learn & Earn — sponsored-content savings surface",
        ],
        [
          "Reuse",
          "Same foundation powered white-label sign-up funnels (incl. Junior Achievement)",
        ],
        [
          "Backend",
          "Rails contributions to Campaigns, Missions, and admin tooling",
        ],
      ],
    },

    built: {
      prose:
        "I architected and shipped Learn & Earn — Blast's first product surface beyond the core app — plus reusable white-label funnels and the marketing site that supported the company through its seed round. Along the way I mentored a junior engineer through the full project lifecycle.",
      bullets: [
        ["Marketing site", "Craft CMS + GraphQL, content-editable, A/B tested"],
        [
          "Learn & Earn",
          "Gatsby-based sponsored savings surface — architecture and lead engineering",
        ],
        [
          "White-label",
          "Reusable signup funnel framework — first deployment: Junior Achievement",
        ],
        [
          "Mentorship",
          "Onboarded and mentored a junior engineer through full project ownership",
        ],
      ],
    },

    outcome: {
      prose:
        "The marketing site launched ahead of the raise. Learn & Earn shipped and became a recurring sponsored-content revenue stream. The white-label funnel framework let business development partners launch in days rather than months.",
      metrics: [
        { value: "Seed", label: "Site live before the raise closed" },
        {
          value: "Days",
          label: "White-label partner onboarding (was months)",
        },
        { value: "1 → ∞", label: "Mentored junior engineer to full ownership" },
      ],
    },

    stack: [
      "Gatsby",
      "React",
      "GraphQL",
      "Craft CMS",
      "Optimizely",
      "Ruby on Rails",
      "PostgreSQL",
    ],
    gallery: [
      {
        type: "video",
        src: "/portfolio-assets/blast/blastv3_720.mp4",
        caption: "Blast Website 2019",
      },
      {
        type: "video",
        src: "/portfolio-assets/blast/blastv2_720.mp4",
        caption: "Blast Website 2018",
      },
      // {
      //   type: "mockup",
      //   component: "blast",
      //   background: "#0a0418",
      //   caption: "Mobile app — savings balance + game card",
      // },
      // {
      //   type: "placeholder",
      //   label: "Marketing Site Hero",
      //   caption: "Craft CMS-powered, A/B tested via Optimizely",
      // },
      // {
      //   type: "placeholder",
      //   label: "Learn & Earn Flow",
      //   caption: "Sponsored-content savings surface — built on Gatsby",
      // },
      // {
      //   type: "placeholder",
      //   label: "Junior Achievement Funnel",
      //   caption:
      //     "First white-label deployment of the reusable signup framework",
      // },
      // {
      //   type: "placeholder",
      //   label: "App Walkthrough Video",
      //   caption: "Drop in mp4 src or YouTube id",
      // },
    ],
  },

  {
    id: "billabong",
    num: "05",
    company: "Billabong Group International",
    shortName: "Billabong",
    role: "Senior Frontend Engineer",
    year: "2016 — 2018",
    duration: "2 years",
    team: "DTC engineering team",
    location: "Irvine, CA",
    summary:
      "Frontend on Billabong Group's direct-to-consumer team — multi-brand e-commerce platform powering four global surf labels.",
    titleHtml: "One platform, four <em>surf</em> brands.",
    bg: "#f5f0e6",
    ink: "#1a1a1a",
    rule: "#d8d0bc",
    accent: "#1a1a1a",
    heroBg: "#1e3a4a",
    heroTone: "dark",
    heroVisual: "billabong",
    bodyTone: "light",
    mockup: "billabong",

    problem: {
      prose:
        "Billabong Group ran four global surf brands — Billabong, RVCA, Element, Von Zipper — all on a shared CakePHP + Tomcat e-commerce codebase with per-brand template overrides. The catalog was massive, the brands had wildly different aesthetics, and the company needed both deep visual differentiation per brand and operational efficiency from the shared platform.",
      bullets: [
        ["Platform", "CakePHP + Tomcat with per-brand template overrides"],
        [
          "Brands",
          "Billabong, RVCA, Element, Von Zipper — distinct visual identities, shared platform",
        ],
        [
          "Mandates",
          "WCAG accessibility remediation across the portfolio. SEO + GTM rollout.",
        ],
      ],
    },

    approach: {
      prose:
        "I led a near-complete rebuild of the RVCA site — a label whose visual language was the furthest from the platform default — pushing the override system to its limit. After that, I drove WCAG remediation across all four brands, set up Google Tag Manager and structured-data SEO, and contributed UI updates to Element and Von Zipper.",
      bullets: [
        ["Lead", "Near-complete RVCA site rebuild within the shared platform"],
        [
          "Accessibility",
          "Drove WCAG 2.1 AA remediation across all four brand sites",
        ],
        ["SEO", "Structured data, GTM rollout, Lighthouse-driven perf work"],
        [
          "Cross-brand",
          "UI updates and shared improvements on Billabong, Element, Von Zipper",
        ],
      ],
    },

    built: {
      prose:
        "RVCA shipped as a near-complete rebuild within the shared platform — proving the override architecture could carry radically different visual identities. The WCAG work brought all four brand sites up to AA. The GTM/SEO foundation gave the marketing team self-service measurement across the portfolio.",
      bullets: [
        [
          "RVCA",
          "Site rebuild — design system, component overrides, content surfaces",
        ],
        ["Accessibility", "WCAG 2.1 AA across all four brand sites"],
        [
          "Measurement",
          "GTM + structured data — portfolio-wide marketing analytics",
        ],
      ],
    },

    outcome: {
      prose:
        "RVCA's rebuild validated the override architecture for radically off-default brands. The accessibility work removed legal exposure and improved real customer experience. The measurement foundation is still informing the DTC team's decisions years later.",
      metrics: [
        { value: "4 brands", label: "On one platform" },
        { value: "WCAG AA", label: "Accessibility across the portfolio" },
        { value: "RVCA", label: "Lead engineer on a near-complete rebuild" },
      ],
    },

    stack: [
      "CakePHP",
      "Tomcat",
      "JavaScript",
      "SCSS",
      "Google Tag Manager",
      "Structured Data / SEO",
    ],
    gallery: [
      {
        type: "mockup",
        component: "billabong",
        caption: "RVCA — brand template overrides on the shared platform",
      },
      {
        type: "placeholder",
        label: "Billabong Homepage",
        caption: "Pre/post rebuild comparison",
      },
      {
        type: "placeholder",
        label: "Element Sub-brand",
        caption: "UI updates within the shared platform",
      },
      {
        type: "placeholder",
        label: "Von Zipper Sub-brand",
        caption: "Coordinated rollouts across the portfolio",
      },
      {
        type: "placeholder",
        label: "WCAG Audit Demo",
        caption: "Before/after accessibility scoring",
      },
    ],
  },

  {
    id: "futures",
    num: "06",
    company: "Futures Fins",
    shortName: "Futures Fins",
    role: "Generalist → Web Developer",
    year: "2004 — 2016",
    duration: "12 years",
    team: "Generalist into web lead",
    location: "San Clemente, CA",
    summary:
      "Twelve years at a surf-industry hardgoods manufacturer — generalist engineer who grew with the company into its web development function.",
    titleHtml: "Twelve years. <em>One surf co.</em>",
    bg: "#ededed",
    ink: "#1a1a1a",
    rule: "#cccccc",
    accent: "#00a3e0",
    heroBg: "#003a52",
    heroTone: "dark",
    heroVisual: "futures",
    bodyTone: "light",
    mockup: "futures",

    problem: {
      prose:
        "I joined Futures Fins in 2004 as a young generalist at a fin manufacturer in San Clemente. There was no web team — the company had a basic brochure site and a need to grow into e-commerce as direct-to-consumer became viable for surf hardgoods. Over the next twelve years, I grew with the company.",
      bullets: [
        ["Era", "2004 — pre-React, pre-Node, pre-most-things"],
        [
          "Role",
          'Generalist with web sensibilities — "can you make this work?"',
        ],
        ["Arc", "Brochure site → corporate site → full Magento storefront"],
      ],
    },

    approach: {
      prose:
        "I grew the company's web development function as the need emerged. I built and maintained the corporate site, picked up PHP and SQL as the catalog needs got serious, and led development on the Magento storefront when DTC e-commerce became a strategic priority for the brand.",
      bullets: [
        ["Foundation", "Built and maintained the corporate Futures Fins site"],
        ["Skills", "Self-taught the LAMP stack as the company's needs grew"],
        ["Storefront", "Led development on Magento/PHP e-commerce storefront"],
      ],
    },

    built: {
      prose:
        "The Futures Fins corporate site, the Magento storefront, and twelve years of incremental product launches, team-rider campaigns, and seasonal collection drops. This is where I learned to ship — not at startup-cadence speed, but at the steady cadence of a real business serving real customers.",
      bullets: [
        ["Corporate site", "Built and maintained for over a decade"],
        ["E-commerce", "Magento + PHP storefront — full implementation lead"],
        ["Cadence", "Twelve years of product launches and seasonal campaigns"],
      ],
    },

    outcome: {
      prose:
        'Where it all started. Twelve years of learning to ship, learning the business, learning what "production" really means when your customers are surf shops and your downtime affects revenue.',
      metrics: [
        { value: "12 years", label: "Where I learned to ship" },
        { value: "Generalist", label: "Grown into web developer organically" },
        { value: "DTC", label: "Led Magento storefront launch" },
      ],
    },

    stack: [
      "PHP",
      "Magento",
      "MySQL",
      "JavaScript (pre-modern)",
      "HTML/CSS",
      "Linux",
    ],
    gallery: [
      {
        type: "mockup",
        component: "futures",
        caption: "Magento storefront — fin catalog with product detail",
      },
      {
        type: "placeholder",
        label: "Wayback Machine Capture",
        caption: "Snapshot of the corporate site circa 2010 — iframe target",
      },
      {
        type: "placeholder",
        label: "Team Rider Campaign",
        caption: "Seasonal collection drop microsite",
      },
      {
        type: "placeholder",
        label: "Fin Configurator",
        caption: "Pre-modern interactive product picker",
      },
    ],
  },
];

export const LANDER = {
  mark: "adrianbarn.es",
  kicker: "Principal Software Engineer · 10+ Years",
  nameTop: "Adrian",
  nameBottom: "Barn.es",
  blurb:
    "I build customer-facing products and internal platforms — most recently at <strong>Oracle Cloud Infrastructure</strong>, where I co-led UI delivery for a new first-party product on a pre-release framework. Deep in TypeScript and React; comfortable through Node, GraphQL, and the cloud when the problem calls for it.",
  bottom: [
    { label: "Based in", value: "San Juan Capistrano, CA" },
    { label: "Currently", value: "Open to new work" },
    { label: "Stack", value: "TS · React · Node · GraphQL" },
    { label: "Also", value: "AI Workflow Lead · MCP" },
  ],
  nav: [
    { label: "Work", href: "#oracle-hero" },
    { label: "Contact", href: "#contact" },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/adrian-barnes-software-engineer",
      external: true,
    },
  ],
} as const;

export const CONTACT = {
  kicker: "— Let's build something",
  headline: "Got a hard <em>frontend</em><br/>problem?",
  email: "hello@adrianbarn.es",
  phone: "+19493066000",
  phoneDisplay: "949 · 306 · 6000",
  linkedin: "https://linkedin.com/in/adrian-barnes-software-engineer",
  linkedinHandle: "/in/adrian-barnes-software-engineer",
  location: "San Juan Capistrano, CA",
  colophon: "Case study variant · v1",
} as const;
