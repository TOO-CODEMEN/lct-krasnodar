export const getSession = () => {
    return {
        accessToken: localStorage.getItem("accessToken"),
    }
}

export const endSession = () => {
    localStorage.clear();
}

export const isLoggedIn = () => {
    return getSession().accessToken;
}