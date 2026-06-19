/* SITME METROLÍNEA - JavaScript multi-página */

const AppState = {
    user: null,
    balance: 15000,
    language: 'es',
    qrActive: false,
    qrTimer: 10,
    accessibilitySettings: {
        fontSize: 'normal',
        highContrast: false,
        grayscale: false,
        negativeContrast: false,
        underlineLinks: false,
        readableFont: false
    }
};

const Translations = {
    es: {
        login: 'Iniciar sesión',
        hello: 'Hola',
        balance: 'Saldo',
        activateQR: 'Activar QR',
        searchRoute: 'Buscar Ruta',
        submit: 'Enviar',
        origin: 'Origen',
        destination: 'Destino'
    },
    en: {
        login: 'Log in',
        hello: 'Hello',
        balance: 'Balance',
        activateQR: 'Activate QR',
        searchRoute: 'Search Route',
        submit: 'Submit',
        origin: 'Origin',
        destination: 'Destination'
    }
};

const CAE_DATA = {
    provenza: {
        title: 'Provenza',
        address: 'Carrera 27 con Calle 36, Bucaramanga',
        schedule: 'Lun-Vie: 6:00 AM - 8:00 PM',
        services: 'Recarga de tarjeta, atención al usuario, trámites ABT',
        phone: '(607) 700 0000 ext. 101'
    },
    uis: {
        title: 'UIS',
        address: 'Campus UIS, Bloque 42, Bucaramanga',
        schedule: 'Lun-Sáb: 7:00 AM - 7:00 PM',
        services: 'Recarga, registro de estudiantes, validación de perfil',
        phone: '(607) 700 0000 ext. 102'
    },
    'portal-norte': {
        title: 'Portal Norte',
        address: 'Av. Américas, Portal Norte PTN',
        schedule: 'Lun-Dom: 5:00 AM - 10:00 PM',
        services: 'Recarga 24/7, atención prioritaria, integración con P8 y RD15',
        phone: '(607) 700 0000 ext. 103'
    }
};

function getCurrentPage() {
    return document.body.dataset.page || 'index';
}

document.addEventListener('DOMContentLoaded', () => {
    const page = getCurrentPage();

    initAccessibilityPanel();
    initLanguageSelector();
    loadUserData();

    if (page === 'index') {
        initAuthSystem();
        initRouteForm();
    }

    if (page === 'billetera') {
        initTransactionSelector();
        initBilleteraActions();
        updateWalletDisplay();
    }

    if (page === 'validador') {
        initQRValidator();
    }

    if (page === 'puntos-recarga') {
        initCAEModals();
    }

    if (page === 'pqrsdf') {
        initPQRSDFForm();
    }
});

function initAccessibilityPanel() {
    const toggleBtn = document.getElementById('accessibility-toggle');
    const content = document.getElementById('accessibility-content');
    if (!toggleBtn || !content) return;

    toggleBtn.addEventListener('click', () => content.classList.toggle('hidden'));

    const increaseBtn = document.getElementById('increase-font');
    const decreaseBtn = document.getElementById('decrease-font');
    if (increaseBtn) increaseBtn.addEventListener('click', increaseFontSize);
    if (decreaseBtn) decreaseBtn.addEventListener('click', decreaseFontSize);

    const highContrast = document.getElementById('high-contrast');
    const grayscale = document.getElementById('grayscale');
    const negativeContrast = document.getElementById('negative-contrast');
    if (highContrast) highContrast.addEventListener('click', () => toggleAccessibilityFeature('high-contrast', 'highContrast'));
    if (grayscale) grayscale.addEventListener('click', () => toggleAccessibilityFeature('grayscale', 'grayscale'));
    if (negativeContrast) negativeContrast.addEventListener('click', () => toggleAccessibilityFeature('negative-contrast', 'negativeContrast'));

    const underlineLinks = document.getElementById('underline-links');
    const readableFont = document.getElementById('readable-font');
    if (underlineLinks) {
        underlineLinks.addEventListener('change', (e) => {
            document.body.classList.toggle('underline-links', e.target.checked);
            AppState.accessibilitySettings.underlineLinks = e.target.checked;
        });
    }
    if (readableFont) {
        readableFont.addEventListener('change', (e) => {
            document.body.classList.toggle('readable-font', e.target.checked);
            AppState.accessibilitySettings.readableFont = e.target.checked;
        });
    }
}

