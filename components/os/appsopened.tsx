"use client"

import { useState } from "react";


export interface Dimensions {
    width: number;
    height: number;
}

export interface OSApp {
    name: string;
    dimensions: Dimensions;
    component: any;
}

export default function OSAppsOpened() {
    const [openedApps, setOpenedApps] = useState<OSApp[]>([]); // this might need to be at a higher level
    return (
        <div>
            {openedApps.map((app: OSApp, i: number) => {
                return ( // render dimensions etc
                    <div id="osappcontainer" key={i}>
                        <div id="osappbar">
                            {app.name}
                        </div>
                        <div id="renderedapp">
                            {app.component}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}