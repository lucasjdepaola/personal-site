import { MouseEvent, useEffect, useRef, useState } from "react";
import { OpenedProps } from "./ostypes";
import { desktopicons, IMAGEPATH } from "./programs/apparray";
import { DesktopIconLayout } from "./widgets/desktopicon";
import { Position } from "./appsopened";

// create an on hover context div for what the app name is
export default function OSBottomBar(props: OpenedProps) {
    const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
    const mousePos = useRef<Position>({top: 0, left: 0});
    const [hasLeft, setHasLeft] = useState<boolean>(false);
    // animate given a width relative to the current cursor position
    return (
        <div className="fixed h-auto w-auto bottom-0 mb-3 text-black" style={{
            zIndex: "2",
            transform: "translateX(calc(50vw - 50%))"
            }}
            onMouseMove={(e) => {mousePos.current = ({top: e.clientY, left: e.clientX})}}
            onMouseLeave={() => setHasLeft(true)}
            onMouseEnter={() => setHasLeft(false)}
            >
            <div className="flex bg-[#dadada] w-auto h-auto rounded-xl shadow-md">
                {desktopicons.map((ico: DesktopIconLayout, i: number) => {
                    useEffect(() => {
                        setScalePos(scale());
                    }, [mousePos.current])
                    const ref = useRef<HTMLDivElement | null>(null);
                    const [scalePos, setScalePos] = useState<number>(32);
                    const scale = () => {
                        if(ref.current) {
                            const rect = ref.current.getBoundingClientRect();
                            const rel = mousePos.current.left - rect.width;
                            return desktopicons.length - (Math.abs(i - hoveredIndex + 1)*10) + rel / 10;
                        }
                        return 1;
                    }
                    return ( // child icon
                        <div key={`bbico${i}`} className="relative flex justify-center items-center"
                        onMouseEnter={() => {
                            // perform a more advanced animation here
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
                                // done via mutations
                                width: hasLeft ? "32px" : scalePos + "px",
                                height: hasLeft ? "32px" : scalePos + "px",
                                // transform: `scale(${scale()})`,
                                transition: "width .1s linear, height .1s linear"
                                // transition: "transform .2s linear"
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