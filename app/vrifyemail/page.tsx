import { VerifyOTPSuspense } from "@/components/verifyOTPsuspense";
import VerifyOTP from "@/components/verifyOTP";

export default function page() {
  return (
    <VerifyOTPSuspense>
      <VerifyOTP />
    </VerifyOTPSuspense>
  );
}