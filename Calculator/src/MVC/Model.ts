import Term from "../classes/Term"
type Operator = {
    sign: string,
    operate: Function
}

class Model {
    terms: Array<Term>
    operators: Array<Operator>
    result: number

    constructor() {
        this.terms = []
        this.operators = []
        this.result = 0
    }

    setFloat() {
        this.terms[this.terms.length - 1].setFloat()
    }
    clearData() {
        this.terms = []
        this.operators = []
        this.result = 0
    }
}

const model = new Model
export default model