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

export default function Wifi(props: OpenedProps) {
    const [wifi, setWifi] = useState<boolean>(true);
    return (
        <div className="fixed right-2 mt-3 z-10 w-72 h-40 rounded-lg bg-[#dadada] shadow-lg" style={{border: "1px solid rgba(0,0,0,0.2)"}}>
            <div className="p-3">
                <div className="flex flex-row justify-between p-1">
                    <div className="">Wifi</div>
                    <AppleSwitch state={wifi} setSwitch={setWifi} />
                </div>
                <hr className="border-gray-400" />
                <div className="text-gray-600">Known Networks</div>
                <hr className="border-gray-400" />
                <div>other networks</div>
            </div>
        </div>
    )
}