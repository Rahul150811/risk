// Define the scoring system for each question (adjust weights as needed)
const questionScores = {
    'password1': { 'yes': 5, 'no': 0 },
    'password2': { 'frequently': 2, 'occasionally': 1, 'rarely': 0, 'no': 0 },
    'password3': { 'yes': 3, 'no': 0 },
    'mfa1': { 'yes': 5, 'no': 0 },
    'mfa2': { 'yes': 2, 'no': 0 },
    'device1': { 'yes': 5, 'no': 0 },
    'device2': { 'yes': 3, 'no': 0 },
    'device3': { 'yes': 2, 'no': 0 },
    'social1': { 'yes': 5, 'no': 0 },
    'social2': { 'yes': 2, 'no': 0 },
    'data1': { 'yes': 5, 'no': 0 },
    'data2': { 'yes': 2, 'no': 0 },
    'download1': { 'yes': 5, 'no': 0 },
    'download2': { 'yes': 2, 'no': 0 },
    'privacy1': { 'yes': 5, 'no': 0 },
    'privacy2': { 'yes': 2, 'no': 0 },
};

// Calculate the individual scores for each question and total scores for each category
function calculateScore() {
    // Get all the select elements
    const selectElements = document.querySelectorAll('select');

    // Initialize the total score and category scores
    let totalScore = 0;
    const categoryScores = {};

    // Calculate the individual scores for each question and total scores for each category
    selectElements.forEach(select => {
        const questionId = select.id;
        const answer = select.value;
        const categoryName = questionId.replace(/\d/g, ''); // Extract the category name

        // Calculate the individual question score
        const questionScore = questionScores[questionId][answer];

        // Add the question score to the total score
        totalScore += questionScore;

        // Add the question score to the category score
        categoryScores[categoryName] = (categoryScores[categoryName] || 0) + questionScore;
    });

    // Cap the total score at 10 if it exceeds 10
    totalScore = Math.min(totalScore, 100);

    return { totalScore, categoryScores };
}

// Calculate the risk level and display the results
function calculateRisk() {
    // Get the total score and category scores
    const { totalScore, categoryScores } = calculateScore();

    // Calculate the risk level
    let riskLevel;
    if (totalScore <= 80 && totalScore >= 70) {
        riskLevel = 'Low Risk';
    } else if (totalScore <= 69 && totalScore >= 60) {
        riskLevel = 'Moderate Risk';
    } else if (totalScore <= 59 && totalScore >= 50) {
        riskLevel = 'High Risk';
    } else {
        riskLevel = 'Critical';
    }

    // Display the total score and risk level on the screen
    const totalScoreElement = document.getElementById('total-score');
    totalScoreElement.textContent = `Total Score: ${totalScore}`;
    const riskLevelTextElement = document.getElementById('risk-level-text');
    riskLevelTextElement.textContent = `Risk Level: ${riskLevel}`;

    // Display recommendations based on risk level
    const recommendationsElement = document.getElementById('recommendations');
    recommendationsElement.innerHTML = ''; // Clear previous recommendations

    if (riskLevel === 'Low Risk') {
        recommendationsElement.textContent = "Great! Your cybersecurity practices are strong.";
    } else if (riskLevel === 'Moderate Risk') {
        recommendationsElement.textContent = "You have some room for improvement. Consider these recommendations:";
        recommendationsElement.innerHTML += '<ul><li>Recommendation 1 for Moderate Risk</li><li>Recommendation 2 for Moderate Risk</li></ul>';
    } else if (riskLevel === 'High Risk') {
        recommendationsElement.textContent = "Your cybersecurity practices may be at risk. Take immediate action and consider these recommendations:";
        recommendationsElement.innerHTML += '<ul><li>Recommendation 1 for High Risk</li><li>Recommendation 2 for High Risk</li><li>Recommendation 3 for High Risk</li></ul>';
    } else {
        recommendationsElement.textContent = "Your cybersecurity practices are at a critical level of risk. Urgently address these recommendations:";
        recommendationsElement.innerHTML += '<ul><li>Recommendation 1 for Critical Risk</li><li>Recommendation 2 for Critical Risk</li><li>Recommendation 3 for Critical Risk</li></ul>';
    }

    // Display category scores (optional)
    Object.keys(categoryScores).forEach(categoryName => {
        const categoryScoreElement = document.getElementById(`${categoryName}-score`);
        if (categoryScoreElement) {
            categoryScoreElement.textContent = `${categoryName} Score: ${categoryScores[categoryName]}`;
        }
    });
}

// Attach the calculateRisk function to the button click event
document.getElementById('calculate-button').addEventListener('click', calculateRisk);

// Initialize the risk calculation on page load
calculateRisk();
