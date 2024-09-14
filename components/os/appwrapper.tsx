import { MutableRefObject, useRef, useState } from "react";
import { OSApp } from "./appsopened";
import { AllAppRefs, OpenedProps } from "./ostypes"
import { wrappermouseMove } from "@/utils/os/draggablediv";

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
                <button 
                onClick={() => {props.parent.setOpenedApps(a => a.filter(x => x.name !== props.self.name))}}>
                    Exit
                </button>
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