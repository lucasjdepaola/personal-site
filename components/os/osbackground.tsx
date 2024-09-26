"use client"
import { useRef, useState } from "react";
import { OpenedProps } from "./ostypes";
import Widgets from "./widget";
import { Offset } from "./appwrapper";
import { drawBoxDrag, drawBoxUp } from "@/utils/os/drawbox";
import OSBottomBar from "./osbottombar";
import BackgroundFunctions from "./backgroundfunctions";
import { Position } from "./appsopened";


export default function OSBackground(props: OpenedProps) {
    const boxRef = useRef<HTMLDivElement | null>(null);
    const initialOffset = useRef<Offset>({x: 0, y: 0});
    const [isDown, setIsDown] = useState<boolean>(false);
    const [isContext, setIsContext] = useState<boolean>(false);
    const [contextPos, setContextPos] = useState<Position>({top: 0, left: 0});
    return (
        <div className="fixed w-full h-full select-none" style={{
        }}
        onMouseDown={(e) => {
            if(e.button === 0) {
                props.setBoxCoords({
                    dimensions: {
                        width: 1,
                        height: 1
                    },
                    pos: {
                        left: e.clientX,
                        top: e.clientY
                    }
                });
                setIsDown(true);
                initialOffset.current = {x: e.clientX, y: e.clientY};
                setIsContext(false);
            }
        }}
        onContextMenu={(e) => {
            e.preventDefault();
            setIsContext(true);
            setContextPos({top: e.clientY, left: e.clientX});
        }}
        onMouseMove={(e) => {
            if(isDown)
                drawBoxDrag(boxRef.current, e, initialOffset.current, props.setBoxCoords);
        }}
        onMouseUp={(e) => {
            setIsDown(false);
            drawBoxUp(boxRef.current, e, initialOffset.current)
        }}
        onMouseLeave={(e) => {
            setIsDown(false); drawBoxUp(boxRef.current, e, initialOffset.current)
        }}
        >
            <div id="background" className="fixed w-full h-full" style={{
                backgroundImage: `url('${props.wallpaper}')`,
                overflow: "hidden",
                overflowX: "hidden",
                objectFit: "cover",
                backgroundSize: "cover",
                zIndex: "-1" // lowest on the stack
            }}
            ></div>
            <div id="drawbox" ref={boxRef} className="fixed" style={{
                zIndex: 1,
                border: "1px solid white",
                backgroundColor: "rgba(255,255,255,0.3)"
            }}></div>
            <OSBottomBar {...props} />
            <Widgets {...props} />
            {isContext && <BackgroundFunctions position={contextPos} openedProps={props} />}
        </div>
    )
}
// widget dimensions are 8x5 blocks