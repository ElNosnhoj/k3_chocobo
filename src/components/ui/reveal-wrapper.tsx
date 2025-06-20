import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const revealWrapperVariants = cva(
    "transition-all",
    {
        variants: {
            variant: {
                slideDown: "grid",
                slideRight: "grid", // Add grid for horizontal reveal
            },
            state: {
                true: "opacity-100",
                false: "opacity-0"
            },
            speed: {
                instant: "duration-50",
                ultrafast: "duration-100",
                fast: "duration-200",
                quick: "duration-500",
                normal: "duration-800",
                slow: "duration-1000",
                ultraslow: "duration-1500",
                snail: "duration-2000",
            },
            easing: {
                linear: "ease-linear",
                easeIn: "ease-in",
                easeOut: "ease-out",
                easeInOut: "ease-in-out",
            }
        },
        defaultVariants: {
            variant: "slideDown",
            state: false,
            speed: "normal",
            easing: "easeInOut",
        },
        compoundVariants: [
            // slideDown variants
            {
                variant: "slideDown",
                state: true,
                class: "grid-rows-[1fr]"
            },
            {
                variant: "slideDown",
                state: false,
                class: "grid-rows-[0fr]"
            },
            // slideRight variants
            {
                variant: "slideRight",
                state: true,
                class: "grid-cols-[1fr]"
            },
            {
                variant: "slideRight",
                state: false,
                class: "grid-cols-[0fr]"
            },
        ]
    }
);

export interface RevealWrapperProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof revealWrapperVariants> { }

function RevealWrapper({ className, variant, state, speed, easing, children, ...props }: RevealWrapperProps) {
    return (
        <div className={cn(revealWrapperVariants({ variant, state, speed, easing }), className)} {...props}>
            <div className="overflow-hidden"> {/* This div ensures content is hidden when row collapses */}
                {children}
            </div>
        </div>
    );
}

export { RevealWrapper, revealWrapperVariants }


// "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"