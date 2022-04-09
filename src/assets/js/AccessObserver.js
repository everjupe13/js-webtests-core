
// Redirect users from page doesnt allowed via auth status
export class AccessObserver {

    constructor(page, authObj) {
        this.notAllowed = ['academy', 'cabinet', 'field', ];
        this.page = page
        this.authObj = authObj

        this.url = document.location.protocol + '//' + document.location.host
    }

    restrict() {
        this.authData = this.authObj.getAuthData();

        if (!this.authData.isAuth) {
            this.notAllowed.forEach(el => {
                if (el === this.page) {
                    console.log('this page isn`t allowed due to the privacy settings')

                    switch (this.page) {
                        case 'academy':
                            return this.locateTo('/login') 
                        default:
                            return this.locateTo()
                    }
                }
            })
        }

        if (this.page === 'login' || this.page === 'registration') {
            this.locateTo('/academy')
        }

        console.log('this page is allowed due to the privacy settings')
        return true
    }


    locateTo(url) {
        console.log(document.location.protocol)
        console.log(document.location.host)
        let mainUrl = `${document.location.protocol}//${document.location.host}`;

        if (url) {
            return location.assign(mainUrl + url + '.html')
        }

        return location.assign(mainUrl)
    }

}