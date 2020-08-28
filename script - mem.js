document.addEventListener('DOMContentLoaded', function() {
	let difficulty = document.getElementById('difficulty-rating');

	const gameContainer = document.getElementById('game');

	let card1 = null;
	let card2 = null;
	let cardsFlipped = 0;
	let noClicking = false;
	let currentScore = 0;
	let lowScore = localStorage.getItem('low-score');
	let startBtn = document.getElementById('start-button');
	startBtn.addEventListener('click', startGame);

	if (lowScore) {
		document.getElementById('best-score').innerText = lowScore;
	}

	let resetBtn = document.getElementById('reset-button');
	resetBtn.addEventListener('click', resetGame);
	function resetGame() {
		location.reload();
	}

	function startGame() {
		startBtn.classList.add('buttonhide');
		resetBtn.classList.remove('buttonhide');
		console.log(difficulty.value);
		let COLORS = [ 'red', 'red', 'green', 'green', 'purple', 'purple', 'blue', 'blue', 'orange', 'orange' ];

		if (difficulty.value === '4') {
			COLORS.splice([ 4 ], 6);
		} else if (difficulty.value === '6') {
			COLORS.splice([ 6 ], 4);
		} else if (difficulty.value === '8') {
			COLORS.splice([ 8 ], 2);
		}
		console.log(COLORS);
		// here is a helper function to shuffle an array
		// it returns the same array with values shuffled
		// it is based on an algorithm called Fisher Yates if you want ot research more
		difficulty.classList.add('buttonhide');
		function shuffle(array) {
			let counter = array.length;

			// While there are elements in the array
			while (counter > 0) {
				// Pick a random index
				let index = Math.floor(Math.random() * counter);

				// Decrease counter by 1
				counter--;

				// And swap the last element with it
				let temp = array[counter];
				array[counter] = array[index];
				array[index] = temp;
			}

			return array;
		}

		let shuffledColors = shuffle(COLORS);

		// this function loops over the array of colors
		// it creates a new div and gives it a class with the value of the color
		// it also adds an event listener for a click for each card
		function createDivsForColors(colorArray) {
			for (let color of colorArray) {
				// create a new div
				const newDiv = document.createElement('div');

				// give it a class attribute for the value we are looping over
				newDiv.classList.add(color);
				newDiv.classList.add('mysteryCard');

				// call a function handleCardClick when a div is clicked on
				newDiv.addEventListener('click', handleCardClick);

				// append the div to the element with an id of game
				gameContainer.append(newDiv);
			}
		}

		// TODO: Implement this function!
		function handleCardClick(e) {
			if (noClicking) return;
			if (e.target.classList.contains('flipped')) return;

			let currentCard = e.target;
			currentCard.classList.remove('mysteryCard');
			currentCard.classList.remove;
			currentCard.classList.add(`${currentCard.classList[0]}character`);

			if (!card1 || !card2) {
				if (!currentCard.classList.contains('flipped')) {
					setScore(currentScore + 1);
				}
				currentCard.classList.add('flipped');
				card1 = card1 || currentCard;
				card2 = currentCard === card1 ? null : currentCard;
			}

			if (card1 && card2) {
				noClicking = true;
				// debugger
				let gif1 = card1.className;
				let gif2 = card2.className;

				if (gif1 === gif2) {
					cardsFlipped += 2;
					card1.removeEventListener('click', handleCardClick);
					card2.removeEventListener('click', handleCardClick);
					card1 = null;
					card2 = null;
					noClicking = false;
				} else {
					setTimeout(function() {
						card1.style.backgroundColor = '';
						card2.style.backgroundColor = '';
						card1.classList.remove('flipped');
						card2.classList.remove('flipped');
						card1.classList.add('mysteryCard');
						card2.classList.add('mysteryCard');
						card1.classList.remove(`${card1.classList[0]}character`);
						card2.classList.remove(`${card2.classList[0]}character`);
						card1 = null;
						card2 = null;
						noClicking = false;
					}, 1000);
				}
			}

			function setScore(newScore) {
				currentScore = newScore;
				document.getElementById('current-score').innerText = currentScore;
			}

			setTimeout(function() {
				if (cardsFlipped === COLORS.length) {
					let lowScore = +localStorage.getItem('low-score') || Infinity;
					if (currentScore < lowScore) {
						localStorage.setItem('low-score', currentScore);
						alert(`YOU WIN! YOU HAVE THE NEW LOW SCORE OF ${currentScore}!`);
					} else {
						alert(`Game complete. Your score was ${currentScore}.  Try again to beat the low score!`);
					}
				}
			}, 500);
		}

		// when the DOM loads
		createDivsForColors(shuffledColors);
	}
});
