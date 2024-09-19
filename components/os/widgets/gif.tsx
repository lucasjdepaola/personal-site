export interface GifWidgetProps {
    url: string
}

export default function GifWidget(props: GifWidgetProps) {
    return (
        <div className="w-full h-full">
            <img src={props.url} />
        </div>
    )
}