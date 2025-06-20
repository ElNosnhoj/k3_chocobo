import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const revealWrapperVariants = cva(
    "transition-all overflow-hidden",
    {
        variants: {
            variant: {
                slideDown: "grid",
                slideRight: "grid",
                slideLeft: "grid [direction:rtl]",
            },
            state: {
                true: "",
                false: ""
            },
            fade: {
                true: "",
                false: ""
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
            },
        },
        defaultVariants: {
            variant: "slideDown",
            state: false,
            fade: true,
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
            // slideLeft variants
            {
                variant: "slideLeft",
                state: true,
                class: "grid-cols-[1fr]"
            },
            {
                variant: "slideLeft",
                state: false,
                class: "grid-cols-[0fr]"
            },
            // Fade variants - applied when fade is true
            {
                state: true,
                fade: true,
                class: "opacity-100"
            },
            {
                state: false,
                fade: true,
                class: "opacity-0"
            },
        ]
    }
);

export interface RevealWrapperProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof revealWrapperVariants> { }

function RevealWrapper({ className, variant, state, speed, easing, fade, children, ...props }: RevealWrapperProps) {
    return (
        <div className={cn(revealWrapperVariants({ variant, state, speed, easing, fade }), className)} {...props}>
            <div className="overflow-hidden"> {/* This div ensures content is hidden when row collapses */}
                {children}
            </div>
        </div>
    );
}

export { RevealWrapper, revealWrapperVariants }
export default RevealWrapper
