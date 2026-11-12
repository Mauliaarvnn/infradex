
import {
  HardDrive,
  Cable,
  Network,
  FileText,
} from "lucide-react";

import { documentationOverview } from "@/data/dashboard";

const documentationItems = [
  {
    id: "racks",
    label: "Dokumentasi Rak",
    description: "Dokumentasi rack server",
    value: documentationOverview.rackDocuments,
    icon: HardDrive,
  },
  {
    id: "cables",
    label: "Jalur Kabel",
    description: "Dokumentasi koneksi kabel",
    value: documentationOverview.cableRoutes,
    icon: Cable,
  },
  {
    id: "topologies",
    label: "Topologi Jaringan",
    description: "Dokumen topologi jaringan",
    value: documentationOverview.topologies,
    icon: Network,
  },
];

export default function DocumentationOverview() {
  const totalDocuments = documentationItems.reduce(
    (total, item) => total + item.value,
    0
  );

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-gray-800">
            Dokumentasi Infrastruktur
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Ringkasan dokumentasi infrastruktur jaringan
          </p>
        </div>

        <FileText size={20} className="text-gray-400" />
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-500">
          Total Dokumentasi
        </p>

        <h3 className="mt-1 text-3xl font-bold text-gray-800">
          {totalDocuments}
        </h3>
      </div>

      <div className="mt-5 space-y-3">
        {documentationItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border border-gray-100 p-3 transition hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  <Icon size={20} />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {item.label}
                  </p>

                  <p className="mt-1 text-xs text-gray-400">
                    {item.description}
                  </p>
                </div>
              </div>

              <span className="text-lg font-semibold text-gray-800">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
