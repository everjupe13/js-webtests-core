import './assets/scss/main.scss'
import './assets/scss/objects/Test.scss'
import './assets/scss/objects/Field.scss'


import { AccessObserver } from './assets/js/AccessObserver';
import Auth from './assets/js/Auth'
import User from './assets/js/User'
import Field from './assets/js/Field'
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
    );




let test = new Test({
    grade: params['grade'],
    tid: params['tid']
})

let field = new Field({
    test: test,
    timer: document.getElementById('field-timer')
})

