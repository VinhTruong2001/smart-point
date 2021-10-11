import React from 'react'
import SearchAndFilter from '../components/searchAndFilter/SearchAndFilter'
import TemplatesShow from '../components/templatesShow/TemplatesShow'

function Homepage() {
    return (
        <>
            {/* Search */}
            <SearchAndFilter />
            <div className="body-container">
                <TemplatesShow />
            </div>
        </>
    )
}

export default Homepage
