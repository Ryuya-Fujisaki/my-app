/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-async-client-component */
'use client';
import { useUser } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const { user, isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  if (!isSignedIn) {
    return <div>Sign in to view this page</div>;
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">ようこそ、{user?.firstName}さん。</h1>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded"
        onClick={() => router.push('/quiz/1')}
      >
        次へ
      </button>
    </div>
  )
}