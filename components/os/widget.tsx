"use client"
import { useRef, useState } from "react";
import { DesktopIcon, DesktopIconLayout } from "./widgets/desktopicon";
import { Weather } from "./widgets/weather";
import { Stocks } from "./widgets/stocks";
import { Battery } from "./widgets/battery";
import { OpenedProps } from "./ostypes";
import { desktopicons } from "./programs/apparray";
import CalendarWidget from "./widgets/calendar";
import GifWidget from "./widgets/gif";

export interface WidgetLayout {
    widthBlocks: number;
    heightBlocks: number;
    leftBlocks: number;
    topBlocks: number;
    widget?: any;
}

const Widget = (props: WidgetLayout) => {
    const [isDown, setIsDown] = useState<boolean>(false);
    const widgetRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className="flex content-center items-center rounded-3xl overflow-hidden text-center" style={{
            gridColumn: `${props.leftBlocks} / ${props.widthBlocks + props.leftBlocks}`,
            gridRow: `${props.topBlocks} / ${props.heightBlocks + props.topBlocks}`,
            backgroundColor: "#141414"
        }}
        ref={widgetRef}
        >
            {props.widget}
        </div>
    )
}
// drawing line widget? maybe stylistic


export default function Widgets(props: OpenedProps) { // do something like props: (widget | icon) where you render them differently
    const widgetList: WidgetLayout[] = [ // render widgets and icons here

    ]
    return (
            <div className="grid w-full h-full p-3" style={{
                gridTemplateRows: "repeat(10, 1fr)",
                gridTemplateColumns: "repeat(16, 1fr)",
                gap: "1rem"
            }}>
                <Widget widthBlocks={4} heightBlocks={5} leftBlocks={1} topBlocks={1} widget={<Weather/>} />
                <Widget widthBlocks={2} heightBlocks={3} leftBlocks={5} topBlocks={1} widget={<CalendarWidget/>} />
                {/* <Widget widthBlocks={4} heightBlocks={2} leftBlocks={1} topBlocks={5} widget={<Stocks />} />
                <Widget widthBlocks={4} heightBlocks={2} leftBlocks={5} topBlocks={1} widget={<Battery />} /> */}
                <Widget widthBlocks={2} heightBlocks={2} leftBlocks={5} topBlocks={4} widget={<GifWidget url="https://i0.wp.com/boingboing.net/wp-content/uploads/2015/05/tavis.gif?resize=500%2C420" />} />
                {desktopicons.map((ico: DesktopIconLayout, i: number) => {
                    return (
                        <button
                        key={`lyt${i}`}
                        className="w-full h-full cursor-pointer z-10"
                        onClick={() => {props.setOpenedApps(a => [...a, ico.appToOpen])}}
                        style={{
                            gridColumn: `${ico.layout.leftBlocks} / ${ico.layout.widthBlocks + ico.layout.leftBlocks}`,
                            gridRow: `${ico.layout.topBlocks} / ${ico.layout.heightBlocks + ico.layout.topBlocks}`,
                        }}
                        >
                            <DesktopIcon name={ico.name} appToOpen={ico.appToOpen} layout={ico.layout} />
                        </button>
                    )
                })}
            </div>
    )
}