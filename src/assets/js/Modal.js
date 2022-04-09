
export default class Modal {
    constructor() {
        console.time('overflow')
        this.createOverflow()

        console.timeEnd('overflow')
        console.log('modal windows rendered successfully!')
    }

    createOverflow() {
        this.overflow = this.CreateNode({
            node: 'div',
            cssClass: 'overflow',
            parent: document.body
        })
        this.overflow.event = this.CreateNode({
            node: 'div',
            cssClass: 'overflowEvent',
            parent: this.overflow
        })
    }

    welcomeWindow() {
        console.time('welcome')
        this.welcome = document.createElement('div')

        this.welcome = this.CreateNode({
            node: 'div',
            cssClass: 'modal-welcome',
            parent: this.overflow
        })

        const title = this.CreateNode({
            node: 'h4',
            cssClass: 'modal-title',
            parent: this.welcome,
            content: 'Добро пожаловать'
        });
        const text = this.CreateNode({
            node: 'p',
            cssClass: 'modal-text',
            parent: this.welcome,
            content: 'Мы тебя ждали! Твои тесты ждут тебя'
        })

        const link = this.CreateNode({
            node: 'a',
            cssClass: 'modal-link',
            parent: this.welcome,
            content: 'Учиться'
        })

        link.setAttribute('href', `${document.location.protocol}//${document.location.host}/academy.html`)




        const openWelcome = () => {
            this.welcome.style.display = 'block'
        }
        const closeWelcome = () => {
            this.welcome.style.display = 'none'
        }
        const init = () => {
            this.open({
                el: this.welcome,
                callback: () => { openWelcome() }
            })

            this.overflow.event.addEventListener('click', () => {
                this.close({
                    el: this.welcome,
                    callback: () => { closeWelcome() }
                })
            })

            console.timeEnd('welcome')
            console.log('registered new Welcome Window')
        }
        setTimeout(() => { init() }, 1000)
    }



    CreateNode(prop) {
        const node = document.createElement(prop.node)

        if (Object.prototype.hasOwnProperty.call(prop, 'cssClass')) {
            node.classList.add(prop.cssClass)
        }
        if (Object.prototype.hasOwnProperty.call(prop, 'content')) {
            node.textContent = prop.content
        }
        if (Object.prototype.hasOwnProperty.call(prop, 'parent')) {
            prop.parent.append(node)
            return node
        }
        return node
    }

    open(prop) {
        const fadeIn = (obj) => {
            let opacity = 0.1;
            this.overflow.event.style.display = 'block';

            let timer = setInterval(() => {
                if (opacity >= 1) {
                    obj.callback()
                    clearInterval(timer)
                }
                this.overflow.event.style.opacity = opacity
                this.overflow.event.style.filter = 'alpha(opacity=' + opacity * 100 + ")"
                opacity += opacity * 0.1
            }, 10)
        }

        this.overflow.style.display = 'block'
        fadeIn(prop)
    }
    close(prop) {
        const fadeOut = (obj) => {
            let opacity = 1;

            let timer = setInterval(() => {
                if (opacity <= 0.1) {
                    clearInterval(timer)
                    this.overflow.style.display = 'none'
                }
                this.overflow.event.style.opacity = opacity;
                this.overflow.event.style.filter = 'alpha(opacity=' + opacity * 100 + ")"
                opacity -= opacity * 0.1

            }, 10)
        }

        prop.callback()
        fadeOut(prop)
    }


}
