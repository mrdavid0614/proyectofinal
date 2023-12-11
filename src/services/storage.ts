export function saveToDB(key: string, value: string) {
    localStorage.setItem(key, value);
}

export function getFromDB(key: string) {
    return localStorage.getItem(key);
}