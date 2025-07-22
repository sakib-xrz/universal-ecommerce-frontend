"use client";

import * as Yup from "yup";
import Container from "@/components/shared/container";
import FormikErrorBox from "@/components/shared/formik-error-box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Label from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useGetCartsMutation } from "@/redux/features/cart/cartApi";
import { clearCart, useCartProducts } from "@/redux/features/cart/cartSlice";
import { useCreateOrderMutation } from "@/redux/features/order/orderApi";
import { useGetProfileQuery } from "@/redux/features/profile/profileApi";
import { cityLocationOptions, paymentMethodOptions } from "@/utils/constant";
import { useFormik } from "formik";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";

export default function Checkout() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useCartProducts();
  const buyItems = [
    {
      id: searchParams.get("product"),
      variant: searchParams.get("variant"),
      quantity:
        searchParams.get("quantity") && Number(searchParams.get("quantity")),
    },
  ];

  const hasBuyItems = buyItems.every(
    (item) => item.id && item.variant && item.quantity,
  );

  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const { data: profileData } = useGetProfileQuery();
  const [getCart] = useGetCartsMutation();
  const [createOrder, { isLoading: isCreatingOrderLoading }] =
    useCreateOrderMutation();

  const availableCartItems = cart.filter((item) => item.has_stock);

  useEffect(() => {
    getCart({ cart_items: hasBuyItems ? buyItems : cartItems }).then(
      ({ data }) => {
        setCart(data?.data?.products || []);
        setSubtotal(data?.data?.subtotal || 0);
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasBuyItems, cartItems, getCart]);

  const formik = useFormik({
    initialValues: {
      user_id: "",
      customer_name: "",
      email: "",
      phone: "",
      is_inside_dhaka: true,
      address_line: "",
      note: "",
      platform: "WEBSITE",
      payment_method: "CASH_ON_DELIVERY",
      last_4_digit: "",
      transaction_id: "",
      product: [],
    },
    validationSchema: Yup.object().shape({
      customer_name: Yup.string().required("Customer name is required"),
      phone: Yup.string().required("Phone number is required"),
      address_line: Yup.string().required("Address is required"),
    }),
    onSubmit: async (values) => {
      const { last_4_digit, transaction_id, ...rest } = values;

      let payload;

      if (values.payment_method === "CASH_ON_DELIVERY") {
        payload = {
          ...rest,
          phone: values.phone.startsWith("+88")
            ? values.phone
            : `+88${values.phone}`,
        };
      } else {
        payload = {
          ...rest,
          phone: values.phone.startsWith("+88")
            ? values.phone
            : `+88${values.phone}`,
          last_4_digit,
          transaction_id,
        };
      }

      try {
        await createOrder(payload).unwrap();
        formik.resetForm();
        dispatch(clearCart());
        router.push("/order-success");
        toast.success("Order placed successfully");
      } catch (error) {
        console.error(error);
        toast.error(
          error?.data?.error && error?.data?.error.length > 0
            ? error?.data?.error[0]?.message
            : error?.data.message || "Something went wrong!!!",
        );
      }
    },
  });

  useEffect(() => {
    if (profileData && cart) {
      const user = profileData?.data;
      formik.setValues({
        ...formik.values,
        user_id: user.user_id,
        customer_name: user.name,
        email: user.email,
        phone: user.phone,
        product: availableCartItems.map((item) => ({
          product_id: item.id,
          variant_id: item.variant?.id,
          size_id: item.variant?.size?.id || null,
          quantity: Number(item.quantity),
        })),
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData, cart]);

  return (
    <Container>
      <h1 className="mb-6 text-3xl font-semibold">Checkout</h1>

      <form
        className="grid grid-cols-1 gap-4 lg:grid-cols-3"
        onSubmit={formik.handleSubmit}
      >
        <div className="h-fit bg-white p-4 sm:rounded-md sm:p-6 sm:shadow lg:col-span-2">
          <h2 className="text-lg font-semibold">DELIVERY & BILLING INFO</h2>

          <div className="my-2">
            <hr />
          </div>

          <div className="space-y-2">
            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex-1">
                <Label htmlFor="customer_name" required>
                  Customer Name
                </Label>
                <Input
                  type="text"
                  id="customer_name"
                  name="customer_name"
                  placeholder="Customer Name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.customer_name}
                />
                <FormikErrorBox formik={formik} field="customer_name" />
              </div>
              <div className="flex-1">
                <Label htmlFor="phone" required>
                  Phone
                </Label>
                <Input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                <FormikErrorBox formik={formik} field="phone" />
              </div>
            </div>

            <div>
              <Label htmlFor="address_line" required>
                Delivery Address
              </Label>
              <Textarea
                id="address_line"
                name="address_line"
                placeholder="Enter your delivery address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address_line}
              />
              <FormikErrorBox formik={formik} field="address_line" />
            </div>

            <div>
              <Label htmlFor="is_inside_dhaka" required>
                Location
              </Label>
              <RadioGroup
                className="flex flex-wrap gap-2"
                defaultValue={true}
                onValueChange={(value) => {
                  formik.setFieldValue("is_inside_dhaka", value);
                }}
              >
                {cityLocationOptions.map((item) => (
                  <div
                    key={item.value}
                    className="shadow-xs relative flex flex-col items-start gap-4 rounded-md border border-input p-3"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem
                        id={item.value}
                        value={item.value}
                        className="after:absolute after:inset-0"
                      />
                      <Label htmlFor={item.value}>{item.label}</Label>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <Label htmlFor="note">Additional Note</Label>
              <Textarea
                id="note"
                name="note"
                placeholder="Additional note (optional)"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.note}
              />
            </div>
          </div>

          <h2 className="mt-4 text-lg font-semibold">PAYMENT METHOD</h2>

          <div className="my-2">
            <hr />
          </div>

          <div className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="payment_method" required>
                Payment Method
              </Label>
              <RadioGroup
                className="flex gap-2 max-xs:flex-col xs:flex-row"
                defaultValue="CASH_ON_DELIVERY"
                onValueChange={(value) => {
                  formik.setFieldValue("payment_method", value);
                }}
              >
                {paymentMethodOptions.map((item) => (
                  <label
                    key={item.value}
                    htmlFor={item.value}
                    className="shadow-xs relative w-fit cursor-pointer max-xs:w-full"
                  >
                    <div
                      className={cn(
                        "shadow-xs relative flex cursor-pointer flex-col items-center gap-3 rounded-md border border-input px-2 py-3 text-center max-xs:w-full",
                        {
                          "bg-secondary text-secondary-foreground":
                            formik.values.payment_method === item.value,
                        },
                      )}
                    >
                      <RadioGroupItem
                        id={item.value}
                        name="payment_method"
                        value={item.value}
                        className="peer sr-only"
                      />
                      <p className="text-sm font-medium leading-none">
                        {item.label}
                      </p>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </div>

            {formik.values.payment_method &&
              formik.values.payment_method !== "CASH_ON_DELIVERY" && (
                <div className="flex flex-col gap-4 lg:flex-row">
                  <div className="flex-1">
                    <Label htmlFor="last_4_digit" required>
                      Last 4 Digit
                    </Label>
                    <Input
                      type="text"
                      id="last_4_digit"
                      name="last_4_digit"
                      placeholder="Enter last 4 digit"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.last_4_digit}
                    />
                    <FormikErrorBox formik={formik} field="last_4_digit" />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor="transaction_id" required>
                      Transaction ID
                    </Label>
                    <Input
                      type="text"
                      id="transaction_id"
                      name="transaction_id"
                      placeholder="Enter your transaction ID"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.transaction_id}
                    />
                    <FormikErrorBox formik={formik} field="transaction_id" />
                  </div>
                </div>
              )}
          </div>
        </div>
        <div className="h-fit bg-white p-4 sm:rounded-md sm:p-6 sm:shadow">
          <h2 className="text-lg font-semibold">Order Summery</h2>
          <div className="my-2">
            <hr />
          </div>

          <div className="mb-5 flex min-h-full flex-col justify-between">
            <div>
              {availableCartItems.length ? (
                availableCartItems.map((item) => (
                  <div
                    className="flex w-full gap-2 border-b border-gray-200 py-2 last:border-b-0"
                    key={item.id}
                  >
                    <div>
                      <Image
                        src={item.image_url || "/default-product.jpg"}
                        alt={item.name || "Product"}
                        width={80}
                        height={80}
                        className="aspect-square size-20 object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="line-clamp-1 text-sm font-semibold">
                        {item.name || "Unnamed Product"}
                      </h3>

                      <div className="flex w-full items-center justify-between">
                        <p className="text-sm font-medium text-muted-foreground">
                          TK. {item.unit_price || 0}
                        </p>
                      </div>

                      <div className="flex w-full items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          Size:{" "}
                          <span className="font-medium">
                            {item.variant?.size?.name || "N/A"}
                          </span>
                        </p>

                        <p className="text-sm text-muted-foreground">
                          Available:{" "}
                          <span className="font-medium">
                            {item.variant?.stock || 0}
                          </span>
                        </p>
                      </div>

                      <div className="flex w-full items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          Quantity:{" "}
                          <span className="font-medium">
                            {item.quantity || "N/A"}
                          </span>
                        </p>

                        <div className="text-sm">
                          Total:{" "}
                          <span className="font-medium">
                            TK. {item.total_price || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex h-20 items-center justify-center">
                  <p className="text-muted-foreground">
                    Please add some items to your cart
                  </p>
                </div>
              )}
            </div>

            {availableCartItems.length > 0 && (
              <div className="mt-10">
                <div className="flex justify-between">
                  <p className="text-sm text-muted-foreground">Subtotal</p>
                  <p className="text-sm font-medium">TK. {subtotal}</p>
                </div>
                <div className="my-2">
                  <hr />
                </div>
                <div className="flex justify-between">
                  <p className="text-sm text-muted-foreground">
                    Delivery Charge
                  </p>
                  <p className="text-sm font-medium">
                    TK. {formik.values.is_inside_dhaka ? 70 : 130}
                  </p>
                </div>
                <div className="my-2">
                  <hr />
                </div>
                <div className="flex justify-between">
                  <p className="text-lg font-medium">Grand Total</p>
                  <p className="text-lg font-medium">
                    TK. {subtotal + (formik.values.is_inside_dhaka ? 70 : 130)}
                  </p>
                </div>
              </div>
            )}
          </div>

          <Button
            className="w-full"
            disabled={!availableCartItems.length}
            type="submit"
            isLoading={isCreatingOrderLoading}
          >
            Place Order
          </Button>
        </div>
      </form>
    </Container>
  );
}
