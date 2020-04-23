export function getUserIsOwner(userId) {
    const userIdLogged = localStorage.getItem('userId')
    return String(userId) === String(userIdLogged)
}