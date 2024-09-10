import { MDXRemote } from "next-mdx-remote";
import { compileMDX } from "next-mdx-remote/rsc";
import { Octokit } from "octokit";
import { serialize } from "v8";
//https://github.com/vercel/next.js/discussions/58575
// /repos/{owner}/{repo}/contents/{path}
// http://api.github.com/repos/{owner}/{repo}/contents/{path}
// http://api.github.com/repos/lucasjdepaola/mdx-posts/contents/
// ^^^^^^^^^^^ is a working link to get all the contents inside the git directory.
// https://raw.githubusercontent.com/lucasjdepaola/mdx-posts/main/first.mdx
// const POSTS_FOLDER = path.join(process.cwd(), "posts");

interface FileContent {
  content: string;
  encoding: string;
  [key: string]: any; // Other potential properties
}

const readMdxFile = async(slug: string) => {
  // should not need a key to view my repos
  const octokit = new Octokit({auth: "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"});
  let dt;
  try {
    const { data } = await octokit.rest.repos.getContent({
      owner: "lucasjdepaola",
      repo: 'mdx-posts',
      path: `posts/${slug}`,
    })
    dt = data;
  } catch(e) {
    console.log(e);
  }

  const fd = dt as FileContent;

  const content = Buffer.from(fd.content, 'base64').toString('utf-8');
  
  return content;
}

export async function generateStaticParams() {
  const octokit = new Octokit();
  const {data} = await octokit.rest.repos.getContent({
    owner: "lucasjdepaola",
    repo: "mdx-posts",
    path: "posts"
  });
  if(!data || typeof data === "string") {
    return null;
  }

  let content: any = [];
  if(Array.isArray(data)) {
    content = data.filter((file: any) => {
      const name: string = file.name;
      const regex = new RegExp(`${name}mdx?`);
      return regex.test(name);
    });
  } else {
    return ['this is not it']
  }
  return content;
}


export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  // const markdown = await readPostFile(params.slug);
  let markdown = await readMdxFile(params.slug);

  if (!markdown) {
    // notFound();
  }

  const { content, frontmatter } = await compileMDX<{
    title: string;
    date: string;
    description?: string;
  }>({
    source: markdown,
    options: { parseFrontmatter: true },
  });


  // do something with frontmatter, like set metadata or whatever
  // figure this out intuitively, after implementing doc boiler plate

  // return <>{content}</>;
// export declare function MDXRemote<TScope, TFrontmatter>({ compiledSource, frontmatter, scope, components, lazy, }: MDXRemoteProps<TScope, TFrontmatter>): React.JSX.Element;
  return (
    <div>
      {frontmatter.title} is the title
      {frontmatter.date} is the date
      <div>
        <>{content}</>
        {/* {frontmatter.title} */}
      </div>
      {/* {content} */}
    </div>
  )
}
