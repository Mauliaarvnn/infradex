
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import type {
  Branch,
  BranchCity,
} from "@/types/branch";

interface BranchTableProps {
  branches: Branch[];
  onEdit: (branch: Branch) => void;
  onDelete: (branch: Branch) => void;
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

const PAGE_SIZE = 8;

export default function BranchTable({
  branches,
  onEdit,
  onDelete,
}: BranchTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBranches = useMemo(() => {
    return branches.filter((branch) => {
      const matchesSearch =
        branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        branch.code.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCity =
        selectedCity === "all" || branch.city === selectedCity;

      return matchesSearch && matchesCity;
    });
  }, [branches, searchQuery, selectedCity]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBranches.length / PAGE_SIZE)
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedBranches = filteredBranches.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  const getStatusLabel = (status: Branch["documentationStatus"]) => {
    switch (status) {
      case "complete":
        return "Lengkap";
      case "incomplete":
        return "Belum Lengkap";
      case "not-started":
        return "Belum Dimulai";
    }
  };

  const getStatusStyle = (status: Branch["documentationStatus"]) => {
    switch (status) {
      case "complete":
        return "bg-green-50 text-green-700";
      case "incomplete":
        return "bg-amber-50 text-amber-700";
      case "not-started":
        return "bg-gray-100 text-gray-600";
    }
  };

  const handleDelete = (branch: Branch) => {
    const confirmed = window.confirm(
      `Apakah kamu yakin ingin menghapus ${branch.name}?`
    );

    if (confirmed) {
      onDelete(branch);
    }
  };

  const startItem =
    filteredBranches.length === 0
      ? 0
      : (safePage - 1) * PAGE_SIZE + 1;

  const endItem = Math.min(
    safePage * PAGE_SIZE,
    filteredBranches.length
  );

  return (
    <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header Tabel */}
      <div className="flex flex-col gap-4 border-b border-gray-200 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Daftar Cabang
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Kelola dan pantau seluruh data kantor cabang.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Pencarian */}
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Cari nama atau kode cabang..."
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                setCurrentPage(1);
              }}
              aria-label="Cari nama atau kode cabang"
              className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 sm:w-56"
            />
          </div>

          {/* Filter Kota */}
          <select
            value={selectedCity}
            onChange={(event) => {
              setSelectedCity(event.target.value);
              setCurrentPage(1);
            }}
            aria-label="Filter berdasarkan kota"
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-700 outline-none transition focus:border-emerald-500"
          >
            <option value="all">Semua Kota</option>

            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Isi Tabel */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-5 py-4 font-semibold">Kode Cabang</th>
              <th className="px-5 py-4 font-semibold">Nama Cabang</th>
              <th className="px-5 py-4 font-semibold">Kota</th>
              <th className="px-5 py-4 font-semibold">Alamat</th>
              <th className="px-5 py-4 font-semibold">
                Status Dokumentasi
              </th>
              <th className="px-5 py-4 text-center font-semibold">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {paginatedBranches.length > 0 ? (
              paginatedBranches.map((branch) => (
                <tr
                  key={branch.id}
                  className="transition hover:bg-gray-50"
                >
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-700">
                    {branch.code}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-900">
                    {branch.name}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-gray-600">
                    {branch.city}
                  </td>

                  <td className="max-w-xs truncate px-5 py-4 text-gray-500">
                    {branch.address}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle(branch.documentationStatus)}`}
                    >
                      {getStatusLabel(branch.documentationStatus)}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/branches/${branch.id}`}
                        title="Lihat detail"
                        aria-label={`Lihat detail ${branch.name}`}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-blue-50 hover:text-blue-600"
                      >
                        <Eye size={17} />
                      </Link>

                      <button
                        type="button"
                        title="Edit cabang"
                        aria-label={`Edit ${branch.name}`}
                        onClick={() => onEdit(branch)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-amber-50 hover:text-amber-600"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        type="button"
                        title="Hapus cabang"
                        aria-label={`Hapus ${branch.name}`}
                        onClick={() => handleDelete(branch)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-12 text-center text-gray-500"
                >
                  Tidak ada data cabang yang ditemukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Navigasi Halaman */}
      <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">
          Menampilkan {startItem}–{endItem} dari{" "}
          {filteredBranches.length} cabang
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={safePage === 1}
            onClick={() => setCurrentPage(safePage - 1)}
            aria-label="Halaman sebelumnya"
            className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="px-2 text-sm text-gray-600">
            Halaman {safePage} dari {totalPages}
          </span>

          <button
            type="button"
            disabled={safePage === totalPages}
            onClick={() => setCurrentPage(safePage + 1)}
            aria-label="Halaman berikutnya"
            className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
