"use client"
import { OpenedProps } from "@/components/os/ostypes";
import { useEffect, useState } from "react";

interface KeyboardShortcuts {
    [key: string]: () => void; // perform a mutation on a keyboard press (this cannot be done functionally)
    // must be a parsed command too
}

// this is for the root OS shortcuts can make them interchangeable

const parseKeyboardCommand = (key: KeyboardEvent) => {
    let parsed: string = "";
    if(key.metaKey || key.ctrlKey) { // macos is meta
        parsed = `<c-${key.key}>`;
    }
    else if(key.altKey) {
        parsed = `<a-${key.key}>`;
    } else {
        parsed = key.key;
    }
    return parsed;
}

const decodeKeyboardCommand = () => { // the opposite of parse, convert it back
}

export default function useGlobalKeydown(props: OpenedProps) {
    const okd = (key: KeyboardEvent) => {
        const keyString = parseKeyboardCommand(key);
        if(keyString in keyboardShortcuts) {
            key.preventDefault();
            keyboardShortcuts[keyString](); // perform the mutation
        }
    }
    const keyboardShortcuts: KeyboardShortcuts = {
        "<c-s>": () => {props.setBarShowing((b: boolean) => {
            return !b;
        })}, // etc
        "Escape": () => {props.setBarShowing(false)}
    }
    // tricky to have a function with multiple params mutate this, might need to do it in scope
    useEffect(() => {
        window.addEventListener("keydown", okd);
        return () => window.removeEventListener("keydown", okd);
    }, []);
}