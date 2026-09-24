"use client";

import Link from "next/link";
import { MENU_ITEMS } from "../lib/utils";
import { usePathname } from "next/navigation";
import { isAdminRole } from "@/lib/authorization";

export default function Sidebar({
  isCollapsed,
  unreadInquiries,
  pendingApprovals,
  draftCount,
  userRole,
}: {
  isCollapsed: boolean;
  unreadInquiries: number;
  pendingApprovals: number;
  draftCount: number;
  userRole?: string;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 bg-white border-r border-gray-200 h-screen overflow-y-auto z-1000 transition-all duration-300
        ${isCollapsed ? "w-20" : "w-65"}
      `}
    >
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        {!isCollapsed && (
          <>
            <h2 className="text-2xl font-bold">Hornez Inmobiliaria</h2>
            <p className="text-sm text-gray-600">Panel de Administración</p>
          </>
        )}
      </div>

      <nav className="py-4">
        {MENU_ITEMS.filter((item) => !item.adminOnly || isAdminRole(userRole)).map((item) => {
          const isActive =
            pathname === item.path || pathname.startsWith(item.path + "/");

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center cursor-pointer transition-all duration-200 border-l-[3px] ${
                isActive
                  ? "bg-[rgba(227,30,36,0.1)] text-hornez-blue border-hornez-blue font-semibold"
                  : "border-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              } ${isCollapsed ? "justify-center px-2 py-3.5" : "px-6 py-3.5"}`}
            >
              <i
                className={`${item.icon} ${isCollapsed ? "mr-0" : "mr-3"}`}
                style={{
                  fontSize: isCollapsed ? "1.25rem" : "1.125rem",
                }}
              />
              {!isCollapsed && (
                <>
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
                </>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}