"use client";

import { usePathname } from "next/navigation";
import NavigationSidebar from './sidebar';

export default function SidebarWrapper({ children }) {
  const pathname = usePathname();

  // Pages that should show the sidebar
  const sidebarPages = ["/dashboard", "/history"];

  const showSidebar = sidebarPages.some((page) => pathname.startsWith(page));

  return (
    <>
      {showSidebar ? (
        <NavigationSidebar>{children}</NavigationSidebar>
      ) : (
        <main>{children}</main>
      )}
    </>
  );
}
