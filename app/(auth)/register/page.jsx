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
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/features/auth/authSlice";
import { useSettings } from "@/components/shared/global-provider";

export default function Register() {
  const settings = useSettings();
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const next = searchParams.get("next");

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone: Yup.string()
        .matches(/^(\+88)?(01[3-9]\d{8})$/, "Invalid phone number")
        .required("Phone number is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone.startsWith("+88")
          ? values.phone
          : `+88${values.phone}`,
      };

      try {
        const res = await register(payload).unwrap();
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
            Create an account
          </h2>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-2">
          <div>
            <Label htmlFor="name" required>
              Name
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            <FormikErrorBox formik={formik} field="name" />
          </div>
          <div>
            <Label htmlFor="phone" required>
              Phone
            </Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
            />
            <FormikErrorBox formik={formik} field="phone" />
          </div>
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
          <div className="pb-4">
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

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Create Account
          </Button>

          <p className="text-center text-sm font-medium leading-none">
            Already have an account?{" "}
            <Link href={"/login"}>
              <Button variant="link" className="p-0 font-bold">
                Sign in
              </Button>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
