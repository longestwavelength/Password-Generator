const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

const randomFunc = {
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbols
}

clipboardEl.addEventListener('click', () => {
    //const textarea = document.createElement('textarea')
    const password = resultEl.innerText

    if(!password) { return }

    navigator.clipboard.writeText(password);
    alert('Password has been copied')
})

generateEl.addEventListener('click', () => {
    const length = +lengthEl.value
    const hasUpper = uppercaseEl.checked
    const hasLower = lowercaseEl.checked
    const hasnumber = numbersEl.checked
    const hassymbol = symbolsEl.checked

    resultEl.innerText = generatePassword(hasUpper, hasLower, hasnumber, hassymbol, length)
})

function generatePassword(upper, lower, number, symbol, length) {
    let geenratedPassword = ''

    const typesCount = upper + lower + number + symbol
    const typesArray = [{upper}, {lower}, {number}, {symbol}].filter(
        item => Object.values(item)[0]
    )

        if(typesCount === 0) {
            return ''
        }

        if(length > 20) {
            return ''
        }

        for(let i = 0; i < length; i+=typesCount){
            typesArray.forEach(type => {
                const funcName = Object.keys(type)[0]
                geenratedPassword += randomFunc[funcName]()
            })
        }

        const finalPassword = geenratedPassword.slice(0, length)
        const arr = finalPassword.split('')
        for(let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
            return arr.join('')
}   

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}


function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbols() {
    const symbols = '!@#$%^&*()[]{}=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)]
}

