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
  draftCount,
  publishedProperties,
}: {
  children: React.ReactNode;
  session: Session;
  unreadInquiries: number;
  pendingApprovals: number;
  draftCount: number;
  publishedProperties: number;
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
        <Sidebar isCollapsed={isSidebarCollapsed} unreadInquiries={unreadInquiries} pendingApprovals={pendingApprovals} draftCount={draftCount} publishedProperties={publishedProperties} userRole={session.user.role} />
      </div>

      <PrimeSidebar visible={isSidebarOpen} onHide={() => setIsSidebarOpen(false)} className="md:hidden">
        <div className="border-b border-gray-200 bg-white p-5 text-center">
          <img
            src="/img/logoColor.png"
            alt="Hornez Inmobiliaria"
            className="mx-auto h-12 w-full object-contain"
          />
          <p className="mt-3 text-sm text-gray-600">Panel de Administración</p>
        </div>
        <div className="flex flex-col gap-1 bg-gray-50 px-3 py-4">
          {MENU_ITEMS.filter((item) => !item.adminOnly || isAdminRole(session.user.role)).map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(item.path + "/");

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`group flex items-center rounded-lg border px-3 py-3 transition-colors ${
                  isActive
                    ? "border-orange-200 bg-orange-50 text-gray-900 font-semibold shadow-sm"
                    : "border-transparent text-gray-600 hover:border-gray-200 hover:bg-white hover:text-gray-900"
                }`}
              >
                <i className={`${item.icon} mr-3 ${isActive ? "text-hornez-orange" : "text-gray-400 group-hover:text-hornez-orange"}`} />
                <span>{item.label}</span>
                {item.path === "/dashboard/propiedades" && (
                  <span className="ml-auto text-lg font-bold text-hornez-orange">
                    {publishedProperties > 99 ? "99+" : publishedProperties}
                  </span>
                )}
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
                {item.path === "/dashboard/aprobaciones" && (
                  <span className="ml-auto flex items-center gap-1 text-hornez-orange">
                    <i className="pi pi-bell text-[1.3125rem]" />
                    {pendingApprovals > 0 && <span className="text-lg font-bold">{pendingApprovals > 99 ? "99+" : pendingApprovals}</span>}
                  </span>
                )}
                {item.path === "/dashboard/borradores" && (
                  <span className="ml-auto flex items-center gap-1 text-hornez-orange">
                    <i className="pi pi-bell text-[1.3125rem]" />
                    {draftCount > 0 && <span className="text-lg font-bold">{draftCount > 99 ? "99+" : draftCount}</span>}
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
