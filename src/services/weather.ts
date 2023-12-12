const API_KEY = 'c88bd8c9788768d3452a8d987b62200a';

export async function getCurrentLocationWeather(lat: number, long: number) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&lang=es&units=metric&mode=html`);

    if (res.ok)
        return res.text();

    return "";
}