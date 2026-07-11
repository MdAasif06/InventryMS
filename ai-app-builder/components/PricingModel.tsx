import React from "react";
import { Dialog,DialogTrigger,DialogContent,DialogHeader,DialogDescription } from "./ui/dialog";
import { BlueTitle } from "./reuseable";
import { PricingTable } from "@clerk/nextjs";
interface PricingModelProps {
  children: React.ReactNode;
  reason?: "credits" | "upgrade";
}

const PricingModel = ({ children, reason = "upgrade" }: PricingModelProps) => {
  const title =
    reason === "credits" ? "You' re out of credits" : "Upgrade your plan";
  const description =
    reason === "credits"
      ? "You have used all your credits. upgrade to keep builing"
      : "Choose a plan thet fits how much you build";
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">{children}</DialogTrigger>
      <DialogContent className="border-white/8 bg-[#0f0f0f] p-0 text-white sm:max-w-6xl max-h-[90dvh] overflow-y-auto">
        <DialogHeader className="px-6 pt-6 pb-2">
          <BlueTitle className="text-4xl">{title}</BlueTitle>
          <DialogDescription className="text-sm text-white/35">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 pb-6">
            <PricingTable
            checkoutProps={{
                appearance:{
                 elements:{
                    drawerRoot:{
                        zIndex:200
                    }
                 }
                }
            }}
            />


        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PricingModel;
