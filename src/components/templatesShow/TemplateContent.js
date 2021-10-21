import React from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TemplateFrames from './TemplateFrames'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

function TemplateContent() {
    return (
        <div className="mt-8 grid grid-cols-7 space-x-8 space-y-8 md:space-y-0">
            {/* Content */}
            <div className="col-span-7 lg:col-span-4 xl:col-span-5 space-y-8">
                {/* Description */}
                <p className="text-justify text-gray-500">
                    In order to bring new patients to your healthcare center, they must be well informed. And there is no better 
                    way of sharing all the information like therapies, doctors, locations, new treatments, etc. than with a creative 
                    and visual template. It can be a support for your speech, but it can also be sent through email or social networks,
                    you never know where your information might be needed! The elegant design is completely editable, and it includes 
                    lots of medical tools that will come in handy.
                </p>

                {/* Features */}
                <div>
                    <div className="flex items-center text-primary">
                        <KeyboardArrowDownIcon fontSize="large"/>
                        <span className="text-2xl font-semibold">Features of this template</span>
                    </div>
                    <ul className="space-y-4 mt-4">
                        <li className="flex items-center">
                            <KeyboardArrowRightIcon className="text-primary"/>
                            <span className="text-justify text-gray-500">100% editable and easy to modify</span>
                        </li>
                        <li className="flex items-center">
                            <KeyboardArrowRightIcon className="text-primary"/>
                            <span className="text-justify text-gray-500">35 different slides to impress your audience</span>
                        </li>
                        <li className="flex items-center">
                            <KeyboardArrowRightIcon className="text-primary"/>
                            <span className="text-justify text-gray-500">Contains easy-to-edit graphics such as graphs, maps, tables, timelines and mockups</span>
                        </li>
                        <li className="flex items-center">
                            <KeyboardArrowRightIcon className="text-primary"/>
                            <span className="text-justify text-gray-500">Includes 500+ icons and Flaticon’s extension for customizing your slides</span>
                        </li>
                        <li className="flex items-center">
                            <KeyboardArrowRightIcon className="text-primary"/>
                            <span className="text-justify text-gray-500">Designed to be used in Google Slides and Microsoft PowerPoint</span>
                        </li>
                        <li className="flex items-center">
                            <KeyboardArrowRightIcon className="text-primary"/>
                            <span className="text-justify text-gray-500">16:9 widescreen format suitable for all types of screens</span>
                        </li>
                        <li className="flex items-center">
                            <KeyboardArrowRightIcon className="text-primary"/>
                            <span className="text-justify text-gray-500">Includes information about fonts, colors, and credits of the free resources used</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="col-span-7 lg:col-span-3 xl:col-span-2">
                {/* Buttons */}
                <div className="grid grid-flow-col space-x-3">
                    {/* Download button */}
                    <div className="col-span-6 rounded-lg flex items-center justify-center space-x-3 bg-[#d04526] cursor-pointer">
                        <img 
                            alt="Powerpoint logo" 
                            src={process.env.PUBLIC_URL + '/img/DownloadLogo.jpg'} 
                            className="w-14"
                        />
                        <span className="text-lg font-semibold text-white">Tải xuống</span>
                    </div>

                    {/* Like button */}
                    <div className="cursor-pointer rounded-lg bg-white border border-gray-200 shadow-xl flex">
                        <FavoriteBorderIcon 
                            fontSize="large" 
                            className="text-gray-400 m-auto"
                        />
                    </div>
                </div>

                {/* Relative templates */}
                <div className="mt-5">
                    <h4 className="text-primary font-semibold text-2xl my-4">Các chủ đề tương tự</h4>
                    <div className="space-y-10">
                        <div className="group">
                            <TemplateFrames type={false} url={process.env.PUBLIC_URL + '/test/Kent · SlidesCarnival'}/>
                            <span className="font-semibold group-hover:text-primary">Kent</span>
                        </div>
                        <div className="group">
                            <TemplateFrames type={true} url={process.env.PUBLIC_URL + '/test/Mexican Restaurant Company Profile by Slidesgo'}/>
                            <span className="font-semibold group-hover:text-primary">Mexican Restaurant Company Profile</span>
                        </div>
                        <div className="group">
                            <TemplateFrames type={false} url={process.env.PUBLIC_URL + '/test/Minimalist & Formal Consulting Toolkit by Slidesgo'}/>
                            <span className="font-semibold group-hover:text-primary">Minimalist &amp; Formal Consulting Toolkit</span>
                        </div>
                        <div className="group">
                            <TemplateFrames type={false} url={process.env.PUBLIC_URL + '/test/Movie Maker Animation Studios Style Workshop by Slidesgo'}/>
                            <span className="font-semibold group-hover:text-primary">Movie Maker Animation Studios Style Workshop</span>
                        </div>
                        <div className="group">
                            <TemplateFrames type={true} url={process.env.PUBLIC_URL + '/test/Product Requirement Theme for Business by Slidesgo'}/>
                            <span className="font-semibold group-hover:text-primary">Product Requirement Theme for Business</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TemplateContent
