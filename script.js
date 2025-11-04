        // Base de datos simulada de usuarios (en producción esto estaría en un servidor)
        const validUsers = {
            'admin@maqsliders.com': 'admin123',
            'ventas@maqsliders.com': 'ventas2025',
            'demo@empresa.com': 'demo123'
        };

        // Funcionalidad del menú móvil
        const menuToggle = document.getElementById('menu-toggle');
        const navbar = document.getElementById('navbar');

        menuToggle.addEventListener('click', function() {
            navbar.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navbar.classList.remove('active');
                    menuToggle.querySelector('i').classList.add('fa-bars');
                    menuToggle.querySelector('i').classList.remove('fa-times');
                }
            });
        });

        // Modal de inicio de sesión
        const loginLink = document.getElementById('login-link');
        const loginModal = document.getElementById('login-modal');
        const closeModal = document.getElementById('close-modal');
        const loginForm = document.getElementById('login-form');
        const loginError = document.getElementById('login-error');
        const loginSuccess = document.getElementById('login-success');

        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'flex';
            loginError.style.display = 'none';
            loginSuccess.style.display = 'none';
        });

        closeModal.addEventListener('click', function() {
            loginModal.style.display = 'none';
            loginForm.reset();
            loginError.style.display = 'none';
            loginSuccess.style.display = 'none';
        });

        window.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                loginModal.style.display = 'none';
                loginForm.reset();
                loginError.style.display = 'none';
                loginSuccess.style.display = 'none';
            }
        });

        // Validación de inicio de sesión
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            loginError.style.display = 'none';
            loginSuccess.style.display = 'none';

            // Verificar credenciales
            if (validUsers[email] && validUsers[email] === password) {
                loginSuccess.style.display = 'block';
                loginError.style.display = 'none';
                
                setTimeout(() => {
                    loginModal.style.display = 'none';
                    loginForm.reset();
                    alert('¡Bienvenido! Has iniciado sesión correctamente.');
                    // Aquí podrías redirigir a un panel de administración
                    // window.location.href = '/admin-panel.html';
                }, 1500);
            } else {
                loginError.style.display = 'block';
                loginSuccess.style.display = 'none';
            }
        });

        // Validación de email en tiempo real
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        // Formulario de cotización
        const quoteForm = document.getElementById('quote-form');
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const submitButton = document.getElementById('submit-button');
        const successMessage = document.getElementById('success-message');

        // Validación de email en tiempo real
        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                emailError.style.display = 'block';
                this.style.borderColor = '#DC2626';
            } else {
                emailError.style.display = 'none';
                this.style.borderColor = '#E5E7EB';
            }
        });

        emailInput.addEventListener('input', function() {
            if (validateEmail(this.value)) {
                emailError.style.display = 'none';
                this.style.borderColor = '#22C55E';
            }
        });

        // Envío del formulario de cotización
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value;
            
            // Validar email antes de enviar
            if (!validateEmail(email)) {
                emailError.style.display = 'block';
                emailInput.style.borderColor = '#DC2626';
                emailInput.focus();
                return;
            }

            // Deshabilitar botón durante el envío
            submitButton.disabled = true;
            submitButton.textContent = 'Enviando...';

            // Recopilar datos del formulario
            const formData = {
                nombre: document.getElementById('name').value,
                email: email,
                telefono: document.getElementById('phone').value,
                producto: document.getElementById('product').value,
                cantidad: document.getElementById('quantity').value,
                mensaje: document.getElementById('message').value
            };

            // Simular envío (en producción, aquí harías una petición al servidor)
            setTimeout(() => {
                console.log('Datos de cotización:', formData);
                
                // Mostrar mensaje de éxito
                successMessage.style.display = 'block';
                quoteForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Enviar Cotización';

                // Ocultar mensaje después de 5 segundos
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);

                // En producción, aquí enviarías los datos al servidor:
                // fetch('/api/cotizacion', {
                //     method: 'POST',
                //     headers: { 'Content-Type': 'application/json' },
                //     body: JSON.stringify(formData)
                // });
            }, 1000);
        });

        // Navegación suave
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                if (this.getAttribute('href') !== '#') {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        // Parallax más estable
        window.addEventListener('scroll', function() {
        const hero = document.querySelector('.hero');
        const offset = window.pageYOffset * 0.2;
        hero.style.backgroundPositionY = `${offset}px`;
        });
