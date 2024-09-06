import IconWrapper from "../iconwrapper";
import SearchIcon from "/public/icons/search.svg"
import LightIcon from "/public/icons/lightmode.svg"
import DarkIcon from "/public/icons/darkmode.svg"
import { FC } from "react";

interface FindableIcon {
    name: string;
    description: string;
    tags: string[];
    icon: any; // icon wrapper component
    darkMode: boolean; // can change to a theme from a parent
}

const IconCard: FC<FindableIcon> = (props: FindableIcon) => {
    return (
        <div id="outercard" className="w-28 h-28 rounded-lg m-3 text-center shadow-lg" style={{
            backgroundColor: props.darkMode ? "white" : "white",
            fontSize: 10
        }}>
            <div id="iconsvg">
                {<IconWrapper icon={props.icon} width={64} height={64} />}
            </div>
            {props.name}
        </div>
    )
}


export default function IconCards(props: any) {
    const darkMode = props.darkMode
    const icons: FindableIcon[] = [
        {
            name: "Search",
            description: "A search bar icon.",
            tags: ["search", "search bar", "magnifying glass"],
            icon: SearchIcon,
            darkMode: darkMode
        },
        {
            name: "Light Mode",
            description: "Sun light mode icon.",
            tags: ["sun", "light mode", "light icon"],
            icon: LightIcon,
            darkMode: darkMode
        },
        {
            name: "Dark Mode",
            description: "Moon dark mode icon.",
            tags: ["moon", "dark mode", "dark icon"],
            icon: DarkIcon,
            darkMode: darkMode
        },
    ]
    return (
        <div id="allicons" className="w-full h-auto flex flex-row justify-center items-stretch flex-wrap">
            {icons.map((ico: FindableIcon, i: number) => {
                return <IconCard key={i} {...ico} />
            })}
        </div>
    )
}