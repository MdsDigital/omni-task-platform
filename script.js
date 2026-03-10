// ============================================
// OMNİ-TASK PLATFORM - SCRIPT.JS
// الإصدار: 3.0.0
// التاريخ: 2024
// وصف: الملف البرمجي المتكامل للمنصة
// ============================================

// ===== STATE MANAGEMENT =====
const AppState = {
    // المستخدم
    user: null,
    isAuthenticated: false,
    
    // السلة
    cart: [],
    total: 0,
    
    // الإحصائيات
    stats: {
        projects: 1523,
        clients: 892,
        experts: 56,
        countries: 23
    },
    
    // الخدمات
    services: [
        {
            id: 1,
            name: 'الترجمة الاحترافية',
            description: 'ترجمة بشرية دقيقة للمستندات والمواقع مع مراجعة لغوية',
            price: 50,
            icon: 'fas fa-language',
            category: 'ترجمة',
            deliveryTime: '3 أيام',
            rating: 4.9,
            reviews: 245,
            features: ['ترجمة بشرية', 'مراجعة دقيقة', 'تسليم سريع']
        },
        {
            id: 2,
            name: 'تطوير الويب',
            description: 'بناء مواقع وتطبيقات متجاوبة بأحدث التقنيات',
            price: 499,
            icon: 'fas fa-code',
            category: 'برمجة',
            deliveryTime: '14 يوم',
            rating: 4.8,
            reviews: 178,
            features: ['Responsive Design', 'SEO Friendly', 'أداء عالي']
        },
        {
            id: 3,
            name: 'تصميم جرافيك',
            description: 'تصاميم إبداعية للشعارات والهويات التجارية',
            price: 150,
            icon: 'fas fa-paint-brush',
            category: 'تصميم',
            deliveryTime: '5 أيام',
            rating: 4.9,
            reviews: 312,
            features: ['تصاميم أصلية', 'تعديلات غير محدودة', 'تسليم سريع']
        },
        {
            id: 4,
            name: 'التسويق الرقمي',
            description: 'إدارة حملات اعلانية وتحسين ظهور في محركات البحث',
            price: 299,
            icon: 'fas fa-chart-line',
            category: 'تسويق',
            deliveryTime: '7 أيام',
            rating: 4.7,
            reviews: 98,
            features: ['SEO', 'إعلانات ممولة', 'تحليلات متقدمة']
        },
        {
            id: 5,
            name: 'كتابة محتوى',
            description: 'مقالات ونصوص تسويقية متوافقة مع SEO',
            price: 30,
            icon: 'fas fa-pen-fancy',
            category: 'تسويق',
            deliveryTime: 'يومان',
            rating: 4.8,
            reviews: 156,
            features: ['SEO Ready', 'أسلوب احترافي', 'بحث معمق']
        },
        {
            id: 6,
            name: 'الدعم الفني',
            description: 'باقات دعم واستضافة مع تحديثات دورية',
            price: 99,
            icon: 'fas fa-headset',
            category: 'دعم',
            deliveryTime: 'فوري',
            rating: 4.6,
            reviews: 67,
            features: ['دعم 24/7', 'نسخ احتياطي', 'حماية متقدمة']
        }
    ],
    
    // معرض الأعمال
    portfolio: [
        {
            id: 1,
            title: 'موقع شركة التعاون',
            category: 'تطوير ويب',
            icon: 'fas fa-building',
            client: 'شركة التعاون القابضة',
            date: '2024-01-15'
        },
        {
            id: 2,
            title: 'تطبيق صحتي',
            category: 'تطوير تطبيقات',
            icon: 'fas fa-heartbeat',
            client: 'وزارة الصحة',
            date: '2023-12-10'
        },
        {
            id: 3,
            title: 'هوية العلامة التجارية',
            category: 'تصميم جرافيك',
            icon: 'fas fa-palette',
            client: 'مطاعم الذواق',
            date: '2024-02-01'
        },
        {
            id: 4,
            title: 'ترجمة موقع سياحي',
            category: 'ترجمة',
            icon: 'fas fa-globe-asia',
            client: 'الهيئة السياحية',
            date: '2024-01-20'
        },
        {
            id: 5,
            title: 'حملة تسويقية',
            category: 'تسويق رقمي',
            icon: 'fas fa-ad',
            client: 'شركة التقنية',
            date: '2024-02-10'
        }
    ],
    
    // التقييمات
    reviews: [
        {
            id: 1,
            name: 'أحمد محمد',
            rating: 5,
            comment: 'خدمة ممتازة وفريق محترف، أنصح بالتعامل معهم',
            date: '2024-02-10',
            service: 'تطوير ويب',
            avatar: 'fas fa-user-circle'
        },
        {
            id: 2,
            name: 'سارة عبدالله',
            rating: 5,
            comment: 'ترجمة دقيقة وسريعة، سعيدة جداً بالنتيجة',
            date: '2024-02-08',
            service: 'ترجمة',
            avatar: 'fas fa-user-circle'
        },
        {
            id: 3,
            name: 'فيصل العتيبي',
            rating: 4,
            comment: 'تصميم رائع والتسليم في الوقت المحدد',
            date: '2024-02-05',
            service: 'تصميم جرافيك',
            avatar: 'fas fa-user-circle'
        }
    ],
    
    // أكواد الخصم
    discountCodes: {
        'WELCOME10': { discount: 10, type: 'percentage', used: false },
        'SAVE20': { discount: 20, type: 'percentage', used: false },
        'FIRST50': { discount: 50, type: 'fixed', used: false }
    }
};

