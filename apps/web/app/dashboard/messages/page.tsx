import { ActivityList } from "@/components/dashboard/activity-list";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { SectionHeader } from "@/components/dashboard/section-header";
import { fetchCustomerDashboard, formatWhen } from "@/lib/dashboard";

export const metadata = { title: "Messages" };

export default async function MessagesPage() {
  const data = await fetchCustomerDashboard();

  return (
    <DashboardShell role="customer" title="Messages" subtitle="Chat with vendors, shelters, and veterinarians.">
      <SectionHeader title="Inbox" subtitle="Order updates and consult follow-ups land here." />
      <div className="mt-6">
        <ActivityList
          items={data.messages.map((m) => ({
            id: m.id,
            title: m.from,
            meta: `${m.preview} · ${formatWhen(m.createdAt)}`,
            status: m.unread ? "unread" : "read",
            tone: m.unread ? "coral" : "neutral",
          }))}
        />
      </div>
    </DashboardShell>
  );
}
