import { Sortable } from '@shopify/draggable';

export default class Field {
    constructor(obj) {

        this.test = obj.test
        this.modal = obj.modal

        this.modal.fieldModals()

        if (Object.prototype.hasOwnProperty.call(obj, 'timer')) {
            this.renderTimer(obj.timer)
        }

        this.testHtm = {
            title: document.querySelector('#test-title'),
            img: document.querySelector('#test-img'),
            answerField: document.querySelector('#test-answers'),
            dragField: document.querySelector('#test-answers-draggable'),
            submitBtn: document.querySelector('#test-btn'),
            nav: document.querySelector('#test-nav'),
            result: document.querySelector('#field-result')
        }

        this.tabs = this.test.data.questions
        this.currentIndex = 0

        this.observer = { answers: [] }
        this.tabs.forEach(el => {
            this.observer.answers.push({ qid: el.qid, correct: el.correct, choosed: '' })
        })


        this.renderTest()
        this.renderNav()
        this.mainObserver()

    }

    mainObserver() {
        const submit = () => {
            if ((this.tabs.length - 1) > parseInt(this.currentIndex, 10)) {
                this.currentIndex = parseInt(this.currentIndex, 10) + 1;
                this.setCurrentTab(this.currentIndex)
            } else {
                this.done()
            }
        }
        this.testHtm.submitBtn.addEventListener('click', () => {
            this.modalCheck()
        })

        this.modal.tabs.success.next.addEventListener('click', () => {
            if ((this.tabs.length - 1) > parseInt(this.currentIndex, 10)) {
                this.currentIndex = parseInt(this.currentIndex, 10) + 1;
                this.setCurrentTab(this.currentIndex)
            } else {
                this.done()
            }

            this.modal.tabs.closeModal(this.modal.tabs.success)
        })

        this.modal.tabs.fail.rep.addEventListener('click', () => {
            if ((this.tabs.length - 1) > parseInt(this.currentIndex, 10)) {
            } else {
                this.done()
            }

            this.modal.tabs.closeModal(this.modal.tabs.fail)
        })

        this.modal.tabs.fail.next.addEventListener('click', () => {
            if ((this.tabs.length - 1) > parseInt(this.currentIndex, 10)) {
                this.currentIndex = parseInt(this.currentIndex, 10) + 1;
                this.setCurrentTab(this.currentIndex)
            } else {
                this.done()
            }

            this.modal.tabs.closeModal(this.modal.tabs.fail)
        })

        this.modal.overflow.event.addEventListener('click', () => {
            if ((this.tabs.length - 1) > parseInt(this.currentIndex, 10)) {
                this.currentIndex = parseInt(this.currentIndex, 10) + 1;
                this.setCurrentTab(this.currentIndex)
            } else {
                this.done()
            }

            this.modal.tabs.closeModal(this.modal.tabs.success)
            this.modal.tabs.closeModal(this.modal.tabs.fail)
        })
    }

    renderTest() {
        let data
        this.tabs.forEach(el => {
            if (el.qid == parseInt(this.currentIndex, 10)) {
                data = el
            }
        })

        let path = document.location.protocol + '//' + document.location.host
        this.testHtm.title.textContent = data.title
        this.testHtm.img.setAttribute('src', path + '/assets/img/test/grade' + this.test.grade + '/' + data.img)

        if (Object.prototype.hasOwnProperty.call(data, 'type')) {
            data.answ.forEach(el => {
                let con = document.createElement('div')
                con.classList.add('test__answers-item')
                con.textContent = el.value
                con.setAttribute('data-value', (el.id + 1))

                this.testHtm.dragField.append(con)
            })

            this.testHtm.dragField.answ = Array.from(this.testHtm.dragField.children)
        } else {
            data.answ.forEach(el => {
                let con = document.createElement('div')
                con.classList.add('test__answers-item')
                con.textContent = el.value
                con.setAttribute('data-value', (el.id + 1))

                this.testHtm.answerField.append(con)
            })

            this.testHtm.answerField.answ = Array.from(this.testHtm.answerField.children)
        }

        if (Object.prototype.hasOwnProperty.call(data, 'type')) {

            const containerSelector = '#test-answers-draggable';
            const containers = document.querySelectorAll(containerSelector);

            if (containers.length === 0) {
                return false;
            }

            if (!Object.prototype.hasOwnProperty.call(this.testHtm.dragField, 'sortable')) {
                if (typeof this.testHtm.dragField.sortable !== 'Sortable') {
                    this.testHtm.dragField.sortable = new Sortable(containers, {
                        draggable: 'div',
                        mirror: {
                            appendTo: containerSelector,
                            constrainDimensions: true,
                        },
                    });

                    this.testHtm.dragField.sortable.on('sortable:stop', () => {
                        setTimeout(() => {
                            let choosedString = ''
                            // let currentPos = document.querySelectorAll('#test-answers-dragabble .test__answers-item')
                            let currentPos = Array.from(this.testHtm.dragField.children)

                            console.log(currentPos)

                            Array.from(currentPos).forEach(el => {
                                choosedString = choosedString + el.textContent
                            })

                            this.observer.answers[this.currentIndex].choosed = choosedString
                            console.log(this.observer.answers[this.currentIndex].choosed)
                        }, 300)
                    })
                }
            }

        } else {
            this.testHtm.answerField.answ.forEach(el => {
                el.addEventListener('click', evt => {
                    this.testHtm.answerField.answ.forEach(e => {
                        if (e.classList.contains('checked')) {
                            e.classList.remove('checked')
                        }
                    })

                    evt.target.classList.add('checked')
                })
            })

            this.testHtm.answerField.answ.forEach(el => {
                el.addEventListener('click', () => {
                    this.observer.answers[this.currentIndex].choosed = parseInt(el.getAttribute('data-value'), 10)
                })
            })
        }
    }

