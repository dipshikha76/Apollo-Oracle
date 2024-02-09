export const userData = {
    name : "",
    email : "",
}
export var loggedIn = false;
export const setLoggedIn = () => {
    loggedIn = !loggedIn;
}
export const getUserData = ({...user}) => {
    userData.name = user.Name,
    userData.email = user.Email
}