// ===== DOM ELEMENTS =====
const DOM = {
    loader: document.querySelector('.loader-wrapper'),
    sections: document.querySelectorAll('.section'),
    navLinks: document.querySelectorAll('.nav-link'),
    menuToggle: document.getElementById('menuToggle'),
    mainNav: document.getElementById('mainNav'),
    cartNum: document.getElementById('cartNum'),
    userBtn: document.getElementById('userBtn'),
    servicesGrid: document.getElementById('servicesGrid'),
    portfolioGrid: document.getElementById('portfolioGrid'),
    cartList: document.getElementById('cartList'),
    cartSummary: document.getElementById('cartSummary'),
    totalPrice: document.getElementById('totalPrice'),
    orderItems: document.getElementById('orderItems'),
    orderTotal: document.getElementById('orderTotal'),
    sigPad: document.getElementById('sigPad'),
    toastContainer: document.getElementById('toastContainer'),
    filterBtns: document.querySelectorAll('.filter-btn')
};

// ===== UTILITY FUNCTIONS =====
const Utils = {
    // تنسيق السعر
    formatPrice(price) {
        return `$${price.toFixed(2)}`;
    },
    
    // تنسيق التاريخ
    formatDate(date) {
        return new Date(date).toLocaleDateString('ar-EG', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // إنشاء ID فريد
    generateId() {
        return Date.now() + Math.random().toString(36).substr(2, 9);
    },
    
    // تأخير التنفيذ
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // حفظ في localStorage
    saveToStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },
    
    // تحميل من localStorage
    loadFromStorage(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    },
    
    // تشغيل صوت
    playSound(type) {
        // يمكن إضافة أصوات حقيقية لاحقاً
        console.log(`🔊 Sound: ${type}`);
    }
};

// ===== LOADER MANAGER =====
const LoaderManager = {
    init() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (DOM.loader) {
                    DOM.loader.classList.add('hidden');
                }
            }, 1500);
        });
    }
};

