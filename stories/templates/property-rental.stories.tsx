import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  ArrowRight,
  Bath,
  BedDouble,
  CalendarDays,
  Heart,
  Home,
  Maximize,
  Menu,
  PawPrint,
  ShieldCheck,
  Sparkles,
  Star,
  Trees,
  Waves,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/core/button";
import { Badge } from "@/components/core/badge";
import { Card, CardContent } from "@/components/layout/card";
import { Display, Heading, Text, Caption } from "@/components/core/typography";
import { SearchBar } from "@/components/core/search-bar";
import { DatePicker } from "@/components/form/date-picker";
import { NumberInput } from "@/components/core/number-input";
import { Tabs } from "@/components/layout/tabs";
import { Avatar } from "@/components/core/avatar";
import { dateSetter, ImagePlaceholder, Section, TemplateFrame } from "./shared";

const meta: Meta = {
  title: "Templates/Property Rental",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

const NAV_LINKS = ["Stays", "Experiences", "Long lets", "Become a host"];

interface Property {
  name: string;
  place: string;
  beds: number;
  baths: number;
  sqm: number;
  perNight: number;
  rating: number;
  reviews: number;
  region: "coast" | "city" | "country";
  tag?: string;
}

const PROPERTIES: Property[] = [
  { name: "The Sail House", place: "Salcombe, Devon", beds: 4, baths: 2, sqm: 165, perNight: 320, rating: 4.94, reviews: 128, region: "coast", tag: "Guest favourite" },
  { name: "Warehouse No. 6", place: "Shoreditch, London", beds: 2, baths: 2, sqm: 98, perNight: 245, rating: 4.81, reviews: 212, region: "city" },
  { name: "Cwm Farm Barn", place: "Brecon Beacons", beds: 5, baths: 3, sqm: 210, perNight: 285, rating: 4.97, reviews: 76, region: "country", tag: "Rare find" },
  { name: "Gull Cottage", place: "St Ives, Cornwall", beds: 3, baths: 1, sqm: 112, perNight: 195, rating: 4.88, reviews: 341, region: "coast" },
  { name: "The Print Works", place: "Manchester", beds: 1, baths: 1, sqm: 64, perNight: 140, rating: 4.72, reviews: 189, region: "city" },
  { name: "Fellside Lodge", place: "Ambleside, Cumbria", beds: 4, baths: 3, sqm: 178, perNight: 265, rating: 4.91, reviews: 154, region: "country" },
];

const AMENITIES = [
  { icon: Wifi, label: "Fast wifi, checked" },
  { icon: PawPrint, label: "Dogs welcome" },
  { icon: Waves, label: "Sea views" },
  { icon: Trees, label: "Private garden" },
];

const ASSURANCES = [
  { icon: ShieldCheck, title: "Every home visited", body: "A member of our team has stayed in every property on this site. If the photos flatter it, it does not list." },
  { icon: CalendarDays, title: "Flexible to 48 hours", body: "Plans change. Cancel up to two days before arrival and the refund is automatic — no email chain." },
  { icon: Sparkles, title: "Cleaned to a checklist", body: "The same 60-point standard everywhere, photographed after each turnaround." },
];

const HOST_STATS = [
  { value: "£1,840", label: "Median monthly earnings" },
  { value: "11 days", label: "Average time to first booking" },
  { value: "3%", label: "Flat host fee, all in" },
];

function TopNav() {
  return (
    <header className="sticky top-0 z-[var(--z-sticky)] border-b border-[var(--color-border)] bg-[var(--color-canvas)]/85 backdrop-blur">
      <Section className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent-500)]">
            <Home className="h-4 w-4 text-[var(--color-on-accent)]" />
          </span>
          <span className="text-base font-semibold tracking-[var(--tracking-tight)] text-[var(--color-ink)]">
            Haven &amp; Co
          </span>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Button key={link} variant="ghost" size="sm">
              {link}
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
            Sign in
          </Button>
          <Button size="sm">List your place</Button>
          <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </Section>
    </header>
  );
}

