// khoi tao tai khoan tu localStorage hoac mac dinh
let account = JSON.parse(localStorage.getItem('account')) || {
    'adminAccount@gmail.com': 'password123'
}

// DOM Elements
const inputEmail = document.querySelector('#email')
const inputPassword = document.querySelector('#password')
const errorAccountInvalid = document.querySelector('#account_invalid')
const errorEmailInvalid = document.querySelector('#email_invalid')
const errorPasswordRequired = document.querySelector('#password_required')

// cac phuong thuc hien thi loi
function clearErrorMessages() {
    errorAccountInvalid.style.display = 'none'
    errorEmailInvalid.style.display = 'none'
    errorPasswordRequired.style.display = 'none'
}

function showError(element) {
    element.style.display = 'block'
}

// phuong thuc kiem tra du lieu dau vao
function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

function isPasswordFilled(password) {
    return password !== ''
}

function deleteValueInput() {
    inputEmail.value = ''
    inputPassword.value = ''
}

// phuong thuc kiem tra tai khoan va chuyen huong'
function isAccountValid(email, password) {
    return account[email] === password
}

function goToCreateAccount() {
    window.location.href = 'https://vietngia249.github.io/web-pages/web-pages/sign-up-page/'
}

// phuong thuc xu ly dang nhap
function loginAccount(event) {
    event.preventDefault()
    clearErrorMessages()

    const email = inputEmail.value.trim()
    const password = inputPassword.value

    if (!isEmailValid(email)) {
        showError(errorEmailInvalid)
        return false
    }

    if (!isPasswordFilled(password)) {
        showError(errorPasswordRequired)
        return false
    }

    if (!isAccountValid(email, password)) {
        showError(errorAccountInvalid)
        return false
    }

    deleteValueInput()
    alert('Login successfully')
}

function loginGoogle() {
    google.accounts.id.initialize({
        client_id: '103002721598-arqksrhkguvb5lhlo80rohig6000ao67.apps.googleusercontent.com', // Client ID đã tạo trên Google Cloud
        callback: (response) => {
            const data = parseJwt(response.credential);

            // Thêm tài khoản Google vào localStorage nếu chưa có
            if (!account[data.email]) {
                account[data.email] = 'google_login'; // Đánh dấu là tài khoản Google
                localStorage.setItem('account', JSON.stringify(account));
            }

            alert(`Đăng nhập Google thành công!\nTên: ${data.name}\nEmail: ${data.email}`);
        },
    });

    // Gọi popup đăng nhập
    google.accounts.id.prompt();
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

// Hàm giải mã ID token (JWT)
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
        atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')
    );
    return JSON.parse(jsonPayload);
}