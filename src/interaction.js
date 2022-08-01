const sidebar = document.querySelector('.sidebar')
const burger = new Image()
burger.src = '/burger-icon.png'
burger.classList.add('burger')
sidebar.append(burger)

function toggleDisplay (element) {
  element.style.display = 'block'
}
