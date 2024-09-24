import { MouseEvent, useEffect, useRef, useState } from "react";
import { OpenedProps } from "./ostypes";
import { desktopicons, IMAGEPATH } from "./programs/apparray";
import { DesktopIconLayout } from "./widgets/desktopicon";
import { Position } from "./appsopened";

// create an on hover context div for what the app name is
export default function OSBottomBar(props: OpenedProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
    const [mousePos, setMousePos] = useState<Position>({top: 0, left: 0});
    const [hasLeft, setHasLeft] = useState<boolean>(false);
    // animate given a width relative to the current cursor position
    return (
        <div className="fixed h-auto w-auto bottom-0 mb-3 text-black" style={{
            zIndex: "2",
            transform: "translateX(calc(50vw - 50%))",
            }}
            onMouseMove={(e) => {setMousePos({top: e.clientY, left: e.clientX})}}
            onMouseLeave={() => setHasLeft(true)}
            onMouseEnter={() => setHasLeft(false)}
            >
            <div className="flex bg-[#dadada] w-auto h-16 rounded-xl shadow-md">
                {desktopicons.map((ico: DesktopIconLayout, i: number) => {
                    useEffect(() => {
                        setScalePos(scale());
                    }, [mousePos, hoveredIndex])
                    const ref = useRef<HTMLDivElement | null>(null);
                    const [scalePos, setScalePos] = useState<number>(32);
                    const scale = () => {
                        if(ref.current) {
                            const rect = ref.current.getBoundingClientRect();
                            const circleCenterX = rect.left + rect.width / 2;
                            const circleCenterY = rect.top + rect.height / 2;
                            const distanceX = mousePos.left - circleCenterX;
                            const distanceY = mousePos.top - circleCenterY;
                            const distance = Math.hypot(distanceX, distanceY);
                            const maxDistance = 300;
                            const minScale = 16;
                            const maxScale = 100;
                            const scaleFactor = Math.max(minScale, maxScale - (distance / maxDistance) * (maxScale - minScale));
                            return scaleFactor;
                        }
                        return 32;
                    }
                    return (
                        <div key={`bbico${i}`} className="relative flex justify-center items-center p-1"
                        onMouseEnter={() => {
                            setHoveredIndex(i);
                        }}
                        onMouseLeave={() => {setHoveredIndex(-1)}}
                        onClick={() => {props.setOpenedApps(o => [...o, ico.appToOpen])}}
                        ref={ref}
                        >
                            {hoveredIndex === i && (
                                <div id="hoveredName"
                                className="absolute top-[-40px] bg-white w-[96px] text-sm text-center rounded-md">
                                    {ico.name}
                                </div>
                            )}
                            <img style={{
                                width: hasLeft ? "40px" : scalePos + "px",
                                height: hasLeft ? "40px" : scalePos + "px",
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