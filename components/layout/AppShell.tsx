import Sidebar from "./Sidebar";
import Header from "./Header";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({
  children,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="min-h-screen pl-64">
        <Header />

        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
}