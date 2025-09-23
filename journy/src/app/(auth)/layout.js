import Logo from "@/components/Logo";
import React from "react";

function Layout({ children }) {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      <Logo />
      <div className="mt-12">{children}</div>
    </div>
  );
}

export default Layout;
