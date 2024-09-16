import { Offset } from "@/components/os/appwrapper"

export const drawBoxDrag = (ref: HTMLDivElement | null, event: any, initial: Offset) => {
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
    }
}

export const drawBoxUp = (ref: HTMLDivElement | null, event: any, offset: Offset) => {
    if(ref) {
        ref.style.width = "0px";
        ref.style.height = "0px";
        ref.style.top = "-1000px";
    }
}