function SearchPanel() {
  const [where, setWhere] = React.useState("");
  const [arrive, setArrive] = React.useState("2026-09-18");
  const [leave, setLeave] = React.useState("2026-09-25");
  const [guests, setGuests] = React.useState<number | string>(2);

  return (
    <Card className="shadow-[var(--shadow-lg)]">
      <CardContent className="grid gap-4 p-5 lg:grid-cols-[1.5fr_1fr_1fr_0.8fr_auto] lg:items-end">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="where"
            className="text-sm font-medium text-[var(--color-ink)]"
          >
            Where
          </label>
          <SearchBar
            id="where"
            value={where}
            onSearch={setWhere}
            placeholder="Cornwall, the Lakes, anywhere…"
          />
        </div>
        <DatePicker label="Arrive" value={arrive} onChange={dateSetter(setArrive)} />
        <DatePicker label="Leave" value={leave} onChange={dateSetter(setLeave)} />
        <NumberInput label="Guests" value={guests} onChange={setGuests} min={1} max={16} />
        <Button size="lg" className="w-full lg:w-auto">
          Search
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

function Hero() {
  return (
    <Section className="pb-8 pt-14 md:pt-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="flex flex-col items-start gap-5">
          <Badge variant="accent">
            <Star className="h-3 w-3" />
            2,300 homes, every one of them visited
          </Badge>

          <Display as="h1" size="lg" className="max-w-[16ch]">
            Somewhere worth staying put.
          </Display>

          <Text size="lg" tone="muted" className="max-w-[52ch]">
            Coastal cottages, city warehouses and farmhouses with the wood already
            chopped. No resort fees, no cleaning surcharge bolted on at checkout —
            the nightly rate is the rate.
          </Text>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button size="lg">Browse homes</Button>
            <Button size="lg" variant="outline">
              How hosting works
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ImagePlaceholder label="Coastal" className="col-span-2 aspect-[16/10]" />
          <ImagePlaceholder className="aspect-square" tint="neutral" />
          <ImagePlaceholder className="aspect-square" tint="neutral" />
        </div>
      </div>

      <div className="pt-10">
        <SearchPanel />
      </div>
    </Section>
  );
}

function PropertyCard({ property }: { property: Property }) {
  const specs = [
    { icon: BedDouble, value: `${property.beds} beds` },
    { icon: Bath, value: `${property.baths} baths` },
    { icon: Maximize, value: `${property.sqm} m²` },
  ];

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-shadow duration-[var(--duration-base)] hover:shadow-[var(--shadow-lg)]">
      <div className="relative">
        <ImagePlaceholder className="aspect-[4/3] rounded-none border-0 border-b border-[var(--color-border)]" />
        {property.tag && (
          <Badge variant="accent" className="absolute left-3 top-3">
            {property.tag}
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Save ${property.name}`}
          className="absolute right-2 top-2 bg-[var(--color-elevated)]/80 backdrop-blur hover:bg-[var(--color-elevated)]"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Heading level={4} as="h3" className="truncate">
              {property.name}
            </Heading>
            <Caption>{property.place}</Caption>
          </div>
          <span className="flex shrink-0 items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-[var(--color-accent-500)] text-[var(--color-accent-500)]" />
            <span className="font-medium text-[var(--color-ink)]">{property.rating}</span>
            <Caption>({property.reviews})</Caption>
          </span>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {specs.map((spec) => (
            <span
              key={spec.value}
              className="flex items-center gap-1.5 text-xs text-[var(--color-subtle)]"
            >
              <spec.icon className="h-3.5 w-3.5" />
              {spec.value}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-end justify-between border-t border-[var(--color-border)] pt-4">
          <div>
            <span className="text-xl font-semibold text-[var(--color-ink)]">
              £{property.perNight}
            </span>
            <Caption className="ml-1">/ night</Caption>
          </div>
          <Button size="sm" variant="outline">
            View home
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function PropertyGrid({ region }: { region?: Property["region"] }) {
  const shown = region ? PROPERTIES.filter((p) => p.region === region) : PROPERTIES;

  return (
    <div className="grid gap-5 pt-6 sm:grid-cols-2 lg:grid-cols-3">
      {shown.map((property) => (
        <PropertyCard key={property.name} property={property} />
      ))}
    </div>
  );
}

function Listings() {
  return (
    <Section className="py-16 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-6">
        <div className="flex flex-col gap-2">
          <Heading level={2}>Homes people come back to</Heading>
          <Text tone="muted">Sorted by repeat bookings, not by who paid for placement.</Text>
        </div>
        <Button variant="link">
          See all homes
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <Tabs
        variant="pill"
        defaultValue="all"
        items={[
          { value: "all", label: "All", content: <PropertyGrid /> },
          { value: "coast", label: "Coastal", content: <PropertyGrid region="coast" /> },
          { value: "city", label: "City", content: <PropertyGrid region="city" /> },
          { value: "country", label: "Countryside", content: <PropertyGrid region="country" /> },
        ]}
      />

      <div className="flex flex-wrap gap-3 pt-8">
        {AMENITIES.map((amenity) => (
          <span
            key={amenity.label}
            className="flex items-center gap-2 rounded-[var(--radius-full)] border border-[var(--color-border)] bg-[var(--color-elevated)] px-4 py-2 text-sm text-[var(--color-base)]"
          >
            <amenity.icon className="h-4 w-4 text-[var(--color-accent-600)]" />
            {amenity.label}
          </span>
        ))}
      </div>
    </Section>
  );
}

function Assurances() {
  return (
    <div className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
      <Section className="grid gap-8 py-14 md:grid-cols-3">
        {ASSURANCES.map((item) => (
          <div key={item.title} className="flex flex-col gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent-100)]">
              <item.icon className="h-5 w-5 text-[var(--color-accent-700)]" />
            </span>
            <Heading level={4} as="h3">
              {item.title}
            </Heading>
            <Text size="sm" tone="muted">
              {item.body}
            </Text>
          </div>
        ))}
      </Section>
    </div>
  );
}

function HostSplit() {
  return (
    <Section className="py-16 md:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <ImagePlaceholder
          label="Host portrait"
          className="aspect-[4/3] w-full"
          tint="neutral"
        />

        <div className="flex flex-col items-start gap-5">
          <Badge variant="accent">For hosts</Badge>
          <Heading level={2} className="max-w-[18ch]">
            Let the spare cottage pay for itself.
          </Heading>
          <Text tone="muted" className="max-w-[52ch]">
            We photograph the place, write the listing, set the pricing calendar and
            handle the guest messages. You approve the bookings and keep the keys.
          </Text>

          <div className="grid w-full gap-4 sm:grid-cols-3">
            {HOST_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="text-2xl font-semibold text-[var(--color-ink)]">
                  {stat.value}
                </span>
                <Caption>{stat.label}</Caption>
              </div>
            ))}
          </div>

          <Button size="lg">
            Estimate your earnings
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Section>
  );
}

function GuestNote() {
  return (
    <div className="bg-[var(--color-surface)]">
      <Section className="flex flex-col items-center gap-6 py-16 text-center md:py-20">
        <div className="flex" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="h-4 w-4 fill-[var(--color-accent-500)] text-[var(--color-accent-500)]"
            />
          ))}
        </div>
        <Text size="lg" className="max-w-[62ch]">
          &ldquo;Third year running at the same barn. The owner leaves a note about which
          walks are muddy that week. That is the whole difference between a rental and a
          place you look forward to.&rdquo;
        </Text>
        <div className="flex items-center gap-3">
          <Avatar fallback="Ruth Ellery" size="sm" />
          <div className="text-left">
            <Text size="sm" weight="medium">
              Ruth Ellery
            </Text>
            <Caption>Cwm Farm Barn, Brecon Beacons</Caption>
          </div>
        </div>
      </Section>
    </div>
  );
}

function ClosingCta() {
  return (
    <Section className="py-16 md:py-20">
      <div className="flex flex-col items-center gap-5 rounded-[var(--radius-lg)] bg-[var(--color-accent-500)] px-6 py-14 text-center">
        <Heading level={2} className="max-w-[20ch] text-[var(--color-on-accent)]">
          The good weeks book by February.
        </Heading>
        <Text className="max-w-[48ch] text-[var(--color-on-accent)]/85">
          Hold a date now, free cancellation up to 48 hours before you arrive.
        </Text>
        <Button
          size="lg"
          className="bg-[var(--color-elevated)] text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
        >
          Find a home
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Section>
  );
}

function Footer() {
  const columns = [
    { title: "Stays", links: ["Coastal", "City", "Countryside", "Long lets", "Last minute"] },
    { title: "Hosting", links: ["List your place", "Host guarantee", "Pricing tool", "Resources"] },
    { title: "Company", links: ["About", "Careers", "Press", "Sustainability", "Contact"] },
  ];

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <Section className="grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent-500)]">
              <Home className="h-3.5 w-3.5 text-[var(--color-on-accent)]" />
            </span>
            <span className="font-semibold text-[var(--color-ink)]">Haven &amp; Co</span>
          </div>
          <Caption>Holiday homes across the UK. Registered in England, no. 11248390.</Caption>
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
          <Caption>© 2026 Haven &amp; Co</Caption>
          <Caption>Privacy · Terms · Cookies · Modern slavery statement</Caption>
        </Section>
      </div>
    </footer>
  );
}

export const LandingPage: Story = {
  render: () => (
    <TemplateFrame theme="haven">
      <TopNav />
      <Hero />
      <Assurances />
      <Listings />
      <HostSplit />
      <GuestNote />
      <ClosingCta />
      <Footer />
    </TemplateFrame>
  ),
};
