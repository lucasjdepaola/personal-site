"use client"
import useDate from "@/hooks/useDate";
import useIsMobile from "@/utils/isMobile"
import { useRouter } from "next/navigation";
import { OpenedProps } from "./ostypes";
import IconWrapper from "../iconwrapper";
import SearchIcon from "/public/icons/search.svg"
import BatteryIcon from "/public/icons/battery.svg"
import WifiIcon from "/public/icons/wifi.svg"
import LogoIcon from "/public/icons/logo.svg"
import WindowsIcon from "/public/icons/windows.svg"
import NotificationsIcon from "/public/icons/notifications.svg"
import { useState } from "react";
import ControlCenter from "./controlcenter";
import { Battery, Wifi } from "./wifi";

enum RightBarTypes {
    CONTROLCENTER, WIFI, BATTERY, NONE // you can do search as well
}

enum LeftBarTypes {
    FILE, EDIT, VIEW, GO, WINDOW, HELP, NONE
}

interface LeftBarProp {
    name: string;
    fn: (props: OpenedProps) => void
    keybind?: string;
}

interface LeftBarProps {
    leftBar: LeftBarProp[];
    openProps: OpenedProps;
}

const LeftBarFunctions = (props: LeftBarProps) => {
    return (
        <div className="fixed left-2 mt-3 z-10 w-40 h-auto rounded-lg bg-[#dadada] shadow-lg p-1">
            {props.leftBar.map((prop: LeftBarProp) => {
                return (
                    prop.name === "hr"?
                    <hr className="border border-1 border-gray-400" />
                    :
                    <div
                    onClick={() => prop.fn(props.openProps)}
                    className="flex justify-between items-center flex-row hover:bg-blue-600 hover:text-white p-1 rounded-md text-md">
                        <div>{prop.name}</div>
                        <div>{prop.keybind}</div>
                    </div>
                )
            })}
        </div>
    )
}

const hoveredGrey = "#9e9e9e";
const hrfn = {name: "hr", fn: () => {}};
export default function OSBar(props: OpenedProps) {
    const mob = useIsMobile();
    const date = useDate();
    const router = useRouter();
    const [rightBar, setRightBar] = useState<RightBarTypes>(RightBarTypes.NONE);
    const [leftBar, setLeftBar] = useState<LeftBarTypes>(LeftBarTypes.NONE)
    const srb = (p: RightBarTypes) => {setRightBar(rt => rt === p ? RightBarTypes.NONE : p)};
    const slb = (p: LeftBarTypes) => {setLeftBar(lt => lt === p ? LeftBarTypes.NONE : p)};
    const notNoneSet = (p: LeftBarTypes) => {setLeftBar(lt => lt !== LeftBarTypes.NONE ? p : lt)}
    return (
        <nav className="flex flex-row static justify-between pl-4 pr-4 pt-2 pb-2 gap-3 text-sm w-full text-black" style={{
            background: "#dadada"
        }}>
            <div className="flex justify-start gap-3 cursor-default" onMouseLeave={() => setLeftBar(LeftBarTypes.NONE)}>
                <div className="cursor-pointer" onClick={() => {router.push("/")}}>
                    <IconWrapper icon={LogoIcon} width={20} height={20} />
                </div>
                <div className="font-semibold" onClick={() => {router.push("/")}}>
                    {props.focusedAppName !== "none" ? props.focusedAppName : "Finder"}
                </div>
                <div onClick={() => slb(LeftBarTypes.FILE)} className="select-none"
                onMouseEnter={() => notNoneSet(LeftBarTypes.FILE)}>
                    File
                    {leftBar === LeftBarTypes.FILE && <LeftBarFunctions leftBar={
                        [
                            {
                                name: "Open File",
                                fn: () => {},
                                keybind: "⌥F"
                            }
                        ]
                    } openProps={props} />}
                </div>
                <div onClick={() => slb(LeftBarTypes.EDIT)}
                onMouseEnter={() => notNoneSet(LeftBarTypes.EDIT)}>
                    Edit
                    {leftBar === LeftBarTypes.EDIT && <LeftBarFunctions leftBar={
                        [
                            {
                                name: "Undo",
                                fn: () => {},
                                keybind: "⌥⌘Z"
                            },
                            {
                                name: "Redo",
                                fn: () => {},
                                keybind: "⌘Z"
                            },
                            hrfn,
                            {
                                name: "Find",
                                fn: () => {},
                                keybind: "⌘F"
                            }
                        ]
                    } openProps={props} />}
                </div>
                <div onClick={() => slb(LeftBarTypes.VIEW)}>View</div>
                <div onClick={() => slb(LeftBarTypes.GO)}>Go</div>
                <div onClick={() => slb(LeftBarTypes.WINDOW)}>Window</div>
                <div onClick={() => slb(LeftBarTypes.HELP)}>Help</div>
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
                <div className="rounded-md"
                style={{backgroundColor: rightBar === RightBarTypes.BATTERY ? hoveredGrey : ""}}
                >
                    <div onClick={() => {srb(RightBarTypes.BATTERY)}}>
                        <IconWrapper icon={BatteryIcon} width={25} height={25} />
                    </div>
                    {rightBar === RightBarTypes.BATTERY && <Battery />}
                </div>
                <div className="relative rounded-md"
                style={{backgroundColor: rightBar === RightBarTypes.WIFI ? hoveredGrey : ""}}>
                    <div
                    onClick={() => {srb(RightBarTypes.WIFI)}}>
                        <IconWrapper icon={WifiIcon} width={25} height={25} />
                    </div>
                    {rightBar === RightBarTypes.WIFI && <Wifi {...props} />}
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
                <div className="relative rounded-md" style={{backgroundColor: rightBar === RightBarTypes.CONTROLCENTER ? hoveredGrey : ""}}
                >
                    <div
                onClick={() => {srb(RightBarTypes.CONTROLCENTER)}}>
                        <IconWrapper icon={NotificationsIcon} height={25} width={25} />
                    </div>
                    {rightBar === RightBarTypes.CONTROLCENTER && <ControlCenter {...props} />}
                </div>
                <div>{date}</div>
            </div>
        </nav>
    )
}