//Elementos
const generatePasswordButton = document.querySelector("#generate-password")
const generatedPasswordElement = document.querySelector("#generated-password")
const openCloseGeneratorButton = document.querySelector("#open-generate-password")
const generatePasswordContainer = document.querySelector("#generate-options")
const lengthInput = document.querySelector("#length")
const lettersInput = document.querySelector("#letters")
const numbersInput = document.querySelector("#numbers")
const symbolsInput = document.querySelector("#symbols")
const copyPasswordButton = document.querySelector("#copy-password")

//Funções
const getLetterLowerCase = () => {
    //Gerar letras minúsculas aleatoriamente
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
} 

const getLetterUpperCase = () => {
    //Gerar letras maiúsculas aleatoriamente
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
} 

const getNumber = () => {
    //Gerar números aleatoriamente
    return Math.floor(Math.random() * 10).toString()
}

const getSymbol = () => {
    //Gerar símbolos aleatoriamente
    const symbols = "!@#$%¨&*()-_=+§/?°]}[{ªº><,.\|"

    return symbols[Math.floor(Math.random() * symbols.length)]
}

const  generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol) => {

    let password = ""
    const passwordLength = +lengthInput.value

    const generators = []

    if(lettersInput.checked){
        generators.push(getLetterLowerCase, getLetterUpperCase)
    }
    if(numbersInput.checked){
        generators.push(getNumber)
    }
    if(symbolsInput.checked){
        generators.push(getSymbol)
    }
    console.log(generators.length)
    if(generators.length == 0){
        return
    }


    for(c = 0; c < passwordLength; c = c + generators.length){
        generators.forEach(() => {

            const randomValue = generators[Math.floor(Math.random() * generators.length)]()

            password += randomValue
        })
    }
    // para deixar a senha com 10 caracteres
    password = password.slice(0, passwordLength)
    generatedPasswordElement.style.display = "block"
    generatedPasswordElement.querySelector("h4").innerText = password
}

//Eventos
generatePasswordButton.addEventListener("click", () => {
    generatePassword(getLetterLowerCase, getLetterUpperCase, getNumber, getSymbol)
})

openCloseGeneratorButton.addEventListener("click", () => {
    generatePasswordContainer.classList.toggle("hide")
})

copyPasswordButton.addEventListener("click", (e) => {
    e.preventDefault()

    const password = generatedPasswordElement.querySelector("h4").innerText

    navigator.clipboard.writeText(password).then(() => {

        copyPasswordButton.innerText = "Senha copiada com sucesso!" 

        setTimeout(() => {
            copyPasswordButton.innerText = "Copiar"
        }, 3000)
    })
})

/* 
        EXPLICAÇÃO DE CÓDIGOS APRENDIDOS NO PROJETO


> String.fromCharCode()

Passa um número de "Unicode" para a String que esse número representa.

> Math.random()

Gera um número décimal. Frequentemente usado para tomar decisões aleatóias em programas.

> Math.floor()

Arredonda um número para para o menor número inteiro mais próximo.
ex: 2.9 -> 2

> navigator.clipboard.writeText().then()

Função para copiar String determinada. Como um "Ctrl + c".
*/