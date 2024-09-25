"use client"
import LightIcon from "/public/icons/lightmode.svg"
import DarkIcon from "/public/icons/darkmode.svg"
import CloudIcon from "/public/icons/cloud.svg"
import IconWrapper from "@/components/iconwrapper"
import { useEffect, useRef } from "react"

const LightLine = () => {
    return (
        <div className="w-11/12 m-auto opacity-50">
            <hr />
        </div>
    )
}

// https://open-meteo.com
// https://api.open-meteo.com/v1/forecast?latitude=40.7143&longitude=-74.006&current=temperature_2m&hourly=temperature_2m&temperature_unit=fahrenheit

interface WeatherData {
    latitude: number;
    longitude: number;
    current: {
        time: string;
        interval: number;
        temperature_2m: number; // the current temp
    }
    hourly: {
        time: string[]
        temperature_2m: number;
    }
}

const getWeather = async(): Promise<WeatherData> => {
    //https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,precipitation,cloud_cover
    const data = await fetch("https://api.open-meteo.com/v1/forecast?latitude=40.7143&longitude=-74.006&current=temperature_2m&hourly=temperature_2m&temperature_unit=fahrenheit");
    const asWeatherData: WeatherData = await data.json() as WeatherData;
    return asWeatherData;
}
// clouds #95a1b2

const getHours = () => {
    // 6 hours
    let hr: number = new Date().getHours();
    const am = (h: number): boolean => h === 24 || h < 12;
    const arr = [];
    for(let i = 0; i < 6; i++) {
        let amorpm = am(hr) ? "AM" : "PM";
        let hour = hr % 12 === 0 ? 12 : hr % 12;
        arr.push(`${hour}${amorpm}`);
        hr = hr >= 23 ? 0 : hr + 1;
    }
    return arr;
}

const getDays = () => {
    const days = "Sun Mon Tue Wed Thu Fri Sat".split(" ");
    let d = new Date().getDay();
    const arr = [];
    for(let i = 0; i < 5; i++) {
        arr.push(days[d]);
        d = d >= days.length? 0 : d + 1;
    }
    return arr;
}

export const Weather = () => {
    // const weatherData = useRef<WeatherData | undefined>(undefined);
    useEffect(() => {
        // getWeather().then(data => {weatherData.current = data});
    }, []);
    return (
        <div className="w-full h-full flex flex-col bg-gradient-to-b from-[#084d90] via-60% via-[#417eba] to-white text-lg text-white">
            <div id="topweatherinfo" className="flex flex-row justify-between">
                <div id="leftsideweatherinfo" className="p-3">
                    <div id="city">City</div>
                    <div id="temp" className="text-3xl font-light">81°</div>
                </div>
                <div id="rightsideweatherinfo" className="p-3 text-sm">
                    <div className="">
                        <IconWrapper icon={CloudIcon} width={25} height={25} />
                    </div>
                    Cloudy
                    <div>H:100° L:10°</div>
                </div>
            </div>
            <LightLine />
            <div id="middlehourlyforecast" className="flex flex-row items-center">
                {getHours().map((e, i) => {
                    return (
                        <div key={`hr${i}`} className="w-full flex-col">
                            <div className="text-sm">{e}</div>
                            <IconWrapper icon={CloudIcon} width={24} height={24} />
                            <div className="text-sm">{60}°</div>
                        </div>
                    )
                })}
            </div>
            <LightLine />
            <div id="bottomweeklyforecast" className="flex flex-col items-start p-5">
                {getDays().map((day: string, i: number) => {
                    return (
                        <div className="flex flex-row w-full justify-around" key={`${day}${i}`}>
                            <div>{day}</div>
                            <IconWrapper icon={CloudIcon} width={24} height={24} />
                            <div>55°</div>
                            <div>{"<"}-----{">"}</div>
                            <div>70°</div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
