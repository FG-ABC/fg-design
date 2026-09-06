import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  ArrowUpRight,
  Bell,
  CreditCard,
  Download,
  LayoutDashboard,
  LifeBuoy,
  Receipt,
  Repeat,
  Search,
  Settings,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import {
  Sidebar,
  SidebarItem,
  SidebarSection,
  SidebarLabel,
  SidebarTrigger,
} from "@/components/layout/sidebar";
import { Button } from "@/components/core/button";
import { Badge } from "@/components/core/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/layout/card";
import { Heading, Text, Caption } from "@/components/core/typography";
import { StatCard } from "@/components/data/stat-card";
import { DataGrid, type ColumnDef, type SortState } from "@/components/data/data-grid";
import { Progress } from "@/components/data/progress";
import { Avatar } from "@/components/core/avatar";
import { Tabs } from "@/components/layout/tabs";
import { FormSelect } from "@/components/form/form-select";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { THEMES } from "./shared";

const meta: Meta = {
  title: "Templates/Dashboard",
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj;

// ─── Data ────────────────────────────────────────────────────────────────────

type InvoiceStatus = "paid" | "pending" | "overdue" | "draft";

const STATUS_VARIANT: Record<InvoiceStatus, "success" | "warning" | "danger" | "default"> = {
  paid: "success",
  pending: "warning",
  overdue: "danger",
  draft: "default",
};

const STATUS_LABEL: Record<InvoiceStatus, string> = {
  paid: "Paid",
  pending: "Pending",
  overdue: "Overdue",
  draft: "Draft",
};

interface Invoice {
  id: string;
  client: string;
  project: string;
  issued: string;
  amount: number;
  status: InvoiceStatus;
}

const INVOICES: Invoice[] = [
  { id: "INV-2049", client: "Northwind Studio", project: "Brand system", issued: "2026-08-28", amount: 8400, status: "paid" },
  { id: "INV-2048", client: "Ravel Health", project: "Patient portal UI", issued: "2026-08-24", amount: 12750, status: "pending" },
  { id: "INV-2047", client: "Corebase", project: "Design audit", issued: "2026-08-19", amount: 3200, status: "paid" },
  { id: "INV-2046", client: "Tandem Freight", project: "Ops dashboard", issued: "2026-07-30", amount: 15600, status: "overdue" },
  { id: "INV-2045", client: "Meridian Bank", project: "Component library", issued: "2026-07-22", amount: 22000, status: "paid" },
  { id: "INV-2044", client: "Upsilon Labs", project: "Marketing site", issued: "2026-07-15", amount: 6800, status: "draft" },
  { id: "INV-2043", client: "Ravel Health", project: "Design tokens", issued: "2026-07-02", amount: 4100, status: "paid" },
];

const REVENUE_BY_MONTH = [
  { month: "Mar", value: 18 },
  { month: "Apr", value: 27 },
  { month: "May", value: 24 },
  { month: "Jun", value: 39 },
  { month: "Jul", value: 46 },
  { month: "Aug", value: 61 },
];

const TOP_CLIENTS = [
  { name: "Meridian Bank", share: 34, billed: 42600 },
  { name: "Ravel Health", share: 26, billed: 32850 },
  { name: "Tandem Freight", share: 18, billed: 22400 },
  { name: "Northwind Studio", share: 12, billed: 15200 },
  { name: "Corebase", share: 10, billed: 12600 },
];

const ACTIVITY = [
  { who: "Dana Okoye", what: "paid INV-2049", when: "12 minutes ago" },
  { who: "You", what: "sent INV-2048 to Ravel Health", when: "3 hours ago" },
  { who: "Tomas Lindqvist", what: "commented on Ops dashboard", when: "Yesterday" },
  { who: "You", what: "logged 6.5h against Component library", when: "Yesterday" },
  { who: "System", what: "flagged INV-2046 as overdue", when: "2 days ago" },
];

const NAV_MAIN = [
  { key: "overview", label: "Overview", icon: LayoutDashboard },
  { key: "invoices", label: "Invoices", icon: Receipt },
  { key: "clients", label: "Clients", icon: Users },
  { key: "payments", label: "Payments", icon: CreditCard },
  { key: "recurring", label: "Recurring", icon: Repeat },
];

const NAV_FOOTER = [
  { key: "settings", label: "Settings", icon: Settings },
  { key: "support", label: "Support", icon: LifeBuoy },
];

const RANGE_OPTIONS = [
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
  { value: "12m", label: "Last 12 months" },
  { value: "ytd", label: "Year to date" },
];

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

// ─── Pieces ──────────────────────────────────────────────────────────────────

function AppSidebar({
  active,
  onNavigate,
  collapsed,
  onCollapsedChange,
  open,
  onOpenChange,
}: {
  active: string;
  onNavigate: (key: string) => void;
  collapsed: boolean;
  onCollapsedChange: (value: boolean) => void;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  return (
    <Sidebar
      collapsed={collapsed}
      onCollapsedChange={onCollapsedChange}
      open={open}
      onOpenChange={onOpenChange}
      header={
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-[var(--color-accent-500)]">
            <Wallet className="h-4 w-4 text-[var(--color-on-accent)]" />
          </span>
          {!collapsed && (
            <span className="truncate text-base font-semibold tracking-[var(--tracking-tight)] text-[var(--color-ink)]">
              Ledger
            </span>
          )}
        </div>
      }
      footer={
        <div className="flex items-center gap-2">
          <Avatar fallback="Francis Glenn" size="sm" />
          {!collapsed && (
            <div className="min-w-0">
              <Text size="sm" weight="medium" className="truncate">
                Francis Glenn
              </Text>
              <Caption className="truncate">Freelance · Pro</Caption>
            </div>
          )}
        </div>
      }
    >
      <SidebarSection>
        {!collapsed && <SidebarLabel>Workspace</SidebarLabel>}
        {NAV_MAIN.map((item) => (
          <SidebarItem
            key={item.key}
            active={active === item.key}
            icon={<item.icon className="h-4 w-4" />}
            tooltip={item.label}
            onClick={() => onNavigate(item.key)}
          >
            {item.label}
          </SidebarItem>
        ))}
      </SidebarSection>

      <SidebarSection>
        {!collapsed && <SidebarLabel>Account</SidebarLabel>}
        {NAV_FOOTER.map((item) => (
          <SidebarItem
            key={item.key}
            active={active === item.key}
            icon={<item.icon className="h-4 w-4" />}
            tooltip={item.label}
            onClick={() => onNavigate(item.key)}
          >
            {item.label}
          </SidebarItem>
        ))}
      </SidebarSection>
    </Sidebar>
  );
}

function TopBar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <header className="sticky top-0 z-[var(--z-sticky)] flex h-16 items-center justify-between gap-4 border-b border-[var(--color-border)] bg-[var(--color-canvas)]/85 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger onClick={onOpenSidebar} className="md:hidden" />
        <Breadcrumb
          items={[
            { label: "Workspace", href: "#" },
            { label: "Overview" },
          ]}
        />
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Search">
          <Search className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-[var(--radius-full)] bg-[var(--color-danger)]" />
        </Button>
        <Button size="sm">New invoice</Button>
      </div>
    </header>
  );
}