    renderNav() {
        this.testHtm.nav.items = []
        this.tabs.forEach(el => {
            let navBtn = document.createElement('span')
            navBtn.textContent = el.qid + 1
            navBtn.setAttribute('data-qid', el.qid)

            this.testHtm.nav.append(navBtn)
            this.testHtm.nav.items.push(navBtn)
        })

        this.testHtm.nav.items.forEach(el => {
            el.addEventListener('click', (e) => {
                this.setCurrentTab(e.target.getAttribute('data-qid'))
            })
        })

        this.navClasses()

        const backLink = document.createElement('img')
        const link = document.location.protocol + '//' + document.location.host + '/tests.html?grade=' + this.test.data.grade
        backLink.classList.add('field__out')
        backLink.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAADMSURBVDiNpdMxLkRhFAXg7zAMC5DYh4jCtFqFhkUoJDZgAzrbIAoamUZDbEOlEoVkaFyNyODNy3vmJqf5759zzj25F7Zwi7cGTLBfVWYhuMMSTv2twnVVvTb0fnw6aFNpw0Ib83QlWUtylGR5+r0zARZxgoskw94EVfWEHWzjMsnKd0+PDLCBZ9xgddCklmSEwxZDj19uzvtkMHu8eUbo5SDJJsZ4wG5VTTo7wDpecIVh70XCB86wV1Xv/87gNwa4x3GSJtVOxzTXOX8Cu5gU7fzwuqEAAAAASUVORK5CYII=')
        backLink.addEventListener('click', () => {
            location.assign(link)
        })
        this.testHtm.nav.append(backLink)
    }

    navClasses() {
        this.testHtm.nav.items.forEach((btn, index) => {
            if (index == this.currentIndex) {
                if (!btn.classList.contains('active')) {
                    btn.classList.add('active')
                }
            } else {
                if (btn.classList.contains('active')) {
                    btn.classList.remove('active')
                }
            }
        })
    }

    renderTimer(el) {
        this.timer = el
        this.timer.counter = 0

        const updateOut = () => {
            let ctn = this.timer.counter
            this.timer.textContent = ctn
        }

        this.timer.time = setInterval(() => {
            this.timer.counter = this.timer.counter + 1;

            updateOut()

        }, 1000)
    }

    setCurrentTab(index) {
        this.currentIndex = parseInt(index, 10);
        this.pure()
        this.navClasses()
        this.renderTest()
        this.testHtm.result.textContent = ''
    }

    pure() {
        this.testHtm.title.textContent = ''
        this.testHtm.img.setAttribute('src', '')
        // while (this.testHtm.answerField.firstChild) {
        //     this.testHtm.answerField.removeChild(this.testHtm.answerField.firstChild)
        // }
        // while (this.testHtm.dragField.children.length) {
        //     this.testHtm.dragField.removeChild(this.testHtml.dragField.lastChild)
        // }
        // while (this.testHtm.answerField.children.length) {
        //     this.testHtm.answerField.removeChild(this.testHtml.answerField.lastChild)
        // }
        console.log('trying destroy')
        if (Object.prototype.hasOwnProperty.call(this.testHtm.dragField, 'sortable')) {
            if (Object.prototype.hasOwnProperty.call(this.testHtm.dragField.sortable, 'destroy')) {
                console.log('destroying')
                this.testHtm.dragField.destroy()
            }
        }

        this.testHtm.dragField.innerHTML = ''
        // this.testHtm.dragField = this.testHtm.dragField.cloneNode(true)
        this.testHtm.answerField.innerHTML = ''

    }

    modalCheck() {
        if ((this.observer.answers[this.currentIndex].correct) == this.observer.answers[this.currentIndex].choosed) {
            this.modal.tabs.openModal(this.modal.tabs.success)

            let nav = this.testHtm.nav.items[this.currentIndex];
            if (nav.classList.contains('wrong')) {
                nav.classList.remove('wrong')
            }
            if (!nav.classList.contains('right')) {
                nav.classList.add('right')
            }
        } else {
            this.modal.tabs.openModal(this.modal.tabs.fail)

            let nav = this.testHtm.nav.items[this.currentIndex];
            if (nav.classList.contains('right')) {
                nav.classList.remove('right')
            }
            if (!nav.classList.contains('wrong')) {
                nav.classList.add('wrong')
            }
        }
    }

    done() {
        this.procent = 0

        this.observer.answers.forEach((el) => {
            if (el.correct == el.choosed) {
                this.procent = this.procent + 1
            }
        })

        this.testHtm.result.textContent = this.procent + ' правильных ответа'

        console.log(this.timer.time)
        clearInterval(this.timer.time)
        console.log(this.timer.time)

        setTimeout(() => { alert('Тест завершен! ' + this.procent + ' правильных ответа') }, 200)
        this.testHtm.submitBtn.onclick = () => { location.reload() }
        this.testHtm.submitBtn.textContent = 'Перезагрузить'

        this.testHtm.nav.items.forEach(el => {
            el.onclick = () => { location.reload() }
        })
    }
}