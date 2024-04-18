

window.onload = function() {
    if (performance.navigation.type === 1) {
        document.getElementById("search-input").value = "";
    }
}
function searchWord() {
    var word = document.getElementById("search-input").value.trim();
    if (word !== "") {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(response => response.json())
            .then(data => {
                if (data.title) {
                    document.getElementById("definition").innerHTML = data.title;
                } else {
                    document.getElementById("definition").innerHTML = formatDefinition(data);
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                document.getElementById("definition").innerHTML = "Error fetching definition.";
            });
    } else {
        document.getElementById("definition").innerHTML = "Please enter a word.";
    }
}

function formatDefinition(data) {
    let definitionHTML = "<ul>";
    data.forEach(entry => {
        entry.meanings.forEach(meaning => {
            meaning.definitions.forEach(def => {
                definitionHTML += `<li><strong>${meaning.partOfSpeech}</strong>: ${def.definition}</li>`;
            });
        });
    });
    definitionHTML += "</ul>";
    return definitionHTML;
}