function PageHeader() {
  const [range, setRange] = React.useState("90d");

  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-1">
        <Heading level={2}>Overview</Heading>
        <Text size="sm" tone="muted">
          Good morning, Francis. Two invoices need chasing this week.
        </Text>
      </div>

      <div className="flex items-end gap-2">
        <FormSelect value={range} onValueChange={setRange} options={RANGE_OPTIONS} />
        <Button variant="outline" size="md">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
}

function StatRow() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Revenue"
        value={currency.format(72850)}
        delta={18.2}
        deltaLabel="vs last quarter"
        icon={<TrendingUp className="h-4 w-4 text-[var(--color-accent-600)]" />}
      />
      <StatCard
        label="Outstanding"
        value={currency.format(28350)}
        delta={-6.4}
        deltaLabel="vs last quarter"
        icon={<Receipt className="h-4 w-4 text-[var(--color-accent-600)]" />}
      />
      <StatCard
        label="Active clients"
        value="12"
        delta={9.1}
        deltaLabel="vs last quarter"
        icon={<Users className="h-4 w-4 text-[var(--color-accent-600)]" />}
      />
      <StatCard
        label="Avg. days to pay"
        value="21"
        delta={-12.5}
        deltaLabel="faster"
        icon={<CreditCard className="h-4 w-4 text-[var(--color-accent-600)]" />}
      />
    </div>
  );
}

/**
 * Pure-CSS bar chart. Heights are percentages of the largest value, so the
 * shape holds at any container size without a charting dependency.
 */
