"use client";

import * as Yup from "yup";
import Container from "@/components/shared/container";
import FormikErrorBox from "@/components/shared/formik-error-box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { useFormik } from "formik";
import Password from "@/components/ui/password";
import { useChangePasswordMutation } from "@/redux/features/auth/authApi";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/features/profile/profileApi";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Profile() {
  const { data: profileData } = useGetProfileQuery();

  const [changePassword, { isLoading: isChangingPasswordLoading }] =
    useChangePasswordMutation();

  const [updateProfile, { isLoading: isUpdatingProfileLoading }] =
    useUpdateProfileMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone: Yup.string()
        .matches(/^(\+88)?(01[3-9]\d{8})$/, "Invalid phone number")
        .required("Phone number is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      const payload = {
        name: values.name,
        phone: values.phone.startsWith("+88")
          ? values.phone
          : `+88${values.phone}`,
      };

      try {
        const response = await updateProfile(payload).unwrap();

        if (response.success) {
          toast.success("Profile updated successfully");
        }
      } catch (error) {
        toast.error("Failed to update profile");
      }
    },
  });

  const formik2 = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required("Current password is required"),
      newPassword: Yup.string().required("New password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await changePassword(values).unwrap();

        if (response.success) {
          formik2.resetForm();
          toast.success("Password changed successfully");
        }
      } catch (error) {
        toast.error(error?.data?.message || "Failed to change password");
      }
    },
  });

  useEffect(() => {
    if (profileData?.data) {
      const profile = profileData.data;
      formik.setValues({
        name: profile.name,
        phone: profile.phone,
        email: profile.email,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData]);

  return (
    <Container className="mx-auto content-center space-y-8 bg-white px-5 py-10 sm:my-10 sm:max-w-xl sm:rounded-lg sm:px-8 sm:shadow">
      <div>
        <div>
          <h1 className="text-3xl font-semibold">Profile</h1>
          <p className="mt-1 text-sm text-gray-600">
            Update your personal information and change your password
          </p>
        </div>
      </div>

      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <section>
          <h2 className="mb-2 text-lg font-semibold">Personal Information</h2>

          <div className="space-y-2">
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
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                readOnly
                disabled
              />
              <FormikErrorBox formik={formik} field="email" />
            </div>
          </div>
        </section>

        <Button type="submit" isLoading={isUpdatingProfileLoading}>
          Update Profile
        </Button>
      </form>

      <form className="space-y-4" onSubmit={formik2.handleSubmit}>
        <section>
          <h2 className="mb-2 text-lg font-semibold">Change Password</h2>

          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex-1">
              <Label htmlFor="oldPassword" required>
                Current Password
              </Label>
              <Password
                id="oldPassword"
                name="oldPassword"
                placeholder="Enter your current password"
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
                value={formik2.values.oldPassword}
              />
              <FormikErrorBox formik={formik2} field="oldPassword" />
            </div>

            <div className="flex-1">
              <Label htmlFor="newPassword" required>
                New Password
              </Label>
              <Password
                id="newPassword"
                name="newPassword"
                placeholder="Enter your new password"
                onChange={formik2.handleChange}
                onBlur={formik2.handleBlur}
                value={formik2.values.newPassword}
              />
              <FormikErrorBox formik={formik2} field="newPassword" />
            </div>
          </div>
        </section>

        <Button type="submit" isLoading={isChangingPasswordLoading}>
          Change Password
        </Button>
      </form>
    </Container>
  );
}
