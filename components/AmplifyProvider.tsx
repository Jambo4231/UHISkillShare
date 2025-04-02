'use client';
 
 import { Amplify } from 'aws-amplify';
 import awsExports from '../aws-exports';
 import { useEffect } from 'react';
 
 export default function AmplifyProvider({
   children,
 }: {
   children: React.ReactNode;
 }) {
   useEffect(() => {
     Amplify.configure(awsExports);
   }, []);
 
   return <>{children}</>;
 }