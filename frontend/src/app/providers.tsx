'use client';

import { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <>
      {/* Add global providers here (e.g., Auth, Theme, etc.) */}
      {children}
    </>
  );
}
