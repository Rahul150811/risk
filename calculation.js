// Define the scoring system for each question (adjust weights as needed)
const questionScores = {
    'password1': { 'yes': 5, 'no': 0, 'recommendation': 'You should improve your password security.' },
    'password2': { 'frequently': 3, 'occasionally': 2, 'rarely': 1, 'no': 0, 'recommendation': 'Using a password manager can help improve your password security.' },
    'password3': { 'yes': 5, 'no': 0, 'recommendation': 'Consider using stronger passwords and changing them regularly.' },
    'mfa1': { 'yes': 5, 'no': 0, 'recommendation': 'Enable Multi-Factor Authentication (MFA) for added security.' },
    'mfa2': { 'yes': 5, 'no': 0, 'recommendation': 'Consider enabling Multi-Factor Authentication (MFA) for added security.' },
    'device1': { 'yes': 5, 'no': 0, 'recommendation': 'Regularly update and secure your devices.' },
    'device2': { 'yes': 5, 'no': 0, 'recommendation': 'Consider improving the security of your devices.' },
    'device3': { 'yes': 5, 'no': 0, 'recommendation': 'Ensure your devices are protected against unauthorized access.' },
    'social1': { 'yes': 5, 'no': 0, 'recommendation': 'Be cautious about sharing personal information on social media.' },
    'social2': { 'yes': 5, 'no': 0, 'recommendation': 'Review your social media privacy settings.' },
    'data1': { 'yes': 5, 'no': 0, 'recommendation': 'Protect sensitive data with encryption and access controls.' },
    'data2': { 'yes': 5, 'no': 0, 'recommendation': 'Consider enhancing the security of your data.' },
    'download1': { 'yes': 5, 'no': 0, 'recommendation': 'Only download files from trusted sources.' },
    'download2': { 'yes': 5, 'no': 0, 'recommendation': 'Exercise caution when downloading files from the internet.' },
    'privacy1': { 'yes': 5, 'no': 0, 'recommendation': 'Review and adjust your privacy settings regularly.' },
    'privacy2': { 'yes': 5, 'no': 0, 'recommendation': 'Consider enhancing your online privacy practices.' },
};

// Calculate the individual scores for each question and total scores for each category
function calculateScore() {
    // Get all the select elements
    const selectElements = document.querySelectorAll('select');

    // Initialize the total score and category scores
    let totalScore = 0;
    const categoryScores = {};
    const recommendations = {}; // Store recommendations for each question

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

        // Store the recommendation for this question
        const questionRecommendation = questionScores[questionId]['recommendation'];
        if (answer === 'no' && questionRecommendation) {
            recommendations[questionId] = questionRecommendation;
        }
    });

    totalScore = Math.min(totalScore, 100);

    return { totalScore, categoryScores, recommendations };
}

// Calculate the risk level and display the results
function calculateRisk() {
    // Get the total score and category scores
    const { totalScore, categoryScores, recommendations } = calculateScore();

    // Calculate the risk level
    let riskLevel;
    if (totalScore > 80) {
        riskLevel = 'You are a nice person, You know stuff :)';
    }
    else if (totalScore <= 80 && totalScore >= 70) {
        riskLevel = 'Low Risk';
    }
    else if (totalScore <= 69 && totalScore >= 60) {
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

    // Display recommendations based on user answers
    const recommendationsElement = document.getElementById('recommendations');
    recommendationsElement.innerHTML = ''; // Clear previous recommendations

    Object.keys(recommendations).forEach(questionId => {
        const recommendation = recommendations[questionId];
        recommendationsElement.innerHTML += `<p>${recommendation}</p>`;
    });

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