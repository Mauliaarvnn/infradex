
"use client";

import { useState } from "react";
import { Server, Plus } from "lucide-react";

import AppShell from "@/components/layout/AppShell";
import DeviceStats from "@/components/devices/DeviceStats";
import DeviceTable from "@/components/devices/DeviceTable";
import DeviceForm from "@/components/devices/DeviceForm";

import { useDevices } from "@/components/providers/DeviceProvider";
import { useBranches } from "@/components/providers/BranchProvider";

import type { Device } from "@/types/device";

type DeviceFormData = Omit<
  Device,
  "id" | "createdAt" | "updatedAt"
>;

export default function DevicesPage() {
  const { devices, setDevices } = useDevices();
  const { branches } = useBranches();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);

  const getNextDeviceCode = () => {
    const highestNumber = devices.reduce((max, device) => {
      const match = device.code.match(/^INV(\d+)$/i);
      const number = match ? Number(match[1]) : 0;

      return Math.max(max, number);
    }, 0);

    return `INV${String(highestNumber + 1).padStart(3, "0")}`;
  };

  // Menambahkan perangkat baru
  const handleAddDevice = (formData: DeviceFormData) => {
    const timestamp = new Date().toISOString();

    const newDevice: Device = {
      ...formData,
      id: `device-${Date.now()}`,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    setDevices((currentDevices) => [
      ...currentDevices,
      newDevice,
    ]);

    setIsFormOpen(false);
  };

  // Membuka form edit
  const handleEditDevice = (device: Device) => {
    setSelectedDevice(device);
    setIsFormOpen(true);
  };

  // Memperbarui perangkat
  const handleUpdateDevice = (formData: DeviceFormData) => {
    if (!selectedDevice) return;

    setDevices((currentDevices) =>
      currentDevices.map((device) =>
        device.id === selectedDevice.id
          ? {
              ...device,
              ...formData,
              code: device.code,
              updatedAt: new Date().toISOString(),
            }
          : device
      )
    );

    setSelectedDevice(null);
    setIsFormOpen(false);
  };

  // Menutup form
  const handleCloseForm = () => {
    setSelectedDevice(null);
    setIsFormOpen(false);
  };

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
        <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
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
          </div>

          <button
            type="button"
            onClick={() => {
              setSelectedDevice(null);
              setIsFormOpen(true);
            }}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800"
          >
            <Plus size={18} />
            Tambah Perangkat
          </button>
        </section>

        {/* Inventory Statistics */}
        <DeviceStats devices={devices} />

        {/* Device Table */}
        <DeviceTable
          devices={devices}
          getBranchName={getBranchName}
          onEdit={handleEditDevice}
        />

        {/* Add / Edit Device Modal */}
        {isFormOpen && (
          <DeviceForm
            key={selectedDevice?.id ?? "new-device"}
            initialCode={
              selectedDevice?.code ?? getNextDeviceCode()
            }
            initialData={selectedDevice}
            branches={branches}
            onClose={handleCloseForm}
            onSubmit={
              selectedDevice
                ? handleUpdateDevice
                : handleAddDevice
            }
          />
        )}
      </div>
    </AppShell>
  );
}
