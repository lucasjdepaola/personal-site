import { PostFile } from "@/app/posts/page";
import Link from "next/link";

const prettyName = (name: string) => {
    return name.split("/").pop();
}

export default function RenderedPosts(props: {posts: PostFile[]}) {
    return (
        <div className="p-5 pt-10 w-full max-w-lg items-center">
            {props.posts.map((post: PostFile, i: number) => {
                return (
                    <Link key={`post${i}`} href={`${post.name}`}
                    >
                        <div id="post link container" className="pb-1">
                            <div id="title" className="text-2xl font-semibold">
                                {post.metadata.title}
                            </div>
                            <div id="description">
                                {post.metadata.description}
                            </div>
                            <hr />
                            <div className="text-sm font-semibold">
                                {post.metadata.date}
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    );
}