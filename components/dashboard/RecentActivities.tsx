
import { Clock3 } from "lucide-react";

import { recentActivities } from "@/data/dashboard";

export default function RecentActivities() {
  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-5">
        <div>
          <h2 className="font-semibold text-gray-800">
            Aktivitas Terbaru
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Riwayat perubahan dokumentasi
          </p>
        </div>

        <Clock3 size={20} className="text-gray-400" />
      </div>

      <div className="divide-y divide-gray-100">
        {recentActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex gap-4 p-5 transition hover:bg-gray-50"
          >
            <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />

            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-medium text-gray-800">
                {activity.title}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                {activity.detail}
              </p>

              <p className="mt-2 text-xs text-gray-400">
                {activity.user}
              </p>
            </div>

            <span className="shrink-0 text-xs text-gray-400">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
