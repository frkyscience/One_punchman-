const inputField = document.getElementById('inputField');
const wordCountSpan = document.getElementById('wordCount');

function updateWordCount() {
    const inputText = inputField.value.trim();
    const wordCount = inputText.split(/\s+/).filter(word => word.length > 0).length;
    wordCountSpan.textContent = wordCount;
}
inputField.addEventListener('input', updateWordCount);

updateWordCount();

