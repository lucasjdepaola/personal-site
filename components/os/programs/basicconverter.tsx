"use client"
import { useState } from "react";
import { OSApp } from "../appsopened";
import { DEFAULTDARKSCHEME } from "../ostypes";


const convert = (str: string): string => {
    if(/-?[0-9]/.test(str)) {
        const num = parseInt(str);
        return ((num - 32) * (5/9)) + "";
    }
    return "";
}

const Converter = () => {
    const [input, setInput] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    return (
        <div className="w-full h-full bg-purple-600 text-white">
            <div>Enter a number to convert to celsius from farenheit</div>
            <div className="text-black">
                <input type="text" 
                onInput={(e) => {
                    setInput(e.currentTarget.value)
                    setAnswer(convert(input));
                }}/>
            </div>
            <div>the answer is {answer}</div>
        </div>
    );
}
export const converter: OSApp = {
    name: "converter",
    dimensions: {width: 600, height: 600},
    barScheme: DEFAULTDARKSCHEME,
    position: {left: 300, top: 300},
    image: "notes.png",// you can change the image here
    component: Converter
};