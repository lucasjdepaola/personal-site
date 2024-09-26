"use client"

import {  useRef, useState } from "react";
import { OpenedProps } from "./ostypes"
import { cnStyle } from "@/utils/styling";

const lighterGrey = "#e6e6e6";
const bOneStyle = "border border-1 border-solid border-[rgba(0,0,0,0.2)]";

interface AdjusterProps {
    // icon: any; // icon
    name?: string;
    initialValue: number;
}
const Adjuster = (props: AdjusterProps) => {
    const [range, setRange] = useState<number>(props.initialValue); // out of one hundred
    const ref = useRef<HTMLDivElement | null>(null);
    return (
        <div className={cnStyle("relative flex w-full h-6 bg-[#cacaca] rounded-xl items-center", bOneStyle)}
        onMouseMove={(e) => {
            if(e.buttons & 1 && ref.current) {
                const circleRect = ref.current.getBoundingClientRect();
                const totalRect = e.currentTarget.getBoundingClientRect();
                const radius = circleRect.width / 2;
                const relative = totalRect.width;
                const percentage = (e.clientX - radius - totalRect.left)/relative;
                setRange(percentage * 100);
            }
        }}
        >
            <div id="rangecircle"
            // render the icon here
            ref={ref}
            className={cnStyle("absolute w-6 h-6 rounded-full bg-white shadow-lg z-10", bOneStyle)}
            style={{
                left: range + "%"
            }}
            >
            </div>
            <div className={cnStyle("absolute h-[1.4rem] rounded-l-xl bg-white")} style={{
                width: range + 5 + "%"
            }}></div>
        </div>
    )
}

export default function ControlCenter(props: OpenedProps) {
    return (
        <div className="fixed right-2 mt-3 z-10 w-80 h-auto rounded-2xl bg-[#dadada] shadow-lg cursor-default"
        style={{
            border: "1px solid rgba(0,0,0,0.2)"
        }}
        >
            <div id="cntrcontainer" className="flex flex-col">
                <div id="dndwifietc" className="flex flex-row m-2 gap-2">
                    <div id="wifietc" className="flex-1 rounded-xl shadow-lg" style={{backgroundColor: lighterGrey}}>
                        <div className="p-2">Wi-Fi</div>
                        <div className="p-2">Blutooth</div>
                        <div className="p-2">Airdrop</div>
                    </div>
                    <div id="dndstatemanager" className="flex flex-1 flex-col gap-2">
                        <div className="p-2 rounded-xl shadow-lg" style={{backgroundColor: lighterGrey}}>Focus</div>
                        <div className="flex flex-row gap-2">
                            <div className="p-2 rounded-xl shadow-lg" style={{backgroundColor: lighterGrey}}>State manager</div>
                            <div className="p-2 rounded-xl shadow-lg" style={{backgroundColor: lighterGrey}}>Mirror</div>
                        </div>
                    </div>
                </div>
                <div id="displaybrightness" className="m-1 flex-1">
                    <div className="p-2 rounded-xl shadow-lg" style={{backgroundColor: lighterGrey}}>
                        Brightness
                        <Adjuster initialValue={20} />
                    </div>
                </div>
                <div id="sound" className="m-1 flex-1">
                    <div className="p-2 rounded-xl shadow-lg" style={{backgroundColor: lighterGrey}}>
                        Sound
                        <Adjuster initialValue={75}/>
                    </div>
                </div>
                <div id="music" className="m-1 flex-1">
                    <div className="p-2 rounded-xl shadow-lg" style={{backgroundColor: lighterGrey}}>Music</div>
                </div>
            </div>
        </div>
    )
}