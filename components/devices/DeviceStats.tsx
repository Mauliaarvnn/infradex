import { Server, CheckCircle2, Wrench, XCircle } from "lucide-react";
import type { Device } from "@/types/device";

interface DeviceStatsProps {
  devices: Device[];
}

export default function DeviceStats({ devices }: DeviceStatsProps) {
  const activeDevices = devices.filter(
    (device) => device.status === "active"
  ).length;

  const maintenanceDevices = devices.filter(
    (device) => device.status === "maintenance"
  ).length;

  const inactiveDevices = devices.filter(
    (device) => device.status === "inactive"
  ).length;

  const stats = [
    {
      label: "Total Perangkat",
      value: devices.length,
      description: "Seluruh perangkat terdaftar",
      icon: Server,
      iconColor: "text-emerald-700",
    },
    {
      label: "Perangkat Aktif",
      value: activeDevices,
      description: "Siap digunakan",
      icon: CheckCircle2,
      iconColor: "text-emerald-600",
    },
    {
      label: "Maintenance",
      value: maintenanceDevices,
      description: "Sedang dalam pemeliharaan",
      icon: Wrench,
      iconColor: "text-amber-600",
    },
    {
      label: "Tidak Aktif",
      value: inactiveDevices,
      description: "Tidak sedang digunakan",
      icon: XCircle,
      iconColor: "text-red-500",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">
                {stat.label}
              </p>
              <Icon className={stat.iconColor} size={21} />
            </div>

            <p className="mt-3 text-2xl font-bold text-gray-900">
              {stat.value}
            </p>

            <p className="mt-1 text-xs text-gray-500">
              {stat.description}
            </p>
          </div>
        );
      })}
    </section>
  );
}
