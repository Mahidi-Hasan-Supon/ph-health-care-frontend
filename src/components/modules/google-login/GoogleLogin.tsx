"use client";
import { useRouter } from "next/navigation";
import { useGoogleOAuth } from "@/hooks";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "@/components/ui/toast";


export default function GoogleLoginO() {
  const router = useRouter();
  const { mutate: googleLogin } = useGoogleOAuth();

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      toast.add({
        title: "google OAuth failed",
        description: "Something went wrong",
        type: "error",
      });
      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          toast.add({
            title: "Google login successfully",
            description: "welcome back",
            type: "success",
          });
          router.push("/")
        },
        onError: (err) => {
          toast.add({
            title: "google OAuth failed",
            description: err.message || "Something went wrong",
            type: "error",
          });
        },
      },
    );
  };
  const handleGoogleError = () => {
    toast.add({
      title: "google OAuth failed",
      description: "Something went wrong",
      type: "error",
    });
  };

  return (
      <GoogleLogin
        theme="outline"
        shape="pill"
        text="continue_with"
        onSuccess={
          handleGoogleSuccess
        }
        onError={
          handleGoogleError
        }
        />
  )

}

