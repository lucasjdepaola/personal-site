import Image from "next/image"
import FancyLink from "./fancylink"
import IconWrapper from "./iconwrapper";
import RefreshIcon from "/public/icons/safari/refresh.svg"
import useIsMobile from "@/utils/isMobile";

interface BrowserImageProps {
    name: string;
    alt: string;
    path: string;
    link: string;
}

export const BrowserViewingImage = (props: BrowserImageProps) => {
    const mob = useIsMobile();
    const palatte: any = {
        red: "#fe5f57",
        yellow: "#febc2e",
        green: "#28c840"
    }
    return (
        <div id="browser" className="w-full p-5">
            <div id="topbar"
            className="w-full h-10 bg-white rounded-t-2xl"
            style={{
                border: "1px solid rgba(0,0,0,.1)",
                color: "rgba(0,0,0,0.8)"
            }}
            >
                {Object.keys(palatte).map((color: string, index: number) => {
                    return (
                        <div key={index} style={{
                            position: "absolute",
                            backgroundColor: palatte[color],
                            borderRadius: "100%",
                            width: mob? ".4em" : ".8em",
                            height: mob? ".4em" : ".8em",
                            margin: ".8em",
                            marginLeft: mob ? (2 * index + .5) + "%" : (1.3*index + .5) + "%"
                        }}></div>
                    )
                })}
                <div id="searchwrapper" className="w-full h-full">
                    <div id="searchbar"
                    className="relative w-3/5 top-1/3 rounded-md shadow-sm text-center m-auto"
                    style={{
                        border: "1px solid rgba(0,0,0,.1)",
                        verticalAlign: "middle",
                        padding: ".05em",
                        fontSize: mob ? "0.5rem" : "1rem"
                    }}
                    >
                        {props.link}
                        <div className="absolute right-0 top-0">
                            <IconWrapper icon={RefreshIcon} width={mob ? 16: 32} height={mob ? 16 : 32} />
                        </div>
                    </div>
                </div>
            </div>
            <div id="pageview">
                <Image className="" src={props.path} height={1080/2} width={1920/2} alt={props.alt} />
            </div>
        </div>
    )
}

export default function Projects() {
    return (
        <>
            <div className="text-3xl font-semibold">Projects</div>
            <BrowserViewingImage name="Crazytype" alt="A capable typing website." path="/images/crazytype.png" link="crazytype.com/typetest" />
            <FancyLink text="Crazytype" link="https://crazytype.com/typetest" />, 
            a capable typing website where you can improve at typing fast. Train mode, a newfound algorithm that finds your hardest
            words to type and puts them upfront for priority training. The keymap also
            displays a gradient ranging from red to green based on how fast you type a specific character on your keyboard.
            
            <br /><br />

            <BrowserViewingImage name="Rapid" alt="rapid text editor." path="/images/rapid.png" link="lucasdepaola.com/Rapid" />
            <FancyLink text="Rapid" link="https://lucasdepaola.com/Rapid" />
            , a performant, modal, portable text editor with many features including vim motions and browser local code execution.
            This is not a beginner friendly editor, you will need a full understanding of vim in order to use this editor the way it was intended.
        </>
    )
}