import React from 'react'
import TemplateSection from './TemplateSection'

function TemplatesShow() {
    return (
        <div className="py-[72px] flex flex-col space-y-32">
            <TemplateSection 
                title="Các Templates mới"
                path="/latest"
            />
            <TemplateSection 
                title="Các Templates tải nhiều nhất"
                path="/popular"
            />
            <TemplateSection 
                title="Sơ đồ"
                path="/infographic"
            />
        </div>
    )
}

export default TemplatesShow
