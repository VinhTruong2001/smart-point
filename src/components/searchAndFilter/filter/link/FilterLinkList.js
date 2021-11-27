import React from 'react'
import { Link } from 'react-router-dom'

const links = [
    {
        name: "Giáo dục",
        path: "education"
    },
    {
        name: "Kinh doanh",
        path: "business"
    },
    {
        name: "Marketing",
        path: "marketing"
    },
    {
        name: "Y học",
        path: "medical"
    },
    {
        name: "Đa mục đích",
        path: "multiPurpose"
    },
    {
        name: "Sơ đồ",
        path: "infoGraphic"
    },
]

function FilterLinkList() {
    return (
        <div className="pl-3 flex space-x-8 h-full">
            { links.map((link, index) => (
                <Link to={`/filter/${link.path}/1`} key={index} className="m-auto h-full flex items-center cursor-pointer text-gray-500 hover:text-primary">
                    <span>{ link.name }</span>
                </Link>
              ))
            }
        </div>
    )
}

export default FilterLinkList
