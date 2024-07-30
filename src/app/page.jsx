"use client"
import { useEffect, useState } from "react"
import { CiSearch } from "react-icons/ci"
import { ThreeCircles } from "react-loader-spinner"
import VerifModal from "@/components/VerifModal"
import { useRouter } from "next/navigation"
import UnknownModal from "@/components/UnknownModal"
import Lottie from "lottie-react"
import Unknown from '@/components/Unknown.json'
import Image from "next/image"

export default function Home() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [openUnknown, setOpenUnknown] = useState(false)

  const router = useRouter()

  useEffect(() => {
    fetch('https://script.googleusercontent.com/macros/echo?user_content_key=JgJy2veyhgJ5aTPji-EW8jAn70QCotfUEGgT_luIrBYT11juophjAip-p3eJAHL2IhnEWpvujrRYbueXAa7eL_5sHccEdIAvm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnPme5U1Bh1ukmXizeEFpThbKmfODxYjgQhvgQYrsxl-8BzPjoKvuHyZxwzmgzSVfo4xAeia2YSnSkJztXbHunVvZMQKCvVaNbQ&lib=MR21H4MUNAkhD5JL6VaAGK5Pu8UfgCXPP')
      .then(res => res.json())
      .then(data => setData(data))
      .then(() => setIsLoading(false))
      .catch(err => console.error(err))
  }, [])

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
              wrapperStyle={{}}
              wrapperClass=""
            />
            <h1 className="text-white font-light">Mengambil Data...</h1>
          </div>
          :
          <div className="container h-screen flex flex-col justify-center items-center py-8">
            <Image src={'/logoMTA.svg'} alt="" width={180} height={180} className="mb-4" />
            <div className="text-center font-semibold text-xl md:text-2xl lg:text-4xl">
              <h1>Selamat Datang di <br /> Website Kelulusan Mahasantri <br /> Mahad Tahfidz Al-Qur&apos;an</h1>
            </div>
            <div className="w-full mt-4 flex gap-2 px-4">
              <input
                type="text"
                value={search}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (data.find((item) => item.noKontak == search)) {
                      console.log(data.find((item) => item.noKontak == search));
                      setOpenModal(true)
                    } else {
                      setOpenUnknown(true)
                    }
                  }
                }}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Masukkan No Kontak"
                className="container h-10 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button onClick={() => {
                if (data.find((item) => item.noKontak == search)) {
                  console.log(data.find((item) => item.noKontak == search));
                  setOpenModal(true)
                } else {
                  setOpenUnknown(true)
                }
              }} className="bg-primary text-white px-3 py-1 rounded-lg flex justify-center items-center">
                <CiSearch className="w-6 h-6" />
              </button>
            </div>

            <VerifModal open={openModal} onClose={() => setOpenModal(false)}>
              <div className="w-[320px] lg:container mx-auto">
                <h1 className="text-center text-3xl font-semibold">Verifikasi Data</h1>
                <p className="text-center mt-0.5">Periksa Kembali Data Anda</p>
                <p className="text-left mt-3 text-lg">No Ujian: <span className="font-semibold">{data.find((item) => item.noKontak == search)?.ujianId}</span></p>
                <p className="text-left mt-2 text-lg">Nama: <span className="font-semibold">{data.find((item) => item.noKontak == search)?.nama}</span></p>
                <p className="text-center mt-2">Lanjutkan?</p>
              </div>
              <div className="flex justify-center gap-3 mt-3">
                <button className="bg-red-600 text-white font-poppins rounded-md py-2.5 px-3" onClick={() => setOpenModal(false)}>Tidak, Kembali</button>
                <button className="bg-green-600 text-white font-poppins rounded-md py-2.5 px-3" onClick={() => router.push(`/status/${data.find((item) => item.noKontak == search)?.ujianId}`)}>Ya, Lanjutkan</button>
              </div>
            </VerifModal>

            <UnknownModal open={openUnknown} onClose={() => setOpenUnknown(false)}>
              <div className="w-[320px] lg:container mx-auto flex flex-col justify-center items-center">
                <Lottie animationData={Unknown} className="w-[260px] h-[200px]" loop={true} />
                <h1 className="text-center text-2xl font-semibold -mt-7 mb-5">Mohon Maaf, <br /> Data Tidak Ditemukan</h1>
                <button className="bg-red-600 text-white font-poppins rounded-md py-2.5 px-3 w-full" onClick={() => setOpenUnknown(false)}>Kembali</button>
              </div>
            </UnknownModal>
          </div>
      }
    </>
  );
}