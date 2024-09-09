import { DragEventHandler, useEffect, useRef, useState } from "react";
import { DesktopIconLayout } from "./widgets/desktopicon";
import { Weather } from "./widgets/weather";
import { Stocks } from "./widgets/stocks";
import { Battery } from "./widgets/battery";

interface WidgetLayout {
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
            <div className="text-white">{isDown}</div>
        </div>
    )
}

export default function Widgets() { // do something like props: (widget | icon) where you render them differently
    const desktopicons: DesktopIconLayout[] = [

    ];
    const widgetList: WidgetLayout[] = [ // render widgets and icons here

    ]
    return (
            <div className="grid w-full h-full p-3" style={{
                gridTemplateRows: "repeat(10, 1fr)",
                gridTemplateColumns: "repeat(16, 1fr)",
                minWidth: "0",
                minHeight: "0",
                gap: "1rem"
            }}>
                <Widget widthBlocks={4} heightBlocks={4} leftBlocks={1} topBlocks={1} widget={<Weather/>} />
                <Widget widthBlocks={4} heightBlocks={2} leftBlocks={1} topBlocks={5} widget={<Stocks />} />
                <Widget widthBlocks={4} heightBlocks={2} leftBlocks={5} topBlocks={1} widget={<Battery />} />
            </div>
    )
}