// ===== UI MANAGER =====
const UIManager = {
    // إظهار قسم
    showSection(sectionId) {
        // إخفاء جميع الأقسام
        DOM.sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // إظهار القسم المطلوب
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // تحديث الروابط النشطة
            this.updateActiveNav(sectionId);
            
            // تهيئة canvas إذا كان قسم العقد
            if (sectionId === 'contract') {
                setTimeout(() => CanvasManager.init(), 100);
            }
            
            // تحديث المحتوى حسب القسم
            this.updateSectionContent(sectionId);
            
            // تمرير للأعلى
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // تحديث URL
            history.pushState({ section: sectionId }, '', `#${sectionId}`);
            
            // تشغيل صوت
            Utils.playSound('navigation');
        }
    },
    
    // تحديث الرابط النشط
    updateActiveNav(sectionId) {
        DOM.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            }
        });
    },
    
    // تحديث محتوى القسم
    updateSectionContent(sectionId) {
        switch(sectionId) {
            case 'home':
                this.startStatsAnimation();
                break;
            case 'services':
                ServicesManager.renderServices();
                break;
            case 'portfolio':
                PortfolioManager.renderPortfolio();
                break;
            case 'cart':
                CartManager.updateCartUI();
                break;
        }
    },
    
    // تحريك الإحصائيات
    startStatsAnimation() {
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');
        statNumbers.forEach(stat => {
            const target = parseInt(stat.dataset.target);
            this.animateNumber(stat, 0, target, 2000);
        });
    },
    
    // تحريك الرقم
    animateNumber(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    },
    
    // إظهار رسالة toast
    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas ${this.getToastIcon(type)}"></i>
            <span>${message}</span>
        `;
        
        DOM.toastContainer.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, duration);
    },
    
    getToastIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    },
    
    // إظهار نافذة منبثقة
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('show');
        }
    },
    
    // إخفاء نافذة منبثقة
    hideModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('show');
        }
    }
};

// ===== SERVICES MANAGER =====
const ServicesManager = {
    currentFilter: 'all',
    
    renderServices() {
        if (!DOM.servicesGrid) return;
        
        const filteredServices = this.filterServices();
        
        DOM.servicesGrid.innerHTML = filteredServices.map(service => `
            <div class="service-card" data-id="${service.id}">
                <div class="service-icon">
                    <i class="${service.icon}"></i>
                </div>
                <h3 class="service-title">${service.name}</h3>
                <div class="service-category">${service.category}</div>
                <p class="service-description">${service.description}</p>
                
                <div class="service-features">
                    ${service.features.map(f => `
                        <span class="feature-tag">${f}</span>
                    `).join('')}
                </div>
                
                <div class="service-meta">
                    <span class="service-rating">
                        <i class="fas fa-star"></i> ${service.rating}
                    </span>
                    <span class="service-reviews">(${service.reviews} تقييم)</span>
                </div>
                
                <div class="service-delivery">
                    <i class="fas fa-clock"></i>
                    <span>تسليم خلال ${service.deliveryTime}</span>
                </div>
                
                <div class="service-price">${Utils.formatPrice(service.price)}</div>
                
                <button class="btn btn-primary add-to-cart" onclick="ServicesManager.addToCart(${service.id})">
                    <i class="fas fa-shopping-cart"></i>
                    إضافة للسلة
                </button>
            </div>
        `).join('');
    },
    
    filterServices() {
        if (this.currentFilter === 'all') {
            return AppState.services;
        }
        return AppState.services.filter(s => s.category === this.currentFilter);
    },
    
    setFilter(filter) {
        this.currentFilter = filter;
        this.renderServices();
    },
    
    addToCart(serviceId) {
        const service = AppState.services.find(s => s.id === serviceId);
        if (service) {
            CartManager.addToCart(service);
        }
    },
    
    searchServices(query) {
        if (!query) {
            this.renderServices();
            return;
        }
        
        const results = AppState.services.filter(service => 
            service.name.includes(query) ||
            service.description.includes(query) ||
            service.category.includes(query)
        );
        
        this.renderFilteredResults(results);
    },
    
    renderFilteredResults(results) {
        if (!DOM.servicesGrid) return;
        
        DOM.servicesGrid.innerHTML = results.map(service => `
            <div class="service-card" data-id="${service.id}">
                <div class="service-icon">
                    <i class="${service.icon}"></i>
                </div>
                <h3 class="service-title">${service.name}</h3>
                <div class="service-category">${service.category}</div>
                <p class="service-description">${service.description}</p>
                <div class="service-price">${Utils.formatPrice(service.price)}</div>
                <button class="btn btn-primary add-to-cart" onclick="ServicesManager.addToCart(${service.id})">
                    <i class="fas fa-shopping-cart"></i>
                    إضافة للسلة
                </button>
            </div>
        `).join('');
    }
};

// ===== CART MANAGER =====
const CartManager = {
    addToCart(service) {
        // التحقق من وجود الخدمة في السلة
        const existingItem = AppState.cart.find(item => item.id === service.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.total = existingItem.price * existingItem.quantity;
        } else {
            AppState.cart.push({
                id: service.id,
                name: service.name,
                price: service.price,
                icon: service.icon,
                quantity: 1,
                total: service.price
            });
        }
        
        this.updateTotal();
        this.updateCartUI();
        
        UIManager.showToast(`تم إضافة "${service.name}" إلى السلة`, 'success');
        Utils.playSound('add-to-cart');
        
        this.saveCart();
    },
    
    removeFromCart(index) {
        const removed = AppState.cart.splice(index, 1)[0];
        this.updateTotal();
        this.updateCartUI();
        UIManager.showToast(`تم إزالة "${removed.name}" من السلة`, 'info');
        this.saveCart();
    },
    
    updateQuantity(index, newQuantity) {
        if (newQuantity < 1) {
            this.removeFromCart(index);
            return;
        }
        
        AppState.cart[index].quantity = newQuantity;
        AppState.cart[index].total = AppState.cart[index].price * newQuantity;
        this.updateTotal();
        this.updateCartUI();
        this.saveCart();
    },
    
    updateTotal() {
        AppState.total = AppState.cart.reduce((sum, item) => sum + item.total, 0);
    },
    
    updateCartUI() {
        // تحديث عداد السلة
        const itemCount = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
        DOM.cartNum.textContent = itemCount;
        
        // تحديث قائمة السلة
        if (AppState.cart.length > 0) {
            DOM.cartList.innerHTML = AppState.cart.map((item, index) => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <i class="${item.icon}" style="color: var(--primary); font-size: 1.2rem;"></i>
                            <span class="cart-item-title">${item.name}</span>
                        </div>
                        <div class="cart-item-controls">
                            <button class="quantity-btn" onclick="CartManager.updateQuantity(${index}, ${item.quantity - 1})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity">${item.quantity}</span>
                            <button class="quantity-btn" onclick="CartManager.updateQuantity(${index}, ${item.quantity + 1})">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                    <div class="cart-item-price">
                        <span>${Utils.formatPrice(item.total)}</span>
                        <button class="remove-btn" onclick="CartManager.removeFromCart(${index})">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `).join('');
            
            DOM.cartSummary.classList.remove('hidden');
            DOM.totalPrice.textContent = Utils.formatPrice(AppState.total);
        } else {
            DOM.cartList.innerHTML = '<p class="empty-cart">السلة فارغة حالياً</p>';
            DOM.cartSummary.classList.add('hidden');
        }
        
        // تحديث ملخص الطلب في صفحة الدفع
        this.updateOrderSummary();
    },
    
    updateOrderSummary() {
        if (DOM.orderItems) {
            DOM.orderItems.innerHTML = AppState.cart.map(item => `
                <div class="order-item">
                    <span>${item.name} x${item.quantity}</span>
                    <span>${Utils.formatPrice(item.total)}</span>
                </div>
            `).join('');
        }
        
        if (DOM.orderTotal) {
            DOM.orderTotal.textContent = Utils.formatPrice(AppState.total);
        }
    },
    
    clearCart() {
        AppState.cart = [];
        AppState.total = 0;
        this.updateCartUI();
        this.saveCart();
        UIManager.showToast('تم تفريغ السلة', 'info');
    },
    
    saveCart() {
        Utils.saveToStorage('omniTaskCart', {
            cart: AppState.cart,
            total: AppState.total
        });
    },
    
    loadCart() {
        const saved = Utils.loadFromStorage('omniTaskCart');
        if (saved) {
            AppState.cart = saved.cart || [];
            AppState.total = saved.total || 0;
            this.updateCartUI();
        }
    }
};

