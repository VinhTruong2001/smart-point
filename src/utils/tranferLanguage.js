export const topics = [
    {
        optionName: "Giáo dục",
        path: "education"
    },
    {
        optionName: "Kinh doanh",
        path: "business"
    },
    {
        optionName: "Marketing",
        path: "marketing"
    },
    {
        optionName: "Y học",
        path: "medical"
    },
    {
        optionName: "Đa mục đích",
        path: "multiPurpose"
    },
    {
        optionName: "Sơ đồ",
        path: "infoGraphic"
    },
]

export const colors = {
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

export const styles = {
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

export function tranferLanguage(category, name) {
    let searchAt;
    switch (category) {
        case "colors":
            searchAt = colors.options;
            break;
        case "styles":
            searchAt = styles.options;
            break;
        default:
            searchAt = topics;
    }


    return searchAt.find(option => option.path === name).optionName
}