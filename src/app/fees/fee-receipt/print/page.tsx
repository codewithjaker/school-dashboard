"use client";

import { useEffect } from "react";

export default function PrintReceiptPage() {
  useEffect(() => {
    window.print();
    setTimeout(() => {
      window.close();
    }, 1000);
  }, []);

  return (
    <div className="print-container p-8">
      {/* Same receipt content but optimized for printing */}
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">RECEIPT</h1>
          <p className="text-gray-600">Invoice #345766</p>
          <div className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-800">
            PAID
          </div>
        </div>
        {/* Add all receipt content here without interactive elements */}
      </div>
    </div>
  );
}
