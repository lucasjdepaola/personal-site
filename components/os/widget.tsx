interface WidgetLayout {
    widthBlocks: number;
    heightBlocks: number;
    leftBlocks: number;
    topBlocks: number;
    widget?: any;
}

interface DesktopIconLayout {

}

const Widget = (props: WidgetLayout) => {
    return (
        <div className="flex content-center items-center rounded-3xl text-center shadow-lg" style={{
            gridColumn: `${props.leftBlocks} / ${props.widthBlocks + props.leftBlocks}`,
            gridRow: `${props.topBlocks} / ${props.heightBlocks + props.topBlocks}`,
            backgroundColor: "black"
        }}>
            {props.widget}
        </div>
    )
}


const DesktopIcon = (props: DesktopIconLayout) => {
    return (
        <div className="flex text-center">this is an icon</div>
    )
}

export default function Widgets() { // do something like props: (widget | icon) where you render them differently
    return (
            <div className="grid w-full h-full p-3" style={{
                gridTemplateRows: "repeat(10, 1fr)",
                gridTemplateColumns: "repeat(16, 1fr)",
                minWidth: "0",
                minHeight: "0",
                gap: "1rem"
            }}>
                <Widget widthBlocks={2} heightBlocks={2} leftBlocks={2} topBlocks={2} />
                <Widget widthBlocks={4} heightBlocks={2} leftBlocks={4} topBlocks={4} />
                <Widget widthBlocks={2} heightBlocks={1} leftBlocks={7} topBlocks={2} />
            </div>
    )
}