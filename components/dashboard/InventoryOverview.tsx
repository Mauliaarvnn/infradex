
import { Package, CheckCircle2, Wrench, XCircle } from "lucide-react";

import { inventoryOverview } from "@/data/dashboard";

const inventoryStatuses = [
  {
    id: "active",
    label: "Aktif",
    value: inventoryOverview.active,
    color: "bg-emerald-500",
    textColor: "text-emerald-700",
    icon: CheckCircle2,
  },
  {
    id: "maintenance",
    label: "Maintenance",
    value: inventoryOverview.maintenance,
    color: "bg-amber-500",
    textColor: "text-amber-700",
    icon: Wrench,
  },
  {
    id: "inactive",
    label: "Tidak Aktif",
    value: inventoryOverview.inactive,
    color: "bg-red-500",
    textColor: "text-red-700",
    icon: XCircle,
  },
];

export default function InventoryOverview() {
  const total = inventoryOverview.total;

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-800">
            Kondisi Inventaris
          </h2>
          <p className="mt-1 text-xs text-gray-500">
            Ringkasan status perangkat terdaftar
          </p>
        </div>

        <Package size={20} className="text-gray-400" />
      </div>

      <div className="mt-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Total Perangkat
            </p>
            <h3 className="mt-1 text-3xl font-bold text-gray-800">
              {total}
            </h3>
          </div>
        </div>

        <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-gray-100">
          {inventoryStatuses.map((status) => (
            <div
              key={status.id}
              className={`${status.color} transition-all`}
              style={{
                width: `${total > 0 ? (status.value / total) * 100 : 0}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {inventoryStatuses.map((status) => {
          const Icon = status.icon;
          const percentage =
            total > 0
              ? ((status.value / total) * 100).toFixed(1)
              : "0.0";

          return (
            <div
              key={status.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50">
                  <Icon size={18} className={status.textColor} />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">
                    {status.label}
                  </p>
                  <p className="text-xs text-gray-400">
                    {percentage}%
                  </p>
                </div>
              </div>

              <span className="text-sm font-semibold text-gray-800">
                {status.value} perangkat
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
