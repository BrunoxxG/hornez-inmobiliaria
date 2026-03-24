"use client";

import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Sidebar as PrimeSidebar } from "primereact/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MENU_ITEMS } from "../lib/utils";
import { Session } from "next-auth";

export default function AdminShell({ children, session }: { children: React.ReactNode, session: Session }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved) setIsSidebarCollapsed(saved === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", String(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  return (
    <div className="flex min-h-screen bg-speed-gray-50">
      <div className="hidden md:block">
        <Sidebar isCollapsed={isSidebarCollapsed} />
      </div>

      <PrimeSidebar visible={isSidebarOpen} onHide={() => setIsSidebarOpen(false)} className="md:hidden">
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <h2 className="text-2xl font-bold">Hornez Inmobiliaria</h2>
          <p className="text-sm text-gray-600">Panel de Administración</p>
        </div>
        <div className="flex flex-col gap-1">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(item.path + "/");

            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center px-4 py-3 rounded ${
                  isActive ? "bg-[rgba(227,30,36,0.1)] text-hornez-red font-semibold" : "text-gray-700"
                }`}
              >
                <i className={`${item.icon} mr-2`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </PrimeSidebar>

      <div
        className={`
          flex flex-col flex-1 min-h-screen transition-all duration-300
          ${isSidebarCollapsed ? "ml-20" : "ml-65"}
          max-md:ml-0
        `}
      >
        <Topbar
          session={session}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed((v) => !v)}
          onToggleMobile={() => setIsSidebarOpen((v) => !v)}
        />

        <div className="flex-1 p-4 md:p-8">{children}</div>
      </div>
    </div>
  );
}
