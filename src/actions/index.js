import * as types from '../constants/ActionTypes'

export const setUser = (user) => {
    sessionStorage.setItem('session', JSON.stringify(user));

    return {
        type: types.SET_USER,
        user
    }
}

export const fetchTemplates = (templates) => {
    return {
        type: types.FETCH_TEMPLATES,
        templates
    }
}