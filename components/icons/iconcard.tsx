import IconWrapper from "../iconwrapper";
import SearchIcon from "/public/icons/search.svg"
import LightIcon from "/public/icons/lightmode.svg"
import DarkIcon from "/public/icons/darkmode.svg"
import RefreshIcon from "/public/icons/safari/refresh.svg"
import { FC } from "react";
import { darkTheme } from "../mainpage";

interface FindableIcon {
    name: string;
    description: string;
    tags: string[];
    icon: any; // icon wrapper component
    darkMode: boolean;
}

const IconCard: FC<FindableIcon> = (props: FindableIcon) => {
    return (
        <div id="outercard" className="w-28 h-28 rounded-lg m-3 text-center shadow-lg" style={{
            backgroundColor: props.darkMode ? darkTheme.lighterBlack : "white",
            color: props.darkMode ? darkTheme.text : "black",
            fontSize: ".8rem"
        }}>
            <div id="iconsvg">
                {<IconWrapper icon={props.icon} width={64} height={64} />}
            </div>
            {props.name}
        </div>
    )
}


export default function IconCards(props: any) {
    const darkMode = props.darkMode;
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
        {
            name: "Refresh",
            description: "Refresh anything icon.",
            tags: ["refresh", "restart", "redo"],
            icon: RefreshIcon,
            darkMode: darkMode
        },
    ]
    return (
        <div id="allicons" className="w-full h-auto flex flex-row justify-center items-stretch flex-wrap">
            {icons.map((ico: FindableIcon, i: number) => {
                return <IconCard key={i} name={ico.name} description={ico.description} icon={ico.icon} tags={ico.tags} darkMode={props.darkMode} />
            })}
        </div>
    )
}