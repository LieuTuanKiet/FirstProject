// khoi tao tai khoan tu localStorage hoac mac dinh
let account = JSON.parse(localStorage.getItem('account')) || {
    'adminAccount@gmail.com': 'password123'
}

// DOM Elements
const inputEmail = document.querySelector('#email')
const inputPassword1 = document.querySelector('#password1')
const inputPassword2 = document.querySelector('#password2')
const errorEmailInvalid = document.querySelector('#email_invalid')
const errorEmailExists = document.querySelector('#email_exists')
const errorPasswordRequired = document.querySelector('#password_required')
const errorPasswordNotSame = document.querySelector('#password_not_same')

// cac phuong thuc hien thi loi
function clearErrorMessages() {
    errorEmailInvalid.style.display = 'none'
    errorEmailExists.style.display = 'none'
    errorPasswordRequired.style.display = 'none'
    errorPasswordNotSame.style.display = 'none'
}

function showError(element) {
    element.style.display = 'block'
}

// phuong thuc kiem tra du lieu dau vao
function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

function isEmailExists(email) {
    return account[email] !== undefined
}

function isPasswordFilled(password1, password2) {
    return password1 !== '' && password2 !== ''
}

function isPasswordMatching(password1, password2) {
    return password1 === password2
}

// phuong thuc luu tai khoan va chuyen huong
function saveAccount(email, password) {
    account[email] = password
    localStorage.setItem('account', JSON.stringify(account));
    inputEmail.value = ''
    inputPassword1.value = ''
    inputPassword2.value = ''
    alert("Create a new account successfully")
}

function goToLogin() {
    window.location.href = 'https://vietngia249.github.io/login-website/'
}

// phuong thuc xu ly tao tai khoan moi
function createAccount(event) {
    event.preventDefault()
    clearErrorMessages()

    const email = inputEmail.value.trim()
    const password1 = inputPassword1.value
    const password2 = inputPassword2.value

    if (!isEmailValid(email)) {
        showError(errorEmailInvalid)
        return false
    }

    if (isEmailExists(email)) {
        showError(errorEmailExists)
        return false
    }

    if (!isPasswordFilled(password1, password2)) {
        showError(errorPasswordRequired)
        return false
    }

    if (!isPasswordMatching(password1, password2)) {
        showError(errorPasswordNotSame)
        return false
    }

    saveAccount(email, password1)
    goToLogin()
    return true
}