function increaseFontSize() {
    const sizes = ['normal', 'large', 'xlarge'];
    const idx = sizes.indexOf(AppState.accessibilitySettings.fontSize);
    if (idx < sizes.length - 1) {
        AppState.accessibilitySettings.fontSize = sizes[idx + 1];
        updateFontSize(AppState.accessibilitySettings.fontSize);
    }
}

function decreaseFontSize() {
    const sizes = ['normal', 'large', 'xlarge'];
    const idx = sizes.indexOf(AppState.accessibilitySettings.fontSize);
    if (idx > 0) {
        AppState.accessibilitySettings.fontSize = sizes[idx - 1];
        updateFontSize(AppState.accessibilitySettings.fontSize);
    }
}

function updateFontSize(size) {
    document.body.classList.remove('font-size-large', 'font-size-xlarge', 'font-size-small');
    if (size !== 'normal') document.body.classList.add(`font-size-${size}`);
}

function toggleAccessibilityFeature(className, stateProp) {
    document.body.classList.toggle(className);
    AppState.accessibilitySettings[stateProp] = !AppState.accessibilitySettings[stateProp];
}

function initAuthSystem() {
    const loginBtn = document.getElementById('login-btn');
    const modal = document.getElementById('auth-modal');
    if (!loginBtn || !modal) return;

    const closeBtn = modal.querySelector('.modal-close');
    const authForm = modal.querySelector('.auth-form');

    loginBtn.addEventListener('click', () => modal.classList.remove('hidden'));
    closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });
    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleLogin();
    });
}

function handleLogin() {
    const idNumber = document.getElementById('id-number').value;
    const password = document.getElementById('password').value;
    const enable2FA = document.getElementById('enable-2fa').checked;

    if (!validatePassword(password)) {
        alert('⚠️ La contraseña debe tener al menos 8 caracteres, incluir mayúsculas, minúsculas y números');
        return;
    }

    AppState.user = {
        id: idNumber,
        name: 'Usuario Demo',
        profileType: 'regular',
        has2FA: enable2FA
    };

    updateUserInterface();
    document.getElementById('auth-modal').classList.add('hidden');
    saveUserData();
}

function validatePassword(password) {
    return password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password);
}

function updateUserInterface() {
    if (!AppState.user) return;

    const loginBtn = document.getElementById('login-btn');
    const userInfo = document.getElementById('user-info');
    if (loginBtn) loginBtn.classList.add('hidden');
    if (userInfo) userInfo.classList.remove('hidden');

    const username = document.getElementById('username');
    const balance = document.getElementById('balance');
    if (username) username.textContent = AppState.user.name;
    if (balance) balance.textContent = AppState.balance.toLocaleString('es-CO');

    updateWalletDisplay();
}

function updateWalletDisplay() {
    const mainBalance = document.getElementById('main-balance');
    const pocketBalance = document.getElementById('pocket-balance');
    const formatted = AppState.balance.toLocaleString('es-CO');

    if (mainBalance) mainBalance.textContent = formatted;
    if (pocketBalance) pocketBalance.textContent = formatted;

    updateProfileBadge();
}

function updateProfileBadge() {
    const profileType = document.getElementById('profile-type');
    const fareAmount = document.getElementById('fare-amount');
    if (!profileType || !fareAmount) return;

    const profileData = AppState.user?.profileType || 'regular';
    const profiles = {
        regular: { icon: '👤', name: 'Usuario Regular', fare: 3000 },
        student: { icon: '🎓', name: 'Estudiante', fare: 1500 },
        senior: { icon: '👴', name: 'Adulto Mayor', fare: 1500 },
        athlete: { icon: '🏃', name: 'Deportista', fare: 1500 }
    };

    const profile = profiles[profileData];
    profileType.innerHTML = `${profile.icon} ${profile.name}`;
    fareAmount.textContent = `Tarifa: $${profile.fare.toLocaleString('es-CO')}`;
}

