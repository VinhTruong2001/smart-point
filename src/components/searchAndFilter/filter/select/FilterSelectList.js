import React from 'react'
import FilterSelects from './FilterSelects';
import { colors, styles } from '../../../../utils/tranferLanguage'


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
