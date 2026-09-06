import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  ArrowRight,
  Blocks,
  Check,
  GitBranch,
  LineChart,
  Lock,
  Menu,
  Minus,
  Play,
  Quote,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { Button } from "@/components/core/button";
import { Badge } from "@/components/core/badge";
import { Card, CardContent } from "@/components/layout/card";
import { Display, Heading, Text, Caption } from "@/components/core/typography";
import { Toggle } from "@/components/core/toggle";
import { Avatar } from "@/components/core/avatar";
import { Tabs } from "@/components/layout/tabs";
import { ImagePlaceholder, Section, TemplateFrame } from "./shared";

const meta: Meta = {
  title: "Templates/SaaS",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

const NAV_LINKS = ["Product", "Integrations", "Docs", "Pricing", "Changelog"];

const LOGOS = ["Northwind", "Ravel", "Corebase", "Tandem", "Upsilon", "Meridian"];

const FEATURES = [
  {
    icon: Workflow,
    title: "Pipelines that read like sentences",
    body: "Describe the flow once in plain YAML. Cadence works out the dependency graph, the retries and the concurrency limits.",
  },
  {
    icon: LineChart,
    title: "Metrics on by default",
    body: "Every step emits duration, error rate and throughput without a single line of instrumentation code.",
  },
  {
    icon: GitBranch,
    title: "Branch-aware environments",
    body: "Open a PR and get an isolated stack with seeded data. It tears itself down when the branch merges.",
  },
  {
    icon: Lock,
    title: "SOC 2 Type II",
    body: "Audit logs on every mutation, SSO and SCIM on every plan, and data residency in five regions.",
  },
  {
    icon: Blocks,
    title: "120+ connectors",
    body: "Postgres, Snowflake, Kafka, Stripe, Segment. Write your own in about forty lines of TypeScript.",
  },
  {
    icon: Zap,
    title: "Cold start under 200ms",
    body: "Workers stay warm across runs, so a scheduled job fires on the second, not thirty seconds later.",
  },
];

interface Plan {
  name: string;
  blurb: string;
  monthly: number | null;
  features: string[];
  featured?: boolean;
  cta: string;
}

const PLANS: Plan[] = [
  {
    name: "Starter",
    blurb: "For solo builders shipping their first pipeline.",
    monthly: 0,
    features: ["3 concurrent runs", "7-day log retention", "Community Slack", "1 environment"],
    cta: "Start free",
  },
  {
    name: "Team",
    blurb: "For teams that ship every day and need the graph to hold.",
    monthly: 40,
    features: [
      "Unlimited runs",
      "90-day log retention",
      "Branch environments",
      "SSO + SCIM",
      "Priority support",
    ],
    featured: true,
    cta: "Start 14-day trial",
  },
  {
    name: "Enterprise",
    blurb: "For regulated orgs with procurement and a security review.",
    monthly: null,
    features: [
      "Everything in Team",
      "Data residency",
      "Private networking",
      "99.95% uptime SLA",
      "Named support engineer",
    ],
    cta: "Talk to sales",
  },
];

const COMPARISON = [
  { capability: "Concurrent runs", starter: "3", team: "Unlimited", enterprise: "Unlimited" },
  { capability: "Log retention", starter: "7 days", team: "90 days", enterprise: "Custom" },
  { capability: "Branch environments", starter: false, team: true, enterprise: true },
  { capability: "SSO + SCIM", starter: false, team: true, enterprise: true },
  { capability: "Data residency", starter: false, team: false, enterprise: true },
  { capability: "Uptime SLA", starter: false, team: "99.9%", enterprise: "99.95%" },
];

const TESTIMONIALS = [
  {
    quote:
      "We deleted about 4,000 lines of orchestration glue the week we moved. The retry semantics alone paid for the seat cost.",
    name: "Dana Okoye",
    role: "Staff Engineer, Corebase",
  },
  {
    quote:
      "Branch environments changed how we review. Reviewers click a link and see the pipeline actually run against real shapes of data.",
    name: "Tomas Lindqvist",
    role: "Platform Lead, Ravel",
  },
];

const FAQS = [
  {
    q: "How is a run counted?",
    a: "A run is one execution of one pipeline, however many steps it contains. Retries of a failed step do not count as new runs.",
  },
  {
    q: "Can we self-host?",
    a: "Enterprise plans can run the worker plane in your own VPC while the control plane stays managed. The data never leaves your network.",
  },
  {
    q: "What happens when the trial ends?",
    a: "The workspace drops to Starter limits. Nothing is deleted, and pipelines above the limit are paused rather than failed.",
  },
  {
    q: "Do you offer startup pricing?",
    a: "Companies under 20 people and under $5M raised get Team at 50% for the first year. Apply from the billing page.",
  },
];

function TopNav() {
  return (
    <header className="sticky top-0 z-[var(--z-sticky)] border-b border-[var(--color-border)] bg-[var(--color-canvas)]/85 backdrop-blur">
      <Section className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent-500)]">
              <Workflow className="h-4 w-4 text-[var(--color-on-accent)]" />
            </span>
            <span className="text-base font-semibold tracking-[var(--tracking-tight)] text-[var(--color-ink)]">
              Cadence
            </span>
          </div>
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Button key={link} variant="ghost" size="sm">
                {link}
              </Button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button size="sm">Start free</Button>
          <Button variant="ghost" size="icon" aria-label="Open menu" className="lg:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </Section>
    </header>
  );
}

