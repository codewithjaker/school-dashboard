"use client";

import { ChevronDown, GraduationCap, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuData } from "@/data/homeData";

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-")
    .replace(/ & |, |\s+/g, "-");
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" className="border-r bg-white">
      <div className="flex h-16 items-center border-b bg-white px-6">
        <Link
          href="/dashboard/admin-main"
          className="flex items-center gap-3 group"
        >
          {/* Logo Icon Container */}
          <div className="flex items-center justify-center h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md transition-transform duration-200 group-hover:scale-105">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>

          {/* Brand Text */}
          <div className="flex flex-col leading-tight">
            <span className="text-base font-semibold text-gray-800 tracking-wide">
              EduMatrix
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Pro ERP System
            </span>
          </div>
        </Link>
      </div>

      <SidebarContent className="pt-4 px-2">
        {menuData.map((module) => {
          const isModuleActive = module.submodules.some((sub) =>
            pathname.startsWith(sub.href),
          );

          return (
            <Collapsible
              key={module.module_id}
              defaultOpen={isModuleActive}
              className="group/collapsible"
            >
              <SidebarGroup>
                {/* MODULE HEADER */}
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 transition">
                    {/* Left */}
                    <div className="flex items-center gap-3">
                      <span className="text-gray-600 text-lg">
                        {module.icon}
                      </span>
                      <span className="text-sm font-semibold text-gray-800">
                        {module.module_name}
                      </span>
                    </div>

                    {/* Right Chevron */}
                    <ChevronDown
                      className="h-4 w-4 text-gray-400 transition-transform duration-200
                group-data-[state=open]/collapsible:rotate-180"
                    />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>

                {/* SUB MENU */}
                <CollapsibleContent>
                  <SidebarGroupContent className="mt-1">
                    <SidebarMenu className="space-y-1">
                      {module.submodules.map((submodule) => {
                        const isActive = pathname === submodule.href;

                        return (
                          <SidebarMenuItem key={submodule.sub_module_id}>
                            <SidebarMenuButton asChild>
                              <Link
                                href={submodule.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200
                          ${
                            isActive
                              ? "bg-blue-50 text-blue-700 font-medium shadow-sm border-l-4 border-blue-600"
                              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                          }`}
                              >
                                <span
                                  className={`text-base ${
                                    isActive ? "text-blue-600" : "text-gray-400"
                                  }`}
                                >
                                  {submodule.sub_module_icon}
                                </span>

                                <span className="truncate">
                                  {submodule.sub_module_display_name}
                                </span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>

              <SidebarSeparator className="my-3 opacity-50" />
            </Collapsible>
          );
        })}
      </SidebarContent>
    </Sidebar>
  );
}
