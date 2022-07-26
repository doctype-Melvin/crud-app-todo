document.querySelectorAll('.musclegroup').forEach(btn => btn.addEventListener('click', () => {
console.log(btn.id)
}));

const exercises = []; //Stores excercises sorted by musclegroup

function createExercise(muscle, name){
    let exercise = {};
    exercise.muscle = muscle;
    exercise.name = name;
    exercises.push(exercise)
}

createExercise('chest', 'Chest Flye');
console.log(exercises)