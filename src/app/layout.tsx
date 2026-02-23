"use client";

import { useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

// export const metadata = {
//   title: "School | University Management System",
//   description: "Modern school administration platform",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
            {/* ROOT WRAPPER */}
            <div className="flex h-screen w-screen overflow-hidden bg-gray-50">
              {/* SIDEBAR */}
              <AppSidebar />

              {/* MAIN AREA */}
              <div className="flex flex-1 flex-col overflow-hidden">
                {/* HEADER */}
                <Header />

                {/* CONTENT */}
                <main className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
                  {/* MOBILE SIDEBAR BUTTON */}
                  <div className="lg:hidden mb-4">
                    <SidebarTrigger className="h-9 w-9" />
                  </div>

                  {/* PAGE CONTENT */}
                  <div className="w-full min-w-0">{children}</div>
                </main>

                {/* FOOTER */}
                <Footer />
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
