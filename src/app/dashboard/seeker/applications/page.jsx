import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/sessions';
import React from 'react';
import ApplicationTable from './ApplicationTable';


const ApplicationsPage = async () => {
  const user = await getUserSession();
  
  if (!user) {
    return (
      <div className="p-6 text-center text-default-500">
        Please log in to view your applications.
      </div>
    );
  }

  // ডেটাবেস থেকে ডেটা ফেচ করা
  const rawJobs = await getApplicationsByApplicant(user.id);

  // ⚠️ ম্যাজিক ফিক্স: MongoDB ObjectIds এবং Dates কে প্লেন স্ট্রিং এ কনভার্ট করা
  // এর ফলে ক্লায়েন্ট কম্পোনেন্টে আর কোনো কালেকশন বা সিরিয়ালাইজেশন এরর আসবে না
  const jobs = JSON.parse(JSON.stringify(rawJobs));

  return (
    <div className="p-6 md:p-8 max-w-[1200px] mx-auto w-full">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">
          My Applications ({jobs?.length || 0})
        </h2>
      </div>

      {/* স্ট্রিং এ কনভার্ট করা ডেটা টেবিলে পাঠানো হচ্ছে */}
      <ApplicationTable applications={jobs} />
    </div>
  );
};

export default ApplicationsPage;