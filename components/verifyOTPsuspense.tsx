import { Suspense } from "react";


 export const VerifyOTPSuspense = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        {children}
    </Suspense>
  );
}