function Hero() {
  return (
    <Section className="flex flex-col items-center gap-6 py-16 text-center md:py-24">
      <Badge variant="accent">
        <Sparkles className="h-3 w-3" />
        Cadence 3.0 — durable execution is live
      </Badge>

      <Display as="h1" size="lg" className="max-w-[18ch]">
        Data pipelines that survive contact with production.
      </Display>

      <Text size="lg" tone="muted" className="max-w-[58ch]">
        Define a workflow once. Cadence handles retries, backpressure, versioning and
        observability — so a bad afternoon upstream stops being a bad week for you.
      </Text>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="lg">
          Start free
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Button size="lg" variant="outline">
          <Play className="h-4 w-4" />
          Watch the 3-min tour
        </Button>
      </div>

      <Caption>No credit card · 5,000 free runs a month · SOC 2 Type II</Caption>

      <ImagePlaceholder
        label="Product screenshot — pipeline graph"
        className="mt-6 aspect-[16/9] w-full shadow-[var(--shadow-lg)]"
      />
    </Section>
  );
}

function LogoWall() {
  return (
    <div className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
      <Section className="flex flex-col items-center gap-6 py-10">
        <Caption>Running production workloads at</Caption>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {LOGOS.map((logo) => (
            <span
              key={logo}
              className="text-lg font-semibold tracking-[var(--tracking-tight)] text-[var(--color-muted)]"
            >
              {logo}
            </span>
          ))}
        </div>
      </Section>
    </div>
  );
}

