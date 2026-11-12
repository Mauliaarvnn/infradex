
import {
  Building2,
  Server,
  HardDrive,
  Network,
  ArrowUpRight,
} from "lucide-react";

import { dashboardStats } from "@/data/dashboard";

const statisticIcons = {
  branches: Building2,
  devices: Server,
  racks: HardDrive,
  topologies: Network,
};

export default function DashboardStats() {
  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {dashboardStats.map((item) => {
        const Icon = statisticIcons[
          item.id as keyof typeof statisticIcons
        ];

        return (
          <div
            key={item.id}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <Icon size={22} />
              </div>

              <ArrowUpRight
                size={18}
                className="text-gray-400"
              />
            </div>

            <p className="mt-5 text-sm text-gray-500">
              {item.label}
            </p>

            <h3 className="mt-1 text-3xl font-bold text-gray-800">
              {item.value}
            </h3>

            <p className="mt-2 text-xs text-gray-400">
              {item.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}
