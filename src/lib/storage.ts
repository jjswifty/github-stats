export const storage = (() => {
    try {
        let test = 'test'
        localStorage.setItem(test, test)
        localStorage.removeItem(test)
        return localStorage
    } catch (e) {
        console.log(e)
        return sessionStorage
    }
})()


