"use client";

import { startTransition, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Sidebar as PrimeSidebar } from "primereact/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU_ITEMS } from "../lib/utils";
import { Session } from "next-auth";
import { isAdminRole } from "@/lib/authorization";

export default function AdminShell({
  children,
  session,
  unreadInquiries,
  pendingApprovals,
}: {
  children: React.ReactNode;
  session: Session;
  unreadInquiries: number;
  pendingApprovals: number;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved) startTransition(() => setIsSidebarCollapsed(saved === "true"));
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", String(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  return (
    <div className="flex min-h-screen bg-speed-gray-50">
      <div
        className={`hidden md:block ${
          isSidebarCollapsed ? "w-20" : "w-65"
        }`}
      >
        <Sidebar isCollapsed={isSidebarCollapsed} unreadInquiries={unreadInquiries} pendingApprovals={pendingApprovals} userRole={session.user.role} />
      </div>

      <PrimeSidebar visible={isSidebarOpen} onHide={() => setIsSidebarOpen(false)} className="md:hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-bold">Hornez Inmobiliaria</h2>
          <p className="text-sm text-gray-600">Panel de Administración</p>
        </div>
        <div className="flex flex-col gap-1">
          {MENU_ITEMS.filter((item) => !item.adminOnly || isAdminRole(session.user.role)).map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(item.path + "/");

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center px-4 py-3 rounded ${
                  isActive ? "bg-[rgba(227,30,36,0.1)] text-hornez-blue font-semibold" : "text-gray-700"
                }`}
              >
                <i className={`${item.icon} mr-2`} />
                <span>{item.label}</span>
                {item.path === "/dashboard/consultas" && (
                  <span className="ml-auto flex items-center gap-1 text-hornez-orange">
                    <i className="pi pi-bell text-[1.3125rem]" />
                    {unreadInquiries > 0 && (
                      <span className="text-lg font-bold">
                        {unreadInquiries > 99 ? "99+" : unreadInquiries}
                      </span>
                    )}
                  </span>
                )}
                {item.path === "/dashboard/aprobaciones" && pendingApprovals > 0 && (
                  <span className="ml-auto flex items-center gap-1 text-hornez-orange">
                    <i className="pi pi-bell text-[1.3125rem]" />
                    <span className="text-lg font-bold">{pendingApprovals > 99 ? "99+" : pendingApprovals}</span>
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </PrimeSidebar>

      <div className="flex flex-col flex-1 min-w-0 min-h-screen">
        <Topbar
          session={session}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((v) => !v)}
          onToggleMobile={() => setIsSidebarOpen((v) => !v)}
        />

        <div className="flex-1 p-4 md:p-8 overflow-x-hidden">{children}</div>
      </div>
    </div>
  );
}
