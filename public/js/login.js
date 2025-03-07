const passwordInput = document.getElementById('password');
const strengthMeter = document.querySelector('.strength-meter');

passwordInput.addEventListener('input', function() {
    const password = this.value;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (hasUpperCase && hasLowerCase) strength++;
    if (hasNumbers) strength++;
    if (hasSpecialChar) strength++;

    strengthMeter.style.width = `${strength * 25}%`;
    strengthMeter.style.background = 
        strength <= 1 ? 'var(--error)' :
        strength === 2 ? '#ff00aa' :
        strength === 3 ? '#7000ff' : 'var(--success)';
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const button = this.querySelector('.btn-signin');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<div class="loading"></div>';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = '<span class="success-icon">✓</span>';
        button.style.background = 'var(--success)';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            button.style.background = '';
        }, 1500);
    }, 2000);
});