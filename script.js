class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clearAll()
    }

    clearAll() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    deleteOne() {
        this.currentOperand = this.currentOperand.slice(0, -1)
    }

    chooseOperation(operation) {
        if (this.currentOperand === '' || this.currentOperand === '.') return
        if (this.previousOperand !== '') {
            this.computeValue()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    computeValue() {
        console.log('yess')
        let computedValue
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                computedValue = prev + curr
                break
            case '-':
                computedValue = prev - curr
                break
            case '*':
                computedValue = prev * curr
                break
            case '÷':
                computedValue = prev / curr
                break
            default:
                return
        }
        this.currentOperand = computedValue.toString()
        this.previousOperand = ''
        this.operation = undefined
    }

    appendValue(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    formatValue(number) {
        const stringNumber = number.toString()

        const integerDigits = parseFloat(stringNumber.split('.')[0])
        console.log('integerDigits', integerDigits)

        const decimalDigits = stringNumber.split('.')[1]
        let displayNumber
        if (isNaN(stringNumber)) {
            displayNumber = ''
        } else {
            displayNumber = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }

        if(decimalDigits != null) {
            return `${integerDigits}.${decimalDigits}`
        } else {
            return displayNumber
        }
    }

        displayValue() {
            if(this.currentOperand === '') {
                this.currentOperandTextElement.innerText = ''
            } else {
                this.currentOperandTextElement.innerText = this.formatValue(this.currentOperand)
            }
            if (this.operation !== undefined) {
                this.previousOperandTextElement.innerText = `${this.formatValue(this.previousOperand)} ${this.operation}`
            } else {
                this.previousOperandTextElement.innerText = ''
            }
        }

    }

    const numberButtons = document.querySelectorAll('[data-number]')
    const operationButtons = document.querySelectorAll('[data-operation]')
    const equalsButton = document.querySelector('[data-equals]')
    const deleteButton = document.querySelector('[data-delete]')
    const allClearButton = document.querySelector('[data-all-clear]')
    const previousOperandTextElement = document.querySelector('[data-previous-operand]')
    const currentOperandTextElement = document.querySelector('[data-current-operand]')


    const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

allClearButton.addEventListener('click', () => {
    calculator.clearAll()
    calculator.displayValue()
})

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText
        calculator.appendValue(value)
        calculator.displayValue()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText
        calculator.chooseOperation(value)
        calculator.displayValue()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.computeValue()
    calculator.displayValue()
})

deleteButton.addEventListener('click', () => {
    calculator.deleteOne()
    calculator.displayValue()
})
