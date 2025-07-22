"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, PhoneIcon as WhatsApp } from "lucide-react";

import logo from "@/public/images/logo.svg";
import Container from "@/components/shared/container";
import { useSettings } from "@/components/shared/global-provider";

export default function Footer() {
  const settings = useSettings();

  return (
    <footer className="border-t bg-gray-100 px-4 py-8 text-gray-700 max-sm:pb-16 md:px-6 lg:px-8">
      <Container className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4">
        {/* Logo and Contact Section */}
        <div className="space-y-4">
          <Link href="/" className="block">
            <Image
              src={settings?.logo || logo}
              alt={`${settings?.title || "ECOMMERCE"} LOGO`}
              width={200}
              height={50}
              quality={100}
            />
          </Link>
          {settings?.phone && (
            <a
              href={`tel:${settings.phone}`}
              className="block w-fit text-xl font-semibold text-[#051034]"
            >
              {settings.phone}
            </a>
          )}
          <div className="text-sm">Worktime: SAT - FRI, 10AM - 11PM</div>
          <div className="flex gap-3">
            {settings?.facebook && (
              <Link
                href={settings.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#051034] p-2 text-[#051034] transition-colors hover:bg-[#051034] hover:text-white"
              >
                <Facebook size={18} />
              </Link>
            )}
            {settings?.instagram && (
              <Link
                href={settings.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#051034] p-2 text-[#051034] transition-colors hover:bg-[#051034] hover:text-white"
              >
                <Instagram size={18} />
              </Link>
            )}
            {settings?.phone && (
              <Link
                href={`https://wa.me/${settings.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-[#051034] p-2 text-[#051034] transition-colors hover:bg-[#051034] hover:text-white"
              >
                <WhatsApp size={18} />
              </Link>
            )}
          </div>
        </div>

        {/* Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#051034]">INFORMATION</h3>
          <nav className="flex flex-col space-y-2">
            <Link
              href="/about"
              className="w-fit transition-colors hover:text-[#051034] hover:underline"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="w-fit transition-colors hover:text-[#051034] hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/shipping-information"
              className="w-fit transition-colors hover:text-[#051034] hover:underline"
            >
              Shipping Information
            </Link>
          </nav>
        </div>

        {/* Contact Info Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#051034]">CONTACT INFO</h3>
          <div className="space-y-2">
            {settings?.address && <address>{settings.address}</address>}
            {settings?.email && (
              <a href={`mailto:${settings.email}`} className="block w-fit">
                {settings.email}
              </a>
            )}
            {settings?.phone && (
              <div className="space-y-1 text-sm">
                <p>{settings.phone}</p>
              </div>
            )}
          </div>
        </div>

        {/* Facebook Page card */}
        {settings?.facebook && (
          <div className="flex w-full justify-end">
            <iframe
              src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(settings.facebook)}&tabs=timeline&width=340&height=120&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
              className="w-full rounded-lg"
              height={120}
            />
          </div>
        )}
      </Container>
    </footer>
  );
}
