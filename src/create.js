document.querySelectorAll('.musclegroup').forEach((btn) =>
  btn.addEventListener('click', () => {
    console.log(btn.id)
  })
)

const createStorage = (() => {
  if (JSON.parse(localStorage.getItem('exercises')) === null) {
    return localStorage.setItem('exercises', JSON.stringify([]))
  }
})()

function createBodypart (muscle) { // Creates new bodypart obj
  const newObj = {}
  newObj.muscle = muscle
  newObj.exercise = []
  return newObj
}

function createExercise (name, muscle) {
  const data = JSON.parse(localStorage.getItem('exercises'))
  const found = data.find(item => item.muscle === muscle)
  if (found === undefined) { // Create new muscle obj in data
    const newObj = createBodypart(muscle)
    newObj.exercise.push(name)
    data.push(newObj)
    localStorage.setItem('exercises', JSON.stringify(data))
    console.log(`New data for ${muscle}`)
    return data
  } else { // Add new exercise to obj array
    const index = data.findIndex(item => item.muscle === muscle)
    const array = found.exercise
    if (found.exercise.includes(name)) { // Check if exercise already exists
      return 'Already exists'
    } else {
      array.push(name)
      found.exercise = array
      data.splice(index, 1, found)
      localStorage.setItem('exercises', JSON.stringify(data))
      return data
    }
  }
}
createExercise('Squats', 'legs')
createExercise('Push Ups', 'chest')
createExercise('Rows', 'back')
