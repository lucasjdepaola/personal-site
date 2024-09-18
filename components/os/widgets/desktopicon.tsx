"use client"
import { useState } from "react";
import { OSApp } from "../appsopened";
import { WidgetLayout } from "../widget";

export interface DesktopIconLayout {
    name: string;
    layout: WidgetLayout;
    appToOpen: OSApp;
}

export const DesktopIcon = (props: DesktopIconLayout) => {
    return ( // icons should be png images
        <div className="w-full h-full shadow-lg text-center text-white" style={{
        }}>
            <div id="image" className="rounded-lg overflow-hidden" style={{width: "64px", height: "64px", margin: "auto"}}>
                <img src={`/images/os/${props.appToOpen.image}`}></img>
            </div>
            <div id="icontext" className="text-sm text-center">
                {props.name}
            </div>
        </div>
    )
}