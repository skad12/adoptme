import { ActivityList } from "@/components/dashboard/activity-list";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionHeader } from "@/components/dashboard/section-header";
import { SoftCard } from "@/components/dashboard/soft-card";
import { fetchAdminDashboard, formatWhen } from "@/lib/dashboard";

export const metadata = { title: "Admin users" };

export default async function AdminUsersPage() {
  const data = await fetchAdminDashboard();

  return (
    <DashboardShell role="admin" title="Users & moderation" subtitle="Role-aware accounts and listing review queue.">
      <SectionHeader title="Accounts" />
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <ActivityList
          items={data.users.map((u) => ({
            id: u.id,
            title: u.name,
            meta: u.role,
            status: u.status,
            tone: u.status === "PENDING" ? "coral" : "mint",
          }))}
        />
        <SoftCard className="space-y-4">
          <h3 className="font-extrabold">Moderation queue</h3>
          <ActivityList
            items={data.moderationQueue.map((m) => ({
              id: m.id,
              title: m.title,
              meta: `${m.reason} · ${formatWhen(m.createdAt)}`,
              status: "pending review",
              tone: "coral",
            }))}
          />
        </SoftCard>
      </div>
    </DashboardShell>
  );
}
