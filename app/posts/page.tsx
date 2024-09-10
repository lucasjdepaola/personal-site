"use client"
import Footer from "@/components/footer";
import NavBar from "@/components/navbar";
import { useState } from "react";
import { ColorfulLargeText, darkTheme, Description } from "@/components/mainpage";
import Posts from "@/components/posts/posts";
import { Octokit } from "octokit";
// .filter((path) => /\.mdx?$/.test(path));
export default async function Home() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  return (
    <>
      <div className="min-h-screen"
      style={{
        background: darkMode ? darkTheme.subalt : "#f5f5f7",
        color: darkMode ? darkTheme.text : "black"
      }}
      >
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Posts />
        <br />
        <Footer darkMode={darkMode} />
      </div>
    </>
  );
}

const getServerSideProps = async () => {
  const octokit = new Octokit({auth:"foobar"});

  const { data } = await octokit.rest.repos.getContent({
    owner: "lucasjdepaola",
    repo: "mdx-content",
    path: "",  // Folder where the MDX files are located
  });

  let files;
  if(Array.isArray(data)) {
    files = data
      .filter((file: any) => file.name.endsWith('.mdx'))
      .map((file: any) => ({
        name: file.name,
        path: file.path,
      }));
  }

  return {
    props: {
      files,
    },
  };
};