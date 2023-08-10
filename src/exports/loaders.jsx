export async function wordLoader({ params }) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${params.wordID}`);
    const word = await response.json();
    return word;
}
