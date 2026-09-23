import { PlaceholderPage } from "@/components/layout/placeholder-page";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <PlaceholderPage
      title="Dashboard"
      description="Stock and order overview."
      message="Dashboard summaries, stock warnings and outstanding orders will appear here."
    />
  );
}
