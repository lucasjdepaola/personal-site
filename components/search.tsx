import { useState } from "react";
import IconWrapper from "./iconwrapper";
import SearchIcon from "/public/icons/search.svg"
import fuzzyFind from "@/utils/fzf";

interface SearchProps {
    items: string[]; // or define a prop key to iterate through
}

export default function Search(props: SearchProps) {
    const [searchInput, setSearchInput] = useState<string>("");
    const [items, setItems] = useState<any[]>(props.items); // items to filter through (this errors for now)
    const fzf = fuzzyFind(items, searchInput ); /// would look like this
    return (
        <div className="flex w-full text-center items-center justify-center m-auto">
            <div className="w-2/3 h-10 bg-slate-600 rounded-3xl shadow-sm" style={{
                backgroundColor: "#f9f9f9"
            }}>
                <IconWrapper icon={SearchIcon} />
                <input placeholder="search here"
                onKeyDown={(e) => {}}
                onInput={(e) => setSearchInput(e.currentTarget.value)}
                />
                input: {searchInput}
            </div>
        </div>
    )
}