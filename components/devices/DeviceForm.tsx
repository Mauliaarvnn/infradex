
"use client";

import { useState, type FormEvent } from "react";
import { X, Server, MapPin, ClipboardList } from "lucide-react";

import type {
  Device,
  DeviceCategory,
  DeviceStatus,
  DeviceCondition,
} from "@/types/device";
import type { Branch } from "@/types/branch";

type DeviceFormData = Omit<
  Device,
  "id" | "createdAt" | "updatedAt"
>;

interface DeviceFormProps {
  initialCode: string;
  initialData?: Device | null;
  branches: Branch[];
  onClose: () => void;
  onSubmit: (data: DeviceFormData) => void;
}

const categoryOptions: { value: DeviceCategory; label: string }[] = [
  { value: "server", label: "Server" },
  { value: "router", label: "Router" },
  { value: "switch", label: "Switch" },
  { value: "firewall", label: "Firewall" },
  { value: "access-point", label: "Access Point" },
  { value: "computer", label: "Komputer" },
  { value: "laptop", label: "Laptop" },
  { value: "printer", label: "Printer" },
  { value: "ups", label: "UPS" },
  { value: "other", label: "Lainnya" },
];

const inputClass =
  "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

const labelClass =
  "mb-1.5 block text-sm font-medium text-gray-700";

