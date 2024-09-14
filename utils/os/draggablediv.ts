import { Offset } from "@/components/os/appwrapper";

export const wrappermouseMove = (ref: HTMLDivElement | null, event: any, offset: Offset) => {
    if(ref) {
        // calculate offset
        const lf = event.clientX - offset.x;
        const tp = event.clientY - offset.y
        ref.style.left = lf + "px";
        ref.style.top = tp + "px";
    }
}
