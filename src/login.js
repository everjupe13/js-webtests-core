import './assets/scss/login.scss'

import { AccessObserver } from './assets/js/AccessObserver';
import Auth from './assets/js/Auth'
import User from './assets/js/User'


let auth = new Auth()
const access = new AccessObserver('login', auth)
access.restrict()


let user = new User(auth);


// Get form and inputs
let form = document.getElementById('form')
let loginInput = document.getElementById('inp-login')
let passwordInput = document.getElementById('inp-password')


// EventListener on form (logic)
form.onsubmit = (e) => {
    e.preventDefault()

    user.login({ loginInput: loginInput, passwordInput: passwordInput })
}

loginInput.addEventListener('input', () => {
    user.updateInput(loginInput)
})

passwordInput.addEventListener('input', () => {
    user.updateInput(passwordInput)
})