function initQRValidator() {
    const activateBtn = document.getElementById('activate-qr');
    if (!activateBtn) return;

    activateBtn.addEventListener('click', () => {
        if (!AppState.qrActive) activateQRCode();
        else deactivateQRCode();
    });
}

function activateQRCode() {
    const qrContainer = document.getElementById('qr-container');
    const activateBtn = document.getElementById('activate-qr');
    const minFare = 1500;

    if (AppState.balance < minFare) {
        alert('⚠️ Saldo insuficiente. Por favor recarga tu cuenta en Mi Billetera.');
        return;
    }

    qrContainer.classList.remove('hidden');
    activateBtn.querySelector('.btn-text').textContent = 'Desactivar QR';
    AppState.qrActive = true;
    startQRTimer();
}

function deactivateQRCode() {
    const qrContainer = document.getElementById('qr-container');
    const activateBtn = document.getElementById('activate-qr');

    qrContainer.classList.add('hidden');
    activateBtn.querySelector('.btn-text').textContent = 'Activar QR';
    AppState.qrActive = false;

    if (AppState.qrTimerInterval) clearInterval(AppState.qrTimerInterval);
}

function startQRTimer() {
    AppState.qrTimer = 10;
    updateQRCountdown();

    AppState.qrTimerInterval = setInterval(() => {
        AppState.qrTimer--;
        updateQRCountdown();
        if (AppState.qrTimer <= 0) AppState.qrTimer = 10;
    }, 1000);
}

function updateQRCountdown() {
    const countdown = document.getElementById('qr-countdown');
    if (countdown) countdown.textContent = AppState.qrTimer;
}

function initLanguageSelector() {
    const languageSelect = document.getElementById('language');
    if (!languageSelect) return;

    languageSelect.addEventListener('change', (e) => {
        AppState.language = e.target.value;
        updateLanguage();
    });
}

function updateLanguage() {
    const lang = Translations[AppState.language];
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn && !loginBtn.classList.contains('hidden')) {
        loginBtn.textContent = lang.login;
    }
}

function initRouteForm() {
    const routeForm = document.querySelector('.route-form');
    if (!routeForm) return;

    routeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const origin = document.getElementById('origin').value;
        const destination = document.getElementById('destination').value;

        if (!origin || !destination) {
            alert('⚠️ Por favor ingresa origen y destino');
            return;
        }

        const routes = [
            { name: 'P8', time: 25, type: 'Padrón' },
            { name: 'RD15', time: 18, type: 'Ruta Directa' },
            { name: 'A1', time: 22, type: 'Articulado' }
        ];
        alert(`✅ Rutas encontradas:\n${routes.map(r => `${r.name} (${r.type}): ${r.time} min`).join('\n')}`);
    });
}

function initPQRSDFForm() {
    const pqrsdfForm = document.querySelector('.pqrsdf-form');
    if (!pqrsdfForm) return;

    pqrsdfForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const incidentType = document.getElementById('incident-type').value;
        const description = document.getElementById('description').value;

        if (!incidentType || !description) {
            alert('⚠️ Por favor completa todos los campos requeridos');
            return;
        }

        alert('✅ Tu reporte ha sido enviado exitosamente. Recibirás una respuesta en 24-48 horas.');
        pqrsdfForm.reset();
    });
}

function initTransactionSelector() {
    const tabs = document.querySelectorAll('.transaction-tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            document.querySelectorAll('.transaction-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            document.getElementById(`panel-${target}`)?.classList.add('active');
        });
    });

    const hash = window.location.hash.replace('#', '');
    if (hash) {
        const targetTab = document.querySelector(`.transaction-tab[data-tab="${hash}"]`);
        if (targetTab) targetTab.click();
    }
}

