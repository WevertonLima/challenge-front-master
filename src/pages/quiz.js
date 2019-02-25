import React, { Component } from 'react';
import './quiz.css';

class Quiz extends Component {

    // default variables
    state = {
        questions: [
            {
                Id: 1,
                Question: "Quantos filmes a série Harry Potter tem? (apenas números)",
                Answer: "7"
            },
            {
                Id: 2,
                Question: "Nome do ator que atua como Harry Potter?",
                Answer: "Daniel Radcliffe"
            },
            {
                Id: 3,
                Question: "Harry Potter tinha um animal de estimação? Se sim, qual animal era e qual era o nome desse animal?",
                Answer: "Edwiges"
            },
            {
                Id: 4,
                Question: "Como são chamados as pessoas que não são bruxos?",
                Answer: "Trouxas"
            },
            {
                Id: 5,
                Question: "Nome da namorada de Harry Potter?",
                Answer: "Gina Weasley"
            }
        ]
    }

    // activated when the input has focus
    handleAnswerChange = (question) => {

        const elem = document.getElementById("question-" + question.Id);

        if (elem != null) {

            // get value of input
            const answerInput = elem.children[3].value;

            const isAnswerCorrect = this.isAnswerCorrect(answerInput, question.Answer);
            this.markAnswerResult(isAnswerCorrect, elem)
        }

    }

    // returns true or false according to user response
    isAnswerCorrect = (answerInput, questionAnswer) => {
        const answerLower = answerInput.toLowerCase();
        return answerLower === questionAnswer.toLowerCase();
    }

    // marke the answer result
    markAnswerResult = (isCorrect, elem) => {
        elem.dataset.iscorrect = isCorrect;
    }

    // check answers click
    checkTotalCorrectAnswersClick = (e) => {

        // this checks the correct answers and show the response from the errors
        let correctAnswersCount = 0;

        const elems = document.getElementsByClassName('quiz-container');
        const correct = document.getElementsByClassName('correct-answers-message')[0];

        for (var i = 0; i < elems.length; i++) {
            const isCorrect = elems[i].dataset.iscorrect;

            if (isCorrect == "true") {
                correctAnswersCount += 1;
                this.showCorrectAnswer(elems[i]);
            } else {
                this.showInvalidAnswer(elems[i]);
            }
        }

        if (correctAnswersCount == elems.length)
            correct.innerHTML = 'Parabéns! você acertou todas as perguntas';
        else
            correct.innerHTML = 'Total de acertos: ' + correctAnswersCount;

        document.getElementById('check-results').style.display = 'none';
        document.getElementById('play-again').style.display = 'block';
        document.getElementsByClassName('quiz-result')[0].style.display = 'block';

        // scroll top window
        window.scrollTo(0, 0);
    }

    // show invalid answer and icon
    showInvalidAnswer = (element) => {
        const input = element.getElementsByTagName('input')[0];
        const img = element.getElementsByClassName('error')[0];

        input.disabled = true;
        img.style.display = 'block';
        element.getElementsByClassName('quiz-message')[0].style.display = 'block';
    }

    // show correct answer and icon
    showCorrectAnswer = (element) => {
        const input = element.getElementsByTagName('input')[0];
        const img = element.getElementsByClassName('success')[0];

        input.disabled = true;
        img.style.display = 'block';
        element.getElementsByClassName('quiz-message')[0].style.display = 'block';
        element.getElementsByClassName('quiz-message')[0].className += ' success';
    }

    // click play again button
    playAgainClick = () => {

        const elems = document.getElementsByClassName('quiz-container');

        for (var i = 0; i < elems.length; i++) {
            this.resetAnswer(elems[i]);
        }

        document.getElementsByClassName('correct-answers-message')[0].innerHTML = "";
        document.getElementById('check-results').style.display = "block";
        document.getElementById('play-again').style.display = "none";
        document.getElementsByClassName('quiz-result')[0].style.display = "none";

        // scroll top window
        window.scrollTo(0, 0);
    }

    // set default answers
    resetAnswer = (element) => {
        const input = element.getElementsByTagName('input')[0];
        const imgError = element.getElementsByClassName('error')[0];
        const imgSuccess = element.getElementsByClassName('success')[0];

        input.value = '';
        input.removeAttribute("disabled");
        element.dataset.iscorrect = "false";
        element.getElementsByClassName('quiz-message')[0].style.display = "none";
        element.getElementsByClassName('quiz-message')[0].classList.remove("success");
        imgError.style.display = "none";
        imgSuccess.style.display = "none";
      }

    render() {

        const { questions } = this.state;

        return (
            <div className="quiz-body">
                <form id="quiz-form">
                    <h1 className="animated fadeIn">Você conhece mesmo a saga Harry Potter?</h1>
                    <em className="animated fadeIn">Este teste foi criado para você!</em>

                    <div className="quiz-result animated fadeIn">
                        <div className="correct-answers-message"></div>
                    </div>

                    {questions.map(question => (
                        <div className="quiz-container animated zoomIn" id={"question-" + question.Id} data-iscorrect="false" key={question.Id}>
                            <img className="error animated bounceIn" src="./images/error.png" />
                            <img className="success animated bounceIn" src="./images/success.png" />
                            <div className="quiz-question">{question.Question}</div>
                            <input onChange={this.handleAnswerChange.bind(this, question)} />
                            <div className="quiz-message hidden">{question.Answer}</div>
                        </div>
                    ))}

                    <div className="quiz-footer animated zoomIn">
                        <a id="check-results" className="button primary" onClick={this.checkTotalCorrectAnswersClick.bind()}>Ver resultados</a>
                        <a id="play-again" className="button secondary" onClick={this.playAgainClick.bind()}>Jogar novamente</a>
                    </div>

                </form>
            </div>
        );
    }
}

export default Quiz;