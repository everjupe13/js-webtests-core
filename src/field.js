import './assets/scss/main.scss'
import './assets/scss/objects/Test.scss'
import './assets/scss/objects/Field.scss'


import { AccessObserver } from './assets/js/AccessObserver';
import Auth from './assets/js/Auth'
import User from './assets/js/User'
import Field from './assets/js/Field';

let auth = new Auth()
const access = new AccessObserver('academy', auth)
access.restrict()


let field = new Field({
    timer: document.getElementById('field-timer')
})

