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

const Widget = (props: WidgetLayout) => {
    return (
        <div className="flex content-center items-center rounded-3xl text-center shadow-lg" style={{
            gridColumn: `${props.leftBlocks} / ${props.widthBlocks + props.leftBlocks}`,
            gridRow: `${props.topBlocks} / ${props.heightBlocks + props.topBlocks}`,
            backgroundColor: "#141414"
        }}>
            {props.widget}
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