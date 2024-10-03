import { memo, useEffect, useReducer, useRef, useState } from "react";
import { OSApp } from "../appsopened";
import { DEFAULTDARKSCHEME } from "../ostypes";

interface Tab {
    url: string;
}

const outline = "1.5px solid rgba(0,0,0,0.1)";

const Browser = () => {
    const [site, setSite] = useState<string>("https://google.com/webhp?igu=1");
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [tabs, setTabs] = useState<Tab[]>([
        {
            url: "google.com/webhp?igu=1"
        },
        {
            url: "lucasdepaola.com"
        }
    ]);
    const [focusedIndex, setFocusedIndex] = useState<number>(0);
    const [hovIndex, setHovIndex] = useState<number>(-1);
    return ( // change to flex layout
        <div className="w-full h-full bg-white">
            <div id="topbar" className="flex flex-row h-7 justify-center items-center p-5">
                <input placeholder="Search or enter a website name." autoCorrect="false" className="outline-none rounded-md border border-1 border-gray-400 pl-1 pr-1"
                ref={inputRef}
                onKeyDown={(k) => {
                    setSite(s => {
                        if(k.key === "Enter" && inputRef.current) {
                            const arr = tabs;
                            arr[focusedIndex] = {url: inputRef.current.value};
                            setTabs(arr);
                            return "https://" + inputRef.current.value.split("https://").pop();
                        }
                        return s;
                    })
                }}
                ></input>
                <div id="functionicons">
                    <div className="" id="newtab"
                    onClick={() => {
                        setTabs(t => [...t, {url: "test.com"}])
                    }}>+</div>
                </div>
            </div>
            <div id="tabs" className="flex flex-row justify-around w-full h-auto bg-white overflow-hidden">
                {tabs.map((tab: Tab, i: number) => {
                    return (
                        <div id="tabcontainer"
                        className="flex flex-1 max-w-full overflow-hidden text-ellipsis flex-row p-1 justify-between items-center hover:bg-[#e5e5e5]" key={`tbc${i}${tab.url}`}
                        style={{
                            transition: "all .2s ease-out",
                            backgroundColor: focusedIndex === i ? "#ffffff": hovIndex === i ? "#e5e5e5" : "#f2f2f2",
                            borderRight: i < tabs.length-1 ? outline: "",
                            borderTop: i !== focusedIndex ? outline: "",
                            borderBottom: outline
                        }}
                        onClick={() => {
                            setFocusedIndex(i);
                            setSite(`https://${tab.url}`)
                        }}
                        onMouseEnter={() => setHovIndex(i)}
                        onMouseLeave={() => setHovIndex(-1)}
                        >
                            <div id="xout" className="rounded-sm pl-1 pr-1 font-light opacity-0 text-opacity-50 hover:bg-[#cccccc]"
                            onClick={() => {
                                setTabs(t => {
                                    const newArr = t.filter((e, il) => i !== il);
                                    setFocusedIndex(i => i > newArr.length-1 ? newArr.length-1 : i);
                                    return newArr;
                                })
                            }}
                            style={{
                                opacity: hovIndex === i ? "1" : "0"
                            }}
                            >x
                            </div>
                            <div id="name" className="text-opacity-50 text-sm text-nowrap text-ellipsis flex shrink-0">
                                {tab.url}
                            </div>
                            <div></div>
                        </div>
                    )
                })}
            </div>
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
    component: memo(Browser)
};