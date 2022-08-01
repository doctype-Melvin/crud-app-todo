document.querySelectorAll('.musclegroup').forEach((btn) =>
  btn.addEventListener('click', () => {
    console.log(btn.id)
  })
)

const exercises = [] // Stores excercises sorted by musclegroup

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

function addExercise (name, muscle) {
  const data = JSON.parse(localStorage.getItem('exercises'))
  if (data.length > 0) {
    const index = data.findIndex(item => item.muscle === muscle)
    const muscleObj = data.find(item => item.muscle === muscle)
    const exArray = muscleObj.exercise
    if (muscleObj.exercise.includes(name)) {
      console.log(`${name} already exists`)
      return data
    }
    exArray.push(name)
    muscleObj.exercise = exArray
    data.splice(index, 1, muscleObj)
    localStorage.setItem('exercises', JSON.stringify(data))
    return data
  } else if (!data.includes(item => item.muscle === muscle)) {
    const newObj = createBodypart(muscle)
    newObj.exercise.push(name)
    data.push(newObj)
    localStorage.setItem('exercises', JSON.stringify(data))
    return data
  }
}

console.log(addExercise('Dips', 'chest'))
