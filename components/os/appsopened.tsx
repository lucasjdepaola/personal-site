"use client"

import { Theme } from "@/types/theme";
import AppWrapper from "./appwrapper";
import { OpenedProps } from "./ostypes";
import SpotlightSearch from "./spotlightsearch";


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

export default function OSAppsOpened(props: OpenedProps) {
    return (
        <div className={props.tileWindows? "wmContainer" : ""}>
            <SpotlightSearch {...props} />
            {props.openedApps.map((app: OSApp, i: number) => {
                let width = props.tileWindows ? "initial" : app.dimensions.width + "px";
                const isOdd = i % 2 === 1;
                let height = props.tileWindows ? "initial" : app.dimensions.height + "px";
                let top = props.tileWindows ? "initial" : app.position.top;
                let left = props.tileWindows ? "initial" : app.position.left;
                return (
                    <div
                    id="osappcontainer"
                    className={props.tileWindows ? "wmApp" : ""}
                    key={`app${i}`} style={{
                        position: props.tileWindows ? "initial" : "fixed",
                        zIndex: 2,
                        display: props.tileWindows ? "flex" : "initial",
                        width: width, // this is where it can be mutated
                        height: height,
                        top: top,
                        left: left,
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