"use client";

import Container from "@/components/shared/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useMyOrdersQuery } from "@/redux/features/order/orderApi";
import { formatCurrency, formatDate } from "@/utils";

export default function MyOrders() {
  const { data, isLoading } = useMyOrdersQuery();

  if (isLoading) {
    return <Container>Loading...</Container>;
  }

  const orders = data?.data || [];

  // const orderData = [
  //   { type: "Placed", value: 5, color: "#808080" }, // Grey
  //   { type: "Confirmed", value: 8, color: "#9ACD32" }, // YellowGreen
  //   { type: "Shipped", value: 7, color: "#007BFF" }, // Blue
  //   { type: "Pending", value: 2, color: "#FFD700" }, // Gold
  //   { type: "Delivered", value: 1, color: "#28A745" }, // Green
  //   { type: "Cancelled", value: 3, color: "#DC3545" }, // Red
  // ];

  return (
    <Container className={"min-h-[calc(100svh-440px)]"}>
      <h1 className="mb-6 text-3xl font-semibold">My Orders</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="h-fit w-full rounded-lg bg-white shadow-sm"
          >
            <CardHeader className="pb-0">
              <CardTitle className="flex items-center justify-between">
                <span>Order #{order.order_id}</span>
                <Badge
                  className={cn({
                    "bg-[#808080] text-white hover:bg-[#808080]/90":
                      order?.status === "PLACED",
                    "bg-[#9ACD32] text-white hover:bg-[#9ACD32]/90":
                      order?.status === "CONFIRMED",
                    "bg-[#007BFF] text-white hover:bg-[#007BFF]/90":
                      order?.status === "SHIPPED",
                    "bg-[#FFD700] text-black hover:bg-[#FFD700]/90":
                      order?.status === "PENDING",
                    "bg-[#28A745] text-white hover:bg-[#28A745]/90":
                      order?.status === "DELIVERED",
                    "bg-[#DC3545] text-white hover:bg-[#DC3545]/90":
                      order?.status === "CANCELLED",
                  })}
                >
                  {order?.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-sm text-gray-500">
                {formatDate(order.created_at)}
              </p>
              <p className="mb-2 font-semibold">
                Total: {formatCurrency(order.grand_total)}
              </p>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="details">
                  <AccordionTrigger className="py-0">
                    Order Details
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="space-y-2">
                      <p>
                        <strong>Name:</strong> {order.customer_name}
                      </p>
                      <p>
                        <strong>Phone:</strong> {order.phone}
                      </p>
                      <p>
                        <strong>Address:</strong>{" "}
                        <address>{order.address_line}</address>
                      </p>
                      <h4 className="mb-2 mt-4">
                        <strong> Products:</strong>
                      </h4>
                      <ul className="list-disc space-y-1 pl-5">
                        {order.products.map((product) => (
                          <li key={product.id}>
                            {product.product_name}{" "}
                            {product.product_size &&
                              ` (${product.product_size})`}{" "}
                            - {product.quantity}x -{" "}
                            {formatCurrency(product.total_price)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  );
}
