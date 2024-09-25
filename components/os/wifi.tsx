import { Dispatch, SetStateAction, useState } from "react";
import { OpenedProps } from "./ostypes";

interface SwitchProps {
    state: boolean;
    setSwitch: Dispatch<SetStateAction<boolean>>;
}

const AppleSwitch = (props: SwitchProps) => {
    return (
        <div
        onClick={(e) => {
            e.stopPropagation();
            props.setSwitch(s => !s)
        }}
        className="relative w-10 h-5 rounded-xl shadow-md" style={{
            backgroundColor: props.state ? "#1673d7" : "grey",
        }}>
            <div className={`absolute w-1/2 h-[99%] rounded-full bg-gray-50`}
            style={{
                transition: "transform 200ms linear",
                transform: props.state ? "translateX(100%)" : "translateX(0)"
            }}
            ></div>
        </div>
    )
}

export function Wifi(props: OpenedProps) {
    const [wifi, setWifi] = useState<boolean>(true);
    return (
        <div className="fixed right-2 mt-3 z-10 w-72 h-auto rounded-lg bg-[#dadada] shadow-lg cursor-default" style={{border: "1px solid rgba(0,0,0,0.2)"}}>
            <div className="p-2">
                <div className="flex flex-row justify-between p-1">
                    <div className="">Wifi</div>
                    <AppleSwitch state={wifi} setSwitch={setWifi} />
                </div>
                <hr className="border-gray-400 pl-1 pr-1" />
                <div className="text-gray-600 p-1">Known Networks</div>
                <hr className="border-gray-400 pl-1 pr-1" />
                <div className="pt-1 hover:bg-blue-600 hover:text-white rounded-md p-1">Other Networks</div>
            </div>
        </div>
    )
}

export function Battery() { // redundant to add an extra file for this, could move to battery in widgets
    return (
        <div className="fixed right-2 mt-3 z-10 w-72 h-auto rounded-lg bg-[#dadada] shadow-lg cursor-default" style={{border: "1px solid rgba(0,0,0,0.2)"}}>
            <div className="m-3">
                <div className="flex flex-row justify-between">
                    <div className="font-semibold">Battery</div>
                    <div className="text-gray-500">65%</div>
                </div>
                <div className="text-gray-500 pt-1 pb-1">Power Source: Battery</div>
                <hr className="border-gray-400" />
                <div className="text-gray-500 pb-1 pt-1">No Apps Using Significant Energy</div>
                <hr className="border-gray-400" />
                <div className="hover:bg-blue-600 hover:text-white rounded-md mt-1">Battery Settings</div>
            </div>
        </div>
    )
}