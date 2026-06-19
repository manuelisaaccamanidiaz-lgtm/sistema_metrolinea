/* Navegación lateral compartida - SITME Metrolínea */

const NAV_ITEMS = [
    { href: 'index.html', label: 'Inicio', icon: '🏠' },
    { href: 'billetera.html', label: 'Mi Billetera', icon: '💳' },
    { href: 'validador.html', label: 'Validador QR', icon: '🚍' },
    { href: 'puntos-recarga.html', label: 'Puntos de Recarga', icon: '📍' },
    { href: 'pqrsdf.html', label: 'PQRSDF', icon: '📝' }
];

function initSidebar() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    overlay.id = 'sidebar-overlay';
    overlay.setAttribute('aria-hidden', 'true');

    const sidebar = document.createElement('nav');
    sidebar.className = 'sidebar';
    sidebar.id = 'sidebar';
    sidebar.setAttribute('aria-label', 'Menú principal');

    const navLinks = NAV_ITEMS.map(item => {
        const isActive = item.href === currentPage;
        return `
            <a href="${item.href}" class="sidebar-link${isActive ? ' active' : ''}" ${isActive ? 'aria-current="page"' : ''}>
                <span class="sidebar-link-icon">${item.icon}</span>
                <span class="sidebar-link-text">${item.label}</span>
            </a>
        `;
    }).join('');

    sidebar.innerHTML = `
        <div class="sidebar-header">
            <div class="sidebar-brand">
                <span class="sidebar-logo">🚌</span>
                <div>
                    <strong>SITME</strong>
                    <small>Metrolínea</small>
                </div>
            </div>
            <button class="sidebar-close" id="sidebar-close" aria-label="Cerrar menú">&times;</button>
        </div>
        <div class="sidebar-links">
            ${navLinks}
        </div>
        <div class="sidebar-footer">
            <a href="https://www.metrolinea.gov.co" target="_blank" rel="noopener" class="sidebar-external">
                metrolinea.gov.co ↗
            </a>
        </div>
    `;

    document.body.prepend(overlay);
    document.body.prepend(sidebar);

    const hamburger = document.getElementById('menu-toggle');
    const closeBtn = document.getElementById('sidebar-close');

    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('open');
        document.body.classList.add('sidebar-open');
        hamburger?.setAttribute('aria-expanded', 'true');
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
        document.body.classList.remove('sidebar-open');
        hamburger?.setAttribute('aria-expanded', 'false');
    }

    hamburger?.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSidebar();
    });
}

document.addEventListener('DOMContentLoaded', initSidebar);
