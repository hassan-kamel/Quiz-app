export class Quiz {
    constructor(result, amount) {
        this.numOfQuestions = amount;
        this.Result = result;
        this.curruntNum = document.getElementById("current");
        document.getElementById("totalAmount").innerHTML = amount;
        this.inCorrectElemment = document.getElementById("inCorrect");
        this.CorrectElemment = document.getElementById("Correct");
        this.questionElemment = document.getElementById("question");
        this.rowAnswerElemment = document.getElementById("rowAnswer");
        this.userChoice;
        this.userScore = 0;
        this.currunt = 0;
        this.nextButtonElemment = document.getElementById("next");
        this.tryAgainBtn = document.getElementById("tryBtn");
        this.tryAgainBtn.addEventListener("click", this.tryAgain.bind(this))
        this.nextButtonElemment.addEventListener("click", this.nextQuestion.bind(this));
        this.showQuestion();
    }
    tryAgain() {
        location.reload();
    }
    showQuestion() {
        this.questionElemment.innerHTML = this.Result[this.currunt].question;
        this.curruntNum.innerHTML = this.currunt + 1;
        this.getAnswer(this.Result[this.currunt]);
    }
    nextQuestion() {
        console.log("current:" + (this.currunt + 1));
        let _userChoice = [...this.userChoice].filter(Element => Element.checked);

        this.checkTheAnswer(_userChoice);

        if (this.currunt + 1 < this.Result.length) {
            if (_userChoice.length) {
                $("#alert").fadeOut(200);
                this.currunt++;
                this.showQuestion();
            } else {
                $("#alert").fadeIn(200);
            }
        } else {
            $("#quiz").fadeOut(500, () => {
                $("#finish").fadeIn(500, () => {
                    $("#inCorrect").fadeOut(100, () => {
                        $("#Correct").fadeOut(100, () => {
                            document.getElementById("score").innerHTML = `${this.userScore}/${this.numOfQuestions}`;
                        });
                    })

                })
            })


        }

    }
    getAnswer(crt) {
        let answers = [
            crt.correct_answer, ...crt.incorrect_answers
        ];
        console.log(answers);
        let randomAns = [];
        let i = answers.length;
        let j = 0;
        while (i--) {
            j = Math.floor(Math.random() * (i + 1));
            randomAns.push(answers[j]);
            answers.splice(j, 1);
        }

        this.showAnswer(randomAns);
    }
    showAnswer(ans) {
        let ansContainer = ``;
        for (let i = 0; i < ans.length; i++) {
            ansContainer += `
                    <div class="form-check">
                        <label class="form-check-label">
                            <input type="radio" class="form-check-input" name="answer" id="q${i+1}"       value="${ans[i]}">
                           ${ans[i]}
                        </label>
                    </div>
                    `;
        }
        this.rowAnswerElemment.innerHTML = ansContainer;
        this.userChoice = document.getElementsByName("answer");

    }
    checkTheAnswer(_userChoice) {
        if (_userChoice.length) {
            if (_userChoice[0].value == (this.Result[this.currunt]).correct_answer) {
                this.userScore++
                    $("#inCorrect").fadeOut(200, () => {
                        $("#Correct").fadeOut(200, () => {
                            $("#Correct").fadeIn(500);
                        });
                    })
            } else {
                $("#inCorrect").fadeOut(200, () => {
                    $("#Correct").fadeOut(200, () => {
                        $("#inCorrect").fadeIn(500);
                    })
                })
            }
        }

    }
}