// ===== PORTFOLIO MANAGER =====
const PortfolioManager = {
    renderPortfolio() {
        if (!DOM.portfolioGrid) return;
        
        DOM.portfolioGrid.innerHTML = AppState.portfolio.map(item => `
            <div class="portfolio-card">
                <div class="portfolio-icon">
                    <i class="${item.icon}"></i>
                </div>
                <h4>${item.title}</h4>
                <p>${item.category}</p>
                <small>${item.client}</small>
                <small style="display: block; margin-top: 5px; color: var(--primary);">
                    ${Utils.formatDate(item.date)}
                </small>
            </div>
        `).join('');
    }
};

// ===== CANVAS MANAGER =====
const CanvasManager = {
    ctx: null,
    canvas: null,
    isDrawing: false,
    
    init() {
        if (!DOM.sigPad) return;
        
        this.canvas = DOM.sigPad;
        this.ctx = this.canvas.getContext('2d');
        
        this.setupCanvas();
        this.addEventListeners();
        this.restoreSignature();
    },
    
    setupCanvas() {
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = 200 * dpr;
        this.canvas.style.width = '100%';
        this.canvas.style.height = '200px';
        
        this.ctx.scale(dpr, dpr);
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.strokeStyle = '#7C3AED';
    },
    
    addEventListeners() {
        // Mouse events
        this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
        this.canvas.addEventListener('mousemove', this.draw.bind(this));
        this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
        this.canvas.addEventListener('mouseleave', this.stopDrawing.bind(this));
        
        // Touch events
        this.canvas.addEventListener('touchstart', this.handleTouch.bind(this));
        this.canvas.addEventListener('touchmove', this.handleTouch.bind(this));
        this.canvas.addEventListener('touchend', this.stopDrawing.bind(this));
        
        // Prevent scrolling
        this.canvas.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
        this.canvas.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
    },
    
    startDrawing(e) {
        e.preventDefault();
        this.isDrawing = true;
        this.ctx.beginPath();
    },
    
    draw(e) {
        if (!this.isDrawing) return;
        e.preventDefault();
        
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
        const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;
        
        if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;
        
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
    },
    
    stopDrawing() {
        if (this.isDrawing) {
            this.isDrawing = false;
            this.ctx.beginPath();
            this.saveSignature();
        }
    },
    
    handleTouch(e) {
        e.preventDefault();
        if (e.type === 'touchstart') {
            this.startDrawing(e);
        } else if (e.type === 'touchmove') {
            this.draw(e);
        }
    },
    
    clear() {
        if (!this.ctx || !this.canvas) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        sessionStorage.removeItem('omniTaskSignature');
        UIManager.showToast('تم مسح التوقيع', 'info');
    },
    
    saveSignature() {
        if (this.canvas) {
            const signatureData = this.canvas.toDataURL();
            sessionStorage.setItem('omniTaskSignature', signatureData);
        }
    },
    
    restoreSignature() {
        const saved = sessionStorage.getItem('omniTaskSignature');
        if (saved && this.ctx && this.canvas) {
            const img = new Image();
            img.onload = () => {
                this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
            };
            img.src = saved;
        }
    },
    
    isEmpty() {
        if (!this.ctx || !this.canvas) return true;
        
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        const data = imageData.data;
        
        for (let i = 3; i < data.length; i += 4) {
            if (data[i] > 0) return false;
        }
        return true;
    }
};

