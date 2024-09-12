"use client"
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import { useEffect, useRef, useState } from "react";
import { ColorfulLargeText, darkTheme, Description } from "@/components/mainpage";
import RenderedPosts from "@/components/posts/renderedposts";
import { formatmm } from "@/utils/datelib";
// .filter((path) => /\.mdx?$/.test(path));

interface PostMetaData {
  title: string;
  date: string;
  description?: string;
  slug?: string;
}

export interface PostFile {
  name: string;
  route: string;
  metadata: PostMetaData;
}

interface ParsedRemoteMetaData {
  [route: string]: PostFile[]; // we however just want one key
}


const getFileNames = async(): Promise<PostFile[]> => { // this is where the script comes in
  // const data: ParsedRemoteMetaData = (await fetch("https://raw.githubusercontent.com/lucasjdepaola/mdx-posts/main/routedata.json")).json();
  const data = await fetch("https://raw.githubusercontent.com/lucasjdepaola/mdx-posts/main/routedata.json");
  const metadata: ParsedRemoteMetaData = await data.json() as ParsedRemoteMetaData;
  console.log(metadata);
  return sortFilesByDate(metadata["posts"]); // use the posts key, since we're in posts
}

const sortFilesByDate = (files: PostFile[]): PostFile[] => {
  const toDate = (s: string): number => new Date(formatmm(s)).getTime();
  console.log(toDate('7-24-2003'))
  console.log(toDate('7/24/2003'))
  return files.sort((a, b) => toDate(b.metadata.date) - toDate(a.metadata.date));
}

export default function Home() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [files, setFiles] = useState<PostFile[]>([]);
  useEffect(() => {
    getFileNames().then(e => {setFiles(e)})
  }, []);
  return (
    <>
      <div className="min-h-screen"
      style={{
        background: darkMode ? darkTheme.subalt : "#f5f5f7",
        color: darkMode ? darkTheme.text : "black"
      }}
      >
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <RenderedPosts posts={files} />
        <br />
        <Footer darkMode={darkMode} />
      </div>
    </>
  );
}
