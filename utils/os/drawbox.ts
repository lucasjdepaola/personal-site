import { Offset } from "@/components/os/appwrapper"
import { BoxCoords } from "@/components/os/ostypes";
import { Dispatch, SetStateAction } from "react";

export const drawBoxDrag = (ref: HTMLDivElement | null, event: any, initial: Offset, setBoxCoords: Dispatch<SetStateAction<BoxCoords | undefined>>) => {
    if(ref) {
        const rect = ref.getBoundingClientRect();
        let w = event.clientX - initial.x;
        let h = event.clientY - initial.y;
        let left = initial.x;
        let top = initial.y;
        ref.style.width = w + "";
        ref.style.height = h + "";
        if(w < 0) {
            left = event.clientX;
            w *= -1;
        }
        if(h < 0) {
            top = event.clientY;
            h *= -1;
        }
        ref.style.width = w + "px";
        ref.style.height = h + "px";
        ref.style.left = left + "px";
        ref.style.top = top + "px";
        setBoxCoords({
            dimensions: {
                width: w,
                height: h
            },
            pos: {
                left: left,
                top: top
            }
        })
    }
}

export const drawBoxUp = (ref: HTMLDivElement | null, event: any, offset: Offset) => {
    if(ref) {
        ref.style.width = "0px";
        ref.style.height = "0px";
        ref.style.top = "-1000px";
    }
}