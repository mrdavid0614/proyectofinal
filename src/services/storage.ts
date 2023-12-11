export async function saveToDB(key: string, value: string) {
    localStorage.setItem(key, value);
}

export async function getFromDB(key: string) {
    return localStorage.getItem(key);
}