// ===== AUTH MANAGER =====
const AuthManager = {
    init() {
        this.checkSavedUser();
    },
    
    login(email, password) {
        // محاكاة تسجيل الدخول
        return new Promise((resolve) => {
            setTimeout(() => {
                AppState.user = {
                    name: email.split('@')[0],
                    email: email,
                    joinedAt: new Date().toISOString()
                };
                AppState.isAuthenticated = true;
                
                DOM.userBtn.innerHTML = `<i class="fas fa-user-circle"></i>`;
                UIManager.showToast(`مرحباً بعودتك`, 'success');
                
                this.saveUser();
                resolve(true);
            }, 1000);
        });
    },
    
    register(userData) {
        // محاكاة التسجيل
        return new Promise((resolve) => {
            setTimeout(() => {
                AppState.user = {
                    name: userData.name,
                    email: userData.email,
                    joinedAt: new Date().toISOString()
                };
                AppState.isAuthenticated = true;
                
                DOM.userBtn.innerHTML = `<i class="fas fa-user-circle"></i>`;
                UIManager.showToast(`أهلاً بك ${userData.name}`, 'success');
                
                this.saveUser();
                resolve(true);
            }, 1000);
        });
    },
    
    logout() {
        AppState.user = null;
        AppState.isAuthenticated = false;
        
        DOM.userBtn.innerHTML = `<i class="fas fa-user-circle"></i>`;
        localStorage.removeItem('omniTaskUser');
        
        UIManager.showToast('تم تسجيل الخروج', 'info');
    },
    
    saveUser() {
        if (AppState.user) {
            Utils.saveToStorage('omniTaskUser', AppState.user);
        }
    },
    
    checkSavedUser() {
        const savedUser = Utils.loadFromStorage('omniTaskUser');
        if (savedUser) {
            AppState.user = savedUser;
            AppState.isAuthenticated = true;
            DOM.userBtn.innerHTML = `<i class="fas fa-user-circle"></i>`;
        }
    },
    
    handleAuth() {
        if (AppState.isAuthenticated) {
            if (confirm('تسجيل الخروج من الحساب؟')) {
                this.logout();
            }
        } else {
            this.showLoginModal();
        }
    },
    
    showLoginModal() {
        // يمكن إضافة نافذة تسجيل دخول منبثقة هنا
        UIManager.showToast('يرجى تسجيل الدخول أولاً', 'info');
    }
};

