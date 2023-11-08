export const startSession = (data) => {
    localStorage.setItem("email", data.user.email);
    localStorage.setItem("accessToken", data.token);
}

export const getSession = () => {
    return {
        email: localStorage.getItem("email"),
        accessToken: localStorage.getItem("accessToken"),
    }
}

export const endSession = () => {
    localStorage.clear();
}

export const isLoggedIn = () => {
    return getSession().accessToken;
}