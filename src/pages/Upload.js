import React, { useEffect, useRef, useState } from 'react'
import Validator from '../utils/validator'
import { connect } from 'react-redux'
import callApi from '../utils/apiCaller'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Link, useHistory, useLocation } from 'react-router-dom'
import '../styles/loadingAnimation.css';

function Upload({ user }) {
    const history = useHistory();
    const location = useLocation();

    const templateNameRef = useRef();
    const templateColorsRef = useRef();
    const templateStylesRef = useRef();
    const templateTopicsRef = useRef();
    const templateIsPremiumRef = useRef();
    const templateDescriptionRef = useRef();
    const templateSearchKeyWordsRef = useRef();
    const templateFileRef = useRef();
    const templateSlidesRef = useRef();

    const [isUploadSuccess, setisUploadSuccess] = useState(null)
    const [isUploading, setisUploading] = useState(null)

    useEffect(() => {
        const userSession = JSON.parse(sessionStorage.getItem("session"))
        if (!userSession) {
            history.push('/login', { prevPath: location.pathname })
        } else {
            Validator({
                form: '#uploadTemplateForm',
                formGroupSelector: '.form-group',
                errorSelector: '.form-message',
                rules: [
                    Validator.isRequire('#templateName', 'Vui lòng nhập vào tên Template'),
                    Validator.isRequire('#templateColors', 'Vui lòng chọn màu sắc của Template'),
                    Validator.isRequire('#templateStyles', 'Vui lòng chọn phong cách của Template'),
                    Validator.isRequire('#templateTopics', 'Vui lòng chọn chủ đề của Template'),
                    Validator.isRequire('#templateDescription', 'Vui lòng viết miêu tả cho Template'),
                    Validator.isRequire('#templateFile', 'Vui lòng tải lên file pptx'),
                    Validator.isRequire('#templateSlides', 'Vui lòng tải lên ảnh các Slides của Template'),
                ],
                onSubmit: function() {
                    uploadToServer();
                }
            })
        }
    // eslint-disable-next-line
    }, [user, history, location, isUploading, isUploadSuccess])

    const getSelectedOptions = (optionsNodeList) => {
        const result = [];
        for (let i=0; i < optionsNodeList.length; i++) {
            optionsNodeList[i].selected && result.push(optionsNodeList[i].value)
        }
        return result;
    }

    const uploadToServer = () => {
        setisUploading(true);
        let form_data = new FormData();

        const colors = getSelectedOptions(templateColorsRef.current.childNodes);
        const styles = getSelectedOptions(templateStylesRef.current.childNodes);
        const topics = getSelectedOptions(templateTopicsRef.current.childNodes);
        const keywords = templateSearchKeyWordsRef.current.value.split(', ');
        const templateFile = templateFileRef.current.files[0];
        const templateSlides = templateSlidesRef.current.files;

        form_data.append('name', templateNameRef.current.value)
        form_data.append('description', templateDescriptionRef.current.value)
        form_data.append('authorUID', user?.userInfo.uid)
        colors.forEach((color, index) => {
            form_data.append(`colors[${index}]`, color)
        })
        styles.forEach((style, index) => {
            form_data.append(`styles[${index}]`, style)
        })
        topics.forEach((topic, index) => {
            form_data.append(`topics[${index}]`, topic)
        })
        keywords.forEach((keyword, index) => {
            form_data.append(`keywordsSearch[${index}]`, keyword)
        })
        
        form_data.append('templates_file', templateFile, templateFile.name)
        form_data.append('isPremium', templateIsPremiumRef.current.checked)

        callApi(
            'POST',
            '/api/templates/',
            form_data, 
            {'Content-Type': 'multipart/form-data'}
        ).then(res => {
            for(let i = 0; i < templateSlides.length; i++) {
                let form_data2 = new FormData();
                form_data2.append('template', res.data.id)
                form_data2.append('slide_images', templateSlides[i], templateSlides[i].name)

                callApi(
                    'POST',
                    '/api/slideImages/',
                    form_data2, 
                    {'Content-Type': 'multipart/form-data'}
                ).then((res) => {
                    setisUploading(null)
                    setisUploadSuccess(true)
                }).catch((err) => {
                    setisUploading(null)
                    setisUploadSuccess(false)
                })
            }
        }).catch((err) => {
            setisUploading(null)
            setisUploadSuccess(false)
        })
    }

    const clearForm = () => {
        templateNameRef.current.value = '';
        templateColorsRef.current.value = '';
        templateStylesRef.current.value = '';
        templateTopicsRef.current.value = '';
        templateIsPremiumRef.current.value = '';
        templateDescriptionRef.current.value = '';
        templateSearchKeyWordsRef.current.value = '';
        templateFileRef.current.value = null;
        templateSlidesRef.current.value = null;
        setisUploadSuccess(null);
    }

    return (
        <div className="body-container mb-20">
            <h1 className="text-primary font-bold text-xl md:text-2xl text-center">Chia sẻ Template của bạn với mọi người</h1>

            <form id="uploadTemplateForm" className="relative">
                <div className="grid grid-col-1 lg:grid-cols-2 lg:space-x-10">
                    <div>
                        <div className="form-group space-y-1 pt-2 flex items-center space-x-3">
                            <label className="font-medium w-[20%] lg:text-xl">Tên Template*</label>
                            <div className="flex-1">
                                <div className="border border-gray-300 px-2 rounded-md form-control">
                                    <input 
                                        ref={ templateNameRef }
                                        type="text" 
                                        name="templateName"
                                        id="templateName" 
                                        className="p-2 outline-none w-full bg-transparent"
                                    /> 
                                </div>
                                <span className="form-message"></span>
                            </div>
                        </div>
                        
                        <div className="form-group space-y-1 pt-2 flex items-center space-x-3">
                            <label className="font-medium w-[20%] lg:text-xl">Màu sắc</label>
                            <div className="flex-1">
                                <select 
                                    ref={ templateColorsRef }
                                    name="templateColors" 
                                    id="templateColors"
                                    className="outline-none border border-gray-300 rounded-md p-2 overflow-auto w-full form-control" 
                                    size="5"
                                    multiple
                                >
                                    <option value="red">Đỏ</option>
                                    <option value="orange">Cam</option>
                                    <option value="yellow">Vàng</option>
                                    <option value="blue">Xanh dương</option>
                                    <option value="green">Xanh lá</option>
                                    <option value="purple">Tím</option>
                                    <option value="brown">Nâu</option>
                                    <option value="white">Trắng</option>
                                    <option value="black">Đen</option>
                                </select>
                                <span className="form-message"></span>
                            </div>
                        </div>
                        <div className="form-group space-y-1 pt-2 flex items-center space-x-3">
                            <label className="font-medium w-[20%] lg:text-xl">Phong cách</label>
                            <div className="flex-1 form-control">
                                <select 
                                    ref={ templateStylesRef }
                                    name="templateStyles" 
                                    id="templateStyles"
                                    className="outline-none border border-gray-300 rounded-md p-2 overflow-auto w-full form-control" 
                                    size="5"
                                    multiple
                                >
                                    <option value="sport">Thể thao</option>
                                    <option value="creative">Sáng tạo</option>
                                    <option value="cute">Đáng yêu</option>
                                    <option value="funny">Hài hước</option>
                                    <option value="modern">Hiện đại</option>
                                    <option value="simple">Đơn giản</option>
                                    <option value="vintage">Hoài cổ</option>
                                    <option value="elegant">Tao nhã</option>
                                    <option value="cartoon">Hoạt hình</option>
                                    <option value="minimalist">Tối giản</option>
                                </select>
                                <span className="form-message"></span>
                            </div>
                        </div>
                        <div className="form-group space-y-1 pt-2 flex items-center space-x-3">
                            <label className="font-medium w-[20%] lg:text-xl">Chủ đề</label>
                            <div className="flex-1 form-control">
                                <select 
                                    ref={ templateTopicsRef }
                                    name="templateTopics" 
                                    id="templateTopics"
                                    className="outline-none border border-gray-300 rounded-md p-2 overflow-auto w-full form-control" 
                                    size="5"
                                    multiple
                                >
                                    <option value="education">Giáo dục</option>
                                    <option value="business">Kinh doanh</option>
                                    <option value="marketing">Marketing</option>
                                    <option value="medical">Y học</option>
                                    <option value="multiPurpose">Đa mục đích</option>
                                    <option value="infoGraphic">Sơ đồ</option>
                                </select>
                                <span className="form-message"></span>
                            </div>
                        </div>
                        <div className="form-group space-y-1 pt-2 flex items-center space-x-3">
                            <label className="font-medium w-[20%] lg:text-xl">File pptx*</label>
                            <div className="flex-1 form-control">
                                <input 
                                    ref={ templateFileRef }
                                    type="file" 
                                    name="templateFile"
                                    id="templateFile" 
                                    className="p-2 outline-none w-full bg-transparent cursor-pointer"
                                />
                                <span className="form-message"></span>
                            </div>
                        </div>
                        <div className="form-group space-y-1 pt-2 flex items-center space-x-3">
                            <label className="font-medium w-[20%] lg:text-xl">Ảnh các Slides</label>
                            <div className="flex-1 form-control">
                                <input 
                                    ref={ templateSlidesRef }
                                    type="file" 
                                    name="templateSlides"
                                    id="templateSlides" 
                                    className="p-2 outline-none w-full bg-transparent cursor-pointer"
                                    multiple
                                />
                                <span className="form-message"></span>
                            </div>
                        </div>
                        <div className="form-group space-y-1 pt-2">
                            <div className="form-control flex items-center space-x-3">
                                <input 
                                    ref={ templateIsPremiumRef }
                                    type="checkbox" 
                                    name="isPremium"
                                    id="isPremium" 
                                    className="outline-none bg-transparent cursor-pointer"
                                    disabled={ !user?.userInfo.isPremium }
                                />
                                <label htmlFor="isPremium" className="flex items-center space-x-2 text-yellow-400 md:text-lg">
                                    <span>Chỉ cho phép người dùng nâng cấp tải về</span>
                                    <EmojiEventsIcon />
                                </label> 
                            </div> 
                            { !user?.userInfo.isPremium &&
                                <span className="text-primary text-sm md:text-medium">
                                    Chỉ người dùng đã nâng cấp mới có thể bán Template. Nâng cấp ngay <Link to="/upgrade" className="text-yellow-400 underline">tại đây</Link>
                                </span>
                            }
                        </div>
                    </div>
                    <div className="flex flex-col space-y-5">
                        <div className="form-group flex-1 space-y-2 pt-2 h-1/2 flex flex-col">
                            <label className="font-medium lg:text-xl w-full">Miêu tả về Template của bạn</label>
                            <div className="flex-1">
                                <div className="border flex-1 border-gray-300 px-2 rounded-md form-control h-full">
                                    <textarea 
                                        ref={ templateDescriptionRef }
                                        name="templateDescription"
                                        id="templateDescription" 
                                        className="p-2 outline-none w-full bg-transparent resize-none h-full"
                                    ></textarea>
                                </div>
                                <span className="form-message"></span>
                            </div>
                        </div>
                        <div className="form-group space-y-2 pt-2 flex flex-col">
                            <label className="font-medium lg:text-xl w-full">Các từ khóa để người khác có thể tìm kiếm Template của bạn</label>
                            <span className="text-gray-400">Mỗi từ khóa phân cách nhau bởi dấu phẩy + khoảng trắng ", "</span>
                            <div className="flex-1">
                                <div className="border flex-1 border-gray-300 px-2 rounded-md form-control h-full">
                                    <input 
                                        ref={ templateSearchKeyWordsRef }
                                        type="text" 
                                        name="templateSearchKeyWords"
                                        id="templateSearchKeyWords" 
                                        className="p-2 outline-none w-full bg-transparent resize-none h-full"
                                    />
                                </div>
                                <span className="form-message"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute -bottom-16 right-0">
                    <button className="col-span-2 bg-primary text-white font-semibold rounded-md py-3 px-4 mt-5">Tải lên</button>
                </div>
            </form>

            { ( isUploadSuccess !== null || isUploading !== null) &&
                <div className="absolute top-0 h-screen left-0 right-0 flex">
                    <div className="fixed top-0 h-screen left-0 right-0 z-20 bg-black opacity-50"></div>
                    <div className="sticky top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto z-30 bg-white p-2 lg:p-4 text-center">
                        { isUploadSuccess && <>
                            <CheckCircleOutlineIcon className="text-green-400 mb-3" sx={{ width: 100, height: 100 }}/>
                            <div className="space-y-5">
                                <span className="font-bold lg:text-2xl">Template của bạn đã được tải lên thành công</span>
                                <div className="flex justify-around">
                                    <Link to="/" className="btn !bg-primary text-white">Quay về trang chủ</Link>
                                    <button 
                                        className="btn !bg-green-400 text-white"
                                        onClick={ clearForm }
                                    >
                                        Tiếp tục tải lên
                                    </button>
                                </div>
                            </div>
                        </>}
                        { isUploadSuccess===false && <>
                            <CancelOutlinedIcon className="text-red-400 mb-3" sx={{ width: 100, height: 100 }}/>
                            <div className="space-y-5">
                                <span className="font-bold lg:text-2xl">Đã có lỗi xảy ra vui lòng kiểm tra lại thông tin<br/>hoặc báo với quản trị viên</span>
                                <div className="flex justify-center">
                                    <button 
                                        className="btn !bg-red-400 text-white !px-10"
                                        onClick={ () => setisUploadSuccess(null) }
                                    >
                                        Thử lại
                                    </button>
                                </div>
                            </div>
                        </>}
                        { isUploading && <>
                            <div className="flex items-center justify-center mb-2 w-96">
                                <div className="center">
                                    <div className="circle first bg-primary">
                                        <div className="circle second">
                                            <div className="circle third"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-5">
                                <span className="font-bold lg:text-2xl">Template đang được tải lên <br/>bạn vui lòng chờ giây lát</span>
                            </div>
                        </>}
                    </div>
                </div>                
            }
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(Upload)
