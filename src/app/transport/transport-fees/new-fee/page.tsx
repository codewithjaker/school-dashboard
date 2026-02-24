// app/transport/transport-fees/new-fee/page.tsx
import React from 'react';
import { NewFeeForm } from './components/new-fee-form';
// import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
  title: 'New Fee - Transport Management',
  description: 'Add a new transportation fee record',
};

export default function NewFeePage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* <PageHeader
        title="New Fee"
        description="Add a new transportation fee record for a student"
      /> */}
      
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Fee Details</CardTitle>
          <CardDescription>
            Enter all required information about the fee payment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NewFeeForm />
        </CardContent>
      </Card>
    </div>
  );
}