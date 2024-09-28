"use client"
import { useRef, useState } from "react";
import { DesktopIcon, DesktopIconLayout } from "./widgets/desktopicon";
import { Weather } from "./widgets/weather";
// import { Stocks } from "./widgets/stocks";
// import { Battery } from "./widgets/battery";
import { BoxCoords, OpenedProps } from "./ostypes";
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


export default function Widgets(props: OpenedProps) { // do something like props: (widget | icon) where you render them differently
    const widgetList: WidgetLayout[] = [ // render widgets and icons here
    ]
    const [highlightedIcons, setHighlightedIcons] = useState<boolean[]>([]);
    const iconInRange = (boxCoords: BoxCoords, rect: DOMRect): boolean => {
        const right = boxCoords.pos.left + boxCoords.dimensions.width;
        const bottom = boxCoords.pos.top + boxCoords.dimensions.height;
        if(boxCoords.pos.left <= rect.right && boxCoords.pos.top <= rect.bottom && right >= rect.left && bottom >= rect.top) {
            return true;
        }
        return false;
    }
    return (
            <div className="grid w-full h-full p-3" style={{
                gridTemplateRows: "repeat(10, 1fr)",
                gridTemplateColumns: "repeat(16, 1fr)",
                gap: "1rem"
            }}
            >
                <Widget widthBlocks={4} heightBlocks={5} leftBlocks={1} topBlocks={1} widget={<Weather/>} />
                <Widget widthBlocks={2} heightBlocks={3} leftBlocks={5} topBlocks={1} widget={<CalendarWidget/>} />
                {/* <Widget widthBlocks={4} heightBlocks={2} leftBlocks={1} topBlocks={5} widget={<Stocks />} />
                <Widget widthBlocks={4} heightBlocks={2} leftBlocks={5} topBlocks={1} widget={<Battery />} /> */}
                <Widget widthBlocks={2} heightBlocks={2} leftBlocks={5} topBlocks={4} widget={<GifWidget url="https://i0.wp.com/boingboing.net/wp-content/uploads/2015/05/tavis.gif?resize=500%2C420" />} />
                {desktopicons.map((ico: DesktopIconLayout, i: number) => {
                    return (
                        <div
                        key={`lyt${i}`}
                        className="w-full h-full cursor-default z-10"
                        onDoubleClick={() => {
                            // is it already minimized?
                            if(props.openedApps.some(app => app.name === ico.appToOpen.name)) {
                                const r = props.allAppRefs.current[ico.appToOpen.name];
                                if(r) {
                                    r.style.transition = "top .2s linear, left .2s linear";
                                    r.style.top = ico.appToOpen.position.top + "px";
                                    r.style.left = ico.appToOpen.position.left + "px";
                                    setTimeout(() => {
                                        r.style.transition = "";
                                    }, 1000);
                                }
                            } else { // open it regularly (not minimized)
                                props.setOpenedApps(a => [...a, ico.appToOpen])
                            }
                        }}
                        ref={(r) => {
                            if(r && props.boxCoords) {
                                const rect = r.getBoundingClientRect();
                                setHighlightedIcons(c => {
                                    if(props.boxCoords)
                                        c[i] = iconInRange(props.boxCoords, rect);
                                    return c;
                                })
                            }
                        }}
                        onClick={(e) => {
                            setHighlightedIcons(c => {
                                c[i] = true;
                                return c;
                            });
                        }}
                        style={{
                            gridColumn: `${ico.layout.leftBlocks} / ${ico.layout.widthBlocks + ico.layout.leftBlocks}`,
                            gridRow: `${ico.layout.topBlocks} / ${ico.layout.heightBlocks + ico.layout.topBlocks}`,
                            border: highlightedIcons[i]? "1px solid white" : "1px solid transparent",
                            backgroundColor: highlightedIcons[i]? "rgba(255,255,255,0.3)" : "initial"
                        }}
                        >
                            <DesktopIcon name={ico.name} appToOpen={ico.appToOpen} layout={ico.layout} />
                        </div>
                    )
                })}
            </div>
    )
}