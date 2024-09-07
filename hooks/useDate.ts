"use client"

import { useEffect, useState } from "react"
const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmtDate = (date: Date) => {
    const mins = date.getMinutes();
    return `${daysOfTheWeek[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()} ${date.getHours()%12}:${mins < 10 ? `0${mins}`:mins}${date.getHours() > 12 ? "PM" : "AM"}`
}

export default function useDate() {
    const [date, setDate] = useState<string>(fmtDate(new Date()));
    useEffect(() => {
        setInterval(() => {
            setDate((d: string) => {
                const dt = new Date();
                return fmtDate(dt);
            })
        }, 60 * 1000);
    }, []);
    return date;
}