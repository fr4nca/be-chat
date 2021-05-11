const body = document.querySelector("body")

const div = document.createElement("div")
div.style.position = "fixed"
div.style.bottom = 0
div.style.right = 0

div.style.width = "100px"
div.style.height = "100px"

div.style.borderRadius = "50%"
div.style.background = 'red'


body.appendChild(div)