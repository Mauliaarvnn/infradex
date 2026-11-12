
"use client";

import { Bell, Menu, Search } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({
  onMenuClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">

      {/* Left Section */}
      <div className="flex min-w-0 flex-1 items-center gap-4">

        {/* Mobile Menu */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Buka navigasi"
          className="shrink-0 rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 hover:text-emerald-700 lg:hidden"
        >
          <Menu size={22} />
        </button>

        {/* Search */}
        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            placeholder="Cari dokumentasi..."
            aria-label="Cari dokumentasi"
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="ml-3 flex shrink-0 items-center gap-3 sm:ml-6 sm:gap-5">

        {/* Notification */}
        <button
          type="button"
          aria-label="Notifikasi"
          className="relative rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-emerald-700"
        >
          <Bell size={21} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 border-l border-gray-200 pl-3 sm:pl-5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-800">
            A
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-gray-800">
              Administrator
            </p>

            <p className="text-xs text-gray-500">
              Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
