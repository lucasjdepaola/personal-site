import { MutableRefObject, useRef, useState } from "react";
import { Dimensions, OSApp } from "./appsopened";
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
    const [oldDimensions, setOldDimensions] = useState<Dimensions>({width: 0, height: 0})
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
            const f = (e: any) => {wrappermouseMove(props.allAppRefs.current[props.self.name], e, initialOffset.current)};
            window.addEventListener("mousemove", f);
            window.addEventListener("mouseup", (e) => {window.removeEventListener("mousemove", f)});
        }} // behavior for a draggable div

        > {/* refactor button exit */}
            <div
            className="flex flex-1 pl-1 select-none"
            >
                <div className="flex flex-row gap-1 cursor-default">
                    <div
                    onClick={() => {props.parent.setOpenedApps(a => a.filter(x => x.name !== props.self.name))}}>
                        Exit
                    </div>
                    <div onClick={() => {
                        const selfRef = props.allAppRefs.current[props.self.name];
                        if(selfRef && maximize) {
                            setMaximize(false);
                            const rect = selfRef.getBoundingClientRect();
                            selfRef.style.width = "100%"; // we need a widget ref to the app
                            selfRef.style.height = "100%";
                            selfRef.style.top = "0px";
                            selfRef.style.left = "0px"
                            setOldDimensions({
                                height: rect.top,
                                width: rect.left
                            })
                        }
                        else if(selfRef) {
                            setMaximize(true);
                            selfRef.style.width = props.self.dimensions.width + "px"; // we need a widget ref to the app
                            selfRef.style.height = props.self.dimensions.height + "px";
                            selfRef.style.top = oldDimensions.height + "px";
                            selfRef.style.left = oldDimensions.width + "px";
                        }
                    }}>{maximize ? "Max" : "Min"}</div>
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

export default function AppWrapper(props: AppwrapperProps) {
    return (
        <div className="w-full h-full">
            <Appbar {...props} />
            {props.children}
        </div>
    )
}