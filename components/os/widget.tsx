import { DragEventHandler, useEffect, useRef, useState } from "react";
import { DesktopIcon, DesktopIconLayout } from "./widgets/desktopicon";
import { Weather } from "./widgets/weather";
import { Stocks } from "./widgets/stocks";
import { Battery } from "./widgets/battery";
import { terminal } from "./programs/terminal";
import { OpenedProps } from "./ostypes";
import { notes } from "./programs/notes";
import { browser } from "./programs/browser";
import { calculator } from "./programs/calculator";

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
        <div className="flex content-center items-center rounded-3xl text-center shadow-lg" style={{
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


export default function Widgets(props: OpenedProps) { // do something like props: (widget | icon) where you render them differently
    const desktopicons: DesktopIconLayout[] = [ // this should be done in another file
        {
            name: "Terminal",
            appToOpen: terminal,
            layout: {
                widthBlocks: 1,
                heightBlocks: 1,
                topBlocks: 6,
                leftBlocks: 7
            },
        },
        {
            name: "Notes",
            appToOpen: notes,
            layout: {
                widthBlocks: 1,
                heightBlocks: 1,
                topBlocks: 7,
                leftBlocks: 7
            },
        },
        {
            name: "Browser",
            appToOpen: browser,
            layout: {
                widthBlocks: 1,
                heightBlocks: 1,
                topBlocks: 8,
                leftBlocks: 8,
            }
        },
        {
            name: "Calculator",
            appToOpen: calculator,
            layout: {
                widthBlocks: 1,
                heightBlocks: 1,
                topBlocks: 8,
                leftBlocks: 9
            }
        }
    ];
    const widgetList: WidgetLayout[] = [ // render widgets and icons here

    ]
    return (
            <div className="grid w-full h-full p-3" style={{
                gridTemplateRows: "repeat(10, 1fr)",
                gridTemplateColumns: "repeat(16, 1fr)",
                gap: "1rem"
            }}>
                {/* <Widget widthBlocks={4} heightBlocks={4} leftBlocks={1} topBlocks={1} widget={<Weather/>} />
                <Widget widthBlocks={4} heightBlocks={2} leftBlocks={1} topBlocks={5} widget={<Stocks />} />
                <Widget widthBlocks={4} heightBlocks={2} leftBlocks={5} topBlocks={1} widget={<Battery />} /> */}
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