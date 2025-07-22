"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import useDesktop from "@/hooks/use-desktop";

export default function DrawerModal({ isOpen, onClose, children, className }) {
  const isDesktop = useDesktop(1024);
  return (
    <>
      {isDesktop ? (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className={className}>{children}</DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isOpen} onOpenChange={onClose}>
          <DrawerContent>{children}</DrawerContent>
        </Drawer>
      )}
    </>
  );
}
