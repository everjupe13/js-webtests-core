export default class Test {
    constructor(obj) {

        this.grade = obj.grade
        this.tid = obj.tid

    }

    getTestArray() {

    }




    createTestSchema() {
        let test = [
            {
                tid: 0,
                grade: 1,
                name: 'Математика',
                questions: [
                    {
                        qid: 0,
                        title: '',
                        answ: {
                            type: 'simple',
                            array: [
                                {

                                },
                            ]
                        }
                    },
                    {
                        qid: 1,
                    },
                    {
                        qid: 2,
                    },
                    {
                        qid: 3,
                    },
                    {
                        qid: 4,
                    },
                    {
                        qid: 5,
                    },
                    {
                        qid: 6,
                    },
                    {
                        qid: 7,
                    },
                    {
                        qid: 8,
                    },
                    {
                        qid: 9,
                    },
                    {
                        qid: 10,
                    },
                ]
            }
        ]
    }
}