
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/constants/navigation";
import type { LucideIcon } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return (
      pathname === href ||
      pathname.startsWith(`${href}/`)
    );
  };

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50
        flex w-64 flex-col
        bg-[#123D30] text-white
        transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Brand */}
      <div className="flex h-20 shrink-0 items-center gap-3 border-b border-white/10 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-lg font-bold">
          I
        </div>

        <div>
          <h1 className="text-lg font-bold tracking-wide">
            INFRADEX
          </h1>
          <p className="text-xs text-emerald-200">
            Infrastructure System
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-6">
        <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-emerald-300">
          Main Menu
        </p>

        {navigationItems.map((item) => {
          const Icon: LucideIcon = item.icon;
          const isActive = isActiveRoute(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              aria-current={isActive ? "page" : undefined}
              className={`
                flex items-center gap-3 rounded-lg
                px-3 py-3 text-sm font-medium
                transition-colors duration-200
                ${
                  isActive
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-950/20"
                    : "text-emerald-100 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              <Icon size={19} strokeWidth={1.8} />

              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="shrink-0 border-t border-white/10 p-4">
        <p className="text-xs text-emerald-200">
          Network Documentation
        </p>

        <p className="mt-1 text-xs text-white/50">
          INFRADEX v0.1.0
        </p>
      </div>
    </aside>
  );
}
