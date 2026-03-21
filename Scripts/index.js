const cards = document.querySelectorAll('.project');
const flipCards = document.querySelectorAll('.flip_card');

// Loop through each rotating card
cards.forEach((card, index) => {
    card.addEventListener('click', (e) => {
        e.stopPropagation();
        // Hide all flip cards first
        flipCards.forEach(fc => fc.style.display = 'none');

        // Show the flip card = to the clicked card
        flipCards[index].style.display = 'block';
        flipCards[index].style.zIndex = 1000;
        console.log(flipCards[index].style.display);
    });
});

// Hide flip cards when clicking outside
document.addEventListener('click', (e) => {
    const clickedOnCard = e.target.closest('.project');
    const clickedOnFlipCard = e.target.closest('.flip_card');

    if (!clickedOnCard && !clickedOnFlipCard) {
        flipCards.forEach(fc => fc.style.display = 'none');
    }
});