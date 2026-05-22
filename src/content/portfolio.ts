/**
 * Case-study content for the long-form portfolio. Shape mirrors the eventual
 * WPGraphQL nodes (id, num, company, role, year, phases, metrics, stack) so
 * swapping the data source to WordPress later is a loader change, not a UI
 * change.
 */

export type Bullet = readonly [label: string, html: string];

export type Phase = {
  num: string;
  name: string;
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
 * later. Any slide may carry an optional `href` - non-interactive slides
 * (image, mockup, placeholder) become fully clickable; interactive slides
 * (video, iframe, embed, youtube, vimeo) get a clickable caption with a
 * link-out icon. `external` defaults to inferring from `http(s)://`.
 */
type MediaLink = {
  gallery: "top" | "bottom";
  href?: string;
  external?: boolean;
};

export type MediaItem = MediaLink &
  (
    | {
        type: "image";
        src: string;
        alt?: string;
        caption?: string;
      }
    | {
        type: "youtube";
        id: string;
        caption?: string;
      }
    | {
        type: "vimeo";
        id: string;
        caption?: string;
      }
    | {
        type: "video";
        src: string;
        poster?: string;
        caption?: string;
        autoplay?: boolean;
        loop?: boolean;
      }
    | {
        type: "iframe";
        src: string;
        allow?: string;
        caption?: string;
      }
    | {
        type: "embed";
        html: string;
        caption?: string;
      }
    | {
        type: "mockup";
        component: MockupKey;
        background?: string;
        caption?: string;
      }
    | { type: "placeholder"; label: string; caption?: string }
  );

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
  approach?: Phase | false;
  built?: Phase | false;
  outcome?: Phase & { metrics: Metric[] };

  stack: string[];

  /** Top-of-body media carousel. Mix of brand mockups + placeholders today;
   *  real screenshots / video / iframes get dropped in later. */
  gallery: MediaItem[];
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "oracle",
    num: "01",
    company: "Oracle Cloud Infrastructure",
    shortName: "Oracle",
    role: "Principal MTS · IC-4",
    year: "2022 - 2026",
    duration: "4 years",
    team: "4 engineers",
    location: "Remote · Austin TX HQ",
    titleHtml: "Principal-level solutions at an Enterprise Giant.",
    summary:
      "Greenfield Product, AI Automation, Acceleration and Tiger Team Solutions.",
    bg: "#C2D4D4",
    ink: "#1a1f1c",
    rule: "#e3e3e3",
    accent: "#a4262c",
    heroBg: "#7a1d22",
    heroTone: "dark",
    heroVisual: "oracle",
    bodyTone: "light",
    mockup: "oracle",

    problem: {
      num: "01: Resource Analytics",
      name: "Shipping a new cloud product in 2026",
      prose:
        "Oracle's Resource Analytics was a brand-new first-party product on the OCI Console. We started with the fundamentals and built the entire stack - Frontend, Control Plane, Management Plane and Data Plane. We shipped a product, squashed bugs and measured its success. After 1.0, we evaluated what wasn't working, then developed new tools and documentation for the customer until we were satisfied that the product was a success.",
      bullets: [
        [
          "Stakes",
          "First-party OCI product. Customer-facing. Subject to Oracle's enterprise compliance bar",
        ],
        [
          "Challenge",
          "Building a product that played nicely in a zero-trust environment, security compliant and worked nicely along with other OCI resources such as ADW, OAC, Policy IAM and was cross-tenancy compatible.",
        ],
        [
          "Stack",
          "TypeScript + Java-based internal framework built on Dropwizard, Jersey, and Jetty, utilizing JUnit and Mockito",
        ],
      ],
    },

    approach: {
      num: "02: Acceleration Team",
      name: "Turning astronomical roadblocks into simple solutions",
      prose:
        "In 2024, I joined an acceleration initiative to radically reduce lead times for data center development planning. We precisely identified process pain points, transforming the creation of multi-week network panel schematics into a 1-minute compile. After 2 months of development, we shipped a React + Python app to serve as a tool for internal employees.",
      bullets: [
        [
          "Stake",
          "Data center bottlenecks costing millions of dollars each day",
        ],
        [
          "Challenge",
          "Finding the largest pain points in data center processes and eliminating them",
        ],
        ["Stack", "React/Preact, TypeScript and Python"],
      ],
    },

    built: {
      num: "03: Generative AI Demos",
      name: "Creating experiences for Executives to present to the world",
      prose:
        "In 2023, I was brought on as part of a Tiger Team to develop experiences for a fast-approaching Oracle Cloud World Demo. I put together a UI for Oracle Health that takes several customer data points and compiles a solution for a physician to review. My demo, featuring all of the cues of a modern agentic interface, was chosen and presented by Clay Magouryk.",
      bullets: [["Stack", "React/Preact, TypeScript and Python"]],
    },

    outcome: {
      num: "02",
      name: "Shipping a new cloud product in 2026",
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
        gallery: "bottom",
        src: "/portfolio-assets/oracle/oracle-cloudworld-2023-clay-magouryk.mp4",
        caption:
          "Adrian Barnes' GenAI demo featured in Clay Magouyrk's CloudWorld 2023 keynote",
        href: "https://www.youtube.com/live/ESuP_rtTeQo?t=2843s",
        autoplay: true,
      },
      {
        type: "image",
        gallery: "top",
        src: "/portfolio-assets/oracle/oracle-resource-analytics-instance-details.png",
        caption: "Resource Analytics - Instance details",
      },
      {
        type: "image",
        gallery: "top",
        src: "/portfolio-assets/oracle/oracle-resource-analytics-regions.png",
        caption: "Resource Analytics - Regions",
      },

      {
        type: "image",
        gallery: "top",
        src: "/portfolio-assets/oracle/oracle-resource-analytics-sql-developer.png",
        caption: "Resource Analytics - ADW SQL Developer",
      },
      {
        type: "image",
        gallery: "top",
        src: "/portfolio-assets/oracle/oracle-resource-analytics-connections-graph.png",
        caption: "Resource Analytics - Connections Graph",
      },
      {
        type: "image",
        gallery: "top",
        src: "/portfolio-assets/oracle/oracle-resource-analytics-graph-studio.png",
        caption: "Resource Analytics - Graph Studio",
      },
      {
        type: "image",
        gallery: "top",
        src: "/portfolio-assets/oracle/oracle-resource-analytics-discovery-dashboard.png",
        caption: "Resource Analytics - Discovery Dashboard",
      },
    ],
  },

  {
    id: "tenant",
    num: "02",
    company: "Tenant Inc.",
    shortName: "Tenant",
    role: "Senior Software Engineer",
    year: "2021 - 2022",
    duration: "1 year",
    team: "Small product team",
    location: "Remote · Irvine CA",
    titleHtml:
      "Lead Engineer, Project Owner, offshore liason, standards-setter.",
    summary:
      "Solo-built an interactive multi-floor Property Map for self-storage operators.",
    bg: "#e0f5f5",
    ink: "#1a2e35",
    rule: "#e3e3e3",
    accent: "#2cb1bc",
    heroBg: "#0e4a52",
    heroTone: "dark",
    heroVisual: "tenant",
    bodyTone: "light",
    mockup: "tenant",

    problem: {
      num: "01 Property map plugin",
      name: "Inventing a new way for customers to interact with the product",
      prose:
        "I solo-built the Property Map feature, an operator-facing interactive map for self-storage facilities with pan, zoom, multi-floor views, and precise entity rendering. I elevated the edit mode for advanced resource manipulation, adapting Vue-Draggable-Resizable as a base and layering custom domain logic on top. I partnered with the design team on the interaction model and contributed support for the Python API layer.",
      bullets: [
        [
          "Domain",
          "Self-storage facilities - irregular multi-floor layouts, custom unit shapes",
        ],
        [
          "Constraints",
          "Vue 2 frontend, no native mapping primitives, operator-grade interactivity required",
        ],
        [
          "Scope",
          "Solo build - design partnership but I was the only engineer on the Property Map",
        ],
      ],
    },

    approach: {
      num: "Component Library Architecture",
      name: "Setting standards for a growing product and engineering team",
      prose:
        "I joined as a senior IC on the frontend team for Hummingbird, Tenant's self-storage management platform, where component sprawl had become a major hindrance to development. I identified and led the solution: a shared component library packaged as an internal NPM module and hosted via Storybook. I served as the primary engineer with a supporting frontend engineer, shipped the library, integrated it with Hummingbird, and designed it for cross-project use.",
      bullets: [
        [
          "Primitive",
          "Vue Draggable Resizable as the unit/object base - wrapped with domain logic",
        ],
        [
          "State",
          "Vuex with persisted state to consolidate fragmented store patterns",
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

    built: false,

    outcome: {
      num: "02",
      name: "=====",
      prose:
        "The Property Map shipped and became the spatial source-of-truth for Tenant's customers. Hummingbird stabilized cross-team UI consistency. The Vuex consolidation reduced our state-related bug volume and made onboarding new engineers materially faster.",
      metrics: [
        { value: "Multi-floor", label: "Interactive editor - solo build" },
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
        type: "video",
        gallery: "top",
        src: "portfolio-assets/tenant/tenant-video-demo-loopable.mp4",
        caption: "Property Map - live demo of the operator editor",
        loop: true,
        autoplay: true,
      },
      {
        type: "iframe",
        gallery: "bottom",
        src: "https://property-map-editor-testing.netlify.app",
        caption: "Property Map - live demo of the operator editor",
      },
    ],
  },

  {
    id: "soberlink",
    num: "03",
    company: "Soberlink Healthcare",
    shortName: "Soberlink",
    role: "Senior Software Engineer",
    year: "2020 - 2021",
    duration: "1 year",
    team: "Sole frontend engineer",
    location: "Cypress, CA",
    summary:
      "Built the frontend layer from scratch alongside an emerging design system at a healthcare company modernizing from .NET.",
    titleHtml: "Identity, with <em>unbeatable</em> reliability.",
    bg: "#ddf9ff",
    rule: "#e3e3e3",
    ink: "#1a2e3a",
    accent: "#1668b2",
    heroBg: "#1668b2",
    heroTone: "dark",
    heroVisual: "soberlink",
    bodyTone: "light",
    mockup: "soberlink",

    problem: {
      num: "01 - Greenfield Identity Platform",
      name: "Identity platform for a healthcare company",
      prose:
        "I built Soberlink's identity platform UI as the sole frontend engineer, with end-to-end responsibility for sign-up, user information capture, multi-factor authentication setup, login, and account management flows. Our stack was Vue 3 (very early adoption), TypeScript, and PostCSS. The product shipped and remains live as a business-critical part of Soberlink's platform.",
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
      num: "02 - Component Library Architecture",
      name: "Component Library Architecture",
      prose:
        "I was tasked with standardizing brand UI elements and web components. I worked closely with the designer to build the design system from scratch, bringing their work to life as a component library with a Storybook UI for all engineers to reference.",
      bullets: [
        [
          "Cadence",
          "Daily designer/engineer pairing - design decisions made in code, not Figma",
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

    built: false,

    outcome: {
      num: "02",
      name: "=====",
      prose:
        "The Vue 3 frontend shipped and is still running Soberlink's identity surfaces - five years later, real patients and clinicians use it daily. The component library spawned and stabilized adjacent Soberlink products.",
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
        gallery: "bottom",
        type: "image",
        src: "/portfolio-assets/soberlink/soberlink-component-library-reimagined.png",
        caption: "Compliance alert + monitoring device",
        href: "/portfolio-assets/soberlink/soberlink-component-library.html",
      },
      {
        gallery: "top",
        type: "image",
        src: "/portfolio-assets/soberlink/soberlink-connections.png",
        caption: "Signup flow - user information capture and MFA setup",
      },
      {
        gallery: "top",
        type: "image",
        src: "/portfolio-assets/soberlink/soberlink-logged-in-user-account-settings.png",
        caption: "Logged-in user account settings",
      },
      {
        gallery: "top",
        type: "image",
        src: "/portfolio-assets/soberlink/soberlink-login-menu.png",
        caption: "Login menu",
      },
    ],
  },

  {
    id: "blast",
    num: "04",
    company: "Investable Games · Blast",
    shortName: "Blast",
    role: "Software Engineer",
    year: "2018 - 2020",
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
      num: "01",
      name: "Investor-Ready Launch",
      prose:
        "Built the public marketing site that helped support the company's launch to roughly 75,000 users and a $12M seed raise. Later launched the corporate site for sibling product ATM.com, now a business generating $15M+ annually.",
      bullets: [
        ["Timing", "Marketing site needed live before the seed raise closed"],
        [
          "Audience",
          "Non-technical content team needed self-service editing post-launch",
        ],
        [
          "Adjacent",
          "Product surfaces - Learn & Earn, white-label partner funnels - followed quickly",
        ],
      ],
    },

    approach: {
      num: "02",
      name: "Web App Ownership",
      prose:
        "Acted as the lead web engineer at an early-stage fintech startup. Built and owned the company's marketing presence across product pivots in React, Gatsby, GraphQL, and Craft CMS with TypeScript, Sass, and CSS3 animations. Responsible for Plaid integrations on the frontend for bank-account linking and identity/financial-data verification flows in user signup and account-funding paths. Architected the Gatsby-based sponsored-content savings app where users took practice tests to deposit money into savings; mentored a junior engineer through the project. Reused the same foundation to ship a Junior Achievement partner build.",
      bullets: [
        [
          "Marketing",
          "Craft CMS + GraphQL - content team self-serve, Optimizely A/B baked in",
        ],
        [
          "Product",
          "Gatsby for Learn & Earn - sponsored-content savings surface",
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
      num: "03",
      name: "Backend & Admin Tools",
      prose:
        "Contributed Rails MVC and data modeling on Campaigns and Missions (user-facing earning features) and built significant operator admin tooling for managing users, campaigns, and missions on a microservice-based PostgreSQL backend.",
      bullets: [
        [
          "Marketing",
          "Craft CMS + GraphQL - content team self-serve, Optimizely A/B baked in",
        ],
        [
          "Product",
          "Gatsby for Learn & Earn - sponsored-content savings surface",
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
    outcome: {
      num: "03",
      name: "=====",
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
        gallery: "top",
        type: "video",
        src: "/portfolio-assets/blast/blastv3_720.mp4",
        caption: "Blast Website 2019 - VIEW LIVE DEMO",
        autoplay: true,
        href: "https://blast-v3-archive.netlify.app/",
      },
      {
        gallery: "bottom",
        type: "video",
        src: "/portfolio-assets/blast/blastv2_720.mp4",
        caption: "Blast Website 2018 - VIEW LIVE DEMO",
        autoplay: true,
        href: "https://blast-v2-archive.netlify.app/",
      },
    ],
  },

  {
    id: "billabong",
    num: "05",
    company: "Billabong Group International",
    shortName: "Billabong",
    role: "Senior Frontend Engineer",
    year: "2016 - 2018",
    duration: "2 years",
    team: "DTC engineering team",
    location: "Irvine, CA",
    summary:
      "Frontend on Billabong Group's direct-to-consumer team - multi-brand e-commerce platform powering four global surf labels.",
    titleHtml: "One platform, four <em>surf</em> brands.",
    bg: "#f5f0e6",
    ink: "#1a1a1a",
    rule: "#d8d0bc",
    accent: "#e8654f",
    heroBg: "#1e3a4a",
    heroTone: "dark",
    heroVisual: "billabong",
    bodyTone: "light",
    mockup: "billabong",

    problem: {
      num: "01",
      name: "E-commerce Frontend Lead",
      prose:
        "Billabong Group ran multiple brands including Billabong, RVCA, Element, Von Zipper. As a lead frontend engineer I maintained and developed on a shared CakePHP + Tomcat e-commerce codebase with per-brand template overrides. The catalog was massive, the brands had wildly different aesthetics, and the company needed both deep visual differentiation per brand and operational efficiency from the shared platform.",
      bullets: [
        [
          "Platform",
          "CakePHP + Tomcat with per-brand template overrides. jQueery, SCSS, Gulp",
        ],
        ["Brands", "Billabong, RVCA, Element, Von Zipper and more"],
        [
          "A11Y & SEO",
          "WCAG accessibility remediation across the portfolio. SEO + GTM rollout.",
        ],
        [
          "Team",
          "UX Team of DTC (Direct to Consumer) - PM, Designers, 2 Frontend Engineers, shared Backend Team",
        ],
      ],
    },

    approach: {
      num: "02",
      name: "E-commerce Frontend Lead",
      prose:
        "I led a near-complete rebuild of the RVCA site - a label whose visual language was the furthest from the platform default - pushing the override system to its limit. After that, I drove WCAG remediation across all four brands, set up Google Tag Manager and structured-data SEO, and contributed UI updates to Element and Von Zipper.",
      bullets: [
        [
          "Cross-Collab",
          "Worked closely with RVCA stakeholders to understand and implement long-awaited design updates",
        ],
        ["A11Y", "Drove WCAG 2.1 AA remediation across all four brand sites"],
        ["SEO", "Structured data, GTM rollout, Lighthouse-driven perf work"],
      ],
    },

    built: {
      num: "03",
      name: "Fast Seasonal Landing Sites",
      prose:
        "I worked closely with brand teams to quickly build seasonal landing pages: highly interactive experiences used for pushing sales campaigns. This was a test of how quickly good work could be turned around and deployed.",
      bullets: [
        [
          "Neutral Initiative",
          "RVCA's Breakthrough campaign focused on gender identity and acceptance of non-binary individuals - a bold move for a surf brand in 2018",
        ],
        [
          "Billabong Gift Guide",
          "2016 and 2017 gift guides landers to drive seasonal sales",
        ],
        [
          "Measurement",
          "GTM + structured data - portfolio-wide marketing analytics",
        ],
      ],
    },

    outcome: {
      num: "02",
      name: "=====",
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
        gallery: "bottom",
        type: "video",
        src: "/portfolio-assets/billabong/billabong-womens-gift-collection-2016-2017.mp4",
        caption: "Billabong 2016-2017 Gift Guide - VIEW LIVE DEMO",
        autoplay: true,
        href: "https://billabong-archive-womens-gift-guide.netlify.app/beach/",
      },
    ],
  },

  {
    id: "futures",
    num: "06",
    company: "Futures Fins",
    shortName: "Futures Fins",
    role: "Generalist → Web Developer",
    year: "2004 - 2016",
    duration: "12 years",
    team: "Generalist into web lead",
    location: "San Clemente, CA",
    summary:
      "Twelve years at a surf-industry hardgoods manufacturer - generalist engineer who grew with the company into its web development function.",
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
      num: "02",
      name: "=====",
      prose:
        "I joined Futures Fins in 2004 as a young generalist at a fin manufacturer in San Clemente. There was no web team - the company had a basic brochure site and a need to grow into e-commerce as direct-to-consumer became viable for surf hardgoods. Over the next twelve years, I grew with the company.",
      bullets: [
        ["Era", "2004 - pre-React, pre-Node, pre-most-things"],
        [
          "Role",
          'Generalist with web sensibilities - "can you make this work?"',
        ],
        ["Arc", "Brochure site → corporate site → full Magento storefront"],
      ],
    },

    approach: {
      num: "02",
      name: "=====",
      prose:
        "I grew the company's web development function as the need emerged. I built and maintained the corporate site, picked up PHP and SQL as the catalog needs got serious, and led development on the Magento storefront when DTC e-commerce became a strategic priority for the brand.",
      bullets: [
        ["Foundation", "Built and maintained the corporate Futures Fins site"],
        ["Skills", "Self-taught the LAMP stack as the company's needs grew"],
        ["Storefront", "Led development on Magento/PHP e-commerce storefront"],
      ],
    },

    built: {
      num: "02",
      name: "=====",
      prose:
        "The Futures Fins corporate site, the Magento storefront, and twelve years of incremental product launches, team-rider campaigns, and seasonal collection drops. This is where I learned to ship - not at startup-cadence speed, but at the steady cadence of a real business serving real customers.",
      bullets: [
        ["Corporate site", "Built and maintained for over a decade"],
        ["E-commerce", "Magento + PHP storefront - full implementation lead"],
        ["Cadence", "Twelve years of product launches and seasonal campaigns"],
      ],
    },

    outcome: {
      num: "02",
      name: "=====",
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
        gallery: "bottom",
        type: "video",
        src: "/portfolio-assets/futures-fins/futuresfins-2014-catalog.mp4",
        caption: "Futures Fins 2014 Catalog",
        autoplay: true,
        loop: true,
      },
      {
        gallery: "top",
        type: "image",
        src: "/portfolio-assets/futures-fins/futuresfins-2017.png",
        caption: "Futures Fins 2017",
      },
      {
        gallery: "top",
        type: "image",
        src: "/portfolio-assets/futures-fins/futuresfins-2016.png",
        caption: "Futures Fins 2016",
      },
      {
        gallery: "top",
        type: "image",
        src: "/portfolio-assets/futures-fins/futuresfins-2015.png",
        caption: "Futures Fins 2015",
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
    "I'm a software engineer who loves working on web applications.<br/><br/>I'm a full-stack engineer who prefers frontend architecture and technologies, and I enjoy collaborating with designers to create fun, beautiful user interfaces. Of course, you'll also find me building out an API data layer, standing up a backend and deploying to your favorite cloud provider (I spent 4 years with one of them).<br/><br/>For fun, you might find me working on a Twitch or Discord bot project. I do touch grass; I love rock climbing, spending time at the beach with my family and being a late-night gamer with close friends.",
  bottom: [
    { label: "Based in", value: "Orange County, CA" },
    { label: "Owner/Founder", value: "Apex Tech & Baypark Software" },
    {
      label: "Stack",
      value: "TypeScript, React, Frontend Architecture, Java, Python",
    },
    {
      label: "Current Projects",
      value: "Agentic (AI) development, Saas Micro-projects",
    },
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
  headline:
    "<p>Have a product <em>idea</em>?💡</p><br/><p>Want to chat about it? </p>",
  email: "",
  phone: "+19493066000",
  phoneDisplay: "949 · 306 · 6000",
  linkedin: "https://linkedin.com/in/adrian-barnes-software-engineer",
  linkedinHandle: "/in/adrian-barnes-software-engineer",
  location: "Orange County, CA",
  colophon: "",
} as const;
