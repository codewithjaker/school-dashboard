"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, School, Wallet, Shield } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

// Types
type Channel = "email" | "sms" | "internal";
type Setting = {
  id: string;
  title: string;
  description: string;
  channels: Record<Channel, boolean>;
};
type Group = {
  id: string;
  title: string;
  icon: React.ElementType;
  settings: Setting[];
};

// Initial state (mirrors the Angular template)
const initialGroups: Group[] = [
  {
    id: "academic",
    title: "Academic Notifications",
    icon: School,
    settings: [
      {
        id: "attendance",
        title: "Attendance Alert",
        description: "Notify parents when student is absent.",
        channels: { email: true, sms: true, internal: true },
      },
      {
        id: "exam-results",
        title: "Exam Results",
        description: "Notify when exam results are published.",
        channels: { email: true, sms: false, internal: true },
      },
      {
        id: "homework",
        title: "Homework Assigned",
        description: "Daily notification for new assignments.",
        channels: { email: false, sms: false, internal: true },
      },
    ],
  },
  {
    id: "financial",
    title: "Financial Notifications",
    icon: Wallet,
    settings: [
      {
        id: "fee-reminders",
        title: "Fee Reminders",
        description: "Send reminders for upcoming fee dues.",
        channels: { email: true, sms: true, internal: true },
      },
      {
        id: "payment-confirmation",
        title: "Payment Confirmation",
        description: "Sent after successful fee payment.",
        channels: { email: true, sms: true, internal: false },
      },
      {
        id: "salary-credit",
        title: "Salary Credit",
        description: "Notify staff when salary is credited.",
        channels: { email: true, sms: true, internal: true },
      },
    ],
  },
  {
    id: "system",
    title: "System & Security",
    icon: Shield,
    settings: [
      {
        id: "new-login",
        title: "New Login Alert",
        description: "Alert for logins from new devices.",
        channels: { email: true, sms: false, internal: false },
      },
      {
        id: "password-change",
        title: "Password Change",
        description: "Confirm password change operations.",
        channels: { email: true, sms: true, internal: true },
      },
      {
        id: "system-maintenance",
        title: "System Maintenance",
        description: "Alerts for scheduled downtime.",
        channels: { email: true, sms: false, internal: true },
      },
    ],
  },
];

export default function NotificationSettingsPage() {
  const [groups, setGroups] = useState(initialGroups);

  const handleToggle = (groupId: string, settingId: string, channel: Channel) => {
    setGroups((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              settings: group.settings.map((setting) =>
                setting.id === settingId
                  ? {
                      ...setting,
                      channels: {
                        ...setting.channels,
                        [channel]: !setting.channels[channel],
                      },
                    }
                  : setting
              ),
            }
          : group
      )
    );
  };

  const handleSave = () => {
    // Replace with actual API call or toast notification
    console.log("Saved settings:", groups);
    alert("Settings saved (demo)");
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin/dashboard/main">
                <Home className="h-4 w-4" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/admin/settings">Settings</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>Notification Settings</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Notification Settings</h1>
        <Button onClick={handleSave}>
          <span className="mr-2">Save Changes</span>
        </Button>
      </div>

      {/* Main Card */}
      <Card>
        <CardHeader>
          <CardTitle>
            <strong>Manage</strong> Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {groups.map((group) => (
            <div key={group.id} className="space-y-4">
              {/* Group Title with Icon */}
              <div className="flex items-center gap-2">
                <group.icon className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold">{group.title}</h2>
              </div>
              <Separator />

              {/* Settings List */}
              <div className="space-y-4">
                {group.settings.map((setting) => (
                  <div
                    key={setting.id}
                    className="flex items-center justify-between py-2 border-b last:border-0"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium">{setting.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {setting.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      {/* Email Toggle */}
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs text-muted-foreground">
                          Email
                        </span>
                        <Switch
                          checked={setting.channels.email}
                          onCheckedChange={() =>
                            handleToggle(group.id, setting.id, "email")
                          }
                        />
                      </div>
                      {/* SMS Toggle */}
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs text-muted-foreground">
                          SMS
                        </span>
                        <Switch
                          checked={setting.channels.sms}
                          onCheckedChange={() =>
                            handleToggle(group.id, setting.id, "sms")
                          }
                        />
                      </div>
                      {/* Internal Toggle */}
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs text-muted-foreground">
                          Internal
                        </span>
                        <Switch
                          checked={setting.channels.internal}
                          onCheckedChange={() =>
                            handleToggle(group.id, setting.id, "internal")
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}