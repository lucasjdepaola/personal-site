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
    // animate given a width relative to the current cursor position
    return (
        <div className="fixed h-auto w-auto bottom-0 mb-3 text-black" style={{
            zIndex: "2",
            transform: "translateX(calc(50vw - 50%))"
            }}>
            <div className="flex bg-[#dadada] w-auto h-auto rounded-xl shadow-md p-1">
                {desktopicons.map((ico: DesktopIconLayout, i: number) => {
                    return (
                        <div key={`bbico${i}`} className="relative flex justify-center items-center p-1"
                        onMouseEnter={() => {
                            // perform a more advanced animation here
                            setHoveredName(ico.name)
                        }}
                        onMouseLeave={() => {setHoveredName("")}}
                        onClick={() => {props.setOpenedApps(o => [...o, ico.appToOpen])}}
                        >
                            {hoveredName === ico.name && (
                                <div id="hoveredName"
                                className="absolute top-[-40px] bg-white w-[96px] left-[-75%] text-sm text-center rounded-md">
                                    {ico.name}
                                </div>
                            )}
                            {/* <div className="absolute" style={{
                                backgroundImage: `url(${IMAGEPATH}${ico.appToOpen.image})`,
                            }}>
                            </div> */}

                            <img style={{
                                // width: hoveredName === ico.name ? "50px" : "32px",
                                // height: hoveredName === ico.name ? "50px" : "32px",
                                width: "32px",
                                height: "32px",
                                transform: hoveredName === ico.name? "scale(1.2)" : "scale(.8)", 
                                // transition: "width .2s linear, height .2s linear"
                                transition: "transform .2s linear"
                            }} src={`${IMAGEPATH}${ico.appToOpen.image}`}></img>
                            {/* {props.openedApps.some(e => e.name === ico.appToOpen.name) && (
                                <div className="absolute bottom-0 bg-black rounded-full left-1/2"></div>
                            )} */}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}