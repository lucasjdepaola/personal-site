import fuzzyFind from "@/utils/fzf";
import SearchIcon from "/public/icons/search.svg"
import { desktopicons } from "./programs/apparray";
import { Dispatch, memo, SetStateAction, useEffect, useRef, useState } from "react";
import { OpenedProps } from "./ostypes";
import IconWrapper from "../iconwrapper";

const names = desktopicons.map(e => e.appToOpen.name);

const prettyText = (query: string, result: string) => {
    // can pretty with result.slice query.length
    return ` - ${result}`;
}

function SpotlightSearch(props: OpenedProps) {
    const [query, setQuery] = useState<string>("");
    const [filteredApps, setFilteredApps] = useState<string[]>([]);
    const textRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if(props.barShowing && textRef.current) {
            textRef.current.focus();
        }
    }, [props.barShowing]);
    return ( // TODO hide bar
        <div className="fixed m-auto w-full top-1/3 h-4" style={{
            display: props.barShowing ? "block" : "none",
            zIndex: "4"
        }}
        >
            <div className="flex justify-center items-center">
                <div className="inline-block bg-[#dadada] text-black rounded-2xl shadow-2xl w-1/3 p-3"
                onClick={() => textRef.current?.focus()}
                >
                    <div className="inline-block">
                        <IconWrapper icon={SearchIcon} width={32} height={32} />
                    </div>
                    <div
                    contentEditable
                    tabIndex={-1}
                    ref={textRef}
                    autoCorrect="off" className="inline-block bg-transparent border-none outline-none w-auto resize-none pl-3" 
                    onInput={(e) => {
                        const arr = fuzzyFind(names, e.currentTarget.innerText)
                        setFilteredApps(arr);
                        setQuery(e.currentTarget.innerText);
                    }}
                    onKeyDown={(key) => {
                        if(key.key === "Enter") {
                            props.setOpenedApps(e => {
                                if(e.some(app => app.name === filteredApps[0])) {
                                    return e;
                                }
                                const app = desktopicons.find(e => e.appToOpen.name === filteredApps[0]);
                                if(app === undefined) return e;
                                return [...e, app.appToOpen];
                            })
                            key.currentTarget.innerText = "";
                            setFilteredApps([]);
                            if(props.setBarShowing)
                                props.setBarShowing(false);
                        }
                    }}
                    />
                    <div id="cmpsearch" className="inline-block bg-blue-400 text-white">
                    {
                        filteredApps.length > 0 ? prettyText(query, filteredApps[0]) : ""
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default memo(SpotlightSearch);