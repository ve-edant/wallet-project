// src/app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../authOption";
import { redirect } from "next/navigation";
import { WalletHeader } from "@/Components/WalletHeader";
import Balance from "@/Components/Balance";
import TabbedSection from "@/Components/TabbedSection";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-6">
        Welcome, {session?.user?.name ?? "Guest"}
      </h1>

      <div className="max-w-3xl w-full mx-auto flex flex-col items-center">
        <WalletHeader />
        <Balance />
        <TabbedSection />
      </div>
    </div>
  );
}
