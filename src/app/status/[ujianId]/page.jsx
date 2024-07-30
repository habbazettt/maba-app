"use client"
import Lottie from "lottie-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import Failed from '@/components/Failed.json'
import Congrats from '@/components/Congrats.json'
import Effect from '@/components/Effect.json'
import Link from "next/link";

export default function Status() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { ujianId } = useParams()

    useEffect(() => {
        fetch('https://script.googleusercontent.com/macros/echo?user_content_key=JgJy2veyhgJ5aTPji-EW8jAn70QCotfUEGgT_luIrBYT11juophjAip-p3eJAHL2IhnEWpvujrRYbueXAa7eL_5sHccEdIAvm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPme5U1Bh1ukmXizeEFpThbKmfODxYjgQhvgQYrsxl-8BzPjoKvuHyZxwzmgzSVfo4xAeia2YSnSkJztXbHunVvZMQKCvVaNbQ&lib=MR21H4MUNAkhD5JL6VaAGK5Pu8UfgCXPP')
            .then(res => res.json())
            .then(data => setData(data.find((item) => item.ujianId == ujianId)))
            .then(() => setIsLoading(false))
            .catch(err => console.error(err))
    }, [])

    return (
        <div>
            {
                isLoading ?
                    <div className="w-full h-screen flex flex-col gap-5 justify-center items-center text-center bg-primary">
                        <ThreeCircles
                            visible={true}
                            height="130"
                            width="130"
                            color="#ffffff"
                            ariaLabel="three-circles-loading"
                        />
                        <h1 className="text-white font-light">Mengambil Data...</h1>
                    </div>
                    :
                    <div className={`w-full relative h-screen ${data?.keterangan == "LULUS" ? "bg-green-600" : "bg-red-600"} flex flex-col justify-center items-center px-2`}>
                        {
                            data?.keterangan == "LULUS" ? <Lottie animationData={Congrats} loop={true} className="w-[150px]" /> : <Lottie animationData={Failed} loop={true} className="w-[150px]" />
                        }
                        <h1 className="text-4xl text-white text-center">
                            {
                                data?.keterangan == "LULUS" ? "Selamat," : "Mohon Maaf,"
                            }
                        </h1>
                        <p className="text-4xl text-white font-semibold mt-1 text-center">{data?.nama}</p>
                        <p className="mt-2 text-lg text-white">
                            {data?.keterangan == "LULUS" ? "Anda dinyatakan lulus" : "Anda dinyatakan tidak lulus"}
                        </p>

                        <Link
                            href={`/result/${ujianId}`}
                            className={`bg-white ${data?.keterangan == "LULUS" ? "text-green-600" : "text-red-600"} rounded-lg text-lg shadow-md px-4 py-2 absolute bottom-10 z-50`}
                        >Lihat Raport</Link>

                        <div>
                            {
                                data?.keterangan == "LULUS" && <Lottie animationData={Effect} loop={true} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-screen z-10" />
                            }
                        </div>
                    </div>
            }
        </div>
    );
}