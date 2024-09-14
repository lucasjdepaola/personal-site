"use client"

import { Theme } from "@/types/theme";
import AppWrapper from "./appwrapper";
import { OpenedProps } from "./ostypes";


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
    // keep track of state dimensions here by app name
    // make each div draggable inside this component (doesn't really need to be separate)
    return (
        <div>
            {props.openedApps.map((app: OSApp, i: number) => {
                return (
                    <div
                    id="osappcontainer"
                    key={i} style={{
                        position: "fixed",
                        width: app.dimensions.width,
                        height: app.dimensions.height,
                        top: app.position.top,
                        left: app.position.left,
                    }}
                    ref={e => {props.allAppRefs.current[app.name]=e}} // set the ref of the app name
                    >
                        <div id="renderedapp" style={{
                            width: app.dimensions.width, // can turn this into a component
                            height: app.dimensions.height
                        }}>
                            <AppWrapper parent={props} self={app} allAppRefs={props.allAppRefs}>
                                <app.component {...props} />
                            </AppWrapper>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}