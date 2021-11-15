import * as types from '../constants/ActionTypes'

const testUsers = [
    {
        name: "Admin",  
        profilePic: "https://pickaface.net/gallery/avatar/20110712_114806_4250_testing.png",
        email: "admin@gmail.com",
        password: "admin",
        phoneNumber: "0123456789",
        interest: [],
        downloaded: 0,
        type: 1
    },
    {
        name: "Đức Vinh",
        profilePic: "https://media.slidesgo.com/avatars/11035578/avatar.png",
        email: "ducvinh.truong2001@gmail.com",
        password: "1",
        phoneNumber: "0853274954",
        interest: [],
        downloaded: 0,
        type: 0
    }
];

export const setUser = (email, password) => {
    for (let user of testUsers) {
        if (email === user.email && password === user.password) {
            return {
                type: types.SET_USER,
                user
            }
        }
    }
    return {
        type: types.SET_USER,
        user: null
    }
}