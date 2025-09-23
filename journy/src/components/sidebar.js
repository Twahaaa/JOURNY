"use client";
import { useState } from "react";
import { Home, BookOpen, Settings, LogOut, Menu, X } from "lucide-react";
import  Link  from 'next/link';

const NavigationSidebar = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "History", href: "/history", icon: Settings },
  ];

  return (
    <div data-theme="luxury" className="flex min-h-screen bg-base-200">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-base-100 shadow-xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center justify-between h-16 px-4 border-b border-base-300">
              <Link href="/">
                <h1 className="text-2xl pl-3 font-semibold text-base-content">
                  JOURNY
                </h1>
              </Link>
              
              <button
                className="btn btn-ghost btn-sm lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-5 px-2">
              <div className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="group flex items-center px-3 py-2 text-lg rounded-md text-base-content hover:bg-base-200 hover:text-base-content transition-colors"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="mr-3 h-5 w-5 text-base-content/60" />
                      {item.name}
                    </a>
                  );
                })}
              </div>
            </nav>
          </div>          
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 min-h-screen transition-all duration-300 ${sidebarOpen ? 'lg:ml-72' : ''}`}>
        {children}
      </div>

      <button
        className={`fixed top-4 left-4 z-30 btn btn-ghost btn-sm lg:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </button>
    </div>
  );
};

export default NavigationSidebar;