function initBilleteraActions() {
    const rechargeBtn = document.getElementById('btn-recharge');
    const transferBtn = document.getElementById('btn-transfer');
    const pocketsBtn = document.getElementById('btn-pockets');

    if (rechargeBtn) rechargeBtn.addEventListener('click', handleRecharge);
    if (transferBtn) transferBtn.addEventListener('click', handleTransfer);
    if (pocketsBtn) pocketsBtn.addEventListener('click', managePockets);
}

function handleRecharge() {
    const amount = prompt('Ingresa el monto a recargar (COP):', '10000');
    if (amount && !isNaN(amount)) {
        const numAmount = parseInt(amount);
        AppState.balance += numAmount;
        updateWalletDisplay();
        saveUserData();
        alert(`✅ Recarga exitosa: $${numAmount.toLocaleString('es-CO')} COP`);
    }
}

function handleTransfer() {
    if (!AppState.user) {
        alert('⚠️ Debes iniciar sesión para realizar transferencias. Ve a Inicio para iniciar sesión.');
        return;
    }

    const recipientId = prompt('Ingresa la cédula del destinatario:');
    const amount = prompt('Ingresa el monto a transferir (COP):', '5000');

    if (recipientId && amount && !isNaN(amount)) {
        const numAmount = parseInt(amount);
        if (numAmount > AppState.balance) {
            alert('⚠️ Saldo insuficiente');
            return;
        }
        AppState.balance -= numAmount;
        updateWalletDisplay();
        saveUserData();
        alert(`✅ Transferencia exitosa: $${numAmount.toLocaleString('es-CO')} COP a cédula ${recipientId}`);
    }
}

function managePockets() {
    alert('🗂️ Gestión de Bolsillos\n\nBolsillo Principal: $' + AppState.balance.toLocaleString('es-CO') + '\n\nPróximamente: Bolsillos personalizados para organizar tu dinero.');
}

function initCAEModals() {
    const items = document.querySelectorAll('.cae-list-item');
    const modal = document.getElementById('cae-modal');
    const closeBtn = document.getElementById('cae-modal-close');
    const modalTitle = document.getElementById('cae-modal-title');
    const modalBody = document.getElementById('cae-modal-body');

    if (!items.length || !modal) return;

    function openCAEModal(caeId) {
        const data = CAE_DATA[caeId];
        if (!data) return;

        modalTitle.textContent = data.title;
        modalBody.innerHTML = `
            <div class="info-row">
                <span class="info-icon">📍</span>
                <div><strong>Dirección</strong><br>${data.address}</div>
            </div>
            <div class="info-row">
                <span class="info-icon">🕐</span>
                <div><strong>Horario</strong><br>${data.schedule}</div>
            </div>
            <div class="info-row">
                <span class="info-icon">🛎️</span>
                <div><strong>Servicios</strong><br>${data.services}</div>
            </div>
            <div class="info-row">
                <span class="info-icon">📞</span>
                <div><strong>Teléfono</strong><br>${data.phone}</div>
            </div>
        `;
        modal.classList.remove('hidden');
    }

    function closeCAEModal() {
        modal.classList.add('hidden');
    }

    items.forEach(item => {
        item.addEventListener('click', () => openCAEModal(item.dataset.cae));
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openCAEModal(item.dataset.cae);
            }
        });
    });

    closeBtn.addEventListener('click', closeCAEModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeCAEModal();
    });
}

function saveUserData() {
    if (AppState.user) {
        localStorage.setItem('sitme_user', JSON.stringify(AppState.user));
    }
    localStorage.setItem('sitme_balance', AppState.balance.toString());
}

function loadUserData() {
    const savedUser = localStorage.getItem('sitme_user');
    const savedBalance = localStorage.getItem('sitme_balance');

    if (savedUser) AppState.user = JSON.parse(savedUser);
    if (savedBalance) AppState.balance = parseInt(savedBalance) || 15000;

    updateUserInterface();
    updateWalletDisplay();
}
