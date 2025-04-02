'use client';

import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json'; 
import { PropsWithChildren } from 'react';

Amplify.configure(outputs);

export default function AmplifyProvider({ children }: PropsWithChildren) {
  return <>{children}</>;
}