// ===== CONTRACT MANAGER =====
const ContractManager = {
    finishProject() {
        // التحقق من التوقيع
        if (CanvasManager.isEmpty()) {
            UIManager.showToast('الرجاء التوقيع على العقد أولاً', 'error');
            return;
        }
        
        // التحقق من السلة
        if (AppState.cart.length === 0) {
            UIManager.showToast('السلة فارغة! أضف خدمات أولاً', 'error');
            return;
        }
        
        // التحقق من تسجيل الدخول
        if (!AppState.isAuthenticated) {
            UIManager.showToast('الرجاء تسجيل الدخول أولاً', 'warning');
            return;
        }
        
        // إظهار حالة التحميل
        const finishBtn = document.getElementById('finish-project');
        if (finishBtn) {
            finishBtn.classList.add('loading');
            finishBtn.disabled = true;
        }
        
        // محاكاة إرسال الطلب
        setTimeout(() => {
            this.generateCertificate();
            
            UIManager.showToast('✅ تم اعتماد مشروعك بنجاح! سيتم التواصل معك خلال 24 ساعة', 'success');
            
            CartManager.clearCart();
            CanvasManager.clear();
            
            setTimeout(() => {
                UIManager.showSection('home');
            }, 2000);
            
            if (finishBtn) {
                finishBtn.classList.remove('loading');
                finishBtn.disabled = false;
            }
        }, 2000);
    },
    
    generateCertificate() {
        const certificate = {
            id: 'CERT-' + Utils.generateId(),
            client: AppState.user?.name || 'عميل',
            services: AppState.cart.map(item => `${item.name} x${item.quantity}`),
            total: AppState.total,
            date: new Date().toISOString()
        };
        
        Utils.saveToStorage('lastCertificate', certificate);
        UIManager.showModal('certificateModal');
    }
};

