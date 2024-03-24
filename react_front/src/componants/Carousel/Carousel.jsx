import React, { useEffect } from 'react'
import { Navigation, Pagination } from "swiper";
import { useNavigate } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react";
import Loader from "../../componants/Loader/Loader"
import "swiper/css"
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Carousel({ data, loading }) {
    const apiUrl = import.meta.env.VITE_API_URL
    const navigate = useNavigate()
    return (
        <div>
            {!loading ? (


                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={15}
                    loop={true}
                    slidesPerView={3}
                    navigation
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        400: {
                            slidesPerView: 2,
                        },
                        920: {
                            slidesPerView: 3,
                        }

                    }}

                >
                    <SwiperSlide>

                        <div className=' min-w-full w-full cursor-pointer hover:opacity-60 hover:scale-90 transition-scale duration-300'>
                            <a onClick={() => { navigate(`article/${data[0]?._id}`) }} aria-label={data[0]?.Title}>
                                <img className='w-full h-[250px] object-cover' src={`${apiUrl}/${data[0].Contenu[0]?.image}`} alt="Image liée à l'article" />
                            </a>
                            <div className='mx-auto mt-4 md:mt-0 text-center md:p-4'>
                                <div className='mx-auto w-6/12 bg-violet-400 dark:bg-dark-blue md:px-4 md:py-2 text-white'>
                                    {data[0].Slugs[0]}
                                </div>
                                <h2 className='my-2 font-bold dark:text-white'>{data[0]?.Title}</h2>

                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>

                        <div className=' min-w-full w-full cursor-pointer  hover:opacity-60 hover:scale-90 transition-scale duration-300'>
                            <a onClick={() => { navigate(`article/${data[1]?._id}`) }} aria-label={data[1]?.Title}>
                                <img className='w-full h-[250px] object-cover' src={`${apiUrl}/${data[1].Contenu[0]?.image}`} alt="Image liée à l'article" />
                            </a>
                            <div className='mx-auto mt-4 md:mt-0 text-center md:p-4'>
                                <div className='mx-auto w-6/12 bg-violet-400 dark:bg-dark-blue md:px-4 md:py-2 text-white'>
                                    {data[1].Slugs[0]}
                                </div>
                                <h2 className='my-2 font-bold dark:text-white'>{data[1]?.Title}</h2>

                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>

                        <div className=' min-w-full w-full cursor-pointer  hover:opacity-60 hover:scale-90 transition-scale duration-300'>
                            <a onClick={() => { navigate(`article/${data[2]?._id}`) }} aria-label={data[2]?.Title}>
                                <img className='w-full h-[250px] object-cover' src={`${apiUrl}/${data[2].Contenu[0]?.image}`} alt="Image liée à l'article" />
                            </a>
                            <div className='mx-auto mt-4 md:mt-0 text-center md:p-4'>
                                <div className='mx-auto w-6/12 bg-violet-400 dark:bg-dark-blue md:px-4 md:py-2 text-white'>
                                    {data[2].Slugs[0]}
                                </div>
                                <h2 className='my-2 font-bold dark:text-white'>{data[2]?.Title}</h2>

                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>

                        <div className=' min-w-full w-full cursor-pointer  hover:opacity-60 hover:scale-90 transition-scale duration-300'>
                            <a onClick={() => { navigate(`article/${data[3]?._id}`) }} aria-label={data[3]?.Title}>
                                <img className='w-full h-[250px] object-cover' src={`${apiUrl}/${data[0].Contenu[0]?.image}`} alt="Image liée à l'article" />
                            </a>
                            <div className='mx-auto mt-4 md:mt-0 text-center md:p-4'>
                                <div className='mx-auto w-6/12 bg-violet-400 dark:bg-dark-blue md:px-4 md:py-2 text-white'>
                                    {data[3].Slugs[0]}
                                </div>
                                <h2 className='my-2 font-bold dark:text-white'>{data[3]?.Title}</h2>

                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>

                        <div className=' min-w-full w-full cursor-pointer  hover:opacity-60 hover:scale-90 transition-scale duration-300'>
                            <a onClick={() => { navigate(`article/${data[4]?._id}`) }} aria-label={data[4]?.Title}>
                                <img className='w-full h-[250px] object-cover' src={`${apiUrl}/${data[4].Contenu[0]?.image}`} alt="Image liée à l'article" />
                            </a>
                            <div className='mx-auto mt-4 md:mt-0 text-center md:p-4'>
                                <div className='mx-auto w-6/12 bg-violet-400 dark:bg-dark-blue md:px-4 md:py-2 text-white'>
                                    {data[4].Slugs[0]}                                </div>
                                <h2 className='my-2 font-bold dark:text-white'>{data[4]?.Title}</h2>

                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            )

                :


                (
                    <Loader />
                )
            }

        </div >)
}
