"use client"
import { JSXElementConstructor, ReactElement, useState } from "react";
import NavBar from "../navbar";
import { darkTheme } from "../mainpage";
import Footer from "../footer";

interface PageProps {
    frontmatter: {
        title: string;
        date: string;
        description?: string;
    }; 
    content: ReactElement<any, string | JSXElementConstructor<any>>

}

export default function RenderedPage(props: PageProps) {
    const [darkMode, setDarkMode] = useState<boolean>(false);
    return (
        <>
            <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
            <div id="full content" className="min-h-screen pt-10" style={{
                background: darkMode ? darkTheme.subalt : "#f5f5f7",
                color: darkMode ? darkTheme.text : "black"
            }}>
                <div className="text-5xl">
                    title: {props.frontmatter.title}
                </div>
                <div id="contentmdx" className="max-w-7xl p-10" style={{
                }}>
                    {props.content}
                </div>
                <Footer />
            </div>
        </>
    )
}