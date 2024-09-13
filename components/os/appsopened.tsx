"use client"

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
    component: any;
}



export default function OSAppsOpened(props: OpenedProps) {
    return (
        <div>
            {props.openedApps.map((app: OSApp, i: number) => {
                return ( // render dimensions etc
                    <div id="osappcontainer" key={i} style={{
                        width: app.dimensions.width,
                        height: app.dimensions.height
                    }}>
                        <div id="osappbar">
                            {app.name}
                        </div>
                        <div id="renderedapp" style={{
                            position: "fixed",
                            top: app.position.top,
                            left: app.position.left,
                            width: app.dimensions.width, // can turn this into a component
                            height: app.dimensions.height
                        }}>
                            <app.component {...props} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}