function RevenueChart() {
  const peak = Math.max(...REVENUE_BY_MONTH.map((point) => point.value));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Revenue by month</CardTitle>
        <Caption>Thousands of USD, invoiced</Caption>
      </CardHeader>
      <CardContent>
        <div className="flex h-56 items-end gap-3">
          {REVENUE_BY_MONTH.map((point) => (
            <div key={point.month} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-medium text-[var(--color-ink)]">
                {point.value}
              </span>
              <div
                className="w-full rounded-t-[var(--radius-sm)] bg-[var(--color-accent-500)] transition-[height] duration-[var(--duration-slow)]"
                style={{ height: `${(point.value / peak) * 100}%` }}
                role="img"
                aria-label={`${point.month}: ${point.value} thousand dollars`}
              />
              <Caption>{point.month}</Caption>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function TopClients() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Top clients</CardTitle>
        <Caption>Share of billed revenue</Caption>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {TOP_CLIENTS.map((client) => (
          <div key={client.name} className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <Text size="sm" weight="medium" className="truncate">
                {client.name}
              </Text>
              <Caption>{currency.format(client.billed)}</Caption>
            </div>
            <Progress value={client.share} size="sm" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function ActivityFeed() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {ACTIVITY.map((entry) => (
          <div key={`${entry.who}-${entry.what}`} className="flex items-start gap-3">
            <Avatar fallback={entry.who} size="xs" />
            <div className="min-w-0 flex-1">
              <Text size="sm">
                <span className="font-medium text-[var(--color-ink)]">{entry.who}</span>{" "}
                {entry.what}
              </Text>
              <Caption>{entry.when}</Caption>
            </div>
          </div>
        ))}
        <Button variant="link" size="sm" className="self-start px-0">
          View all activity
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Button>
      </CardContent>
    </Card>
  );
}

function InvoiceTable({ status }: { status?: InvoiceStatus }) {
  const [sort, setSort] = React.useState<SortState | null>({
    columnKey: "issued",
    dir: "desc",
  });

  const rows = React.useMemo(() => {
    const filtered = status ? INVOICES.filter((row) => row.status === status) : INVOICES;
    if (!sort) return filtered;

    const direction = sort.dir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const left = a[sort.columnKey as keyof Invoice];
      const right = b[sort.columnKey as keyof Invoice];
      if (typeof left === "number" && typeof right === "number") {
        return (left - right) * direction;
      }
      return String(left).localeCompare(String(right)) * direction;
    });
  }, [sort, status]);

  const columns: ColumnDef<Invoice>[] = [
    { key: "id", header: "Invoice", sortable: true, width: 120 },
    { key: "client", header: "Client", sortable: true },
    { key: "project", header: "Project", sortable: true },
    { key: "issued", header: "Issued", sortable: true, width: 130 },
    {
      key: "amount",
      header: "Amount",
      sortable: true,
      align: "right",
      width: 130,
      cell: (row) => (
        <span className="font-[var(--font-mono)] text-sm">{currency.format(row.amount)}</span>
      ),
      footer: (
        <span className="font-[var(--font-mono)] text-sm">
          {currency.format(rows.reduce((total, row) => total + row.amount, 0))}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      width: 120,
      cell: (row) => (
        <Badge variant={STATUS_VARIANT[row.status]}>{STATUS_LABEL[row.status]}</Badge>
      ),
    },
  ];

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      rowKey={(row) => row.id}
      sort={sort}
      onSort={setSort}
      showFooter
      density="default"
      rowActions={[
        { label: "View", onClick: () => {} },
        { label: "Send reminder", onClick: () => {}, show: (row) => row.status !== "paid" },
        { label: "Void", onClick: () => {}, variant: "danger" },
      ]}
    />
  );
}

function Invoices() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-4">
        <CardTitle>Invoices</CardTitle>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4" />
          CSV
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs
          variant="pill"
          defaultValue="all"
          items={[
            { value: "all", label: "All", content: <div className="pt-4"><InvoiceTable /></div> },
            { value: "pending", label: "Pending", content: <div className="pt-4"><InvoiceTable status="pending" /></div> },
            { value: "overdue", label: "Overdue", content: <div className="pt-4"><InvoiceTable status="overdue" /></div> },
            { value: "paid", label: "Paid", content: <div className="pt-4"><InvoiceTable status="paid" /></div> },
          ]}
        />
      </CardContent>
    </Card>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

function DashboardPage() {
  const [active, setActive] = React.useState("overview");
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navigate = (key: string) => {
    setActive(key);
    setMobileOpen(false);
  };

  return (
    <div
      style={THEMES.ledger as React.CSSProperties}
      className="-m-4 flex w-[100vw] max-w-[100vw] overflow-x-hidden min-h-screen bg-[var(--color-canvas)] font-[var(--font-sans)] antialiased"
    >
      <AppSidebar
        active={active}
        onNavigate={navigate}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        open={mobileOpen}
        onOpenChange={setMobileOpen}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar onOpenSidebar={() => setMobileOpen(true)} />

        <main className="flex flex-1 flex-col gap-6 p-4 md:p-6">
          <PageHeader />
          <StatRow />

          <div className="grid gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <RevenueChart />
            </div>
            <TopClients />
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <Invoices />
            </div>
            <ActivityFeed />
          </div>
        </main>
      </div>
    </div>
  );
}

export const Analytics: Story = {
  render: () => <DashboardPage />,
};
