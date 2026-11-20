/* =========================================
   src/js/app.js
   ส่วนจัดการ Logic และการทำงานของหน้าเว็บ
========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('enterpriseLogin');
    
    // หากไม่ได้อยู่ในหน้า Login ให้ข้ามการทำงานไป
    if (!loginForm) return;

    const emailField = document.getElementById('userEmail');
    const passField = document.getElementById('userPassword');
    const toggleBtn = document.getElementById('togglePassBtn');
    const eyeIcon = document.getElementById('eyeIcon');
    const submitBtn = document.getElementById('loginBtn');
    const btnLabel = document.getElementById('btnLabel');
    const btnLoading = document.getElementById('btnLoading');
    
    const statusMsg = document.getElementById('statusMessage');
    const statusIcon = document.getElementById('statusIcon');
    const statusText = document.getElementById('statusText');

    // 1. ระบบแสดง/ซ่อนรหัสผ่าน
    toggleBtn.addEventListener('click', () => {
        const isPassword = passField.type === 'password';
        passField.type = isPassword ? 'text' : 'password';
        
        if (isPassword) {
            eyeIcon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            eyeIcon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    });

    // 2. จัดการการส่งฟอร์ม (Form Submission)
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // ตรวจสอบข้อมูลเบื้องต้น
        if (!emailField.value || !passField.value) {
            showStatus('error', 'กรุณากรอกข้อมูลให้ครบถ้วน');
            return;
        }

        // เริ่มกระบวนการ Loading
        setStatus(true);

        // จำลองการเชื่อมต่อ API / Firebase Auth (หน่วงเวลา 1.5 วินาที)
        setTimeout(() => {
            // Logic จำลองการตรวจสอบ
            if (emailField.value.includes('@') && passField.value.length >= 6) {
                showStatus('success', 'เข้าสู่ระบบสำเร็จ กำลังพาไปยังหน้าหลัก...');
                submitBtn.classList.replace('bg-enterprise-600', 'bg-green-600');
                submitBtn.classList.replace('hover:bg-enterprise-700', 'hover:bg-green-700');
                
                // TODO: สำหรับเชื่อมต่อ Firebase Auth จริง
                // window.location.href = 'dashboard.html';
            } else {
                setStatus(false);
                showStatus('error', 'อีเมลหรือรหัสผ่านไม่ถูกต้อง (รหัสต้องยาว 6 ตัวขึ้นไป)');
            }
        }, 1500);
    });

    // ซ่อนข้อความแจ้งเตือนเมื่อเริ่มพิมพ์ใหม่
    emailField.addEventListener('input', () => statusMsg.classList.add('hidden'));
    passField.addEventListener('input', () => statusMsg.classList.add('hidden'));

    // ฟังก์ชันช่วยเหลือ (Helpers)
    function setStatus(isLoading) {
        if (isLoading) {
            submitBtn.disabled = true;
            btnLabel.textContent = 'กำลังตรวจสอบ...';
            btnLoading.style.display = 'block';
            statusMsg.classList.add('hidden');
        } else {
            submitBtn.disabled = false;
            btnLabel.textContent = 'เข้าสู่ระบบ (Sign In)';
            btnLoading.style.display = 'none';
        }
    }

    function showStatus(type, message) {
        statusMsg.classList.remove('hidden', 'bg-red-50', 'text-red-700', 'bg-green-50', 'text-green-700');
        statusIcon.classList.remove('fa-circle-exclamation', 'fa-circle-check');

        if (type === 'error') {
            statusMsg.classList.add('bg-red-50', 'text-red-700', 'border', 'border-red-100');
            statusIcon.classList.add('fa-circle-exclamation');
        } else if (type === 'success') {
            statusMsg.classList.add('bg-green-50', 'text-green-700', 'border', 'border-green-100');
            statusIcon.classList.add('fa-circle-check');
        }
        
        statusText.textContent = message;
    }
});