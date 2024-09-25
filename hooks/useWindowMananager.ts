import { OSApp } from "@/components/os/appsopened";
import { OpenedProps } from "@/components/os/ostypes";
import { useCallback, useEffect } from "react";

interface WMProps {
    appsOpened: OSApp[];
}

export enum TilingType {
    DEFAULTHORIZONTAL, // fibonacci style
    DEFAULTVERTICAL, // fib style starting at vertical split
}
export enum WMBorder {
    ROUNDED, SQUARE, NONE
}

export interface WindowManagerFunctions {
    changeWorkspace: (i: number) => void; // switch to a new desktop, i.e: meta+4 will bring you to a blank desktop
    moveWindow: (app: OSApp, from: number, to: number) => void; // i.e: meta+shift+4 brings the focused window too
    changeFocus: (name: string) => void; // i.e meta+j brings the focus downwards
}

const windows: WMProps[] = []; // array of 1-10 containing the opened props (might need to be a ref)

export default function useWindowManager(props: OpenedProps): WindowManagerFunctions { // reference to the open props
    useEffect(() => {
        if(!windows[props.desktopIndex.current]) {
            windows[props.desktopIndex.current] = {appsOpened: []}
        }
        if(props.openedApps) {
            windows[props.desktopIndex.current].appsOpened = [...props.openedApps];
        }
    }, [props.openedApps])
    const changeWorkspace = (i: number) => {
        console.log(props.openedApps);
        if(windows[i] === undefined) {
            windows[i] = {
                appsOpened: []
            }
        }
        props.desktopIndex.current = i;
        props.setOpenedApps([...windows[i].appsOpened]); // changing to a window, eg: meta+2
    }
    const moveWindow = (app: OSApp, from: number, to: number) => {
        // move a window to a new desktop, eg: meta+shift+2
        windows[from].appsOpened = props.openedApps.filter((a) => a.name !== app.name); // cache the current window
        windows[to].appsOpened.push(app);
        props.setOpenedApps(windows[to].appsOpened); // remove the app
    }

    const changeFocus = (name: string) => { // enum, left, up, back
        const ref = props.allAppRefs.current[name];
        if(ref) {
            ref.focus();
        }
    }
    return {changeWorkspace, moveWindow, changeFocus};
};