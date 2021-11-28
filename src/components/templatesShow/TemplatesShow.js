import React from 'react'
import TemplateSection from './TemplateSection'

function TemplatesShow() {
    return (
        <div className="py-[72px] flex flex-col space-y-32">
            <TemplateSection 
                title="Các Templates mới"
                path="/latest/1"
                order="create_at"
                search={null}
            />
            <TemplateSection 
                title="Các Templates tải nhiều nhất"
                path="/popular/1"
                order="downloaded"
                search={null}
            />
            <TemplateSection 
                title="Sơ đồ"
                path="/filter/infographic/1"
                search="infographic"
                order={null}
            />
        </div>
    )
}

export default TemplatesShow
