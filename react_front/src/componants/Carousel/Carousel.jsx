import React from 'react'
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function Carousel() {
    return (
        <div>
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

                    <div className=' min-w-full w-full'>
                        <a href="#">
                            <img className='w-full md:max-h-[250px] object-cover' src="https://via.placeholder.com/250" alt="" />
                        </a>
                        <div className='mx-auto mt-4 md:mt-0 text-center md:p-4'>
                            <div className='mx-auto w-6/12 bg-violet-400 md:px-4 md:py-2 text-white'>
                                Catégorie
                            </div>
                            <h2 className='my-2 font-bold dark:text-white'>Mon Titre</h2>
                            <div className='mx-auto '>
                                <small className='text-grey dark:text-white'>2 day ago</small>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>

                    <div className=' min-w-full w-full'>
                        <a href="#">
                            <img className='w-full md:max-h-[250px] object-cover' src="https://via.placeholder.com/250" alt="" />
                        </a>
                        <div className='mx-auto mt-4 md:mt-0 text-center md:p-4'>
                            <div className='mx-auto w-6/12 bg-violet-400 md:px-4 md:py-2 text-white'>
                                Catégorie
                            </div>
                            <h2 className='my-2 font-bold dark:text-white'>Mon Titre</h2>
                            <div className='mx-auto '>
                                <small className='text-grey dark:text-white'>2 day ago</small>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>

                    <div className=' min-w-full w-full'>
                        <a href="#">
                            <img className='w-full md:max-h-[250px] object-cover' src="https://via.placeholder.com/250" alt="" />
                        </a>
                        <div className='mx-auto mt-4 md:mt-0 text-center md:p-4'>
                            <div className='mx-auto w-6/12 bg-violet-400 md:px-4 md:py-2 text-white'>
                                Catégorie
                            </div>
                            <h2 className='my-2 font-bold dark:text-white'>Mon Titre</h2>
                            <div className='mx-auto '>
                                <small className='text-grey dark:text-white'>2 day ago</small>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>

                    <div className=' min-w-full w-full'>
                        <a href="#">
                            <img className='w-full md:max-h-[250px] object-cover' src="https://via.placeholder.com/250" alt="" />
                        </a>
                        <div className='mx-auto mt-4 md:mt-0 text-center md:p-4'>
                            <div className='mx-auto w-6/12 bg-violet-400 md:px-4 md:py-2 text-white'>
                                Catégorie
                            </div>
                            <h2 className='my-2 font-bold dark:text-white'>Mon Titre</h2>
                            <div className='mx-auto '>
                                <small className='text-grey dark:text-white'>2 day ago</small>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>

                    <div className=' min-w-full w-full'>
                        <a href="#">
                            <img className='w-full md:max-h-[250px] object-cover' src="https://via.placeholder.com/250" alt="" />
                        </a>
                        <div className='mx-auto mt-4 md:mt-0 text-center md:p-4'>
                            <div className='mx-auto w-6/12 bg-violet-400 md:px-4 md:py-2 text-white'>
                                Catégorie
                            </div>
                            <h2 className='my-2 font-bold dark:text-white'>Mon Titre</h2>
                            <div className='mx-auto '>
                                <small className='text-grey dark:text-white'>2 day ago</small>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>


        </div>)
}
