"use client"

import { Theme } from "@/types/theme";
import AppWrapper from "./appwrapper";
import { OpenedProps } from "./ostypes";
import { useState } from "react";


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
}

interface TrackedDimensions {
    [key: string]: Dimensions;
}

export default function OSAppsOpened(props: OpenedProps) {
    return (
        <div>
            {props.openedApps.map((app: OSApp, i: number) => {
                return (
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
                            <AppWrapper parent={props} self={app}>
                                <app.component {...props} />
                            </AppWrapper>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}