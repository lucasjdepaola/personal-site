import SearchIcon from "/public/icons/search.svg"

export interface IconProps {
    icon: any; // for now
    width?: number;
    height?: number;
}

export default function IconWrapper(props: IconProps) {
    return (
        <props.icon style={{
            width: props.width ? props.width : "2rem",
            height: props.height ? props.height : "2rem",
            display: "inline-block",
            color: "currentColor",
            fill: "currentColor"
        }} />
    )
}
