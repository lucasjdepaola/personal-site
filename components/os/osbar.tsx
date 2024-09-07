"use client"
import useDate from "@/hooks/useDate";
import useIsMobile from "@/utils/isMobile"
import { useRouter } from "next/navigation";
import { OpenedProps } from "./ostypes";

export default function OSBar(props: OpenedProps) {
    const mob = useIsMobile();
    const date = useDate();
    const router = useRouter();
    return (
        <nav className="flex flex-row static justify-between pl-4 pr-4 pt-2 pb-2 gap-3 text-sm w-full" style={{
            background: "#dadada"
        }}>
            <div className="flex justify-start gap-3">
                <button onClick={() => {router.push("/")}}>Home</button>
                <div>File</div>
                <div>Edit</div>
                <div>View</div>
                <div>Go</div>
                <div>Window</div>
                <div>Help</div>
            </div>

            <div className="flex justify-end gap-3">
                <div>battery</div>
                <div>wifi</div>
                <div>search</div>
                <div>notifications</div>
                <div>{date}</div>
            </div>
        </nav>
    )
}