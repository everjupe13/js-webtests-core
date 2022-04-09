export default class Field {
    constructor(obj) {

        this.test = obj.test
        if (Object.prototype.hasOwnProperty.call(obj, 'timer')) {
            this.renderTimer(obj.timer)
        }


        this.initBoard()
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

    initBoard() {
        
    }

    setQuestion() {

    }

    setAnswer() {

    }

    getAnswer() {

    }

    checkAnswer() {

    }

    showResults() {

    }
}