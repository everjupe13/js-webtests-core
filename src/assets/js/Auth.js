export default class Auth {
    constructor() {
        this.getAuthData()
    }

    getAuthData() {
        let authData = localStorage.auth

        if (typeof authData === 'string') {
            let data = JSON.parse(authData)
            this.isAuth = data.isAuth
            this.status = data.status
            this.user = data.user

            return this
        } else {
            return this.pure()
        }
    }

    pure() {
        this.isAuth = false
        this.status = 'signedout'
        this.user = {
            id: '',
            login: '',
            password: ''
        }

        localStorage.auth = JSON.stringify({
            isAuth: this.isAuth,
            status: this.status,
            user: this.user
        })

        return this
    }

    navigate() {
        let isAuth = this.isAuth
        if (isAuth) {
            let domain = document.location.protocol + '//' + document.location.host;
            location.assign(domain)
        }
    }

    update(data) {
        this.isAuth = data.isAuth
        this.status = data.status
        this.user = data.user

        localStorage.auth = JSON.stringify({
            isAuth: this.isAuth,
            status: this.status,
            user: this.user
        })
        return this
    }
}