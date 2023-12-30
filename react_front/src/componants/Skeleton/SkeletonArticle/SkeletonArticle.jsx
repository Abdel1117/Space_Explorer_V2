import React from 'react'

export const SkeletonArticle = () => {
    return (
        <div class="bg-slate-800 dark:bg-slate-500 col-span-12 lg:col-span-8 mx-auto w-full  animate-pulse p-4 md:p-8">
            <div class="flex-shrink-0">
                <span class="w-12 h-12 block bg-gray-200 rounded-full dark:bg-gray-700"></span>
            </div>

            <div class="ms-4 mt-2 w-full">
                <h3 class="h-4 bg-gray-200 rounded-full dark:bg-gray-700" ></h3>

                <ul class="mt-5 space-y-3">
                    <li class="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700"></li>
                    <li class="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700"></li>
                    <li class="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700"></li>
                    <li class="w-full h-4 bg-gray-200 rounded-full dark:bg-gray-700"></li>
                </ul>
            </div>
        </div>
    )
}

