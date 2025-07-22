"use client";

import * as Yup from "yup";
import FormikErrorBox from "@/components/shared/formik-error-box";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { CircleCheck, X } from "lucide-react";
import { useState } from "react";

function SuccessMessage({ onClose }) {
  return (
    <div className="rounded-lg border border-border p-4">
      <div className="flex grow gap-3">
        <CircleCheck
          className="mt-1 shrink-0 text-emerald-500"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
        <div className="flex grow flex-col gap-3">
          <div className="space-y-1">
            <p className="font-medium">Password reset link has been sent</p>
            <p className="text-sm text-muted-foreground">
              {`Please check your email for further instructions. If you don't
                receive an email, please check your spam folder.`}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
          aria-label="Close notification"
          onClick={onClose}
        >
          <X
            size={16}
            strokeWidth={2}
            className="opacity-60 transition-opacity group-hover:opacity-100"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  );
}

export default function ForgotPassword() {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [showSuccess, setShowSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await forgotPassword(values).unwrap();
        formik.resetForm();
        if (res.success) {
          setShowSuccess(true);
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <div className="mx-auto min-h-svh content-center sm:max-w-lg">
      <div className="space-y-8 px-5 py-10 sm:rounded-md sm:bg-white sm:px-8 sm:shadow">
        {showSuccess && (
          <SuccessMessage onClose={() => setShowSuccess(false)} />
        )}

        <div>
          <h2 className="text-2xl font-semibold tracking-tight first:mt-0">
            Forgot Password
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            {`Enter your email address and we'll send you a link to reset your password.`}
          </p>

          <form onSubmit={formik.handleSubmit} className="mt-4 space-y-4">
            <div>
              <Label htmlFor="email" required>
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <FormikErrorBox formik={formik} field="email" />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Reset Password"}
            </Button>

            <p className="text-center text-sm font-medium leading-none">
              Remember your password?{" "}
              <Link href={"/login"}>
                <Button variant="link" className="p-0 font-bold">
                  Login
                </Button>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
