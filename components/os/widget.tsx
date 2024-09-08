import { DragEvent, DragEventHandler, MouseEvent, MouseEventHandler, useEffect, useRef, useState } from "react";
import { OSApp } from "./appsopened";

interface WidgetLayout {
    widthBlocks: number;
    heightBlocks: number;
    leftBlocks: number;
    topBlocks: number;
    widget?: any;
}

interface DesktopIconLayout {
    name: string;
    icon: any;
    appToOpen: OSApp;
}

interface Movements {
    x: number;
    y: number;
}

interface DragDetails {
    onDragStart: DragEventHandler;
    onDragEnd: DragEventHandler;
}

const Widget = (props: WidgetLayout) => {
    const [movements, setMovements] = useState<Movements | undefined>(undefined);
    const [offSet, setOffset] = useState<Movements | undefined>(undefined);
    const [isDown, setIsDown] = useState<boolean>(false);
    const widgetRef = useRef<HTMLDivElement | null>(null);
    console.log(isDown + ", " + offSet?.x + ", " + movements)
    useEffect(() => {
        const mup = (ev: globalThis.MouseEvent) => {
            setIsDown(false);
        }
        const mov = (ev: globalThis.MouseEvent) => {
            ev.preventDefault();
            if(isDown) {
                setMovements({x: ev.clientX, y: ev.clientY});
            }
        }
        document.addEventListener("mouseup", mup);
        document.addEventListener("mousemove", mov);
    }, []);

    useEffect(() => {
        const mdn = (e: globalThis.MouseEvent) => {
            console.log("mouse is down now");
            e.preventDefault();
            e.stopPropagation();
            setIsDown(true);
            setOffset((m: any) => {
                if(widgetRef && widgetRef.current) {
                    return {x: widgetRef.current.offsetLeft - e.clientX, y: widgetRef.current.offsetTop - e.clientY}
                }
                return m;
            });
        }
        widgetRef.current?.addEventListener("mousedown", mdn, true);
        return () => {widgetRef.current?.removeEventListener("mousedown", mdn, true)}
    }, [widgetRef.current]);

    return (
        <div className="flex content-center items-center rounded-3xl text-center shadow-lg" style={{
            left: `${movements?.x}px`,
            right: `${movements?.y}px`,
            gridColumn: `${props.leftBlocks} / ${props.widthBlocks + props.leftBlocks}`,
            gridRow: `${props.topBlocks} / ${props.heightBlocks + props.topBlocks}`,
            backgroundColor: "#141414"
        }}
        ref={widgetRef}
        onMouseDown={() => {console.log(" i never get here")}}
        >
            {props.widget}
            <div className="text-white">{isDown}</div>
        </div>
    )
}


const DesktopIcon = (props: DesktopIconLayout) => {
    return (
        <div className="flex text-center">
            <div id="topicon">

            </div>
            <div id="icontext">
                {props.name}
            </div>
        </div>
    )
}

const Weather = () => {
    return (
        <div className="w-full h-full text-center text-lg text-white pt-5">the weather outside is good.</div>
    )
}

const Stocks = () => {
    return (
        <div className="w-full h-full text-center text-lg text-white pt-5">Stocks are up today.</div>
    )
}
const Battery = () => {
    return (
        <div className="w-full h-full text-center text-lg text-white pt-5">Battery is fine.</div>
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