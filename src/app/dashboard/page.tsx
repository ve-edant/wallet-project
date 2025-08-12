// src/app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "../authOption";
import { redirect } from "next/navigation";
import WalletList from "@/Components/WalletList";
import { WalletHeader } from "@/Components/WalletHeader";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {session.user?.name}</h1>
      <WalletHeader />
      <WalletList />
    </div>
  );
}
