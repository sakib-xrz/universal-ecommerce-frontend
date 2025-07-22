"use client";

import * as Yup from "yup";
import Image from "next/image";
import logo from "@/public/images/logo.svg";
import { useFormik } from "formik";
import Label from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import FormikErrorBox from "@/components/shared/formik-error-box";
import Password from "@/components/ui/password";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/features/auth/authSlice";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useSettings } from "@/components/shared/global-provider";

export default function Login() {
  const settings = useSettings();
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const next = searchParams.get("next");

  const navigateSearchParams = decodeURIComponent(searchParams.toString());

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const payload = {
        email: values.email,
        password: values.password,
      };

      try {
        const res = await login(payload).unwrap();
        if (res.success) {
          const token = res.data.accessToken;
          dispatch(setToken({ token }));
          if (next) {
            router.push(next);
          } else {
            router.push("/");
          }
          toast.success("Login successful");
        }
      } catch (error) {
        console.error(error);
        toast.error(error.data.message);
      }
    },
  });

  return (
    <div className="mx-auto min-h-svh content-center sm:max-w-lg">
      <div className="space-y-8 px-5 py-10 sm:rounded-md sm:bg-white sm:px-8 sm:shadow">
        <div>
          <Link href="/" className="flex justify-center">
            <Image
              src={settings?.logo || logo}
              alt={settings?.title || "Logo"}
              width={200}
              height={40}
              className="w-auto cursor-pointer max-xs:h-5 xs:h-8 sm:h-10"
              quality={100}
              loading="eager"
            />
          </Link>
          <h2 className="text-center text-2xl font-semibold tracking-tight first:mt-0">
            Sign in to your account
          </h2>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-2">
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
            <Link href={"/forgot-password"} className="flex justify-end">
              <Button
                type="button"
                variant="link"
                className="p-0 font-semibold"
              >
                Forget Password
              </Button>
            </Link>
          </div>

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Sign in
          </Button>

          <p className="text-center text-sm font-medium leading-none">
            Don’t have an account?{" "}
            <Link href={`/register?${navigateSearchParams}`}>
              <Button variant="link" className="p-0 font-bold">
                Create Account
              </Button>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
