import { MutableRefObject, useRef, useState } from "react";
import { Dimensions, OSApp, Position } from "./appsopened";
import { AllAppRefs, OpenedProps } from "./ostypes"
import { wrappermouseMove } from "@/utils/os/draggablediv";
// on the initial mouse down, you can use a determiner to see if the mousedown warrants a resize on drag or not (state)

export interface AppwrapperProps {
    parent: OpenedProps;
    self: OSApp;
    allAppRefs: MutableRefObject<AllAppRefs>;
    children: any;
}

export interface Offset {
    x: number;
    y: number;
}

const Appbar = (props: AppwrapperProps) => {
    // use on drag move
    const [isDown, setDown] = useState<boolean>(false);
    const [maximize, setMaximize] = useState<boolean>(true);
    const [oldDimensions, setOldDimensions] = useState<Position>({top: 0, left: 0})
    const initialOffset = useRef<Offset>({x: 0, y: 0});
    return (
        <div unselectable="on" className="flex w-full h-7 select-none rounded-t-lg" style={{
            backgroundColor: props.self.barScheme.background,
            color: props.self.barScheme.text
        }}
        onMouseDown={(e) => {
            const ref = props.allAppRefs.current[props.self.name];
            if(ref) {
                const rect = ref.getBoundingClientRect();
                initialOffset.current = {x: e.clientX - rect.left, y: e.clientY - rect.top};
            }
            const f = (e: any) => {
                wrappermouseMove(props.allAppRefs.current[props.self.name], e, initialOffset.current)
            };
            window.addEventListener("mousemove", f);
            window.addEventListener("mouseup", (e) => {
                window.removeEventListener("mousemove", f);
            });
        }} // behavior for a draggable div

        > {/* refactor button exit */}
            <div
            className="flex flex-1 pl-1 select-none"
            >
                <div className="pl-1 flex flex-row gap-1 cursor-default items-center">
                    <div
                    className="w-3 h-3 bg-red-500 rounded-full"
                    onClick={() => {props.parent.setOpenedApps(a => a.filter(x => x.name !== props.self.name))}}>
                    </div>
                    <div
                    className="w-3 h-3 bg-yellow-500 rounded-full"
                    onClick={() => {props.parent.setOpenedApps(a => a.filter(x => x.name !== props.self.name))}}>
                    </div>
                    <div
                    className="w-3 h-3 bg-green-500 rounded-full"
                    onClick={() => {
                        const selfRef = props.allAppRefs.current[props.self.name];
                        if(selfRef && maximize) {
                            setMaximize(false);
                            const rect = selfRef.getBoundingClientRect();
                            selfRef.style.width = "100%"; // we need a widget ref to the app
                            selfRef.style.height = "100%";
                            selfRef.style.top = "0px";
                            selfRef.style.left = "0px"
                            setOldDimensions({
                                top: rect.top,
                                left: rect.left
                            })
                        }
                        else if(selfRef) {
                            setMaximize(true);
                            selfRef.style.width = props.self.dimensions.width + "px"; // we need a widget ref to the app
                            selfRef.style.height = props.self.dimensions.height + "px";
                            selfRef.style.top = oldDimensions.top + "px"
                            selfRef.style.left = oldDimensions.left + "px";
                        }
                    }}></div>
                </div>
            </div>
            <div className="flex justify-center items-center text-center cursor-default select-none">
                <div>{props.self.name}</div>
            </div>
            <div className="flex flex-1 justify-center items-center text-center">
            </div>
        </div>
    )
}

enum ResizeType {
    HEIGHTTOP, WIDTHLEFT, HEIGHTBOTTOM, WIDTHRIGHT, TOPLEFT, TOPRIGHT, BOTTOMLEFT, BOTTOMRIGHT, NONE
}

export default function AppWrapper(props: AppwrapperProps) {
    const [initial, setInitial] = useState<Position>({top: 0, left: 0});
    const [isDown, setIsDown] = useState<boolean>(false);
    const [resizeType, setResizeType] = useState<ResizeType>(ResizeType.NONE);
    const ref = useRef<HTMLDivElement | null>(null);
    return ( // logic for a potential corner shrinkage
        <div ref={ref}
        onMouseDown={(e) => {
            if(e.button === 0) {
                setIsDown(true)
            } else setIsDown(false);
            setInitial(i => {
                if(e.button === 0)
                    return {top: e.clientY, left: e.clientX};
                return i;
            });
        }}
        onMouseMove={(e) => {
            if(ref.current) {
                const rect = ref.current.getBoundingClientRect();
                let leeway = 10; // 10px range given
                setResizeType(r => {
                    if(isDown) return r;
                    let wl = e.clientX >= rect.left - leeway && e.clientX <= rect.left + leeway;
                    let ht = e.clientY >= rect.top - leeway && e.clientY <= rect.top + leeway;
                    let wr = e.clientX >= rect.right - leeway && e.clientX <= rect.right + leeway;
                    let hb = e.clientY >= rect.bottom - leeway && e.clientY <= rect.bottom + leeway;
                    if(wl && ht) {
                        return ResizeType.TOPLEFT;
                    }
                    if(wl && hb) {
                        return ResizeType.BOTTOMLEFT;
                    }
                    if(wr && ht) {
                        return ResizeType.TOPRIGHT;
                    }
                    if(wr && hb) {
                        return ResizeType.BOTTOMRIGHT;
                    }
                    if(wl) return ResizeType.WIDTHLEFT;
                    if(ht) return ResizeType.HEIGHTTOP;
                    if(wr) return ResizeType.WIDTHRIGHT;
                    if(hb) return ResizeType.HEIGHTBOTTOM;
                    return ResizeType.NONE;
                })
                const rf = props.allAppRefs.current[props.self.name];
                if(isDown && rf) { // now move it
                    const rfRect = rf.getBoundingClientRect();
                    if(resizeType === ResizeType.HEIGHTTOP) {
                        const heightResize = e.clientY - initial.top;
                        rf.style.height = (heightResize) + "px";
                        // rf.style.top = heightResize + "px";
                    }
                    else if(resizeType === ResizeType.HEIGHTBOTTOM) {

                    }
                    else if(resizeType === ResizeType.WIDTHLEFT) {

                    }
                    else if(resizeType === ResizeType.WIDTHRIGHT) {

                    }
                }
                }
        }}
        className="w-full h-full" style={{
            cursor:resizeType === ResizeType.NONE ?
            "default":
            resizeType === ResizeType.WIDTHLEFT?
            "w-resize":
            resizeType === ResizeType.WIDTHRIGHT?
            "e-resize":
            resizeType === ResizeType.HEIGHTTOP?
            "n-resize":
            resizeType === ResizeType.HEIGHTBOTTOM?
            "s-resize":
            resizeType === ResizeType.TOPLEFT?
            "nw-resize":
            resizeType === ResizeType.TOPRIGHT?
            "ne-resize":
            resizeType === ResizeType.BOTTOMLEFT?
            "sw-resize":
            // resizeType === ResizeType.BOTTOMRIGHT?
            "se-resize"
        }}
        onMouseUp={() => setIsDown(false)}
        onMouseLeave={() => setIsDown(false)}
        >
            <Appbar {...props} />
            {props.children}
        </div>
    )
}