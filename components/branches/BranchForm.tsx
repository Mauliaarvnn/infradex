
"use client";

import { useState, type FormEvent } from "react";
import { X, Plus, MapPin } from "lucide-react";

import type {
  Branch,
  BranchCity,
  BranchAddress,
} from "@/types/branch";

type BranchFormData = Omit<
  Branch,
  "id" | "createdAt" | "updatedAt"
>;

interface BranchFormProps {
  initialData?: Branch | null;
  initialCode: string;
  availableCities: BranchCity[];
  onClose: () => void;
  onSubmit: (data: BranchFormData) => void;
}

// Format nomor telepon agar mudah dibaca
function formatPhoneNumber(value: string) {
  const digits = value.replace(/\D/g, "");

  if (!digits) return "";

  const firstGroup = digits.slice(0, 4);
  const secondGroup = digits.slice(4, 8);
  const thirdGroup = digits.slice(8, 12);
  const fourthGroup = digits.slice(12, 13);

  return [
    firstGroup,
    secondGroup,
    thirdGroup,
    fourthGroup,
  ]
    .filter(Boolean)
    .join("-");
}

// Normalisasi nomor telepon Indonesia
function normalizePhoneNumber(value: string) {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("62")) {
    digits = `0${digits.slice(2)}`;
  } else if (digits.startsWith("8")) {
    digits = `0${digits}`;
  }

  return digits.slice(0, 13);
}

