import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-white py-4 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto">
        <div className="text-sm text-gray-600">
          © {currentYear}{" "}
          <Link
            href="http://sbit.com.bd"
            className="font-medium text-primary underline-offset-4 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            SBIT
          </Link>
          . All rights reserved.
        </div>

        <div className="flex items-center gap-6 text-sm">
          <a
            href="#"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            Help Center
          </a>
        </div>

        <div className="text-sm text-gray-500">
          v1.2.0 • Last updated: Today
        </div>
      </div>
    </footer>
  );
}
