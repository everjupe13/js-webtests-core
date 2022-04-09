export default class User {
    constructor(auth) {
        this.auth = auth
        this.operationsErrors = new Array()
        this.getAllUsers()
    }

    getAllUsers() {
        let usersData = localStorage.users

        if (typeof usersData === 'string') {
            usersData = JSON.parse(usersData)
        }

        if (usersData !== undefined) {
            return usersData
        } else {

            let blankUsersData = [
                {
                    id: 0,
                    login: 'admin',
                    password: 'admin',
                },
            ]
            localStorage.users = JSON.stringify(blankUsersData)
            return blankUsersData
        }
    }

    login(parameters) {
        this.operationsErrors = new Array()
        let login, password;

        if (parameters.loginInput.value.trim() === '') {
            this.setInputStatus(parameters.loginInput, 'invalid')
            this.operationsErrors.push('empty login')
        }

        if (parameters.passwordInput.value.trim() === '') {
            this.setInputStatus(parameters.passwordInput, 'invalid')
            this.operationsErrors.push('empty password')
        }

        if (this.operationsErrors[0]) {
            this.operationsErrors.forEach(element => {
                console.log(element)
            })
            return
        }

        login = parameters.loginInput.value.trim().toLowerCase()
        password = parameters.passwordInput.value.trim()

        let users = this.getAllUsers()
        users.forEach((user) => {
            if (user.login === login) {
                if (user.password === password) {
                    this.auth = this.auth.update({
                        isAuth: true,
                        status: 'signed',
                        user: {
                            id: user.id,
                            login: user.login,
                            password: user.password
                        }
                    })
                    alert('success')
                    console.log('success')

                    let domain = document.location.protocol + '//' + document.location.host
                    location.assign(domain)

                    return
                }
            }
        })

        if (!this.auth.isAuth) {
            this.setInputStatus(parameters.loginInput, 'invalid')
            this.setInputStatus(parameters.passwordInput, 'invalid')
            alert('user not found')
            this.operationsErrors.push('user not found')
            this.operationsErrors.forEach(element => {
                console.log(element)
            })
            return
        }
    }

    register(parameters) {
        this.operationsErrors = new Array()
        let login, password;

        if (parameters.loginInput.value.trim() === '') {
            this.setInputStatus(parameters.loginInput, 'invalid')
            this.operationsErrors.push('empty login')
        }
        if (parameters.passwordInput.value.trim() === '') {
            this.setInputStatus(parameters.passwordInput, 'invalid')
            this.operationsErrors.push('empty password')
        }

        if (this.operationsErrors[0]) {
            this.operationsErrors.forEach(element => {
                console.log(element)
            })
            return
        }

        login = parameters.loginInput.value.trim().toLowerCase()
        password = parameters.passwordInput.value.trim()

        let users = this.getAllUsers()
        users.forEach((user) => {
            if (user.login === login) {
                this.setInputStatus(parameters.loginInput, 'invalid')
                this.setInputStatus(parameters.passwordInput, 'invalid')
                alert('user is existed')
                this.operationsErrors.push('user is existed')
            }
        })

        if (this.operationsErrors[0]) {
            this.operationsErrors.forEach(element => {
                console.log(element)
            })
            return
        } else {
            alert('success')
            console.log('success')

            this.auth.update({
                isAuth: true,
                status: 'signed',
                user: {
                    id: users.length,
                    login: login,
                    password: password
                }
            })

            users.push(this.auth.user)

            localStorage.users = JSON.stringify(users)

            let domain = document.location.protocol + '//' + document.location.host
            location.assign(domain)

            return
        }
    }

    updateInput(input) {
        if (input.value === '') {
            this.setInputStatus(input, 'default')
        } else {
            this.setInputStatus(input, 'valid')
        }
    }

    logout() {
        this.auth.pure()
    }

    setInputStatus(input, status) {
        switch (status) {
            case 'invalid':
                input.setAttribute('data-status', 'invalid')
                break
            case 'valid':
                input.setAttribute('data-status', 'valid')
                break
            default:
                input.setAttribute('data-status', 'default')
                break
        }
    }
}