export default function DeviceForm({
  initialCode,
  initialData,
  branches,
  onClose,
  onSubmit,
}: DeviceFormProps) {
  const [formData, setFormData] = useState<DeviceFormData>({
    code: initialData?.code ?? initialCode,
    name: initialData?.name ?? "",
    category: initialData?.category ?? "computer",
    brand: initialData?.brand ?? "",
    model: initialData?.model ?? "",
    serialNumber: initialData?.serialNumber ?? "",
    branchId: initialData?.branchId ?? branches[0]?.id ?? "",
    location: initialData?.location ?? "",
    purchaseDate: initialData?.purchaseDate ?? "",
    status: initialData?.status ?? "active",
    condition: initialData?.condition ?? "good",
    notes: initialData?.notes ?? "",
    });

  const handleChange = (
    field: keyof DeviceFormData,
    value: string
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit({
      ...formData,
      code: formData.code.trim().toUpperCase(),
      name: formData.name.trim(),
      brand: formData.brand.trim(),
      model: formData.model.trim(),
      serialNumber: formData.serialNumber.trim(),
      location: formData.location.trim(),
      notes: formData.notes.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
            {initialData ? "Edit Data Perangkat" : "Tambah Perangkat Baru"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
            {initialData
                ? "Perbarui informasi perangkat yang dipilih."
                : "Lengkapi informasi perangkat infrastruktur."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup formulir"
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">

          {/* Informasi Perangkat */}
          <section>
            <div className="mb-3 flex items-center gap-2">
              <Server size={18} className="text-emerald-600" />
              <h3 className="text-sm font-semibold text-gray-900">
                Informasi Perangkat
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Kode Inventaris */}
              <div>
                <label htmlFor="deviceCode" className={labelClass}>
                  Kode Inventaris
                </label>

                <input
                  id="deviceCode"
                  type="text"
                  value={formData.code}
                  readOnly
                  className={`${inputClass} cursor-not-allowed bg-gray-50 font-medium text-emerald-700`}
                />

                <p className="mt-1 text-xs text-gray-400">
                  Dibuat otomatis oleh sistem.
                </p>
              </div>

              {/* Nama Perangkat */}
              <div>
                <label htmlFor="deviceName" className={labelClass}>
                  Nama Perangkat
                </label>

                <input
                  id="deviceName"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(event) =>
                    handleChange("name", event.target.value)
                  }
                  placeholder="Contoh: Server Database"
                  className={inputClass}
                />
              </div>

              {/* Kategori */}
              <div>
                <label htmlFor="category" className={labelClass}>
                  Kategori Perangkat
                </label>

                <select
                  id="category"
                  required
                  value={formData.category}
                  onChange={(event) =>
                    handleChange(
                      "category",
                      event.target.value as DeviceCategory
                    )
                  }
                  className={inputClass}
                >
                  {categoryOptions.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div>
                <label htmlFor="brand" className={labelClass}>
                  Brand / Merek
                </label>

                <input
                  id="brand"
                  type="text"
                  required
                  value={formData.brand}
                  onChange={(event) =>
                    handleChange("brand", event.target.value)
                  }
                  placeholder="Contoh: Cisco"
                  className={inputClass}
                />
              </div>

              {/* Model */}
              <div>
                <label htmlFor="model" className={labelClass}>
                  Model
                </label>

                <input
                  id="model"
                  type="text"
                  required
                  value={formData.model}
                  onChange={(event) =>
                    handleChange("model", event.target.value)
                  }
                  placeholder="Contoh: Catalyst 9200"
                  className={inputClass}
                />
              </div>

              {/* Serial Number */}
              <div>
                <label htmlFor="serialNumber" className={labelClass}>
                  Nomor Seri
                </label>

                <input
                  id="serialNumber"
                  type="text"
                  required
                  value={formData.serialNumber}
                  onChange={(event) =>
                    handleChange("serialNumber", event.target.value)
                  }
                  placeholder="Masukkan nomor seri"
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          {/* Penempatan Perangkat */}
          <section className="border-t border-gray-100 pt-5">
            <div className="mb-3 flex items-center gap-2">
              <MapPin size={18} className="text-emerald-600" />
              <h3 className="text-sm font-semibold text-gray-900">
                Penempatan Perangkat
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Cabang */}
              <div>
                <label htmlFor="branchId" className={labelClass}>
                  Cabang
                </label>

                <select
                  id="branchId"
                  required
                  value={formData.branchId}
                  onChange={(event) =>
                    handleChange("branchId", event.target.value)
                  }
                  className={inputClass}
                >
                  <option value="" disabled>
                    Pilih cabang
                  </option>

                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name} - {branch.city}
                    </option>
                  ))}
                </select>

                {branches.length === 0 && (
                  <p className="mt-1 text-xs text-red-600">
                    Belum ada data cabang tersedia.
                  </p>
                )}
              </div>

              {/* Lokasi */}
              <div>
                <label htmlFor="location" className={labelClass}>
                  Lokasi Detail
                </label>

                <input
                  id="location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={(event) =>
                    handleChange("location", event.target.value)
                  }
                  placeholder="Contoh: Ruang Server Lantai 2"
                  className={inputClass}
                />
              </div>

              {/* Tanggal Pembelian */}
              <div className="sm:col-span-2">
                <label htmlFor="purchaseDate" className={labelClass}>
                  Tanggal Pembelian
                </label>

                <input
                  id="purchaseDate"
                  type="date"
                  value={formData.purchaseDate}
                  onChange={(event) =>
                    handleChange("purchaseDate", event.target.value)
                  }
                  className={inputClass}
                />

                <p className="mt-1 text-xs text-gray-400">
                  Boleh dikosongkan jika tanggal pembelian tidak diketahui.
                </p>
              </div>
            </div>
          </section>

          {/* Kondisi Perangkat */}
          <section className="border-t border-gray-100 pt-5">
            <div className="mb-3 flex items-center gap-2">
              <ClipboardList size={18} className="text-emerald-600" />
              <h3 className="text-sm font-semibold text-gray-900">
                Kondisi Perangkat
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Status */}
              <div>
                <label htmlFor="status" className={labelClass}>
                  Status Perangkat
                </label>

                <select
                  id="status"
                  value={formData.status}
                  onChange={(event) =>
                    handleChange(
                      "status",
                      event.target.value as DeviceStatus
                    )
                  }
                  className={inputClass}
                >
                  <option value="active">Aktif</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="inactive">Tidak Aktif</option>
                </select>
              </div>

              {/* Kondisi */}
              <div>
                <label htmlFor="condition" className={labelClass}>
                  Kondisi Fisik
                </label>

                <select
                  id="condition"
                  value={formData.condition}
                  onChange={(event) =>
                    handleChange(
                      "condition",
                      event.target.value as DeviceCondition
                    )
                  }
                  className={inputClass}
                >
                  <option value="good">Baik</option>
                  <option value="minor-damage">Rusak Ringan</option>
                  <option value="major-damage">Rusak Berat</option>
                </select>
              </div>
            </div>
          </section>

          {/* Catatan */}
          <section className="border-t border-gray-100 pt-5">
            <label htmlFor="notes" className={labelClass}>
              Catatan Tambahan
            </label>

            <textarea
              id="notes"
              rows={3}
              value={formData.notes}
              onChange={(event) =>
                handleChange("notes", event.target.value)
              }
              placeholder="Tambahkan keterangan jika diperlukan..."
              className={inputClass}
            />
          </section>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
            >
              Batal
            </button>

            <button
              type="submit"
              disabled={branches.length === 0}
              className="rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {initialData ? "Simpan Perubahan" : "Simpan Perangkat"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