// ===== CHECKOUT MANAGER =====
const CheckoutManager = {
    init() {
        const form = document.getElementById('checkoutForm');
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    },
    
    handleSubmit(e) {
        e.preventDefault();
        
        // جمع بيانات النموذج
        const formData = new FormData(e.target);
        const orderData = Object.fromEntries(formData);
        
        // التحقق من البيانات
        if (!this.validateOrder(orderData)) return;
        
        // معالجة الطلب
        this.processOrder(orderData);
    },
    
    validateOrder(data) {
        // التحقق من الحقول المطلوبة
        const required = ['name', 'email', 'phone', 'city'];
        for (const field of required) {
            if (!data[field]) {
                UIManager.showToast(`الرجاء إدخال ${field}`, 'error');
                return false;
            }
        }
        
        // التحقق من البريد الإلكتروني
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            UIManager.showToast('البريد الإلكتروني غير صحيح', 'error');
            return false;
        }
        
        // التحقق من رقم الهاتف
        const phoneRegex = /^[0-9]{10,}$/;
        if (!phoneRegex.test(data.phone)) {
            UIManager.showToast('رقم الهاتف غير صحيح', 'error');
            return false;
        }
        
        return true;
    },
    
    processOrder(data) {
        // إظهار حالة التحميل
        const submitBtn = document.querySelector('#checkoutForm button[type="submit"]');
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        }
        
        // محاكاة معالجة الطلب
        setTimeout(() => {
            UIManager.showToast('تم استلام طلبك بنجاح!', 'success');
            
            // الانتقال إلى صفحة العقد
            setTimeout(() => {
                UIManager.showSection('contract');
            }, 1500);
            
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
        }, 2000);
    }
};

// ===== DISCOUNT MANAGER =====
const DiscountManager = {
    applyDiscount(code) {
        const discount = AppState.discountCodes[code.toUpperCase()];
        
        if (!discount) {
            UIManager.showToast('رمز الخصم غير صالح', 'error');
            return false;
        }
        
        if (discount.used) {
            UIManager.showToast('تم استخدام هذا الرمز من قبل', 'warning');
            return false;
        }
        
        let discountAmount = 0;
        if (discount.type === 'percentage') {
            discountAmount = (AppState.total * discount.discount) / 100;
        } else {
            discountAmount = discount.discount;
        }
        
        AppState.total -= discountAmount;
        if (AppState.total < 0) AppState.total = 0;
        
        discount.used = true;
        CartManager.updateCartUI();
        
        UIManager.showToast(`تم تطبيق خصم: ${Utils.formatPrice(discountAmount)}`, 'success');
        return true;
    }
};

