"use client";

import Link from "next/link";
import { MENU_ITEMS } from "../lib/utils";
import { usePathname } from "next/navigation";

export default function Sidebar({
  isCollapsed,
}: {
  isCollapsed: boolean;
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
        {MENU_ITEMS.map((item) => {
          const isActive =
            pathname === item.path || pathname.startsWith(item.path + "/");

          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center cursor-pointer transition-all duration-200 border-l-[3px] ${
                isActive
                  ? "bg-[rgba(227,30,36,0.1)] text-hornez-red border-hornez-red font-semibold"
                  : "border-transparent text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              } ${isCollapsed ? "justify-center px-2 py-3.5" : "px-6 py-3.5"}`}
            >
              <i
                className={`${item.icon} ${isCollapsed ? "mr-0" : "mr-3"}`}
                style={{
                  fontSize: isCollapsed ? "1.25rem" : "1.125rem",
                }}
              />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}