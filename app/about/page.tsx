"use client"
import FancyLink from "@/components/fancylink";
import Footer from "@/components/footer";
import { darkTheme } from "@/components/mainpage";
import NavBar from "@/components/navbar";
import useIsMobile from "@/utils/isMobile";
import { useState } from "react";

export function getStaticProps() {
  // eg https://raw.githubusercontent.com/CodeCraft-Vanilla/wiki/main/test.mdx
  // const posts = postFilePaths.map((filePath) => {
  //   const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
  //   const { content, data } = matter(source);

  //   return {
  //     content,
  //     data,
  //     filePath,
  //   };
  // });

  // return { props: { posts } };
}

const About = (props: any) => {
  const darkMode = props.darkMode;
  const mob = useIsMobile();
  return (
    <>
    <div className="flex justify-center text-center pt-12">
      <div id="text" style={{
        maxWidth: mob ? "85%" : "60%"
      }}>
        <div className="text-xl font-semibold p-2">About</div>
        This site is dedicated towards new endeavors and projects that I can make myself quickly.
        Everything on this website is created from scratch with zero external components, the only dependencies come from a fresh
        install of <FancyLink text="NextJS" link="https://nextjs.org" /> along with mdx, and mdx-remote for markdown parsing
        Currently, I am making my own web Operating system UI similar to <FancyLink text="Dustin Brett" link="https://dustinbrett.com" /> except based on MacOS.
        After this, I plan on creating my own markdown blog parser from scratch.
      </div>
    </div>
    </>
  ) // can do blog and news as well if rendered correctly, just need to understand the seo aspect
}


export default function Home() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const mob = useIsMobile();
  return (
    <>
      <div className="w-100 h-100 min-h-screen"
      style={{
        background: darkMode ? darkTheme.subalt : "#f5f5f7",
        color: darkMode ? darkTheme.text : "black",
      }}
      >
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <About darkMode={darkMode} />
        <Footer darkMode={darkMode} />
      </div>
    </>
  );
}
