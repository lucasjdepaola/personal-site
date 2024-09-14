import { useReducer, useRef, useState } from "react";
import { OSApp } from "../appsopened";
import { DEFAULTDARKSCHEME } from "../ostypes";

const Browser = () => {
    const [site, setSite] = useState<string>("https://google.com/webhp?igu=1");
    const inputRef = useRef<HTMLInputElement | null>(null);
    return (
        <div className="w-full h-full bg-white">
            <div id="topbar" className="h-7 w-full text-center">
                {/* <div className="p-1">hello</div> */}
                <input placeholder="https://google.com" 
                ref={inputRef}
                onKeyDown={(k) => {
                    setSite(s => {
                        if(k.key === "Enter" && inputRef.current) {
                            return "https://" + inputRef.current.value.split("https://").pop();
                        }
                        return s;
                    })
                }}
                 />
            </div>
            <div id="tabs?"></div>
            <iframe className="w-full h-full" id="content" src={site}></iframe>
        </div>
    )
}

export const browser: OSApp = {
    name: "Browser", // can rename later
    dimensions: {width: 600, height: 600},
    barScheme: DEFAULTDARKSCHEME,
    position: {left: 300, top: 200},
    image: "browser.png",
    component: Browser
};