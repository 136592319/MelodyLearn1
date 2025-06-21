'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Don't render the button on the homepage
  if (pathname === '/') {
    return null;
  }

  return (
    <button
      onClick={() => router.back()}
      className="absolute top-24 left-6 z-10 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg shadow-sm hover:bg-purple-200 transition-colors font-semibold"
    >
      ← Back to Previous
    </button>
  );
} 