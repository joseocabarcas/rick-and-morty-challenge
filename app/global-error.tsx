"use client";

import { useRouter } from "next/router";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try Again</button>
        <button
          onClick={() => router.push("/")}
        >
          Back to Home Page
        </button>
      </body>
    </html>
  );
}