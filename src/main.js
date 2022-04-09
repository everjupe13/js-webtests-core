import './assets/scss/objects/Modal.scss'
import './assets/scss/main.scss'


import { AccessObserver } from './assets/js/AccessObserver';
import Auth from './assets/js/Auth'
import User from './assets/js/User'
import Modal from './assets/js/Modal';

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
    loggedText.parentElement.append(logoutBtn)

    logoutBtn.addEventListener('click', () => {
        user.logout()
        location.reload()
    })


    let btn = document.querySelector('.main__btn')
    btn.addEventListener('click', () => {locateLogin()})


    let modal = new Modal()
    modal.welcomeWindow()

}