import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  ArrowRight,
  BadgeCheck,
  CarFront,
  Fuel,
  Gauge,
  KeyRound,
  MapPin,
  Menu,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/core/button";
import { Badge } from "@/components/core/badge";
import { Card, CardContent } from "@/components/layout/card";
import { Display, Heading, Text, Caption } from "@/components/core/typography";
import { Tabs } from "@/components/layout/tabs";
import { FormSelect } from "@/components/form/form-select";
import { DatePicker } from "@/components/form/date-picker";
import { dateSetter, ImagePlaceholder, Section, TemplateFrame } from "./shared";

const meta: Meta = {
  title: "Templates/Car Rental",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

const NAV_LINKS = ["Fleet", "Locations", "Pricing", "Business"];

const LOCATIONS = [
  { value: "sfo", label: "San Francisco — SFO" },
  { value: "lax", label: "Los Angeles — LAX" },
  { value: "sea", label: "Seattle — SEA" },
  { value: "pdx", label: "Portland — PDX" },
];

interface Vehicle {
  name: string;
  klass: string;
  seats: number;
  mpg: string;
  transmission: string;
  perDay: number;
  tag?: string;
}

const VEHICLES: Vehicle[] = [
  { name: "Mazda CX-5", klass: "Compact SUV", seats: 5, mpg: "31 mpg", transmission: "Automatic", perDay: 62, tag: "Most booked" },
  { name: "Tesla Model 3", klass: "Electric Sedan", seats: 5, mpg: "272 mi range", transmission: "Automatic", perDay: 89 },
  { name: "Toyota Sienna", klass: "Minivan", seats: 7, mpg: "36 mpg", transmission: "Automatic", perDay: 104 },
  { name: "Ford Bronco", klass: "Off-road SUV", seats: 4, mpg: "21 mpg", transmission: "4WD", perDay: 128, tag: "New" },
  { name: "Volkswagen Golf", klass: "Hatchback", seats: 5, mpg: "34 mpg", transmission: "Manual", perDay: 48 },
  { name: "BMW 4 Series", klass: "Convertible", seats: 4, mpg: "26 mpg", transmission: "Automatic", perDay: 156 },
];

const GUARANTEES = [
  { icon: ShieldCheck, title: "Insurance included", body: "Collision damage waiver and liability cover are in the headline price, not bolted on at the counter." },
  { icon: KeyRound, title: "Skip the desk", body: "Unlock the car from your phone. The key card is in the glovebox if you would rather drive it the old way." },
  { icon: BadgeCheck, title: "Free cancellation", body: "Cancel up to 24 hours before pickup and the hold drops off your card the same day." },
];

const STEPS = [
  { n: "01", title: "Pick your window", body: "Choose a branch and the dates. Live availability, no phantom inventory." },
  { n: "02", title: "Choose the car", body: "The exact model you see is the model you get — never 'or similar'." },
  { n: "03", title: "Drive off", body: "Licence scan happens in the app. Walk straight to the bay." },
];

const REVIEWS = [
  { name: "Priya Raman", trip: "SFO → Big Sur, 4 days", quote: "Landed at 11pm and was on the road in six minutes. No queue, no upsell script." },
  { name: "Marcus Webb", trip: "Seattle, 2 weeks", quote: "Swapped from a sedan to a van mid-booking without a fee. That never happens." },
  { name: "Elena Fischer", trip: "LAX → Joshua Tree", quote: "Price at checkout matched the price on the search page exactly. Bar is low, but they cleared it." },
];

function TopNav() {
  return (
    <header className="sticky top-0 z-[var(--z-sticky)] border-b border-[var(--color-border)] bg-[var(--color-canvas)]/85 backdrop-blur">
      <Section className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent-500)]">
            <CarFront className="h-4 w-4 text-[var(--color-on-accent)]" />
          </span>
          <span className="text-base font-semibold tracking-[var(--tracking-tight)] text-[var(--color-ink)]">
            Driftline
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
          <Button size="sm">Book a car</Button>
          <Button variant="ghost" size="icon" aria-label="Open menu" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </Section>
    </header>
  );
}

