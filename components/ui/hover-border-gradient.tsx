"use client";
import React from "react";
import { cn } from "../../lib/utils";

interface HoverBorderGradientProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  containerClassName?: string;
  className?: string;
  duration?: number;
}

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 0.3,
  ...props
}: HoverBorderGradientProps) {
  return (
    <Tag
      className={cn(
        "relative flex rounded-full border content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap gap-10 h-min justify-center overflow-visible p-px decoration-clone w-fit group",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto text-white z-10 bg-black px-4 py-2 rounded-[inherit]",
          className
        )}
      >
        {children}
      </div>
      <div
        className="flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit] opacity-0 scale-95 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105 blur-[2px]"
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "radial-gradient(75% 181.15% at 50% 50%, #EC4899 0%, rgba(255, 255, 255, 0) 100%)"
        }}
      />
      <div className="bg-black absolute z-1 flex-none inset-[2px] rounded-[100px]" />
    </Tag>
  );
}