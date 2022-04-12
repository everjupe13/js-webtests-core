export default class Field {
    constructor(obj) {

        this.test = obj.test
        this.modal = obj.modal
        if (Object.prototype.hasOwnProperty.call(obj, 'timer')) {
            this.renderTimer(obj.timer)
        }
        this.testHtm = {
            title: document.querySelector('#test-title'),
            img: document.querySelector('#test-img'),
            answerField: document.querySelector('#test-answers'),
            submitBtn: document.querySelector('#test-btn'),
            nav: document.querySelector('#test-nav'),
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
        this.testHtm.submitBtn.addEventListener('click', () => {
            this.submit()
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
        data.answ.forEach(el => {
            let con = document.createElement('div')
            con.classList.add('test__answers-item')
            con.textContent = el.value
            con.setAttribute('data-value', (el.id + 1))

            this.testHtm.answerField.append(con)
        })

        this.testHtm.answerField.answ = Array.from(this.testHtm.answerField.children)
        let answ = this.testHtm.answerField.answ

        answ.forEach(el => {
            el.addEventListener('click', evt => {
                answ.forEach(e => {
                    if (e.classList.contains('checked')) {
                        e.classList.remove('checked')
                    }
                })

                evt.target.classList.add('checked')
            })
        })

        answ.forEach(el => {
            el.addEventListener('click', () => {
                this.observer.answers[this.currentIndex].choosed = el.getAttribute('data-value')
            })
        })
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

        setInterval(() => {
            this.timer.counter = this.timer.counter + 1;

            updateOut()

        }, 1000)
    }

    setCurrentTab(index) {
        this.currentIndex = parseInt(index, 10);
        this.pure()
        this.navClasses()
        this.renderTest()
    }

    pure() {
        this.testHtm.title.textContent = ''
        this.testHtm.img.setAttribute('src', '')
        while (this.testHtm.answerField.firstChild) {
            this.testHtm.answerField.removeChild(this.testHtm.answerField.firstChild)
        }
    }

    submit() {
        if ((this.tabs.length - 1) > parseInt(this.currentIndex, 10)) {
            this.modalCheck()
            this.currentIndex = parseInt(this.currentIndex, 10) + 1;
            this.setCurrentTab(this.currentIndex)
        } else {
            this.modalCheck()
            this.done()
        }
    }

    modalCheck() {
        if ((this.observer.answers[this.currentIndex].correct) == this.observer.answers[this.currentIndex].choosed) {
            let nav = this.testHtm.nav.items[this.currentIndex];
            if (nav.classList.contains('wrong')) {
                nav.classList.remove('wrong')
            }
            if (!nav.classList.contains('right')) {
                nav.classList.add('right')
            }
        } else {
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
        setTimeout(() => { alert('Тест завершен!')}, 200)
    }
}