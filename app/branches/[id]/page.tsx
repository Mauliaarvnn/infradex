
"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  MapPin,
  Phone,
  Mail,
  CalendarDays,
  Clock,
  Pencil,
} from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import BranchForm from "@/components/branches/BranchForm";
import { useBranches } from "@/components/providers/BranchProvider";

import type { Branch } from "@/types/branch";

type BranchFormData = Omit<
  Branch,
  "id" | "createdAt" | "updatedAt"
>;

export default function BranchDetailPage() {
  const params = useParams<{ id: string }>();

  const { branches, setBranches } = useBranches();

  const [isFormOpen, setIsFormOpen] = useState(false);

  const branch = branches.find(
    (item) => item.id === params.id
  );

  if (!branch) {
    return (
      <AppShell>
        <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
          <Building2
            className="mx-auto mb-3 text-gray-400"
            size={36}
          />

          <h1 className="text-lg font-semibold text-gray-900">
            Cabang Tidak Ditemukan
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Data cabang yang kamu cari tidak tersedia.
          </p>

          <Link
            href="/branches"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
          >
            <ArrowLeft size={16} />
            Kembali ke Daftar Cabang
          </Link>
        </div>
      </AppShell>
    );
  }

  // Menyimpan perubahan data cabang
  const handleUpdateBranch = (data: BranchFormData) => {
    const duplicateCode = branches.some(
      (item) =>
        item.code.toLowerCase() ===
          data.code.trim().toLowerCase() &&
        item.id !== branch.id
    );

    if (duplicateCode) {
      window.alert(
        "Kode cabang sudah digunakan. Silakan gunakan kode lain."
      );
      return;
    }

    setBranches((currentBranches) =>
      currentBranches.map((item) =>
        item.id === branch.id
          ? {
              ...item,
              ...data,
              code: data.code.trim().toUpperCase(),
              updatedAt: new Date().toISOString(),
            }
          : item
      )
    );

    setIsFormOpen(false);
  };

  // Menyusun alamat dalam format standar
  const address = [
    branch.address.street
      ? `Jl. ${branch.address.street}`
      : "",
    branch.address.number
      ? `No. ${branch.address.number}`
      : "",
    branch.address.village
      ? `Kel. ${branch.address.village}`
      : "",
    branch.address.district
      ? `Kec. ${branch.address.district}`
      : "",
    branch.city,
    branch.address.postalCode,
  ]
    .filter(Boolean)
    .join(", ");

  // Konfigurasi status dokumentasi
  const statusConfig = {
    complete: {
      label: "Lengkap",
      className: "bg-emerald-100 text-emerald-700",
    },
    incomplete: {
      label: "Belum Lengkap",
      className: "bg-amber-100 text-amber-700",
    },
    "not-started": {
      label: "Belum Dikerjakan",
      className: "bg-gray-100 text-gray-600",
    },
  };

  const status = statusConfig[branch.documentationStatus];

  // Format tanggal
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Navigasi Kembali */}
        <Link
          href="/branches"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-emerald-700"
        >
          <ArrowLeft size={18} />
          Kembali ke Daftar Cabang
        </Link>

        {/* Header Detail */}
        <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
              <Building2 size={17} />
              <span>Manajemen Infrastruktur</span>
              <span>/</span>
              <span>Detail Cabang</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              {branch.name}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Kode Cabang: {branch.code}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`w-fit rounded-full px-3 py-1.5 text-sm font-medium ${status.className}`}
            >
              Dokumentasi {status.label}
            </span>

            <button
              type="button"
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800"
            >
              <Pencil size={17} />
              Edit Cabang
            </button>
          </div>
        </div>

        {/* Informasi Cabang */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Informasi Umum */}
          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-5 text-lg font-semibold text-gray-900">
              Informasi Umum
            </h2>

            <div className="space-y-5">
              <div>
                <p className="text-sm text-gray-500">
                  Nama Cabang
                </p>
                <p className="mt-1 font-medium text-gray-900">
                  {branch.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Kode Cabang
                </p>
                <p className="mt-1 font-medium text-gray-900">
                  {branch.code}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Kota
                </p>
                <p className="mt-1 font-medium text-gray-900">
                  {branch.city}
                </p>
              </div>
            </div>
          </section>

          {/* Informasi Kontak */}
          <section className="rounded-xl border border-gray-200 bg-white p-6">
            <h2 className="mb-5 text-lg font-semibold text-gray-900">
              Informasi Kontak
            </h2>

            <div className="space-y-5">
              <div className="flex gap-3">
                <MapPin
                  className="mt-0.5 shrink-0 text-gray-400"
                  size={19}
                />
                <div>
                  <p className="text-sm text-gray-500">
                    Alamat Lengkap
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-900">
                    {address}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Phone
                  className="mt-0.5 shrink-0 text-gray-400"
                  size={19}
                />
                <div>
                  <p className="text-sm text-gray-500">
                    Nomor Telepon
                  </p>
                  <p className="mt-1 font-medium text-gray-900">
                    {branch.phone}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail
                  className="mt-0.5 shrink-0 text-gray-400"
                  size={19}
                />
                <div>
                  <p className="text-sm text-gray-500">
                    Email
                  </p>
                  <p className="mt-1 break-all font-medium text-gray-900">
                    {branch.email}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Status Dokumentasi */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 lg:col-span-2">
            <h2 className="mb-5 text-lg font-semibold text-gray-900">
              Status Dokumentasi
            </h2>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Kondisi dokumentasi infrastruktur cabang
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {status.label}
                </p>
              </div>

              <span
                className={`w-fit rounded-full px-3 py-1.5 text-sm font-medium ${status.className}`}
              >
                {status.label}
              </span>
            </div>
          </section>

          {/* Riwayat Data */}
          <section className="rounded-xl border border-gray-200 bg-white p-6 lg:col-span-2">
            <h2 className="mb-5 text-lg font-semibold text-gray-900">
              Riwayat Data
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex gap-3">
                <CalendarDays
                  className="mt-0.5 text-gray-400"
                  size={19}
                />
                <div>
                  <p className="text-sm text-gray-500">
                    Tanggal Dibuat
                  </p>
                  <p className="mt-1 font-medium text-gray-900">
                    {formatDate(branch.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock
                  className="mt-0.5 text-gray-400"
                  size={19}
                />
                <div>
                  <p className="text-sm text-gray-500">
                    Terakhir Diperbarui
                  </p>
                  <p className="mt-1 font-medium text-gray-900">
                    {formatDate(branch.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Form Edit Cabang */}
        {isFormOpen && (
          <BranchForm
            key={branch.id}
            initialData={branch}
            initialCode={branch.code}
            availableCities={[
              ...new Set(branches.map((item) => item.city)),
            ]}
            onClose={() => setIsFormOpen(false)}
            onSubmit={handleUpdateBranch}
          />
        )}
      </div>
    </AppShell>
  );
}
