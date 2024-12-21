const form = document.querySelector("#bmiForm");
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const resultDiv = document.querySelector("#result");

const calculateBMI = (height, weight) => {
    const heightToMeter = height / 100;
    return (weight /heightToMeter ** 2).toFixed(1);
};

const getBMICategory = (bmi) => {
    if(bmi < 18.5) return "저체중";
    if(bmi < 23) return "정상";
    if(bmi < 25) return "과체중";
    return "비만";
};

const healthAdvice = (category) => {
    const advice = {
        저체중: "균형 잡힌 영양섭취가 필요합니다.",
        정상: "현재 체중을 잘 유지하세요",
        과체중: "규칙적인 운동을 시작하세요",
        비만: "전문가와 상담을 권장드립니다."
    };
    return advice[category];
};

const showResult = (bmi, category) => {
    const advice = healthAdvice(category);
    resultDiv.innerHTML = `
        <div class = "show">
            <p>BMI: <span>${bmi}</span></p>
            <p>판정: <span>${category}</span></p>
            <p><span>${advice}</span></p>
        </div>
    `;

    resultDiv.style.backgroundColor = "#f8f9fa";
};

const validateInput = (input) => {
    const value = parseFloat(input.value);
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);

    if (isNaN(value) || value < min || value > max) {
        input.setCustomValidity(`${min}에서 ${max} 사이의 값을 입력하세요.`);
        return false;
    }

    input.setCustomValidity("");
    return true;
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if(!validateInput(heightInput) || !validateInput(weightInput)) {
        resultDiv.innerHTML = `<p class = "error">올바른 값을 입력해주세요.</p>`;
        resultDiv.style.backgroundColor = "#fff3f3";
        return
    };

    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);
    const bmi = calculateBMI(height, weight);
    const category = getBMICategory(bmi);

    showResult(bmi, category);
});

[heightInput, weightInput].forEach((input) => {
    input.addEventListener("input", () => validateInput(input));
  });