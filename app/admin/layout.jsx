import AdminSidebar from "@/components/admin-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";

export default function AdminLayout({ children }) {
  return (
    <SidebarProvider>
      {/* 1. sidebar section */}
      <AdminSidebar />

      {/* 2. Main content section */}
      <SidebarInset>
        <header className="sticky top-0 z-50 border-b bg-background">
          <div className="flex items-center justify-between h-16 px-4">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>

            {/* User Dropdown Navigation */}
            <div className="bg-red-400 rounded-full h-10 w-10 flex justify-center items-center">DC</div>
          </div>
        </header>
        <div className="flex-1 p-4 md:p-8">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
