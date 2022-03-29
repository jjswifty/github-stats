import {useState} from "react";

export const useLocalStorage = (key: string, value: string = '') => {
    const [isLocalStorageAvailable, setIsLocalStorageAvailable] = useState<null | boolean>(null)

    const [storage] = useState(() => {
        const test = 'test'

        try {
            window.localStorage.setItem(test, test)
            window.localStorage.removeItem(test)
            setIsLocalStorageAvailable(true)
            return window.localStorage
        } catch (e) {
            if (e instanceof DOMException) setIsLocalStorageAvailable(false)
            return window.sessionStorage
        }
    })

    const [storedValue, setStoredValue] = useState(() => {
        const item = storage.getItem(key)
        return item ? item : value
    })

    const setItem = (val: string) => {
        console.log(val)
        setStoredValue(val)
        storage.setItem(key, val)
    }

    const clear = () => {
        storage.clear()
    }

    const removeItem = (key: string) => {
        storage.removeItem(key)
    }

    return {
        item: storedValue,
        setItem,
        removeItem,
        clear,
        isLocalStorageAvailable,
    }
}