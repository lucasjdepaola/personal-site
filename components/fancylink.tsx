import Link from "next/link";

export default function FancyLink(props: any) {
  return (
    <span
    className="p-1 pr-2 pl-2 rounded-xl cursor-pointer shadow-lg"
    style={{
      opacity: "1.0",
      color: "white",
      backgroundColor: "#0271e3",
    }}>
      <Link href={props.link}>{props.text}</Link>
    </span>
  )
}