'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to verification page by default
    router.push('/verification');
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Candidate Verification System</h1>
        <p className="text-lg text-gray-600">Redirecting to verification...</p>
      </div>
    </main>
  );
}
