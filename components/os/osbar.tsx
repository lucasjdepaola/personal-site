"use client"
import useDate from "@/hooks/useDate";
import useIsMobile from "@/utils/isMobile"
import { useRouter } from "next/navigation";
import { OpenedProps } from "./ostypes";
import IconWrapper from "../iconwrapper";
import SearchIcon from "/public/icons/search.svg"
import BatteryIcon from "/public/icons/battery.svg"
import WifiIcon from "/public/icons/wifi.svg"
import WindowsIcon from "/public/icons/windows.svg"
import NotificationsIcon from "/public/icons/notifications.svg"

export default function OSBar(props: OpenedProps) {
    const mob = useIsMobile();
    const date = useDate();
    const router = useRouter();
    return (
        <nav className="flex flex-row static justify-between pl-4 pr-4 pt-2 pb-2 gap-3 text-sm w-full text-black" style={{
            background: "#dadada"
        }}>
            <div className="flex justify-start gap-3 cursor-default">
                <div className="font-semibold" onClick={() => {router.push("/")}}>Home</div>
                <div className="select-none">File</div>
                <div>Edit</div>
                <div>View</div>
                <div>Go</div>
                <div>Window</div>
                <div>Help</div>
            </div>

            <div className="flex justify-end gap-3">
                <div className="rounded-md" style={{
                    backgroundColor: props.tileWindows ? "#9e9e9e" : "initial"
                }}
                onClick={() => {props.setTileWindows(t => !t)}}
                >
                    <IconWrapper icon={WindowsIcon} width={25} height={25} />
                </div>
                <div>
                    <IconWrapper icon={BatteryIcon} width={25} height={25} />
                </div>
                <div>
                    <IconWrapper icon={WifiIcon} width={25} height={25} />
                </div>
                <div onClick={() => props.setBarShowing(b => !b)}>
                <IconWrapper icon={SearchIcon} height={25} width={25} />
                </div>
                <div>
                    <IconWrapper icon={NotificationsIcon} height={25} width={25} />
                </div>
                <div>{date}</div>
            </div>
        </nav>
    )
}