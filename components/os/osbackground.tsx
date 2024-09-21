"use client"
import { useRef, useState } from "react";
import { OpenedProps } from "./ostypes";
import Widgets from "./widget";
import { Offset } from "./appwrapper";
import { drawBoxDrag, drawBoxUp } from "@/utils/os/drawbox";
import OSBottomBar from "./osbottombar";
import BackgroundFunctions from "./backgroundfunctions";
import { Position } from "./appsopened";

interface DrawBox {
    from: number;
    to: number;
}

export default function OSBackground(props: OpenedProps) {
    const boxRef = useRef<HTMLDivElement | null>(null);
    const initialOffset = useRef<Offset>({x: 0, y: 0});
    const [isDown, setIsDown] = useState<boolean>(false);
    const [boxCoords, setBoxCoord] = useState<DrawBox>({from: 0, to: 0}); // use this for highlighting
    const [isContext, setIsContext] = useState<boolean>(false);
    const [contextPos, setContextPos] = useState<Position>({top: 0, left: 0});
    return (
        <div className="fixed w-full h-full select-none" style={{
        }}
        onMouseDown={(e) => {
            if(e.button === 0) {
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
                drawBoxDrag(boxRef.current, e, initialOffset.current)
        }}
        onMouseUp={(e) => {setIsDown(false); drawBoxUp(boxRef.current, e, initialOffset.current)}}
        onMouseLeave={(e) => {setIsDown(false); drawBoxUp(boxRef.current, e, initialOffset.current)}}
        >
            <div id="background" className="fixed w-full h-full" style={{
                backgroundImage: "url('https://i.pinimg.com/originals/08/c5/ec/08c5ec8fddd5fd3c965e773cad127e2b.jpg')",
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