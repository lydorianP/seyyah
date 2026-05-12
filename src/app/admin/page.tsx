import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const session = await auth();
  if (!session || session.user?.role !== "admin") redirect("/login");
  return <AdminDashboard />;
}