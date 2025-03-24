"use client"
import IconWrapper from "@/components/iconwrapper";
import OverlayIcon from "/public/icons/siteoverlay.svg"
import useIsMobile from "@/utils/isMobile";

export default function RecursiveIcon() {
    const mob = useIsMobile()
    const hw = {
        height: mob ? 200: 400,
        width: mob ? 400 : 800
    }
    return (
        <div className="w-full flex justify-center">
            <div className="rounded-md border border-1 border-opacity-5 border-black ">
                <IconWrapper icon={OverlayIcon} width={hw.width} height={hw.height} />
            </div>
        </div>
    )
}