import icon from './burger-icon.png'

const sidebar = document.querySelector('.sidebar')
const buttons = document.querySelector('.buttons')
const burger = new Image()
burger.src = icon
burger.classList.add('burger')
sidebar.insertBefore(burger, buttons)

burger.addEventListener('click', () => toggleDisplay(buttons))

function toggleDisplay (element) {
  (element.style.display === 'none')
    ? element.style.display = 'block'
    : element.style.display = 'none'
}
