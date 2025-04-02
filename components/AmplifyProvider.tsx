'use client';

import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import { useEffect } from 'react';

export default function AmplifyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    Amplify.configure(outputs);
  }, []);

  return <>{children}</>;
}
