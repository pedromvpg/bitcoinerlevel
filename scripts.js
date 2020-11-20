function buildQuiz(){
	// variable to store the HTML output
	const output = [];

	// for each question...
	questions.forEach(
		(currentQuestion, questionNumber) => {

			// variable to store the list of possible answers
			const answers = [];

			// and for each available answer...
			for(letter in currentQuestion.answers){

				// ...add an HTML radio button
				answers.push(
					`<input type="radio" name="question${questionNumber}" id="question${questionNumber}-${letter}" value="${letter}">
					<label for="question${questionNumber}-${letter}">${currentQuestion.answers[letter]}</label>`
				);
			}

			// add this question and its answers to the output
			output.push(
				`<div class="question-container">
					<div class="question"> <span class="question-number"> ${questionNumber}</span> ${currentQuestion.question} </div>
					<div class="answers"> ${answers.join('')} </div>
				</div>`
			);
		}
	);

	// finally combine our output list into one string of HTML and put it on the page
	quizContainer.innerHTML = output.join('');
}

var levelPosition = 0;

function showResults(){
	var points  = 0;
	// gather answer containers from our quiz
	const answerContainers = quizContainer.querySelectorAll('.answers');

	// keep track of user's answers
	let numCorrect = 0;

	// for each question...
	questions.forEach( (currentQuestion, questionNumber) => {

		// find selected answer
		const answerContainer = answerContainers[questionNumber];
		const selector = `input[name=question${questionNumber}]:checked`;
		const userAnswer = (answerContainer.querySelector(selector) || {}).value;

		// if answer is correct
		if(userAnswer === currentQuestion.correctAnswer){
			// add to the number of correct answers
			numCorrect++;
			//answerContainers[questionNumber].style.color = 'green';
			points = points + currentQuestion.points;
		}
		else{
			//answerContainers[questionNumber].style.background = 'red';
		}

	});

	switch (true) {
	  case (points < 1): levelPosition = 0; break;
	  case (points < 1000): levelPosition = 1; break;
	  case (points < 10000): levelPosition = 2; break;
		case (points < 40000): levelPosition = 3; break;
		case (points < 100000): levelPosition = 4; break;
	  case (points < 1000000): levelPosition = 5; break;
	}

	descriptionContainer.innerHTML = `<div id="result-info"><div id="points">${points} points | ${numCorrect} out of ${questions.length}</div><div id="description"><b>${levels[levelPosition].name}</b> ${levels[levelPosition].description}</div></div>`;
}

const quizContainer = document.getElementById('quiz');
const descriptionContainer = document.getElementById('level-description');
const submitButton = document.getElementById('submit');


// Kick things off
buildQuiz();

// Event listeners
submitButton.addEventListener('click', showResults);
