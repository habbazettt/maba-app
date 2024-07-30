"use client"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { ThreeCircles } from "react-loader-spinner"
import { FaHome } from "react-icons/fa"
import Image from "next/image"
import Link from "next/link"

export default function Result() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { ujianId } = useParams()

    const router = useRouter()

    useEffect(() => {
        fetch('https://script.googleusercontent.com/macros/echo?user_content_key=JgJy2veyhgJ5aTPji-EW8jAn70QCotfUEGgT_luIrBYT11juophjAip-p3eJAHL2IhnEWpvujrRYbueXAa7eL_5sHccEdIAvm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPme5U1Bh1ukmXizeEFpThbKmfODxYjgQhvgQYrsxl-8BzPjoKvuHyZxwzmgzSVfo4xAeia2YSnSkJztXbHunVvZMQKCvVaNbQ&lib=MR21H4MUNAkhD5JL6VaAGK5Pu8UfgCXPP')
            .then(res => res.json())
            .then(data => setData(data.find((item) => item.ujianId == ujianId)))
            .then(() => setIsLoading(false))
            .catch(err => console.error(err))
    }, [ujianId])

    return (
        <>
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
                    <>
                        <div className="w-[390px] h-full mx-auto sm:mt-10 mt-0 border border-black relative">
                            <div className="text-center p-2.5 relative mx-auto bg-primary text-white">
                                <div className="flex justify-center items-center -mt-5">
                                    <Image src="/logoMahadPutih.svg" alt="" width={46} height={46} className=" ml-6" />
                                    <Image src="/logoUINPutih.svg" alt="" width={96} height={96} className=" -ml-3" />
                                </div>
                                <h1 className="text-[16px] font-bold -mt-4">MAHAD TAHFIDZ</h1>
                                <h1 className="text-sm font-semibold -mt-1">UIN Sunan Gunung Djati Bandung</h1>
                                <h1 className="text-xs font-light">Tahun Akademik 2024-2025</h1>
                            </div>

                            <div className="w-full h-[1px] bg-black -mt-1.5" />

                            <h1 className="text-center mt-4 font-extrabold">KELULUSAN CALON MAHASANTRI</h1>
                            <div className="mt-1 w-[90%] mx-auto flex flex-col">
                                <h1 className="text-[15px]">No Pendaftaran : {data?.ujianId}</h1>
                                <h1 className="text-[15px]">Nama : {data?.nama}</h1>
                                <h1 className="mt-0.5 text-[15px]">Keterangan : {data?.keterangan}</h1>
                                <h1 className="mt-0.5 text-[15px]">Mentor MPLM : {data?.mentor}</h1>
                                <h1 className="mt-0.5 text-[15px]">Klik <Link className="text-blue-500 hover:text-blue-700 transition-all flex-wrap" target="_blank" href={data?.link}>disini</Link> untuk masuk ke group mentoring</h1>
                            </div>

                            <div className="w-full px-3 mx-auto text-center mt-2 font-semibold">
                                {
                                    data?.keterangan === 'LULUS' ?
                                        <p className="text-[16px]">Selamat, Anda diterima sebagai mahasantri baru Mahad Tahfidz UIN Sunan Gunung Djati</p>
                                        :
                                        <p className="text-[16px]">Maaf, Anda belum lulus seleksi masuk kali ini.</p>
                                }
                            </div>

                            <h1 className="text-right mt-2 mr-5 text-sm">Bandung, 1 Agustus 2024</h1>

                            <div className="text-center mx-auto mt-2 pb-5">
                                <p className="text-[16px]">Mengetahui,</p>
                                <p className="text-[16px] -mt-1">Direktur Mahad Tahfidz</p>
                                <Image src="/signature.png" alt="" width={110} height={110} className="mx-auto -mt-3" />
                                <h1 className="font-bold underline -mt-3 text-sm">DR. KH. Asep Musthofa Kamal, M.Ag</h1>
                                <p className="text-xs">NIP. 196104281993031002</p>
                            </div>

                            <Image src="/logoMTA.svg" width={280} alt="" height={280} className="absolute opacity-[0.15] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />
                            <Image src="/Stempel.png" width={400} alt="" height={400} className="absolute -bottom-14 -left-7 -z-10" />
                        </div>

                        <div className="flex justify-center px-4 py-5 gap-4">
                            <button onClick={() => router.push("/")} className="mt-3 bg-primary rounded-md text-white px-3 py-2 font-poppins flex justify-center items-center gap-2"><FaHome className="w-5" />Beranda</button>
                            {/* <button className="mt-3 bg-red-500 rounded-md text-white px-3 py-1 font-poppins flex gap-1"><FileText className="w-4" />Cetak PDF</button> */}
                        </div>
                    </>

            }
        </>
    );
}