const answers = { /*correct answers*/
    q1: "CERN",
    q2: "HTTP",
    q3: "HTML",
    q4: "data protection",
    q5: "cost efficiency",
};

function gradeQuiz() {
    const form = document.getElementById("quizForm");
    let score = 0;
    let total = Object.keys(answers).length;

    let output = "<h3>Quiz Results</h3>";

    for (let q in answers) {
        let userAnswer;

        // Handle checkbox question
        if (q === "q5") {
            const checked = [...form[q]]
                .filter(box => box.checked)
                .map(box => box.value);

            userAnswer = checked.includes(answers[q]) ? answers[q] : "";
        } else {
            userAnswer = form[q].value;
        }

        const correctAnswer = answers[q];

        if (userAnswer === correctAnswer) {
            score++;
            output += `
                <div class="question-result correct">
                    <b>${q.toUpperCase()}</b>: Correct 
                    <br>Your answer: ${userAnswer}
                </div>`;
        } else {
            output += `
                <div class="question-result incorrect">
                    <b>${q.toUpperCase()}</b>: Incorrect  
                    <br>Your answer: ${userAnswer || "No answer selected"}
                    <br>Correct answer: ${correctAnswer}
                </div>`;
        }
    }

    const passed = score >= Math.ceil(total * 0.5);

    output =
        `<p class="${passed ? 'pass' : 'fail'}">You ${passed ? "Passed" : "Failed"}</p>` +
        `<p><b>Score:</b> ${score} / ${total}</p>` +
        output;

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = output;
    resultsDiv.style.display = "block";

    document.getElementById("resetBtn").style.display = "inline-block";
}

function resetQuiz() {
    document.getElementById("quizForm").reset();
    document.getElementById("results").style.display = "none";
    document.getElementById("resetBtn").style.display = "none";
}
