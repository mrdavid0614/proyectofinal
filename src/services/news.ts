export async function getDigessetNews() {
    const res = await fetch('https://remolacha.net/wp-json/wp/v2/posts?search=digeset');

    return res.json();
}