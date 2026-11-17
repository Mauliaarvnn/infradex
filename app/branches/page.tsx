
"use client";

import { useState } from "react";
import { Plus, Building2 } from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import BranchStats from "@/components/branches/BranchStats";
import BranchTable from "@/components/branches/BranchTable";
import BranchForm from "@/components/branches/BranchForm";

import { useBranches } from "@/components/providers/BranchProvider";
import type { Branch } from "@/types/branch";

type BranchFormData = Omit<
  Branch,
  "id" | "createdAt" | "updatedAt"
>;

export default function BranchesPage() {
  const { branches, setBranches } = useBranches();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newBranchCode, setNewBranchCode] = useState("");
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(
    null
  );

  // Membuat kode cabang berikutnya secara otomatis
  const generateBranchCode = () => {
    const highestNumber = branches.reduce((highest, branch) => {
      const match = branch.code.match(/^BR(\d+)$/);
      const number = match ? Number(match[1]) : 0;

      return Math.max(highest, number);
    }, 0);

    return `BR${String(highestNumber + 1).padStart(3, "0")}`;
  };

  // Membuka formulir tambah cabang
  const handleAddBranch = () => {
  setSelectedBranch(null);
  setNewBranchCode(generateBranchCode());
  setIsFormOpen(true);
};

  // Membuka formulir edit cabang
  const handleEditBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    setIsFormOpen(true);
  };

  // Menyimpan data cabang baru atau perubahan data
  const handleSubmitBranch = (data: BranchFormData) => {
    const duplicateCode = branches.some(
      (branch) =>
        branch.code.toLowerCase() === data.code.trim().toLowerCase() &&
        branch.id !== selectedBranch?.id
    );

    if (duplicateCode) {
      window.alert("Kode cabang sudah digunakan. Silakan gunakan kode lain.");
      return;
    }

    const now = new Date().toISOString();

    if (selectedBranch) {
      // Memperbarui data cabang
      setBranches((currentBranches) =>
        currentBranches.map((branch) =>
          branch.id === selectedBranch.id
            ? {
                ...branch,
                ...data,
                code: data.code.trim().toUpperCase(),
                updatedAt: now,
              }
            : branch
        )
      );
    } else {
      // Menambahkan cabang baru
      const newBranch: Branch = {
        ...data,
        code: data.code.trim().toUpperCase(),
        id: data.code.trim().toLowerCase(),
        createdAt: now,
        updatedAt: now,
      };

      setBranches((currentBranches) => [
        newBranch,
        ...currentBranches,
      ]);
    }

    setIsFormOpen(false);
    setSelectedBranch(null);
  };

  // Menghapus data cabang
  const handleDeleteBranch = (branch: Branch) => {
    setBranches((currentBranches) =>
      currentBranches.filter((item) => item.id !== branch.id)
    );
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header Halaman */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
              <Building2 size={16} />
              <span>Manajemen Infrastruktur</span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              Manajemen Cabang
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Kelola dan pantau dokumentasi infrastruktur kantor cabang.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddBranch}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800"
          >
            <Plus size={18} />
            Tambah Cabang
          </button>
        </div>

        {/* Statistik Cabang */}
        <BranchStats branches={branches} />

        {/* Daftar Cabang */}
        <BranchTable
          branches={branches}
          onEdit={handleEditBranch}
          onDelete={handleDeleteBranch}
        />

        {/* Form Tambah dan Edit Cabang */}
        {isFormOpen && (
        <BranchForm
          key={selectedBranch?.id ?? "new"}
          initialData={selectedBranch}
          initialCode={newBranchCode}
          availableCities={[
            ...new Set(branches.map((branch) => branch.city)),
          ]}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedBranch(null);
          }}
          onSubmit={handleSubmitBranch}
        />
        )}
      </div>
    </AppShell>
  );
}
