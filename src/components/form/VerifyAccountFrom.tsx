import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  InputOTP,
} from "../ui/input-otp";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { useEffect, useState } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { tr } from "zod/locales";
import { useVerifyAccount, useVerifyDoctor } from "@/hooks";
import { toast } from "../ui/toast";

const RESEND_COOLDOWN = 120;

const VerifyAccountFrom = ({
  mode = "patient",
}: {
  mode: "doctor" | "patient";
}) => {
  // const { mutate: verify, isPending: verifyPending } = useVerifyAccount();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const searchParams = useSearchParams();
  const [isInvalid, setIsInvalid] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);
  const { mutate: verifyPatient } = useVerifyAccount();
  const { mutate: verifyDoctor } = useVerifyDoctor();

  const verify = mode === "doctor" ? verifyDoctor : verifyPatient;

  const email = searchParams.get("email") || "";
  //   console.log(email);
  useEffect(() => {
    if (!email) {
      router.push("/");
      return;
    }
  }, [email, router]);
  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);
  const handleOtp = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }
    const verifyData = {
      email,
      otp,
    };

    console.log(verifyData);
    verify(verifyData, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.add({
            title: "Server Failure",
            description: "Something went wrong. Please try again",
            type: "error",
          });
        }
        if (mode === "doctor") {
          toast.add({
            title: "Verification Successful",
            description:
              "An admin will approve your account. This may take time. Please check your email in few days",
            type: "success",
          });
          router.push("/");

          return;
        }

        toast.add({
          title: "Verification Successful",
          description: "Please verify your account",
          type: "success",
        });
        router.push("/");
      },
      onError: (err) => {
        toast.add({
          title: "verification failure",
          description: err.message || "Something went wrong. Please try again",
          type: "error",
        });
      },
    });
  };
  if(!email){
    return null
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>verify your account</CardTitle>
        <CardDescription>Please filll your otp</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-otp"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOtp();
          }}
        >
          <Field data-invalid={isInvalid}>
            <FieldLabel>otp</FieldLabel>
            <InputOTP
              autoComplete="off"
              maxLength={6}
              onChange={(value) => {
                setOtp(value);
                if (isInvalid) {
                  setIsInvalid(false);
                }
              }}
              value={otp}
              name="otp"
              id="otp"
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {isInvalid && (
              <FieldError
                errors={[{ message: "Invalid code.Please try again" }]}
              />
            )}
            <FieldDescription>Resend in {resendTimer}</FieldDescription>
          </Field>
        </form>
      </CardContent>
      <CardFooter>
        <Button disabled={resendTimer > 0}>Resend</Button>
        <Button type="submit" form="form-otp">
          submit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerifyAccountFrom;
