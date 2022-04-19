
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

    fieldModals() {
        console.time('sucсess')
        this.tabs = new Object()
        this.tabs.success = this.CreateNode({
            node: 'div',
            cssClass: 'modal-welcome',
            parent: this.overflow
        })
        this.tabs.fail = this.CreateNode({
            node: 'div',
            cssClass: 'modal-welcome',
            parent: this.overflow
        })


        this.tabs.success.lbl = this.CreateNode({
            node: 'h4',
            cssClass: 'modal-title',
            parent: this.tabs.success,
            content: 'Ответ правильный'
        });
        this.tabs.success.text = this.CreateNode({
            node: 'p',
            cssClass: 'modal-text',
            parent: this.tabs.success,
            content: 'Продолжай в том же духе'
        })
        this.tabs.success.img = this.CreateNode({
            node: 'img',
            cssClass: 'modal-img',
            parent: this.tabs.success,
        })
        this.tabs.success.btns = this.CreateNode({
            node: 'div',
            cssClass: 'modal-btn__field',
            parent: this.tabs.success,
        })
        this.tabs.success.next = this.CreateNode({
            node: 'button',
            cssClass: 'modal-btn',
            parent: this.tabs.success.btns,
            content: 'Дальше'
        })


        this.tabs.fail.lbl = this.CreateNode({
            node: 'h4',
            cssClass: 'modal-title',
            parent: this.tabs.fail,
            content: 'Ответ неправильный'
        });
        this.tabs.fail.text = this.CreateNode({
            node: 'p',
            cssClass: 'modal-text',
            parent: this.tabs.fail,
            content: 'Попытайся еще раз'
        })
        this.tabs.fail.img = this.CreateNode({
            node: 'img',
            cssClass: 'modal-img',
            parent: this.tabs.fail,
        })
        this.tabs.fail.btns = this.CreateNode({
            node: 'div',
            cssClass: 'modal-btn__field',
            parent: this.tabs.fail,
        })
        this.tabs.fail.rep = this.CreateNode({
            node: 'button',
            cssClass: 'modal-btn',
            parent: this.tabs.fail.btns,
            content: 'Повторить'
        })
        this.tabs.fail.next = this.CreateNode({
            node: 'button',
            cssClass: 'modal-btn',
            parent: this.tabs.fail.btns,
            content: 'Дальше'
        })

        this.tabs.success.lbl.classList.add('success')
        this.tabs.fail.lbl.classList.add('fail')

        this.tabs.success.img.setAttribute('src', `${document.location.protocol}//${document.location.host}/assets/img/happy.png`)
        this.tabs.fail.img.setAttribute('src', `${document.location.protocol}//${document.location.host}/assets/img/sad.png`)

        this.tabs.success.style.display = 'none'
        this.tabs.fail.style.display = 'none'

        const openModal = (el) => {
                el.style.display = 'block'
        }
        const closeModal = (el) => {
            el.style.display = 'none'
        }



        this.tabs.closeModal = (el) => {
            this.close({
                el: el,
                callback: () => { closeModal(el) }
            })
        }

        this.tabs.openModal = (el) => {
            this.open({
                el: el,
                callback: () => { openModal(el) }
            })
        }

        console.timeEnd('sucсess')
        console.log('registered new Sucess Window')

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
