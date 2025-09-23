"use client";

import { useState } from "react";
import { Menu, X, Home, BookOpen, Settings, User, Calendar, BarChart3, FileText, LogOut } from "lucide-react";

const NavigationSidebar = function({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Navigation items - customize these based on your project pages
  const navigationItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home, current: false },
    { name: "Journal", href: "/journal", icon: BookOpen, current: true },
    { name: "Analytics", href: "/analytics", icon: BarChart3, current: false },
    { name: "Calendar", href: "/calendar", icon: Calendar, current: false },
    { name: "Reports", href: "/reports", icon: FileText, current: false },
    { name: "Profile", href: "/profile", icon: User, current: false },
    { name: "Settings", href: "/settings", icon: Settings, current: false },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-base-200 to-base-300">
      {/* Navigation Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-base-100 shadow-xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-base-300">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <BookOpen className="h-8 w-8 text-accent" />
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-semibold text-base-content">Your App</h1>
            </div>
          </div>
          <button
            className="lg:hidden btn btn-ghost btn-sm"
            onClick={function() { setSidebarOpen(false); }}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {navigationItems.map(function(item) {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                    item.current
                      ? 'bg-accent text-accent-content'
                      : 'text-base-content hover:bg-base-200 hover:text-base-content'
                  }`}
                >
                  <Icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      item.current ? 'text-accent-content' : 'text-base-content/60'
                    }`}
                  />
                  {item.name}
                </a>
              );
            })}
          </div>
        </nav>

        {/* User section at bottom */}
        <div className="absolute bottom-0 w-full p-4 border-t border-base-300">
          <div className="flex items-center">
            <div className="avatar placeholder">
              <div className="bg-accent text-accent-content rounded-full w-8">
                <span className="text-xs">U</span>
              </div>
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-base-content">User Name</p>
              <p className="text-xs text-base-content/60">user@example.com</p>
            </div>
            <button className="btn btn-ghost btn-sm">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={function() { setSidebarOpen(false); }}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar for mobile */}
        <div className="lg:hidden bg-base-100 shadow-sm border-b border-base-300">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              className="btn btn-ghost btn-sm"
              onClick={function() { setSidebarOpen(true); }}
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-lg font-semibold text-base-content">Page Title</h1>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>
        </div>

        {/* Main content area */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default NavigationSidebar;