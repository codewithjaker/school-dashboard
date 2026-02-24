"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Download,
  Printer,
  Home,
  Mail,
  Building,
  User,
  FileText,
  Calendar,
  BadgeDollarSign,
  Shield,
  Receipt,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Define types
interface SalaryItem {
  description: string;
  amount: number;
}

interface PayslipData {
  id: string;
  month: string;
  paymentDate: Date;
  employee: {
    name: string;
    id: string;
    address: string[];
    email: string;
  };
  company: {
    name: string;
    address: string[];
    email: string;
  };
  earnings: SalaryItem[];
  deductions: SalaryItem[];
  netPay: number;
  netPayInWords: string;
  hrManager: {
    name: string;
    title: string;
  };
}

// Mock data - In real app, fetch from API
const payslipData: PayslipData = {
  id: "859654",
  month: "June 2022",
  paymentDate: new Date("2022-07-02"),
  employee: {
    name: "Sarah Smith",
    id: "EMP-0025",
    address: ["A 507 Parimal Hights", "Near Shyamal Cross, Ahmedabad", "India"],
    email: "sarah@einfosoft.com",
  },
  company: {
    name: "EInfosoft Technology",
    address: ["52, Titanium software hub", "Gift city, Gandhinagar", "India"],
    email: "hr@einfosoft.com",
  },
  earnings: [
    { description: "Basic Salary", amount: 8568.0 },
    { description: "House Rent Allowance", amount: 125.0 },
    { description: "Dearness Allowance", amount: 87.0 },
    { description: "Special Allowance", amount: 50.0 },
    { description: "Performance Bonus", amount: 75.0 },
  ],
  deductions: [
    { description: "Provident Fund", amount: 10.0 },
    { description: "Professional Tax", amount: 20.0 },
    { description: "ESI", amount: 0.0 },
    { description: "Home Loan", amount: 210.0 },
    { description: "TDS", amount: 113.0 },
  ],
  netPay: 8552.0,
  netPayInWords: "Eight Thousand Five Hundred Fifty Two Dollars Only",
  hrManager: {
    name: "Priya Jain",
    title: "HR Manager",
  },
};

const SalaryTable = ({
  title,
  items,
  total,
}: {
  title: string;
  items: SalaryItem[];
  total: number;
}) => {
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-4 py-2 border-b">
            <div className="font-medium">Description</div>
            <div className="font-medium text-right">Amount</div>
          </div>
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 py-2 border-b">
              <div className="text-muted-foreground">{item.description}</div>
              <div className="text-right font-medium">
                $
                {item.amount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4 py-3 font-bold text-lg">
            <div>Total {title}</div>
            <div className="text-right">
              ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const DetailCard = ({
  title,
  icon: Icon,
  details,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  details: {
    name: string;
    lines: string[];
    email: string;
  };
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Icon className="h-5 w-5" />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h5 className="font-semibold text-lg">{details.name}</h5>
          {details.lines.map((line, index) => (
            <p key={index} className="text-muted-foreground">
              {line}
            </p>
          ))}
          <div className="flex items-center space-x-2 pt-2">
            <Mail className="h-4 w-4" />
            <a
              href={`mailto:${details.email}`}
              className="text-primary hover:underline"
            >
              {details.email}
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function PayslipPage() {
  const totalEarnings = payslipData.earnings.reduce(
    (sum, item) => sum + item.amount,
    0,
  );
  const totalDeductions = payslipData.deductions.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Implement download logic here
    console.log("Downloading payslip...");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/admin/dashboard"
              className="flex items-center gap-2"
            >
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/students">Payroll</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Payslip</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Employee Payslip
          </h1>
          <p className="text-muted-foreground">
            View and manage employee salary details
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      {/* Main Payslip Card */}
      <Card className="border-2 shadow-lg">
        <CardContent className="p-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-6 mb-6">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Receipt className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Cliniva Hospital</h2>
                <p className="text-muted-foreground">
                  Professional Healthcare Services
                </p>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold">PAYSLIP</h3>
              <p className="text-lg text-muted-foreground">
                For the month of {payslipData.month}
              </p>
            </div>
          </div>

          {/* Payslip Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
              <FileText className="h-5 w-5" />
              <div>
                <p className="text-sm text-muted-foreground">Payslip No.</p>
                <p className="font-semibold">{payslipData.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-muted/50 rounded-lg">
              <Calendar className="h-5 w-5" />
              <div>
                <p className="text-sm text-muted-foreground">Payment Date</p>
                <p className="font-semibold">
                  {format(payslipData.paymentDate, "MMM dd, yyyy")}
                </p>
              </div>
            </div>
          </div>

          {/* Company & Employee Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <DetailCard
              title="Company Details"
              icon={Building}
              details={{
                name: payslipData.company.name,
                lines: payslipData.company.address,
                email: payslipData.company.email,
              }}
            />
            <DetailCard
              title="Employee Details"
              icon={User}
              details={{
                name: payslipData.employee.name,
                lines: [
                  `Employee ID: ${payslipData.employee.id}`,
                  ...payslipData.employee.address,
                ],
                email: payslipData.employee.email,
              }}
            />
          </div>

          {/* Salary Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <SalaryTable
              title="Earnings"
              items={payslipData.earnings}
              total={totalEarnings}
            />
            <SalaryTable
              title="Deductions"
              items={payslipData.deductions}
              total={totalDeductions}
            />
          </div>

          {/* Net Pay Section */}
          <div className="bg-primary/5 rounded-xl p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Net Pay</p>
                <div className="flex items-baseline">
                  <BadgeDollarSign className="h-6 w-6 mr-2" />
                  <span className="text-4xl font-bold">
                    $
                    {payslipData.netPay.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
              <div className="text-center mt-4 md:mt-0">
                <p className="text-sm text-muted-foreground mb-1">
                  Amount in Words
                </p>
                <p className="text-lg font-semibold italic">
                  {payslipData.netPayInWords}
                </p>
              </div>
            </div>
          </div>

          {/* Signature Section */}
          <div className="border-t pt-6">
            <div className="flex flex-col items-end">
              <div className="text-center">
                <div className="h-20 w-40 border-b border-foreground mb-2 flex items-center justify-center">
                  <span className="text-muted-foreground italic">
                    Signature
                  </span>
                </div>
                <div className="font-semibold">
                  {payslipData.hrManager.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {payslipData.hrManager.title}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <Separator className="my-6" />
          <div className="text-center space-y-2 text-sm text-muted-foreground">
            <p>
              This is a computer-generated document. No signature is required.
            </p>
            <p>
              For any queries regarding this payslip, please contact HR
              department.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
