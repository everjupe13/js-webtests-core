import './assets/scss/objects/Modal.scss'
import './assets/scss/main.scss'


import { AccessObserver } from './assets/js/AccessObserver';
import Auth from './assets/js/Auth'
import User from './assets/js/User'
import Modal from './assets/js/Modal';
import { main } from '@popperjs/core';

let auth = new Auth()
const access = new AccessObserver('main', auth)
access.restrict()




let user = new User(auth)

if (auth.isAuth) {

    let loggedText = document.querySelector('.main__status')
    let logoutBtn = document.createElement('button')

    loggedText.textContent = `Поздравляем, вы в системе!`
    logoutBtn.textContent = `выйти`

    logoutBtn.classList.add('main__btn')
    logoutBtn.classList.add('main__logout-btn')

    logoutBtn.addEventListener('click', () => {
        user.logout()
        location.reload()
    })

    let mainLink = document.getElementById('main-link')
    let mainBtn = document.getElementById('main-btn')

    while (mainLink.firstChild) {
        mainLink.removeChild(mainLink.firstChild)
    }

    let url = document.location.protocol + '//' + document.location.host
    mainBtn.textContent = 'Перейти к урокам!'
    mainBtn.setAttribute('href', url + '/academy.html')
    mainLink.append(logoutBtn)


    let modal = new Modal()
    modal.welcomeWindow()

}