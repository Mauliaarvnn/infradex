
import { Pencil } from "lucide-react";
import type { Device } from "@/types/device";

interface DeviceTableProps {
  devices: Device[];
  getBranchName: (branchId: string) => string;
  onEdit: (device: Device) => void;
}

const categoryLabels: Record<string, string> = {
  server: "Server",
  router: "Router",
  switch: "Switch",
  firewall: "Firewall",
  "access-point": "Access Point",
  computer: "Komputer",
  laptop: "Laptop",
  printer: "Printer",
  ups: "UPS",
  other: "Lainnya",
};

const statusLabels: Record<string, string> = {
  active: "Aktif",
  maintenance: "Maintenance",
  inactive: "Tidak Aktif",
};

export default function DeviceTable({
  devices,
  getBranchName,
  onEdit,
}: DeviceTableProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-200 p-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Daftar Perangkat
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Informasi seluruh perangkat yang terdaftar dalam sistem.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-5 py-4 font-semibold">Kode Inventaris</th>
              <th className="px-5 py-4 font-semibold">Nama Perangkat</th>
              <th className="px-5 py-4 font-semibold">Kategori</th>
              <th className="px-5 py-4 font-semibold">Brand / Model</th>
              <th className="px-5 py-4 font-semibold">Cabang</th>
              <th className="px-5 py-4 font-semibold">Status</th>
              <th className="px-5 py-4 font-semibold">Kondisi</th>
              <th className="px-5 py-4 text-center font-semibold">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {devices.map((device) => (
              <tr
                key={device.id}
                className="transition hover:bg-gray-50"
              >
                <td className="whitespace-nowrap px-5 py-4 font-medium text-emerald-700">
                  {device.code}
                </td>

                <td className="px-5 py-4 font-medium text-gray-900">
                  {device.name}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                  {categoryLabels[device.category] ?? device.category}
                </td>

                <td className="px-5 py-4 text-gray-600">
                  <p>{device.brand}</p>
                  <p className="mt-1 text-xs text-gray-400">
                    {device.model}
                  </p>
                </td>

                <td className="px-5 py-4 text-gray-600">
                  {getBranchName(device.branchId)}
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      device.status === "active"
                        ? "bg-emerald-100 text-emerald-700"
                        : device.status === "maintenance"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {statusLabels[device.status]}
                  </span>
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                  {device.condition === "good"
                    ? "Baik"
                    : device.condition === "minor-damage"
                      ? "Rusak Ringan"
                      : "Rusak Berat"}
                </td>

                <td className="px-5 py-4 text-center">
                  <button
                    type="button"
                    onClick={() => onEdit(device)}
                    title={`Edit ${device.name}`}
                    aria-label={`Edit ${device.name}`}
                    className="inline-flex items-center justify-center rounded-lg p-2 text-gray-500 transition hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    <Pencil size={17} />
                  </button>
                </td>
              </tr>
            ))}

            {devices.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-12 text-center text-gray-500"
                >
                  Belum ada data perangkat.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-200 px-5 py-4">
        <p className="text-sm text-gray-500">
          Menampilkan {devices.length} perangkat
        </p>
      </div>
    </section>
  );
}
