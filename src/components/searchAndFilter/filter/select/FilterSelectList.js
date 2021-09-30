import React from 'react'
import FilterSelects from './FilterSelects';

const colors = {
    title: "Màu sắc",
    options: [
        {
            optionName: 'Hồng',
            optional: '#fe7893',
        },
        {
            optionName: 'Đỏ',
            optional: '#ec3a3a',
        },
        {
            optionName: 'Nâu',
            optional: '#60341a',
        },
        {
            optionName: 'Cam',
            optional: '#ea7d16',
        },
        {
            optionName: 'Vàng',
            optional: '#fcbd24',
        },
    ]
}

const styles = {
    title: "Phong cách",
    options: [
        { optionName: "Mỹ thuật" },
        { optionName: "Hoạt hình" },
        { optionName: "Sáng tạo" },
        { optionName: "Dễ thương" },
        { optionName: "Tối" },
        { optionName: "Tao nhã" },
        { optionName: "Hài hước" },
        { optionName: "Tiến tiến" },
    ]
}



function FilterSelectList() {
    return (
        <div className="relative pr-3 flex items-center space-x-3 h-full before:absolute before:right-0 before:w-[1px] before:h-8 before:bg-gray-300">
            <FilterSelects 
                title={colors.title} 
                options={ colors.options }    
            />

            <FilterSelects 
                title={styles.title} 
                options={ styles.options }    
            />
        </div>
    )
}

export default FilterSelectList
