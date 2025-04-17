"use client";

import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Sample } from "./components/Sample";

// Create a custom cache instance
const cache = createCache({ key: "custom" });

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={cache}>
        <Sample />
      </CacheProvider>
    </QueryClientProvider>
  );
}
