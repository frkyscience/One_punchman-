

const backgroundStoryInput = document.getElementById('background-story');
const motivationInput = document.getElementById('motivation');
const wordCount1Span = document.getElementById('wordCount1');
const wordCount2Span = document.getElementById('wordCount2');

const MAX_WORDS1 = 300;
const MAX_WORDS2 = 150;

function updateWordCount(input, wordCountSpan, maxWords) {
    const wordCount = input.value.trim().split(/\s+/).filter(word => word.length > 0).length;
    wordCountSpan.textContent = wordCount;

    if (wordCount > maxWords) {
        input.classList.add('exceed-max-words');
    } else {
        input.classList.remove('exceed-max-words');
    }
}

backgroundStoryInput.addEventListener('input', function () {
    updateWordCount(backgroundStoryInput, wordCount1Span, MAX_WORDS1);
});

motivationInput.addEventListener('input', function () {
    updateWordCount(motivationInput, wordCount2Span, MAX_WORDS2);
});
