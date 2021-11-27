import React from 'react'
import FilterSelects from './FilterSelects';

const colors = {
    title: "Màu sắc",
    options: [
        {
            optionName: 'Đỏ',
            optional: 'red',
            path: 'red'
        },
        {
            optionName: 'Cam',
            optional: 'orange',
            path: 'orange'
        },
        {
            optionName: 'Vàng',
            optional: 'yellow',
            path: 'yellow'
        },
        {
            optionName: 'Xanh dương',
            optional: 'blue',
            path: 'blue'
        },
        {
            optionName: 'Xanh lá',
            optional: 'green',
            path: 'green'
        },
        {
            optionName: 'Tím',
            optional: 'purple',
            path: 'purple'
        },
        {
            optionName: 'Nâu',
            optional: 'brown',
            path: 'brown'
        },
        {
            optionName: 'Trắng',
            optional: 'white',
            path: 'white'
        },
        {
            optionName: 'Đen',
            optional: 'black',
            path: 'black'
        },
    ]
}

const styles = {
    title: "Phong cách",
    options: [
        { 
            optionName: "Thể thao",
            path: "sport"
        },
        { 
            optionName: "Sáng tạo",
            path: "creative"
        },
        { 
            optionName: "Đáng yêu",
            path: "cute"
        },
        { 
            optionName: "Hài hước",
            path: "funny"
        },
        { 
            optionName: "Hiện đại",
            path: "modern"
        },
        { 
            optionName: "Đơn giản",
            path: "simple"
        },
        { 
            optionName: "Hoài cổ",
            path: "vintage"
        },
        { 
            optionName: "Tao nhã",
            path: "elegant"
        },
        { 
            optionName: "Hoạt hình",
            path: "cartoon"
        },
        { 
            optionName: "Tối giản",
            path: "minimalist"
        },
    ]
}


function FilterSelectList() {
    return (
        <div className="relative pr-3 flex items-center space-x-3 h-full before:absolute before:right-0 before:w-[1px] before:h-8 before:bg-gray-300">
            <FilterSelects 
                title={colors.title} 
                options={ colors.options }
                right="-right-14"    
            />

            <FilterSelects 
                title={styles.title} 
                options={ styles.options }    
            />
        </div>
    )
}

export default FilterSelectList