function Features() {
  return (
    <Section className="py-16 md:py-24">
      <div className="flex max-w-[46ch] flex-col gap-3 pb-10">
        <Heading level={2}>Everything the runbook used to cover</Heading>
        <Text tone="muted">
          The parts of a data platform nobody wants to own, owned for you.
        </Text>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <Card key={feature.title} className="h-full">
            <CardContent className="flex flex-col gap-3 p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent-100)]">
                <feature.icon className="h-5 w-5 text-[var(--color-accent-700)]" />
              </span>
              <Heading level={4} as="h3">
                {feature.title}
              </Heading>
              <Text size="sm" tone="muted">
                {feature.body}
              </Text>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function PlanCard({ plan, annual }: { plan: Plan; annual: boolean }) {
  const price =
    plan.monthly === null ? null : annual ? Math.round(plan.monthly * 0.8) : plan.monthly;

  return (
    <Card
      className={
        plan.featured
          ? "relative h-full border-[var(--color-accent-500)] shadow-[var(--shadow-lg)]"
          : "h-full"
      }
    >
      {plan.featured && (
        <Badge variant="accent" className="absolute -top-3 left-6">
          Most popular
        </Badge>
      )}

      <CardContent className="flex h-full flex-col gap-5 p-6">
        <div className="flex flex-col gap-2">
          <Heading level={4} as="h3">
            {plan.name}
          </Heading>
          <Text size="sm" tone="muted">
            {plan.blurb}
          </Text>
        </div>

        <div className="flex items-end gap-1.5">
          {price === null ? (
            <span className="text-3xl font-semibold text-[var(--color-ink)]">Custom</span>
          ) : (
            <>
              <span className="text-4xl font-semibold text-[var(--color-ink)]">${price}</span>
              <Caption className="pb-1.5">/ user / month</Caption>
            </>
          )}
        </div>

        <Button variant={plan.featured ? "primary" : "outline"} className="w-full">
          {plan.cta}
        </Button>

        <ul className="flex flex-col gap-2.5 border-t border-[var(--color-border)] pt-5">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-accent-600)]" />
              <Text size="sm">{feature}</Text>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

/** `true`/`false` render as icons; a string renders as-is. */
function ComparisonValue({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="mx-auto h-4 w-4 text-[var(--color-accent-600)]" />;
  if (value === false) return <Minus className="mx-auto h-4 w-4 text-[var(--color-muted)]" />;
  return <span className="text-sm text-[var(--color-base)]">{value}</span>;
}

function ComparisonTable() {
  return (
    <div className="overflow-x-auto pt-4">
      <table className="w-full min-w-[560px] border-collapse">
        <thead>
          <tr className="border-b border-[var(--color-border)]">
            <th className="p-3 text-left text-sm font-medium text-[var(--color-ink)]">
              Capability
            </th>
            {["Starter", "Team", "Enterprise"].map((column) => (
              <th
                key={column}
                className="p-3 text-center text-sm font-medium text-[var(--color-ink)]"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((row) => (
            <tr key={row.capability} className="border-b border-[var(--color-border)]">
              <td className="p-3 text-sm text-[var(--color-base)]">{row.capability}</td>
              <td className="p-3 text-center">
                <ComparisonValue value={row.starter} />
              </td>
              <td className="p-3 text-center">
                <ComparisonValue value={row.team} />
              </td>
              <td className="p-3 text-center">
                <ComparisonValue value={row.enterprise} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Pricing() {
  const [annual, setAnnual] = React.useState(true);

  return (
    <div className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
      <Section className="py-16 md:py-24">
        <div className="flex flex-col items-center gap-4 pb-10 text-center">
          <Heading level={2}>Pricing that stops at the seat</Heading>
          <Text tone="muted" className="max-w-[50ch]">
            No per-run metering, no egress surprises. Add a teammate, pay for a teammate.
          </Text>

          <div className="flex items-center gap-3 pt-2">
            <Text size="sm" tone={annual ? "muted" : "default"}>
              Monthly
            </Text>
            <Toggle checked={annual} onCheckedChange={setAnnual} aria-label="Bill annually" />
            <Text size="sm" tone={annual ? "default" : "muted"}>
              Annual
            </Text>
            <Badge variant="success">Save 20%</Badge>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard key={plan.name} plan={plan} annual={annual} />
          ))}
        </div>

        <div className="pt-12">
          <Heading level={3} className="pb-2">
            Compare plans
          </Heading>
          <ComparisonTable />
        </div>
      </Section>
    </div>
  );
}

function Testimonials() {
  return (
    <Section className="grid gap-5 py-16 md:grid-cols-2 md:py-24">
      {TESTIMONIALS.map((testimonial) => (
        <Card key={testimonial.name}>
          <CardContent className="flex h-full flex-col gap-5 p-7">
            <Quote className="h-6 w-6 text-[var(--color-accent-300)]" />
            <Text size="lg" className="flex-1">
              {testimonial.quote}
            </Text>
            <div className="flex items-center gap-3 border-t border-[var(--color-border)] pt-5">
              <Avatar fallback={testimonial.name} size="sm" />
              <div>
                <Text size="sm" weight="medium">
                  {testimonial.name}
                </Text>
                <Caption>{testimonial.role}</Caption>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </Section>
  );
}

function Faq() {
  return (
    <Section className="pb-20">
      <Heading level={2} className="pb-8">
        Questions people actually ask
      </Heading>
      <Tabs
        variant="line"
        defaultValue={FAQS[0].q}
        items={FAQS.map((faq) => ({
          value: faq.q,
          label: faq.q,
          content: (
            <Text tone="muted" className="max-w-[64ch] pt-5">
              {faq.a}
            </Text>
          ),
        }))}
        listClassName="flex-wrap"
      />
    </Section>
  );
}

function ClosingCta() {
  return (
    <div className="bg-[var(--color-accent-500)]">
      <Section className="flex flex-col items-center gap-5 py-16 text-center md:py-20">
        <Heading level={2} className="max-w-[22ch] text-[var(--color-on-accent)]">
          Put the 3am pager back in the drawer.
        </Heading>
        <Text className="max-w-[50ch] text-[var(--color-on-accent)]/85">
          Import an existing DAG and run it side by side with what you have today.
          Most teams cut over in an afternoon.
        </Text>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            className="bg-[var(--color-elevated)] text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
          >
            Start free
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-[var(--color-on-accent)]/30 bg-transparent text-[var(--color-on-accent)] hover:border-[var(--color-on-accent)]/60 hover:bg-[var(--color-on-accent)]/10"
          >
            Book a demo
          </Button>
        </div>
      </Section>
    </div>
  );
}

function Footer() {
  const columns = [
    { title: "Product", links: ["Overview", "Integrations", "Changelog", "Roadmap", "Status"] },
    { title: "Developers", links: ["Docs", "API reference", "SDKs", "Examples"] },
    { title: "Company", links: ["About", "Blog", "Careers", "Security", "Contact"] },
  ];

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <Section className="grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent-500)]">
              <Workflow className="h-3.5 w-3.5 text-[var(--color-on-accent)]" />
            </span>
            <span className="font-semibold text-[var(--color-ink)]">Cadence</span>
          </div>
          <Caption>Durable execution for data teams. Built in Lisbon and Toronto.</Caption>
        </div>

        {columns.map((column) => (
          <div key={column.title} className="flex flex-col gap-3">
            <Text size="sm" weight="medium">
              {column.title}
            </Text>
            {column.links.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-[var(--color-subtle)] transition-colors duration-[var(--duration-fast)] hover:text-[var(--color-ink)]"
              >
                {link}
              </a>
            ))}
          </div>
        ))}
      </Section>

      <div className="border-t border-[var(--color-border)]">
        <Section className="flex flex-wrap items-center justify-between gap-3 py-5">
          <Caption>© 2026 Cadence Labs</Caption>
          <Caption>Privacy · Terms · DPA · Sub-processors</Caption>
        </Section>
      </div>
    </footer>
  );
}

export const LandingPage: Story = {
  render: () => (
    <TemplateFrame theme="cadence">
      <TopNav />
      <Hero />
      <LogoWall />
      <Features />
      <Pricing />
      <Testimonials />
      <Faq />
      <ClosingCta />
      <Footer />
    </TemplateFrame>
  ),
};
