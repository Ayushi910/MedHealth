document.addEventListener('DOMContentLoaded', function() {
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const sendOtpBtn = document.getElementById('sendOtp');
    const verifyOtpBtn = document.getElementById('verifyOtp');
    const resendLink = document.getElementById('resendLink');
    const countdownEl = document.getElementById('countdown');
    const messageEl = document.getElementById('message');
    const resetButton = document.getElementById('resetButton');
    const emailInput = document.getElementById('email');
    const otpInput = document.getElementById('otp');
    
    let countdown = 30;
    let timer;
    let generatedOtp = "";

    function goToStep(step) {
        // Hide all steps
        step1.classList.remove('active');
        step2.classList.remove('active');
        step3.classList.remove('active');
        
        // Show the requested step
        document.getElementById('step' + step).classList.add('active');
    }

    function generateOTP() {
        // Generate a random 6-digit OTP
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    function startCountdown() {
        countdown = 30;
        countdownEl.textContent = countdown;
        resendLink.classList.add('disabled');
        
        clearInterval(timer);
        timer = setInterval(() => {
            countdown--;
            countdownEl.textContent = countdown;
            
            if (countdown <= 0) {
                clearInterval(timer);
                resendLink.classList.remove('disabled');
            }
        }, 1000);
    }

    function showMessage(text, type) {
        messageEl.textContent = text;
        messageEl.className = 'message ' + type;
        messageEl.style.display = 'block';
        
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 3000);
    }

    // Send OTP button click handler
    sendOtpBtn.addEventListener('click', function() {
        const email = emailInput.value.trim();
        
        if (!email) {
            alert('Please enter your email address');
            return;
        }
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Generate OTP
        generatedOtp = generateOTP();
        console.log('Generated OTP:', generatedOtp); // For demonstration
        
        // In a real application, you would send this OTP to the user's email
        // For demo purposes, we'll just move to the next step
        
        startCountdown();
        goToStep(2);
    });

    // Resend OTP link click handler
    resendLink.addEventListener('click', function() {
        if (resendLink.classList.contains('disabled')) {
            return;
        }
        
        // Generate new OTP
        generatedOtp = generateOTP();
        console.log('Resent OTP:', generatedOtp); // For demonstration
        
        // In a real application, you would send this OTP to the user's email
        showMessage('New OTP has been sent to your email', 'success');
        
        // Reset countdown
        startCountdown();
    });

    // Verify OTP button click handler
    verifyOtpBtn.addEventListener('click', function() {
        const enteredOtp = otpInput.value.trim();
        
        if (!enteredOtp) {
            showMessage('Please enter the OTP', 'error');
            return;
        }
        
        // For demo, we'll check against the generated OTP
        // In a real application, you would validate this against what was stored server-side
        if (enteredOtp === generatedOtp) {
            showMessage('OTP verified successfully!', 'success');
            setTimeout(() => {
                goToStep(3);
            }, 1000);
        } else {
            showMessage('Invalid OTP. Please try again.', 'error');
        }
    });

    // Reset button click handler (for demo purposes)
    resetButton.addEventListener('click', function() {
        alert('This would take you to password reset form in a real application');
        // Reset all fields and go back to step 1
        emailInput.value = '';
        otpInput.value = '';
        messageEl.style.display = 'none';
        clearInterval(timer);
        goToStep(1);
    });
});