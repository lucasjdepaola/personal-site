"use client"

import { Theme } from "@/types/theme";
import AppWrapper from "./appwrapper";
import { OpenedProps } from "./ostypes";
import SpotlightSearch from "./spotlightsearch";
import { memo, useCallback, useEffect, useState } from "react";


export interface Dimensions {
    width: number;
    height: number;
}

export interface Position {
    top: number;
    left: number;
}

export interface OSApp {
    name: string;
    dimensions: Dimensions;
    position: Position
    barScheme: Theme;
    component: any;
    image: string;
}

interface RecursiveTileProps {
    index: number;
}

export type AppsWithoutBar = Omit<OpenedProps, "barShowing">;
function OSAppsOpened(props: OpenedProps) {
    const [shouldAnimate, setShouldAnimate] = useState<boolean>(true);
    const animateNames = (names: string[]) => {
        names.forEach((name: string) => {
        })
    }
    const animateName = (name: string) => {
        const r = props.allAppRefs.current[name];
        if(r) {
            r.style.animation = "openedapp .4s forwards";
        }
    }
    const RecursiveTileApps = memo((p: RecursiveTileProps) => {
        const app = props.openedApps[p.index];
        return app && (
            <div key={`recurse${p.index}`}
            className="flex w-full h-full"
            ref={e => {props.allAppRefs.current[app.name]=e}} // set the ref of the app name
            style={{
                zIndex: 2,
                flexDirection: p.index % 2 === 1 ? "column" : "row",
                transform: p.index === props.openedApps.length-1 ? "scale(0.5)" : "scale(1)",
                animation: p.index === props.openedApps.length-1 ? "openedapp .4s forwards" : ""
            }}>
                <div className="flex-1">
                    <AppWrapper parent={props} self={app} allAppRefs={props.allAppRefs}>
                        <app.component {...props} />
                    </AppWrapper>
                </div>
                {p.index < props.openedApps.length - 1 && (
                    <div className="flex-1">
                        <RecursiveTileApps index={p.index + 1} />
                    </div>
                )}
            </div>
        )
    });
    return (
        props.tileWindows ? (
            <>
                {props.openedApps.length > 0 &&
                <div className="w-full h-full relative">
                    <RecursiveTileApps index={0} />
                </div>}
            </>
        )
        :
        <div>
            {props.openedApps.map((app: OSApp, i: number) => {
                return (
                    <div
                    id="osappcontainer"
                    tabIndex={-1}
                    key={`app${i}`} style={{
                        position: "fixed",
                        zIndex: 2,
                        width: app.dimensions.width, // this is where it can be mutated
                        height: app.dimensions.height,
                        top: app.position.top,
                        left: app.position.left,
                    }}
                    ref={e => {props.allAppRefs.current[app.name]=e}} // set the ref of the app name
                    >
                        <AppWrapper parent={props} self={app} allAppRefs={props.allAppRefs}>
                            <app.component {...props} />
                        </AppWrapper>
                    </div>
                )
            })}
        </div>
    )
}
export default memo(OSAppsOpened);