function BookingBar() {
  const [pickup, setPickup] = React.useState("sfo");
  const [from, setFrom] = React.useState("2026-09-18");
  const [until, setUntil] = React.useState("2026-09-22");

  return (
    <Card className="shadow-[var(--shadow-lg)]">
      <CardContent className="grid gap-4 p-5 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-end">
        <FormSelect
          label="Pick-up location"
          value={pickup}
          onValueChange={setPickup}
          options={LOCATIONS}
        />
        <DatePicker label="From" value={from} onChange={dateSetter(setFrom)} />
        <DatePicker label="Until" value={until} onChange={dateSetter(setUntil)} />
        <Button size="lg" className="w-full md:w-auto">
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
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div className="flex flex-col items-start gap-5">
          <Badge variant="accent">
            <MapPin className="h-3 w-3" />
            42 branches on the West Coast
          </Badge>

          <Display as="h1" size="lg" className="max-w-[15ch]">
            Rent the car you actually picked.
          </Display>

          <Text size="lg" tone="muted" className="max-w-[52ch]">
            No &ldquo;or similar&rdquo;. No counter queue. No surprise line items when you
            hand the keys back. Insurance, mileage and a second driver are in the price
            you first see.
          </Text>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button size="lg">Find a car</Button>
            <Button size="lg" variant="outline">
              How it works
            </Button>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <div className="flex" aria-hidden>
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="h-4 w-4 fill-[var(--color-accent-500)] text-[var(--color-accent-500)]"
                />
              ))}
            </div>
            <Caption>4.8 average across 12,400 rentals</Caption>
          </div>
        </div>

        <ImagePlaceholder
          label="Hero — fleet photography"
          className="aspect-[4/3] w-full lg:aspect-[5/4]"
        />
      </div>

      <div className="pt-10">
        <BookingBar />
      </div>
    </Section>
  );
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const specs = [
    { icon: Users, value: `${vehicle.seats} seats` },
    { icon: Fuel, value: vehicle.mpg },
    { icon: Gauge, value: vehicle.transmission },
  ];

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-[var(--duration-base)] hover:shadow-[var(--shadow-lg)]">
      <div className="relative">
        <ImagePlaceholder
          className="aspect-[16/10] rounded-none border-0 border-b border-[var(--color-border)]"
          tint="neutral"
        />
        {vehicle.tag && (
          <Badge variant="accent" className="absolute left-3 top-3">
            {vehicle.tag}
          </Badge>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex flex-col gap-1">
          <Heading level={4} as="h3">
            {vehicle.name}
          </Heading>
          <Caption>{vehicle.klass}</Caption>
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
            <span className="text-2xl font-semibold text-[var(--color-ink)]">
              ${vehicle.perDay}
            </span>
            <Caption className="ml-1">/ day</Caption>
          </div>
          <Button size="sm" variant="outline">
            Reserve
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function FleetGrid({ filter }: { filter?: (vehicle: Vehicle) => boolean }) {
  const shown = filter ? VEHICLES.filter(filter) : VEHICLES;

  return (
    <div className="grid gap-5 pt-6 sm:grid-cols-2 lg:grid-cols-3">
      {shown.map((vehicle) => (
        <VehicleCard key={vehicle.name} vehicle={vehicle} />
      ))}
    </div>
  );
}

function Fleet() {
  return (
    <Section className="py-16 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4 pb-6">
        <div className="flex flex-col gap-2">
          <Heading level={2}>The fleet</Heading>
          <Text tone="muted">Every car under three years old. Serviced between rentals.</Text>
        </div>
        <Button variant="link">
          See all 40 models
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <Tabs
        variant="pill"
        defaultValue="all"
        items={[
          { value: "all", label: "All", content: <FleetGrid /> },
          { value: "suv", label: "SUV", content: <FleetGrid filter={(v) => v.klass.includes("SUV")} /> },
          { value: "electric", label: "Electric", content: <FleetGrid filter={(v) => v.klass.includes("Electric")} /> },
          { value: "family", label: "Family", content: <FleetGrid filter={(v) => v.seats >= 7} /> },
        ]}
      />
    </Section>
  );
}

function Guarantees() {
  return (
    <div className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
      <Section className="grid gap-8 py-14 md:grid-cols-3">
        {GUARANTEES.map((item) => (
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

function HowItWorks() {
  return (
    <Section className="py-16 md:py-20">
      <Heading level={2} className="pb-8">
        Three steps, six minutes
      </Heading>
      <div className="grid gap-6 md:grid-cols-3">
        {STEPS.map((step) => (
          <div
            key={step.n}
            className="flex flex-col gap-3 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-elevated)] p-6"
          >
            <span className="font-[var(--font-mono)] text-sm text-[var(--color-accent-600)]">
              {step.n}
            </span>
            <Heading level={4} as="h3">
              {step.title}
            </Heading>
            <Text size="sm" tone="muted">
              {step.body}
            </Text>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Reviews() {
  return (
    <div className="bg-[var(--color-surface)]">
      <Section className="py-16 md:py-20">
        <Heading level={2} className="pb-8">
          What drivers say
        </Heading>
        <div className="grid gap-5 md:grid-cols-3">
          {REVIEWS.map((review) => (
            <Card key={review.name}>
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className="h-3.5 w-3.5 fill-[var(--color-accent-500)] text-[var(--color-accent-500)]"
                    />
                  ))}
                </div>
                <Text size="sm">&ldquo;{review.quote}&rdquo;</Text>
                <div className="mt-auto border-t border-[var(--color-border)] pt-4">
                  <Text size="sm" weight="medium">
                    {review.name}
                  </Text>
                  <Caption>{review.trip}</Caption>
                </div>
              </CardContent>
            </Card>
          ))}
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
          Your car is waiting at the airport.
        </Heading>
        <Text className="max-w-[46ch] text-[var(--color-on-accent)]/85">
          Free cancellation on every booking. Reserve now, decide later.
        </Text>
        <Button
          size="lg"
          className="bg-[var(--color-elevated)] text-[var(--color-ink)] hover:bg-[var(--color-surface)]"
        >
          Check availability
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </Section>
  );
}

function Footer() {
  const columns = [
    { title: "Company", links: ["About", "Careers", "Press", "Partners"] },
    { title: "Rentals", links: ["Fleet", "Locations", "Long-term", "Business"] },
    { title: "Support", links: ["Help centre", "Damage policy", "Insurance", "Contact"] },
  ];

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <Section className="grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent-500)]">
              <CarFront className="h-3.5 w-3.5 text-[var(--color-on-accent)]" />
            </span>
            <span className="font-semibold text-[var(--color-ink)]">Driftline</span>
          </div>
          <Caption>Car rental without the counter. West Coast, USA.</Caption>
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
          <Caption>© 2026 Driftline Mobility Inc.</Caption>
          <Caption>Privacy · Terms · Cookies</Caption>
        </Section>
      </div>
    </footer>
  );
}

export const LandingPage: Story = {
  render: () => (
    <TemplateFrame theme="drift">
      <TopNav />
      <Hero />
      <Guarantees />
      <Fleet />
      <HowItWorks />
      <Reviews />
      <ClosingCta />
      <Footer />
    </TemplateFrame>
  ),
};
