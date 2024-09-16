import { useState } from "react";
import { OpenedProps } from "./ostypes";
import { desktopicons, IMAGEPATH } from "./programs/apparray";
import { DesktopIconLayout } from "./widgets/desktopicon";

// create an on hover context div for what the app name is
export default function OSBottomBar(props: OpenedProps) {
    const [hoveredName, setHoveredName] = useState<string>("");
    const isOpen = (name: string): boolean => {
        return props.openedApps.some(p => p.name === name);
    }
    return (
        <div className="fixed w-full h-12 bottom-0 mb-3 text-black" style={{zIndex: "2"}}>
            <div className="flex m-auto w-5/6 h-full bg-[#dadada] rounded-xl shadow-md p-1">
                {desktopicons.map((ico: DesktopIconLayout, i: number) => {
                    return (
                        <div key={`bbico${i}`} className="relative flex justify-center p-1"
                        onMouseEnter={() => {setHoveredName(ico.name)}}
                        onMouseLeave={() => {setHoveredName("")}}
                        onClick={() => {props.setOpenedApps(o => [...o, ico.appToOpen])}}
                        >
                            {hoveredName === ico.name && (
                                <div id="hoveredName"
                                className="absolute top-[-40px] bg-white w-[96px] left-[-100%] text-sm text-center rounded-md">
                                    {ico.name}
                                </div>
                            )}
                            <img width={32} height={32} src={`${IMAGEPATH}${ico.appToOpen.image}`}></img>
                            {props.openedApps.some(e => e.name === ico.appToOpen.name) && (
                                <div className="absolute bottom-0 bg-black rounded-full w-[3px] h-[3px] left-1/2"></div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}