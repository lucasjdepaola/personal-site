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
import { useState } from "react";
import ControlCenter from "./controlcenter";
import Wifi from "./wifi";

const hoveredGrey = "#9e9e9e";
export default function OSBar(props: OpenedProps) {
    const mob = useIsMobile();
    const date = useDate();
    const router = useRouter();
    const [controlCenter, setControlCenter] = useState<boolean>(false);
    const [wifi, setWifi] = useState<boolean>(false);
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
                onClick={(e) => { // set tile, and cache dimensions
                    if(!props.tileWindows) {
                        for(const e of props.openedApps) {
                            const ref = props.allAppRefs.current[e.name];
                            if(ref) {
                                const rect = ref.getBoundingClientRect();
                                e.position = {
                                    top: rect.top,
                                    left: rect.left
                                }
                                e.dimensions = {
                                    width: rect.width,
                                    height: rect.height
                                }
                            }
                        }
                    }
                    props.setTileWindows(t => !t)
                }}
                >
                    <IconWrapper icon={WindowsIcon} width={25} height={25} />
                </div>
                <div>
                    <IconWrapper icon={BatteryIcon} width={25} height={25} />
                </div>
                <div className="relative rounded-md"
                onClick={() => {setWifi(w => !w)}}
                style={{backgroundColor: wifi ? hoveredGrey : ""}}>
                    <IconWrapper icon={WifiIcon} width={25} height={25} />
                    {wifi && <Wifi {...props} />}
                </div>
                <div className="rounded-md"
                onClick={() => {
                    if(props.setBarShowing) {
                        props.setBarShowing(b => !b)
                    }
                    }}
                    style={{
                        backgroundColor: props.barShowing ? hoveredGrey : ""
                    }}
                    >
                <IconWrapper icon={SearchIcon} height={25} width={25} />
                </div>
                <div className="relative rounded-md" style={{backgroundColor: controlCenter ? hoveredGrey : ""}}
                onClick={() => {setControlCenter(c => !c)}}
                >
                    <IconWrapper icon={NotificationsIcon} height={25} width={25} />
                    {controlCenter && <ControlCenter {...props} />}
                </div>
                <div>{date}</div>
            </div>
        </nav>
    )
}