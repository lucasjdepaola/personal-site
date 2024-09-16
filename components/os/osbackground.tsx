"use client"
import { useRef, useState } from "react";
import { OpenedProps } from "./ostypes";
import Widgets from "./widget";
import { Offset } from "./appwrapper";
import { drawBoxDrag, drawBoxUp } from "@/utils/os/drawbox";

export default function OSBackground(props: OpenedProps) {
    const boxRef = useRef<HTMLDivElement | null>(null);
    const initialOffset = useRef<Offset>({x: 0, y: 0});
    const [isDown, setIsDown] = useState<boolean>(false);
    return (
        <div className="fixed select-none" style={{
            width: "100vw",
            height: "100vh",
        }}
        onMouseDown={(e) => {
            setIsDown(true);
            initialOffset.current = {x: e.clientX, y: e.clientY};
        }}
        onMouseMove={(e) => {
            if(isDown)
                drawBoxDrag(boxRef.current, e, initialOffset.current)
        }}
        onMouseUp={(e) => {setIsDown(false); drawBoxUp(boxRef.current, e, initialOffset.current)}}
        onMouseLeave={() => {setIsDown(false);}}
        >
            <div id="background" className="fixed" style={{
                backgroundImage: "url('https://i.pinimg.com/originals/08/c5/ec/08c5ec8fddd5fd3c965e773cad127e2b.jpg')",
                width: "100vw",
                height: "100vh",
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
            <Widgets {...props} />
        </div>
    )
}
// widget dimensions are 8x5 blocks