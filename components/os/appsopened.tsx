"use client"

import { Theme } from "@/types/theme";
import AppWrapper from "./appwrapper";
import { OpenedProps } from "./ostypes";
import SpotlightSearch from "./spotlightsearch";
import { useCallback, useEffect } from "react";


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

export default function OSAppsOpened(props: OpenedProps) {
    // change to a condition where you render one as a recursive component, and the other as this
    const RecursiveTileApps = (p: RecursiveTileProps) => {
        const app = props.openedApps[p.index];
        return app && (
            <div key={`recurse${p.index}`}
            className="flex w-full h-full"
            ref={e => {props.allAppRefs.current[app.name]=e}} // set the ref of the app name
            style={{
                zIndex: 2,
                flexDirection: p.index % 2 === 1 ? "column" : "row",
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
    }
    return (
        props.tileWindows ? (
            <div className="w-full h-full relative">
                <SpotlightSearch {...props}/>
                <RecursiveTileApps index={0} />
            </div>
        )
        :
        <div>
            <SpotlightSearch {...props} />
            {props.openedApps.map((app: OSApp, i: number) => {
                return (
                    <div
                    id="osappcontainer"
                    key={`app${i}`} style={{
                        position: "fixed",
                        zIndex: 2,
                        width: app.dimensions.width, // this is where it can be mutated
                        height: app.dimensions.height,
                        top: app.position.top,
                        left: app.position.left,
                        // transition: "all .5s linear"
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