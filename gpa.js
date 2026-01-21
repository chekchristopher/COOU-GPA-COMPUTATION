document.addEventListener("DOMContentLoaded", () => {

    const tableBody = document.getElementById("courseTable");
    const addBtn = document.getElementById("addRowBtn");
    const calcBtn = document.getElementById("calculateBtn");

    const totalSubjectsEl = document.getElementById("totalSubjects");
    const totalCreditsEl = document.getElementById("totalCredits");
    const currentGpaEl = document.getElementById("currentGpa");
    const calculatedGpaEl = document.getElementById("calculatedGpa");
    const gradeStandingEl = document.getElementById("gradeStanding");

    const GRADE_POINTS = {
        A: 5,
        B: 4,
        C: 3,
        D: 2,
        E: 1,
        F: 0
    };

    /* ---------------- ADD COURSE ---------------- */
    addBtn.addEventListener("click", () => {
        const row = document.createElement("tr");
        row.className = "grade-row";

        row.innerHTML = `
            <td><input type="text" class="course"></td>
            <td><input type="number" class="credit" min="1" max="6"></td>
            <td>
                <select class="grade">
                    <option value="">-</option>
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                    <option>E</option>
                    <option>F</option>
                </select>
            </td>
            <td><button class="delete">✕</button></td>
        `;

        tableBody.appendChild(row);
    });

    /* ---------------- DELETE COURSE ---------------- */
    tableBody.addEventListener("click", e => {
        if (e.target.classList.contains("delete")) {
            e.target.closest("tr").remove();
            resetSummary();
        }
    });

    /* ---------------- CALCULATE GPA ---------------- */
    calcBtn.addEventListener("click", () => {
        const rows = document.querySelectorAll(".grade-row");

        let totalCredits = 0;
        let totalPoints = 0;
        let subjectCount = 0;
        let valid = true;

        rows.forEach(row => {
            const course = row.querySelector(".course").value.trim();
            const creditInput = row.querySelector(".credit");
            const grade = row.querySelector(".grade").value;

            creditInput.classList.remove("error");

            const credit = parseInt(creditInput.value);

            if (!course || !grade || isNaN(credit) || credit < 1 || credit > 6) {
                creditInput.classList.add("error");
                valid = false;
                return;
            }

            subjectCount++;
            totalCredits += credit;
            totalPoints += credit * GRADE_POINTS[grade];
        });

        if (subjectCount === 0) {
            showWarning("Please add a course");
            return;
        }

        if (!valid) return;

        const gpa = (totalPoints / totalCredits).toFixed(2);
        updateSummary(subjectCount, totalCredits, gpa);
    });

    /* ---------------- HELPERS ---------------- */

    function updateSummary(subjects, credits, gpa) {
        totalSubjectsEl.innerText = subjects;
        totalCreditsEl.innerText = credits;
        currentGpaEl.innerText = gpa;
        calculatedGpaEl.innerText = gpa;

        gradeStandingEl.innerText = getStanding(gpa);
        gradeStandingEl.style.color = "#16a34a";
    }

    function getStanding(gpa) {
        gpa = parseFloat(gpa);
        if (gpa >= 4.5) return "First Class";
        if (gpa >= 3.5) return "Second Class Upper";
        if (gpa >= 2.4) return "Second Class Lower";
        if (gpa >= 1.5) return "Third Class";
        if (gpa >= 1.0) return "Pass";
        return "Fail";
    }

    function showWarning(message) {
        gradeStandingEl.innerText = message;
        gradeStandingEl.style.color = "#dc2626";
    }

    function resetSummary() {
        totalSubjectsEl.innerText = 0;
        totalCreditsEl.innerText = 0;
        currentGpaEl.innerText = "0.00";
        calculatedGpaEl.innerText = "0.00";
        gradeStandingEl.innerText = "—";
        gradeStandingEl.style.color = "#16a34a";
    }

});
