"use client"
import { userAgent } from "next/server";
import { useEffect, useState } from "react";

const staticMobile = () => {
    let mobileDimensions = false;
    if(typeof window !== "undefined" && typeof navigator !== undefined) {
        mobileDimensions = window.outerHeight >= 1080 && window.outerWidth <= 1080;
        return /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || mobileDimensions;
    }
    return false; // handle later
}

export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    useEffect(() => {
        setIsMobile(staticMobile());
    }, []);

    useEffect(() => {
        const mobChange = () => {
            setIsMobile(staticMobile());
        }
        window.addEventListener("resize", mobChange);
        return () => window.removeEventListener("resize", mobChange);
    }, []);
    return isMobile
}