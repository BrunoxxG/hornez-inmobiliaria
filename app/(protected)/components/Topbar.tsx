"use client";

import { Button } from "primereact/button";
import { MENU_ITEMS } from "../lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

export default function Topbar({
  isCollapsed,
  onToggleCollapse,
  onToggleMobile,
  session,
  unreadInquiries,
}: {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onToggleMobile: () => void;
  session: Session;
  unreadInquiries: number;
}) {
  const pathname = usePathname();
  const currentPage = MENU_ITEMS.find((item) => pathname.startsWith(item.path))?.label ?? "Panel";

  const handleLogout = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };

  return (
    <header className="sticky top-0 z-999 flex bg-white items-center justify-between border-b border-gray-200 px-4 md:px-8 py-4">
      <div className="flex items-center gap-4">
        <Button
          icon="pi pi-bars"
          className="p-button-text p-button-rounded md:hidden!"
          onClick={onToggleMobile}
          tooltip={"Expandir menú"}
        />
        <Button
          icon={isCollapsed ? "pi pi-angle-right" : "pi pi-angle-left"}
          tooltip={isCollapsed ? "Expandir menú" : "Contraer menú"}
          className="p-button-text p-button-rounded hidden! md:inline-flex!"
          onClick={onToggleCollapse}
        />
        <h3 className="text-lg font-bold">{currentPage}</h3>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/dashboard/consultas"
          aria-label={`${unreadInquiries} consultas sin leer`}
          className="relative rounded-full p-2 text-gray-600 transition-colors hover:bg-orange-50 hover:text-hornez-orange"
        >
          <i className="pi pi-bell text-xl" />
          {unreadInquiries > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-hornez-orange px-1 text-xs font-bold text-white">
              {unreadInquiries > 99 ? "99+" : unreadInquiries}
            </span>
          )}
        </Link>
        <span className="text-sm font-semibold">{session?.user?.name}</span>
        <Button
          icon="pi pi-sign-out"
          className="p-button-text p-button-rounded"
          severity="secondary"
          tooltip="Cerrar Sesión"
          tooltipOptions={{ position: "bottom" }}
          onClick={handleLogout}
        />
      </div>
    </header>
  );
}
