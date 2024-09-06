import SearchIcon from "/public/icons/search.svg"

export interface IconProps {
    icon: any; // for now
}

export default function IconWrapper(props: IconProps) {
    return (
        <props.icon style={{
            width: "2rem",
            height: "2rem",
            display: "inline-block",
            // color: "green",
            // fill: "green"
            color: "currentColor",
            fill: "currentColor"
        }} />
    )
}
