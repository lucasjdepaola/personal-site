"use client"
import { useEffect, useRef } from "react";
import { OSApp } from "../appsopened";
import { DEFAULTDARKSCHEME } from "../ostypes";

const Emulator = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        if(canvasRef && canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            // call function and declare context
        }
    }, [canvasRef]);
    return (
        <div className="w-full h-full bg-black text-white">
            <div>
                emulation
            </div>
            <canvas className="w-full h-full" ref={canvasRef}>
            </canvas>
        </div>
    );
}
export const emulator: OSApp = {
    name: "Emulator",
    dimensions: {width: 600, height: 600},
    barScheme: DEFAULTDARKSCHEME,
    position: {left: 300, top: 300},
    image: "notes.png",
    component: Emulator 
};
