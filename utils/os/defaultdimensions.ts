import { Dimensions } from "@/components/os/appsopened";

export const defaultDimensions: Dimensions = {
    height: 420,
    width: 420
}

export const fullScreenDimensions : Dimensions = {
    height: typeof window !== "undefined" ? window.outerHeight : 1080,
    width: typeof window !== "undefined" ? window.outerWidth : 1920
}