import React from 'react'

const links = [
    {
        name: "Giáo dục"
    },
    {
        name: "Kinh doanh"
    },
    {
        name: "Marketing"
    },
    {
        name: "Y học"
    },
    {
        name: "Đa mục đích"
    },
    {
        name: "Sơ đồ"
    },
]

function FilterLinkList() {
    return (
        <div className="pl-3 flex space-x-8 h-full">
            { links.map((link, index) => (
                <div key={index} className="m-auto h-full flex items-center cursor-pointer text-gray-500 hover:text-primary">
                    <span>{ link.name }</span>
                </div>
              ))
            }
        </div>
    )
}

export default FilterLinkList
