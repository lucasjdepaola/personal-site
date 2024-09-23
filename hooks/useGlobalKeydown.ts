"use client"
import { OpenedProps } from "@/components/os/ostypes";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { WindowManagerFunctions } from "./useWindowMananager";
import { OSApp } from "@/components/os/appsopened";

interface KeyboardShortcuts {
    [key: string]: () => void; // perform a mutation on a keyboard press (this cannot be done functionally)
    // must be a parsed command too
}
interface WMProps {
    appsOpened: OSApp[];
}

const windows: WMProps[] = []; // array of 1-10 containing the opened props (might need to be a ref)

// this is for the root OS shortcuts can make them interchangeable

const parseKeyboardCommand = (key: KeyboardEvent) => {
    let parsed: string = "";
    if(key.metaKey || key.ctrlKey) { // macos is meta
        parsed = `<c-${key.key}>`;
    }
    else if(key.altKey) {
        parsed = `<a-${key.key}>`;
    }
    else {
        parsed = key.key;
    }
    return parsed;
}

const decodeKeyboardCommand = () => { // the opposite of parse, convert it back
}

export default function useGlobalKeydown(props: OpenedProps, wm: WindowManagerFunctions, setBarShowing: Dispatch<SetStateAction<boolean>>) {
    const okd = (key: KeyboardEvent) => {
        const keyString = parseKeyboardCommand(key);
        if(keyString in keyboardShortcuts) {
            key.preventDefault();
            keyboardShortcuts[keyString](); // perform the mutation
        }
    }
    const keyboardShortcuts: KeyboardShortcuts = {
        "<c-k>": () => {setBarShowing((b: boolean) => {
            return !b;
        })}, // etc
        "Escape": () => {setBarShowing(false)},
        "<c-1>": () => {wm.changeWorkspace(1)},
        "<c-2>": () => {wm.changeWorkspace(2)},
        "<c-3>": () => {wm.changeWorkspace(3)},
        "<c-4>": () => {wm.changeWorkspace(4)},
        "<c-5>": () => {wm.changeWorkspace(5)},
        "<c-6>": () => {wm.changeWorkspace(6)},
        "<c-7>": () => {wm.changeWorkspace(7)},
        "<c-8>": () => {wm.changeWorkspace(8)},
        "<c-9>": () => {wm.changeWorkspace(9)},
        // "<c-!>": () => {wm.moveWindow(undefined, 0, 0)}, // set focused window as a prop, then set to this
        "<c-@>": () => {wm.changeWorkspace(2)},
        "<c-#>": () => {wm.changeWorkspace(3)},
        "<c-$>": () => {wm.changeWorkspace(4)},
        "<c-%>": () => {wm.changeWorkspace(5)},
        "<c-^>": () => {wm.changeWorkspace(9)},
        "<c-&>": () => {wm.changeWorkspace(6)},
        "<c-*>": () => {wm.changeWorkspace(7)},
        "<c-(>": () => {wm.changeWorkspace(8)},
    }
    // tricky to have a function with multiple params mutate this, might need to do it in scope
    useEffect(() => {
        window.addEventListener("keydown", okd);
        return () => window.removeEventListener("keydown", okd);
    }, []);
}