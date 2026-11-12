
"use client";

import { useState } from "react";
import { X } from "lucide-react";

import type {
  Branch,
  BranchCity,
} from "@/types/branch";

type BranchFormData = Omit<
  Branch,
  "id" | "createdAt" | "updatedAt"
>;

interface BranchFormProps {
  initialData?: Branch | null;
  initialCode: string;
  onClose: () => void;
  onSubmit: (data: BranchFormData) => void;
}

const cities: BranchCity[] = [
  "Medan",
  "Binjai",
  "Pematangsiantar",
  "Tebing Tinggi",
  "Tanjungbalai",
  "Sibolga",
  "Padangsidimpuan",
  "Gunungsitoli",
];

export default function BranchForm({
  initialData,
  initialCode,
  onClose,
  onSubmit,
}: BranchFormProps) {
  const [formData, setFormData] = useState<BranchFormData>({
  code: initialData?.code ?? initialCode,
  name: initialData?.name ?? "",
  city: initialData?.city ?? "Medan",
  address: initialData?.address ?? "",
  phone: initialData?.phone ?? "",
  email: initialData?.email ?? "",
  documentationStatus:
    initialData?.documentationStatus ?? "not-started",
});

  const handleChange = (
    field: keyof BranchFormData,
    value: string
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formData);
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

  const labelClass =
    "mb-1.5 block text-sm font-medium text-gray-700";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {initialData ? "Edit Data Cabang" : "Tambah Cabang Baru"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Lengkapi informasi kantor cabang.
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Kode Cabang */}
            <div>
              <label htmlFor="code" className={labelClass}>
                Kode Cabang
              </label>

              <input
                id="code"
                type="text"
                required
                value={formData.code}
                onChange={(event) =>
                  handleChange("code", event.target.value)
                }
                placeholder="Contoh: BR065"
                className={inputClass}
              />
            </div>

            {/* Nama Cabang */}
            <div>
              <label htmlFor="name" className={labelClass}>
                Nama Cabang
              </label>

              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(event) =>
                  handleChange("name", event.target.value)
                }
                placeholder="Contoh: KC Medan Baru"
                className={inputClass}
              />
            </div>

            {/* Kota */}
            <div>
              <label htmlFor="city" className={labelClass}>
                Kota
              </label>

              <select
                id="city"
                value={formData.city}
                onChange={(event) =>
                  handleChange("city", event.target.value)
                }
                className={inputClass}
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Dokumentasi */}
            <div>
              <label htmlFor="documentationStatus" className={labelClass}>
                Status Dokumentasi
              </label>

              <select
                id="documentationStatus"
                value={formData.documentationStatus}
                onChange={(event) =>
                  handleChange(
                    "documentationStatus",
                    event.target.value
                  )
                }
                className={inputClass}
              >
                <option value="not-started">Belum Dimulai</option>
                <option value="incomplete">Belum Lengkap</option>
                <option value="complete">Lengkap</option>
              </select>
            </div>
          </div>

          {/* Alamat */}
          <div>
            <label htmlFor="address" className={labelClass}>
              Alamat
            </label>

            <textarea
              id="address"
              required
              rows={3}
              value={formData.address}
              onChange={(event) =>
                handleChange("address", event.target.value)
              }
              placeholder="Masukkan alamat kantor cabang"
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Nomor Telepon */}
            <div>
              <label htmlFor="phone" className={labelClass}>
                Nomor Telepon
              </label>

              <input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(event) =>
                  handleChange("phone", event.target.value)
                }
                placeholder="Masukkan nomor telepon"
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>

              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(event) =>
                  handleChange("email", event.target.value)
                }
                placeholder="Masukkan alamat email"
                className={inputClass}
              />
            </div>
          </div>

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
              className="rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800"
            >
              {initialData ? "Simpan Perubahan" : "Simpan Cabang"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
