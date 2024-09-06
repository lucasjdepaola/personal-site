import { userAgent } from "next/server";

export const isMobile = () => {
    let mobileDimensions = window.outerHeight >= 1080 && window.outerWidth <= 1080;
    return /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || mobileDimensions;
}