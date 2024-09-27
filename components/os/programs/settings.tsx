"use client"
import IconWrapper from "@/components/iconwrapper";
import { OSApp } from "../appsopened";
import { DEFAULTDARKSCHEME } from "../ostypes";
import SearchIcon from "/public/icons/search.svg"
import { CSSProperties, useEffect, useRef, useState } from "react";

const Switch = () => {
}

const SearchBar = () => {
    return (
        <div className="flex flex-row w-full p-1 rounded-md bg-[#dadada]">
            <IconWrapper icon={SearchIcon} width={25} height={25} />
            <div contentEditable onClick={e => {e.currentTarget.innerText = ""}} className="opacity-30 outline-none">Search</div>
        </div>
    )
}

const Changelist = () => {
}

const Choicelist = () => {
}

const Checklist = () => {
}

const SubSetting = () => {
}
const Profile = () => {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="text-center">img here</div>
            <div className="text-center font-bold text-lg">Lucas DePaola</div>
            <div className="text-center text-md">email@foo.bar</div>
        </div>
    )
}

enum SettingsCategory {
    PROFILE, WIFI, BLUTOOTH, NETWORK, NOTIFICATIONS, SOUND, FOCUS, WALLPAPER, WIDGETS, KEYBINDS
}
type SettingsComponent = {
    [key in SettingsCategory]?: () => JSX.Element; // enum component mapping
}

const components: SettingsComponent = {
    [SettingsCategory.PROFILE]: Profile 
}

const Settings = () => {
    const [category, setCategory] = useState<SettingsCategory>(SettingsCategory.PROFILE);
    const Component = components[category];
    const selected = (c: SettingsCategory): CSSProperties => ({
        backgroundColor: c === category ? "#0064e1" : "", 
        color: c === category ? "white": "black"
    });
    const backCache = useRef<JSX.Element | null>(null);
    return (
        <div className="flex flex-row w-full h-full bg-white text-black">
            <div id="settingsleftbar" className="flex flex-col border border-1 border-[#dadada] w-56 p-2">
                <SearchBar />
                <div className="rounded-md mt-1 mb-1 p-1" style={selected(SettingsCategory.PROFILE)}>
                    <div>Lucas DePaola</div>
                    <div className="text-sm opacity-60">Profile</div>
                </div>
            </div>
            <div id="settingscomponent" className="flex-1">
                {Component && <Component />}
            </div>
        </div>
    );
}
export const settings: OSApp = {
    name: "Settings",
    dimensions: {width: 900, height: 500},
    barScheme: DEFAULTDARKSCHEME,
    position: {left: 300, top: 300},
    image: "settings.webp",
    component: Settings
};