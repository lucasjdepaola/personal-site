"use client"

import { OpenedProps } from "./ostypes"

const lighterGrey = "#e6e6e6";
const subclass = "bg-[#e6e6e6] w-full shadow-lg rounded-md"
export default function ControlCenter(props: OpenedProps) {
    return (
        <div className="fixed right-2 mt-3 z-10 w-80 h-80 rounded-2xl bg-[#dadada] shadow-lg"
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
                        <div className="p-2 rounded-xl shadow-lg" style={{backgroundColor: lighterGrey}}>Dnd</div>
                        <div className="flex flex-row gap-2">
                            <div className="p-2 rounded-xl shadow-lg" style={{backgroundColor: lighterGrey}}>State manager</div>
                            <div className="p-2 rounded-xl shadow-lg" style={{backgroundColor: lighterGrey}}>Mirror</div>
                        </div>
                    </div>
                </div>
                <div id="displaybrightness" className="m-1 flex-1">
                    <div className="p-2 rounded-xl shadow-lg" style={{backgroundColor: lighterGrey}}>Brightness</div>
                </div>
                <div id="sound" className="m-1 flex-1">
                    <div className="p-2 rounded-xl shadow-lg" style={{backgroundColor: lighterGrey}}>Sound</div>
                </div>
                <div id="music" className="m-1 flex-1">
                    <div className="p-2 rounded-xl shadow-lg" style={{backgroundColor: lighterGrey}}>Music</div>
                </div>
            </div>
        </div>
    )
}