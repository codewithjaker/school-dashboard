"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Printer, Home, CreditCard, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function FeeReceiptPage() {
  const invoiceItems = [
    {
      id: 1,
      feesType: "Annual Fees",
      frequency: "Yearly",
      date: "2016-11-19",
      invoiceNumber: "#IN-345609865",
      amount: "$100",
    },
    {
      id: 2,
      feesType: "Tuition Fees",
      frequency: "Monthly",
      date: "2016-11-19",
      invoiceNumber: "#IN-345604565",
      amount: "$50",
    },
  ];

  const subtotal = 150;
  const discount = 10;
  const tax = 14;
  const total = 164;

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/dashboard/main">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/fees">Fees</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Receipt</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="mt-4 text-3xl font-bold tracking-tight">Receipt</h1>
        </div>

        {/* Receipt Card */}
        <Card className="shadow-lg">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">RECEIPT</CardTitle>
                <CardDescription>Invoice #345766</CardDescription>
              </div>
              <Badge variant="outline" className="bg-green-50 text-green-700">
                Paid
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {/* Bill From & Bill To */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Bill From */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">BILL FROM:</h3>
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16">
                    <Image
                      src="/assets/images/invoice_logo.png"
                      alt="University Logo"
                      fill
                      className="rounded-md object-contain"
                    />
                  </div>
                  <div className="text-muted-foreground">
                    <p className="font-medium text-foreground">
                      Aditya University
                    </p>
                    <p>Opp. Town Hall,</p>
                    <p>Sardar Patel Road,</p>
                    <p>Ahmedabad - 380015</p>
                  </div>
                </div>
              </div>

              {/* Bill To */}
              <div className="space-y-4 text-right">
                <h3 className="text-lg font-semibold">BILL TO:</h3>
                <div className="space-y-2">
                  <p className="text-lg font-semibold">Jayesh Patel</p>
                  <div className="text-muted-foreground">
                    <p>207, Prem Sagar Appt.,</p>
                    <p>Near Income Tax Office,</p>
                    <p>Ashram Road,</p>
                    <p>Ahmedabad - 380057</p>
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <div className="flex items-center justify-end gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">Invoice Date:</span>
                    <span className="text-muted-foreground">
                      14th July 2019
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="my-8" />

            {/* Invoice Items Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px] text-center">#</TableHead>
                    <TableHead className="text-right">Fees Type</TableHead>
                    <TableHead className="text-right">Frequency</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                    <TableHead className="text-right">Invoice number</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoiceItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-center font-medium">
                        {item.id}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.feesType}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.frequency}
                      </TableCell>
                      <TableCell className="text-right">{item.date}</TableCell>
                      <TableCell className="text-right">
                        {item.invoiceNumber}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {item.amount}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Totals */}
            <div className="mt-8 flex flex-col items-end space-y-2">
              <div className="w-full max-w-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sub-total:</span>
                  <span className="font-medium">${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount:</span>
                  <span className="font-medium text-green-600">
                    -${discount}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (10%):</span>
                  <span className="font-medium">${tax}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${total}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col justify-end gap-3 sm:flex-row">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                asChild
              >
                <Link href="/payment">
                  <CreditCard className="h-4 w-4" />
                  Proceed to Payment
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2"
                onClick={() => window.print()}
              >
                <Printer className="h-4 w-4" />
                Print Receipt
              </Button>
            </div>

            {/* Footer Note */}
            <div className="mt-8 rounded-lg border bg-gray-50 p-4 text-center text-sm text-muted-foreground">
              <p>
                This is a computer-generated receipt. No signature is required.
              </p>
              <p className="mt-1">
                For any queries, please contact the finance department at
                finance@adityau.edu.in
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
