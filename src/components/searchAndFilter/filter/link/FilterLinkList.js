import React from 'react'
import { Link } from 'react-router-dom'
import { topics } from '../../../../utils/tranferLanguage'

function FilterLinkList() {
    return (
        <div className="pl-3 flex space-x-8 h-full">
            { topics.options.map((topic, index) => (
                <Link to={`/filter/${topic.path}/1`} key={index} className="m-auto h-full flex items-center cursor-pointer text-gray-500 hover:text-primary">
                    <span>{ topic.optionName }</span>
                </Link>
              ))
            }
        </div>
    )
}

export default FilterLinkList
