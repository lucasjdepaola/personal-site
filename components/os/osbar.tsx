"use client"
import useDate from "@/hooks/useDate";
import useIsMobile from "@/utils/isMobile"
import { useRouter } from "next/navigation";
import { OpenedProps } from "./ostypes";
import IconWrapper from "../iconwrapper";
import SearchIcon from "/public/icons/search.svg"
import NotificationsIcon from "/public/icons/notifications.svg"

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
                <div className="select-none">File</div>
                <div>Edit</div>
                <div>View</div>
                <div>Go</div>
                <div>Window</div>
                <div>Help</div>
            </div>

            <div className="flex justify-end gap-3">
                <div>battery</div>
                <div>wifi</div>
                <div onClick={() => props.setBarShowing(b => !b)}>
                <IconWrapper icon={SearchIcon} height={25} width={25} />
                </div>
                <div>
                    <IconWrapper icon={NotificationsIcon} height={25} width={25} />
                </div>
                <div>{date}</div>
            </div>
        </nav>
    )
}