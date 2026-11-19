
"use client";

import { Server } from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import DeviceStats from "@/components/devices/DeviceStats";
import DeviceTable from "@/components/devices/DeviceTable";
import { useDevices } from "@/components/providers/DeviceProvider";
import { useBranches } from "@/components/providers/BranchProvider";

export default function DevicesPage() {
  const { devices } = useDevices();
  const { branches } = useBranches();

  const getBranchName = (branchId: string) => {
    return (
      branches.find((branch) => branch.id === branchId)?.name ??
      "Cabang Tidak Ditemukan"
    );
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Page Heading */}
        <section>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-700">
            <Server size={17} />
            <span>Manajemen Infrastruktur</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Inventaris Perangkat
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Kelola dan pantau seluruh aset perangkat infrastruktur
            jaringan dan server.
          </p>
        </section>

        {/* Inventory Statistics */}
        <DeviceStats devices={devices} />

        {/* Device Table */}
        <DeviceTable
          devices={devices}
          getBranchName={getBranchName}
        />
      </div>
    </AppShell>
  );
}
