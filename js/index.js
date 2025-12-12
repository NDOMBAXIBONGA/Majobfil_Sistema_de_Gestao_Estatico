// Gerenciamento da sidebar responsiva
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');
        const sidebarToggle = document.getElementById('sidebarToggle');
        const overlay = document.getElementById('overlay');
        
        // Estado da sidebar
        let isSidebarCollapsed = false;
        let isMobile = window.innerWidth <= 992;
        
        // Função para alternar sidebar
        function toggleSidebar() {
            if (isMobile) {
                // Em mobile, mostra/esconde a sidebar
                sidebar.classList.toggle('active');
                overlay.classList.toggle('active');
                document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
            } else {
                // Em desktop, colapsa/expande a sidebar
                isSidebarCollapsed = !isSidebarCollapsed;
                sidebar.classList.toggle('sidebar-collapsed');
                mainContent.classList.toggle('main-content-expanded');
                
                // Salvar preferência no localStorage
                localStorage.setItem('sidebarCollapsed', isSidebarCollapsed);
            }
        }
        
        // Fechar sidebar no mobile ao clicar no overlay
        function closeSidebar() {
            if (isMobile) {
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        // Event listeners
        sidebarToggle.addEventListener('click', toggleSidebar);
        overlay.addEventListener('click', closeSidebar);
        
        // Fechar sidebar ao clicar em um link (em mobile)
        document.querySelectorAll('.sidebar .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (isMobile) {
                    closeSidebar();
                }
            });
        });
        
        // Ajustar ao redimensionar a janela
        window.addEventListener('resize', () => {
            const wasMobile = isMobile;
            isMobile = window.innerWidth <= 992;
            
            if (wasMobile !== isMobile) {
                // Se mudou de mobile para desktop ou vice-versa, resetar estado
                if (isMobile) {
                    sidebar.classList.remove('sidebar-collapsed');
                    mainContent.classList.remove('main-content-expanded');
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                } else {
                    // Restaurar estado colapsado se estava salvo
                    const savedState = localStorage.getItem('sidebarCollapsed') === 'true';
                    if (savedState) {
                        sidebar.classList.add('sidebar-collapsed');
                        mainContent.classList.add('main-content-expanded');
                    }
                }
            }
        });
        
        // Restaurar estado da sidebar no desktop
        window.addEventListener('DOMContentLoaded', () => {
            if (!isMobile) {
                const savedState = localStorage.getItem('sidebarCollapsed') === 'true';
                if (savedState) {
                    sidebar.classList.add('sidebar-collapsed');
                    mainContent.classList.add('main-content-expanded');
                    isSidebarCollapsed = true;
                }
            }
        });
        
        // Suporte para teclado nos dropdowns
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeSidebar();
                const modals = document.querySelectorAll('.modal.show');
                modals.forEach(modal => {
                    const bsModal = bootstrap.Modal.getInstance(modal);
                    if (bsModal) bsModal.hide();
                });
            }
        });