const API_KEY = '0edd1ecdd818c9ecaa72c0643e1668ee' || 'c88bd8c9788768d3452a8d987b62200a';

export async function getCurrentLocationWeather(lat: number, long: number) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&lang=es&units=metric&mode=html`);

    if (res.ok)
        return res.text();

    return "";
}