import { componentsMDX } from "@/components/posts/postelementstyles";
import { compileMDX } from "next-mdx-remote/rsc";
import { Octokit } from "octokit";
// http://api.github.com/repos/{owner}/{repo}/contents/{path}
// http://api.github.com/repos/lucasjdepaola/mdx-posts/contents/
// https://raw.githubusercontent.com/lucasjdepaola/mdx-posts/main/first.mdx

interface FileContent {
  content: string;
  encoding: string;
  [key: string]: any; // Other potential properties
}
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

const readMdxFile = async(slug: string) => {
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
    return "Not found.";
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
  let markdown = await readMdxFile(params.slug);

  const { content, frontmatter } = await compileMDX<{
    title: string;
    date: string;
    description?: string;
  }>({
    source: markdown,
    options: { parseFrontmatter: true, },
    components: componentsMDX
  });
  return (// turn this into a component, so you can run it client side for states, variables, etc
    <div id="full content" className="min-h-screen">
      <div>
        {frontmatter.title}
      </div>
      {content}
    </div>
  )
}
