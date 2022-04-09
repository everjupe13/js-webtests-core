import './assets/scss/main.scss'
import './assets/scss/objects/Test.scss'


import { AccessObserver } from './assets/js/AccessObserver';
import Auth from './assets/js/Auth'
import User from './assets/js/User'

let auth = new Auth()
const access = new AccessObserver('academy', auth)
access.restrict()