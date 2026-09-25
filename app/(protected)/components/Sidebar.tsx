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
  publishedProperties,
  userRole,
}: {
  isCollapsed: boolean;
  unreadInquiries: number;
  pendingApprovals: number;
  draftCount: number;
  publishedProperties: number;
  userRole?: string;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed inset-y-0 left-0 bg-white border-r border-gray-200 h-screen overflow-y-auto z-1000 transition-all duration-300
        ${isCollapsed ? "w-20" : "w-65"}
      `}
    >
      <div className={`border-b border-gray-200 bg-white ${isCollapsed ? "p-3" : "p-5"}`}>
        <img
          src="/img/logoColor.png"
          alt="Hornez Inmobiliaria"
          className={`mx-auto object-contain ${isCollapsed ? "h-10 w-10" : "h-12 w-full"}`}
        />
        {!isCollapsed && (
          <div className="mt-3 text-center">
            <p className="text-sm text-gray-600">Panel de Administración</p>
          </div>
        )}
      </div>

      <nav className="space-y-1 bg-gray-50 px-3 py-4">
        {MENU_ITEMS.filter((item) => !item.adminOnly || isAdminRole(userRole)).map((item) => {
          const isActive =
            pathname === item.path || pathname.startsWith(item.path + "/");

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`group flex items-center cursor-pointer rounded-lg border border-transparent transition-all duration-200 ${
                isActive
                  ? "border-orange-200 bg-orange-50 text-gray-900 font-semibold shadow-sm"
                  : "text-gray-600 hover:border-gray-200 hover:bg-white hover:text-gray-900"
              } ${isCollapsed ? "justify-center px-2 py-3.5" : "px-3 py-3"}`}
            >
              <i
                className={`${item.icon} ${isActive ? "text-hornez-orange" : "text-gray-400 group-hover:text-hornez-orange"} ${isCollapsed ? "mr-0" : "mr-3"}`}
                style={{
                  fontSize: isCollapsed ? "1.25rem" : "1.125rem",
                }}
              />
              {!isCollapsed && (
                <>
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
                </>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}