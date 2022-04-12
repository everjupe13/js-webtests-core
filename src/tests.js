import './assets/scss/objects/Modal.scss'
import './assets/scss/objects/Test.scss'
import './assets/scss/objects/Field.scss'
import './assets/scss/main.scss'


import { AccessObserver } from './assets/js/AccessObserver';
import Auth from './assets/js/Auth'
import Test from './assets/js/Test'

let auth = new Auth()
const access = new AccessObserver('academy', auth)
access.restrict()


let params = window
    .location
    .search
    .replace('?', '')
    .split('&')
    .reduce(
        function (p, e) {
            var a = e.split('=');
            p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        },
        {}
    )

let getGrade = params['grade'] || 1
let getTid = params['tid'] || 0

let test = new Test({
    grade: getGrade,
    tid: getTid
})

let array = test.getAllArray(getGrade)
console.log(array)

let cards = document.querySelectorAll('.test-card')

cards.forEach((el, index) => {

    let title = el.querySelector('.test-card__title')
    let grade = el.querySelector('.test-card__progress')
    let link = el.querySelector('.test-card__btn')
    let url = link.getAttribute('href') + '?grade=' + getGrade +'&tid=' + index
    
    title.textContent = array[index].name
    grade.textContent = getGrade + ' класс'
    link.setAttribute('href', url) 
})


let bannerGrade = document.querySelector('#banner-grade')
bannerGrade.textContent = getGrade + ' класс'

