"use client"

import Link from "next/link"

const getPosts = () => {
    return ["these", "are", "thekja,", "psots"];
}

export default function Posts() {
    // retrieve posts now
    const allPosts = getPosts();
    return (
        <div className="pt-10 text-center text-lg">
            this is the posts
        </div>

    )
}