export default function BranchForm({
  initialData,
  initialCode,
  availableCities,
  onClose,
  onSubmit,
}: BranchFormProps) {
  const [formData, setFormData] = useState<BranchFormData>({
    code: initialData?.code ?? initialCode,
    name: initialData?.name ?? "",
    city: initialData?.city ?? availableCities[0] ?? "Medan",

    address: initialData?.address ?? {
      street: "",
      number: "",
      village: "",
      district: "",
      postalCode: "",
    },

    phone: initialData?.phone ?? "",
    email: initialData?.email ?? "",
    documentationStatus:
      initialData?.documentationStatus ?? "not-started",
  });

  const [newCity, setNewCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const inputClass =
    "w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

  const labelClass =
    "mb-1.5 block text-sm font-medium text-gray-700";

  // Mengubah data formulir
  const handleChange = (
    field: keyof BranchFormData,
    value: string
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  // Mengubah bagian alamat
  const handleAddressChange = (
    field: keyof BranchAddress,
    value: string
  ) => {
    setFormData((current) => ({
      ...current,
      address: {
        ...current.address,
        [field]: value,
      },
    }));
  };

  // Menambahkan kota baru
  const handleAddCity = () => {
    const cityName = newCity.trim().replace(/\s+/g, " ");

    if (!cityName) {
      setCityError("Nama kota harus diisi.");
      return;
    }

    const alreadyExists = availableCities.some(
      (city) => city.toLowerCase() === cityName.toLowerCase()
    );

    if (alreadyExists) {
      setCityError("Kota tersebut sudah tersedia.");
      return;
    }

    setFormData((current) => ({
      ...current,
      city: cityName,
    }));

    setNewCity("");
    setCityError("");
  };

  // Mengubah nomor telepon
  const handlePhoneChange = (value: string) => {
    const normalized = normalizePhoneNumber(value);

    setFormData((current) => ({
      ...current,
      phone: normalized,
    }));

    setPhoneError("");
  };

  // Validasi dan simpan formulir
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const phonePattern = /^0\d{9,12}$/;

    if (!phonePattern.test(formData.phone)) {
      setPhoneError(
        "Nomor telepon harus terdiri dari 10–13 digit dan diawali angka 0."
      );
      return;
    }

    onSubmit({
      ...formData,
      code: formData.code.trim().toUpperCase(),
      name: formData.name.trim(),
      city: formData.city.trim(),
      phone: formData.phone,
      email: formData.email.trim(),
      address: {
        street: formData.address.street.trim(),
        number: formData.address.number.trim(),
        village: formData.address.village.trim(),
        district: formData.address.district.trim(),
        postalCode: formData.address.postalCode.trim(),
      },
    });
  };

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

          {/* Informasi Cabang */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Informasi Cabang
            </h3>

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
              <div className="sm:col-span-2">
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
                  {[...new Set([...availableCities, formData.city])]
                    .sort((a, b) => a.localeCompare(b, "id"))
                    .map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                </select>

                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <input
                    type="text"
                    value={newCity}
                    onChange={(event) => {
                      setNewCity(event.target.value);
                      setCityError("");
                    }}
                    placeholder="Masukkan nama kota baru"
                    aria-label="Nama kota baru"
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={handleAddCity}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-emerald-600 px-4 py-2.5 text-sm font-medium text-emerald-700 transition hover:bg-emerald-50"
                  >
                    <Plus size={17} />
                    Tambah Kota
                  </button>
                </div>

                {cityError && (
                  <p className="mt-1 text-xs text-red-600">
                    {cityError}
                  </p>
                )}

                <p className="mt-1 text-xs text-gray-400">
                  Kota baru akan tersedia setelah cabang disimpan.
                </p>
              </div>

              {/* Status Dokumentasi */}
              <div className="sm:col-span-2">
                <label
                  htmlFor="documentationStatus"
                  className={labelClass}
                >
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
          </div>

          {/* Alamat */}
          <div className="border-t border-gray-100 pt-5">
            <div className="mb-3 flex items-center gap-2">
              <MapPin size={18} className="text-emerald-600" />
              <h3 className="text-sm font-semibold text-gray-900">
                Alamat Kantor Cabang
              </h3>
            </div>

            {/* Nama Jalan */}
            <div className="mb-4">
              <label htmlFor="street" className={labelClass}>
                Nama Jalan
              </label>

              <div className="flex overflow-hidden rounded-lg border border-gray-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100">
                <span className="flex items-center bg-gray-50 px-3 text-sm font-medium text-gray-600">
                  Jl.
                </span>

                <input
                  id="street"
                  type="text"
                  required
                  value={formData.address.street}
                  onChange={(event) =>
                    handleAddressChange("street", event.target.value)
                  }
                  placeholder="Contoh: Gatot Subroto"
                  className="w-full px-3 py-2.5 text-sm text-gray-800 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Nomor Bangunan */}
              <div>
                <label htmlFor="number" className={labelClass}>
                  Nomor Bangunan
                </label>

                <input
                  id="number"
                  type="text"
                  value={formData.address.number}
                  onChange={(event) =>
                    handleAddressChange("number", event.target.value)
                  }
                  placeholder="Contoh: 123"
                  className={inputClass}
                />
              </div>

              {/* Kode Pos */}
              <div>
                <label htmlFor="postalCode" className={labelClass}>
                  Kode Pos
                </label>

                <input
                  id="postalCode"
                  type="text"
                  required
                  inputMode="numeric"
                  maxLength={5}
                  value={formData.address.postalCode}
                  onChange={(event) =>
                    handleAddressChange(
                      "postalCode",
                      event.target.value.replace(/\D/g, "").slice(0, 5)
                    )
                  }
                  pattern="[0-9]{5}"
                  placeholder="Contoh: 20111"
                  className={inputClass}
                />
              </div>

              {/* Kelurahan */}
              <div>
                <label htmlFor="village" className={labelClass}>
                  Kelurahan / Desa
                </label>

                <input
                  id="village"
                  type="text"
                  required
                  value={formData.address.village}
                  onChange={(event) =>
                    handleAddressChange("village", event.target.value)
                  }
                  placeholder="Contoh: Petisah Tengah"
                  className={inputClass}
                />
              </div>

              {/* Kecamatan */}
              <div>
                <label htmlFor="district" className={labelClass}>
                  Kecamatan
                </label>

                <input
                  id="district"
                  type="text"
                  required
                  value={formData.address.district}
                  onChange={(event) =>
                    handleAddressChange("district", event.target.value)
                  }
                  placeholder="Contoh: Medan Petisah"
                  className={inputClass}
                />
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              Awalan jalan akan menggunakan format Jl. secara otomatis.
              Lengkapi alamat sesuai informasi yang benar.
            </p>
          </div>

          {/* Kontak */}
          <div className="border-t border-gray-100 pt-5">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Informasi Kontak
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              {/* Nomor Telepon */}
              <div>
                <label htmlFor="phone" className={labelClass}>
                  Nomor Telepon
                </label>

                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  required
                  value={formatPhoneNumber(formData.phone)}
                  onChange={(event) =>
                    handlePhoneChange(event.target.value)
                  }
                  placeholder="0812-3456-7890"
                  aria-describedby="phone-help"
                  className={inputClass}
                />

                <p id="phone-help" className="mt-1 text-xs text-gray-400">
                  Masukkan 10–13 digit. Contoh: 0812-3456-7890.
                  Awalan +62 juga didukung.
                </p>

                {phoneError && (
                  <p className="mt-1 text-xs text-red-600">
                    {phoneError}
                  </p>
                )}
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
                  placeholder="contoh@email.com"
                  className={inputClass}
                />
              </div>
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