// ===== REVIEWS MANAGER =====
const ReviewsManager = {
    renderReviews() {
        const reviewsContainer = document.getElementById('reviewsContainer');
        if (!reviewsContainer) return;
        
        reviewsContainer.innerHTML = AppState.reviews.map(review => `
            <div class="review-card">
                <div class="review-header">
                    <div class="reviewer-info">
                        <i class="${review.avatar}"></i>
                        <strong>${review.name}</strong>
                    </div>
                    <div class="review-rating">
                        ${Array(review.rating).fill('<i class="fas fa-star"></i>').join('')}
                    </div>
                </div>
                <p class="review-comment">"${review.comment}"</p>
                <div class="review-footer">
                    <span>خدمة: ${review.service}</span>
                    <span>${Utils.formatDate(review.date)}</span>
                </div>
            </div>
        `).join('');
    },
    
    addReview(review) {
        const newReview = {
            id: Utils.generateId(),
            name: AppState.user?.name || 'زائر',
            rating: review.rating,
            comment: review.comment,
            service: review.service,
            date: new Date().toISOString(),
            avatar: 'fas fa-user-circle'
        };
        
        AppState.reviews.unshift(newReview);
        this.renderReviews();
        UIManager.showToast('شكراً لتقييمك!', 'success');
    }
};

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Navigation
    DOM.navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const section = e.currentTarget.dataset.section;
            if (section) {
                UIManager.showSection(section);
            }
        });
    });
    
    // Menu toggle for mobile
    if (DOM.menuToggle && DOM.mainNav) {
        DOM.menuToggle.addEventListener('click', () => {
            DOM.mainNav.classList.toggle('active');
        });
    }
    
    // User button
    if (DOM.userBtn) {
        DOM.userBtn.addEventListener('click', () => AuthManager.handleAuth());
    }
    
    // Filter buttons
    DOM.filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            DOM.filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const filter = e.target.dataset.filter;
            ServicesManager.setFilter(filter);
        });
    });
    
    // Search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', Utils.debounce((e) => {
            ServicesManager.searchServices(e.target.value);
        }, 300));
    }
    
    // Discount form
    const discountForm = document.getElementById('discountForm');
    if (discountForm) {
        discountForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const code = document.getElementById('discountCode')?.value;
            if (code) {
                DiscountManager.applyDiscount(code);
            }
        });
    }
    
    // Review form
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            ReviewsManager.addReview({
                rating: parseInt(formData.get('rating')),
                comment: formData.get('comment'),
                service: formData.get('service')
            });
            reviewForm.reset();
        });
    }
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            UIManager.showToast('تم إرسال رسالتك بنجاح، سنتواصل معك قريباً', 'success');
            contactForm.reset();
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            UIManager.showToast('تم الاشتراك في النشرة البريدية', 'success');
            newsletterForm.reset();
        });
    }
    
    // Close modals
    document.querySelectorAll('.modal-close, .modal-overlay').forEach(el => {
        el.addEventListener('click', () => {
            document.querySelectorAll('.modal.show').forEach(modal => {
                modal.classList.remove('show');
            });
        });
    });
    
    // Keyboard events
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.show').forEach(modal => {
                modal.classList.remove('show');
            });
            
            if (CanvasManager.isDrawing) {
                CanvasManager.stopDrawing();
            }
            
            if (DOM.mainNav?.classList.contains('active')) {
                DOM.mainNav.classList.remove('active');
            }
        }
    });
    
    // Window resize
    window.addEventListener('resize', Utils.debounce(() => {
        if (document.getElementById('contract').classList.contains('active')) {
            CanvasManager.init();
        }
    }, 250));
    
    // Back/forward navigation
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.section) {
            UIManager.showSection(e.state.section);
        }
    });
}

// ===== INITIALIZATION =====
function initApp() {
    console.log('🚀 Omni-Task Platform is starting...');
    
    // Load saved data
    CartManager.loadCart();
    AuthManager.checkSavedUser();
    
    // Render initial content
    ServicesManager.renderServices();
    PortfolioManager.renderPortfolio();
    ReviewsManager.renderReviews();
    
    // Initialize managers
    LoaderManager.init();
    CheckoutManager.init();
    
    // Setup event listeners
    setupEventListeners();
    
    // Check URL hash
    const hash = window.location.hash.slice(1);
    if (hash && ['home', 'services', 'portfolio', 'about', 'contact', 'cart', 'checkout', 'contract'].includes(hash)) {
        UIManager.showSection(hash);
    } else {
        UIManager.showSection('home');
    }
    
    // Welcome message
    setTimeout(() => {
        UIManager.showToast('مرحباً بك في Omni-Task 👋', 'info');
    }, 2000);
}

// ===== EXPORT GLOBAL FUNCTIONS =====
window.showSection = (sectionId) => UIManager.showSection(sectionId);
window.clearCart = () => CartManager.clearCart();
window.clearSignature = () => CanvasManager.clear();
window.finishProject = () => ContractManager.finishProject();

// Export managers
window.ServicesManager = ServicesManager;
window.CartManager = CartManager;
window.UIManager = UIManager;

// Start the app
document.addEventListener('DOMContentLoaded', initApp);
