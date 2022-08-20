const cards = document.querySelectorAll(".memory-card"); /*  If you want to grab multiple elements within the same class and put them into a single constant or variable, we must use querySelectorAll. querySelector can only grab a single element. */

let hasFlippedCard = false;
let lockBoard = false;
let matches = 0;
let firstCard, secondCard; /*  Simply creating two variables that have yet to be defined. */

function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return; // if the card we clicked IS the firstCard, we exit the function and nothing happens. Otherwise if we click the same card twice, that same card equals firstCard and secondCard and it matches itself, so it disableCards() gets ran on it and it stays flipped.

	this.classList.add('flip'); /*  In an event, (this) refers to the element that receieved the event, in this case the element that receieved the 'click' event was an individual card (which is a <div class="memory-card">). this.classList accesses the class list of the memory-card that was clicked, and this.classList.toggle('flip') will add the class "flip" to the card (<div class="memory-card flip">) if it isn't there upon click, and remove the class "flip" from the card (<div class="memory-card">) if it is there upon click. this.classList.add('flip') simply adds the class and it stays until it is removed. */

	if (!hasFlippedCard) {
		// first of two clicks
		hasFlippedCard = true;
		firstCard = this; /* Again, (this) refers to the element that receieved the click event, which was the memory-card.  */
		return; //a return statement removes the need for an else statement. It is saying, if the if statement runs, return out of the function. If not, we jump down to the next command anyway, so we don't need to say else.
	}
	
	// second of two click
	secondCard = this;

	checkForMatch();	
}

function checkForMatch() {
	let isMatch = firstCard.dataset.framework ===
		secondCard.dataset.framework;

	isMatch ? disableCards() : unflipCards(); // TERNARY OPERATOR : Define a variable (isMatch). Is it true ? perform the first function, if it is not : do the second function.
}

function disableCards () {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard);

	resetBoard();
	matches++;

	if (matches === 6) {
		wellDoneMessage();
	};
}

function unflipCards () {
	lockBoard = true; //this gets set to true so that now if we try to click another first card before the two unmatches flip back over, the flipCard() function exits out when it hits the if(lockBoard) condition.

	 setTimeout(() => { // if we don't set a timeout, as soon as we click a second card that doesn't match and reaches this else statement, the cards immediately lose their flip class and we have no time to view them. So we have to set a delay.
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		resetBoard(); // we return this variable back to false so that we can click cards again after the two unmatches have flipped and the flipCard() function will pass by the if(lockBoard) condition.
	}, 1500);
}

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

(function shuffle() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random() * 12); // here we are generating a random number between zero and 11 for each card and assigning that number to its order.
		card.style.order = randomPos; //  order is a flex-box property, and it is a flex-items property that defaults to zero. If undefined, they are ordered by source order. If a different integer is assigned, they are ordered by integer number, then source order, if they are all given a random integer, they are all ordered by integer number. 
	});
})(); // wrapping the function like this turns it into an IIFE (Immediately Invoked Function Expression)

function wellDoneMessage() {
	document.getElementById("overlay").style.display = "block";
}

cards.forEach(card => card.addEventListener('click', flipCard)); /* const cards is an array of every card div, so we must loop through them all to perform an eventListener */




