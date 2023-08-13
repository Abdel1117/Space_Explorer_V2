import React from 'react'

export default function Pagination() {

    return (
        <div>
            {totalPages &&

                totalPages.map((page, index) => {
                    <button className="outline shadow-lg bg-light-blue dark:bg-dark-blue cursor-pointer rounded-full">
                        {page}
                    </button>
                })
            }
        </div>
    )
}
