"use client"
import useDate from "@/hooks/useDate";
import useIsMobile from "@/utils/isMobile"
import { useEffect, useState } from "react";

export default function OSBar() {
    const mob = useIsMobile();
    const date = useDate();
    return (
        <nav className="flex flex-row static justify-between font-light pl-4 pr-4 pt-2 pb-2 gap-3 text-md w-full" style={{
            background: "#dadada"
        }}>
            <div className="flex justify-start gap-3">
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