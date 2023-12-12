export async function getTodayZodiac(zodiacSign: string) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${zodiacSign}&day=today`, { headers: new Headers({ 'Access-Control-Allow-Origin': '*' }) });

    if (res.ok) {
        return res.json();
    }

    return null;
}