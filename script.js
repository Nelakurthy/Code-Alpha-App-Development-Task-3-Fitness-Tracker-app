// Sample workout data (to be replaced with actual data storage)
let workouts = [];

// DOM elements
const workoutForm = document.getElementById('workoutForm');
const goalForm = document.getElementById('goalForm');
const workoutHistory = document.getElementById('workoutHistory');
const goalValue = document.getElementById('goalValue');
const stepsToday = document.getElementById('stepsToday');
const appreciationMessage = document.getElementById('appreciationMessage');

// Event listener for recording a workout
workoutForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const activity = document.getElementById('activity').value;
    const exerciseType = document.getElementById('exerciseType').value;
    const duration = parseInt(document.getElementById('duration').value, 10);
    const caloriesBurned = parseInt(document.getElementById('caloriesBurned').value, 10) || 0;

    // Validate input
    if (activity.trim() === '' || exerciseType === '' || isNaN(duration) || duration < 15) {
        alert('Please enter valid values for activity, exercise type, and a duration of more than 15 minutes.');
        return;
    }

    // Record workout
    const workout = {
        activity: activity,
        exerciseType: exerciseType,
        duration: duration,
        caloriesBurned: caloriesBurned,
        date: new Date().toLocaleDateString()
    };

    workouts.push(workout);

    // Update UI
    updateWorkoutHistory();
    workoutForm.reset();
});

// Event listener for setting a daily steps goal
goalForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const goal = parseInt(document.getElementById('goal').value, 10);

    // Validate input
    if (isNaN(goal) || goal < 100) {
        alert('Please enter a valid daily steps goal (minimum 100 steps).');
        return;
    }

    // Update goal value
    goalValue.textContent = goal;

    // Update UI (simulated steps today)
    const stepsTodayValue = Math.floor(Math.random() * (goal - 50)) + 50; // Simulated steps today
    stepsToday.textContent = stepsTodayValue;

    // Check if goal is reached
    if (stepsTodayValue >= goal) {
        appreciationMessage.classList.remove('hidden');
    } else {
        appreciationMessage.classList.add('hidden');
    }
});

// Function to update workout history in the UI
function updateWorkoutHistory() {
    workoutHistory.innerHTML = '';
    workouts.forEach(workout => {
        const workoutItem = document.createElement('div');
        workoutItem.classList.add('workout-item');
        workoutItem.innerHTML = `
            <p><strong>${workout.activity}</strong> - ${workout.exerciseType} - ${workout.duration} minutes (${workout.date})</p>
            <p>Calories Burned: ${workout.caloriesBurned}</p>
        `;
        workoutHistory.appendChild(workoutItem);
    });
}

// Initialize UI
goalValue.textContent = '0';
stepsToday.textContent = '0';
updateWorkoutHistory();
