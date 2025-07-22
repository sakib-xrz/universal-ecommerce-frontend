"use client";

import * as Yup from "yup";
import FormikErrorBox from "@/components/shared/formik-error-box";
import { Button } from "@/components/ui/button";
import Label from "@/components/ui/label";
import Password from "@/components/ui/password";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BASE_URL } from "@/utils/constant";
import { toast } from "sonner";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push("/forgot-password");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      const payload = {
        newPassword: values.password,
      };

      setIsLoading(true);

      fetch(`${BASE_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${token}`,
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (res.ok) {
            toast.success("Password reset successful");
            router.push("/login");
          }
        })
        .catch((error) => {
          console.error(error);
          toast.error("Password reset failed");
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  return (
    <div className="mx-auto min-h-svh content-center sm:max-w-lg">
      <div className="space-y-8 px-5 py-10 sm:rounded-md sm:bg-white sm:px-8 sm:shadow">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight first:mt-0">
            Reset Password
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            {`Enter your new password and confirm it to reset your password.`}
          </p>

          <form onSubmit={formik.handleSubmit} className="mt-4 space-y-4">
            <div>
              <Label htmlFor="password" required>
                Password
              </Label>
              <Password
                id="password"
                name="password"
                placeholder="Enter your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <FormikErrorBox formik={formik} field="password" />
            </div>

            <div>
              <Label htmlFor="confirmPassword" required>
                Confirm Password
              </Label>
              <Password
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              <FormikErrorBox formik={formik} field="confirmPassword" />
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Reset Password
            </Button>

            <p className="text-center text-sm font-medium leading-none">
              <Link href={"/forgot-password"}>
                <Button variant="link" className="p-0 font-bold">
                  Back to Forgot Password
                </Button>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
