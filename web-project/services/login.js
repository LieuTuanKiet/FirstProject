var account = JSON.parse(localStorage.getItem('account')) || {
    'adminAccount@gmail.com': 'password123'
}

// const inputEmail = document.querySelector('#email')
// const inputPassword = document.querySelector('#password')
// const errorEmail = document.querySelector('#error_email')
// const errorAccount = document.querySelector('#email_password_incorrect')

function isEmail() {
    const text = document.querySelector('#email').value.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(text);
}

// function action(e) {
//     e.preventDefault();
//     if (document.querySelector('.display_b').style.display === 'block') {
//         addAccount()
//     } else {
//         checkAccount()
//     }
// }

function checkAccount(e) {
    e.preventDefault();
    const inputEmail = document.querySelector('#email')
    const inputPassword = document.querySelector('#password')
    const errorEmail = document.querySelector('#error_email')
    const errorPassword = document.querySelector('.error_password')
    const errorAccount = document.querySelector('#email_password_incorrect')

    const email = inputEmail.value.trim()
    const password = inputPassword.value

    if (password === '') {
        errorPassword.style.display = 'block'
    } else {
        errorPassword.style.display = 'none'
    }

    if (!isEmail()) {
        errorEmail.style.display = 'block'
    } else {
        errorEmail.style.display = 'none'

        if (!((password === ''))) {
            if (account[email] === password) {
                errorAccount.style.display = 'none'
                alert('Login successfully')
                console.log('Login successfully')
            } else {
                errorAccount.style.display = 'block'
            }
        }
    }
}

function changeDisplay() {
    const displayA = document.querySelectorAll('.display_a')
    const displayB = document.querySelector('.display_b')

    document.querySelector('#email_password_incorrect').style.display = 'none'
    document.querySelector('#email_duplicate').style.display = 'none'

    if (displayB.style.display === 'none') {
        displayB.style.display = 'block'
        document.querySelector('.display_c').style.display = 'block'
        displayA.forEach(function (x) {
            x.style.display = 'none'
        })
    } else {
        displayA.forEach(function (x) {
            x.style.display = 'block'
        })
        displayB.style.display = 'none'
        document.querySelector('.display_c').style.display = 'none'
    }
}

function addAccount(event) {
    event.preventDefault();
    console.log('addAccount')
    const inputEmail = document.querySelector('#email')
    const inputPassword = document.querySelector('#password')
    const inputPasswordAgain = document.querySelector('#password-again')
    const errorEmail = document.querySelector('#error_email')
    const errorPassword = document.querySelector('.error_password')
    const errorPasswordAgain = document.querySelector('.error_password_again')
    const errorAccount = document.querySelector('#email_password_incorrect')
    const emailDuplicate = document.querySelector('#email_duplicate')

    errorAccount.style.display = 'block'

    const email = inputEmail.value.trim()
    const password = inputPassword.value
    const passwordAgain = inputPasswordAgain.value

    errorPasswordAgain.style.display = 'block'
    
    if (password === '') {
        errorPassword.style.display = 'block'
    } else {
        errorPassword.style.display = 'none'
    }

    if (!isEmail()) {
        errorEmail.style.display = 'block'
    } else {
        errorEmail.style.display = 'none'

        if (!(password === '') && !(passwordAgain === '')) {
            if (password !== passwordAgain) {
                errorPasswordAgain.style.display = 'block'
            } else {
                errorPasswordAgain.style.display = 'none'

                if (Object.keys(account).indexOf(email) === -1) {
                    emailDuplicate.style.display = 'none'

                    inputEmail.value = ''
                    inputPassword.value = ''
                    inputPasswordAgain.value = ''

                    account[email] = password
                    alert("create a new account successfully")
                } else {
                    emailDuplicate.style.display = 'block'
                }
            }
        }
    }
    localStorage.setItem('account', JSON.stringify(account));
}

function loginGoogle() {
    alert("waiting for next update")
}

function loginMicrosoft() {
    alert("waiting for next update")
}

function loginSSO() {
    alert("waiting for next update")
}

function resetAccount() {
    localStorage.removeItem('account');
} 