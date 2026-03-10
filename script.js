// ===== STATE =====
const AppState = {
    cart: [],
    total: 0,
    services: [
        { id: 1, name: 'تطوير ويب نخبوي', price: 500, icon: 'fas fa-code', category: 'برمجة' },
        { id: 2, name: 'تصميم هوية بصرية', price: 300, icon: 'fas fa-pen-nib', category: 'تصميم' },
        { id: 3, name: 'ترجمة معتمدة', price: 50, icon: 'fas fa-language', category: 'ترجمة' }
    ]
};

// ===== UI MANAGER =====
const UIManager = {
    showSection(id) {
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        
        document.querySelectorAll('.nav-link').forEach(l => {
            l.classList.toggle('active', l.dataset.section === id);
        });

        if (id === 'contract') CanvasManager.init();
        window.scrollTo(0,0);
    },

    showToast(msg) {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = msg;
        container.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }
};

// ===== CART MANAGER =====
const CartManager = {
    add(id) {
        const service = AppState.services.find(s => s.id === id);
        AppState.cart.push(service);
        this.update();
        UIManager.showToast(`تم إضافة ${service.name} للسلة`);
    },

    update() {
        const cartNum = document.getElementById('cartNum');
        cartNum.textContent = AppState.cart.length;
        
        const list = document.getElementById('cartList');
        const totalDisp = document.getElementById('totalPrice');
        
        AppState.total = AppState.cart.reduce((sum, item) => sum + item.price, 0);
        
        list.innerHTML = AppState.cart.map((item, idx) => `
            <div class="cart-item" style="display:flex; justify-content:space-between; padding:10px; border-bottom:1px solid #333">
                <span>${item.name}</span>
                <span>$${item.price}</span>
            </div>
        `).join('');
        
        totalDisp.textContent = `$${AppState.total}`;
        document.getElementById('cartSummary').classList.toggle('hidden', AppState.cart.length === 0);
    }
};

// ===== CANVAS (NEON SIGNATURE) =====
const CanvasManager = {
    init() {
        const canvas = document.getElementById('sigPad');
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = 200;

        ctx.strokeStyle = '#C084FC';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#7C3AED';
        ctx.lineCap = 'round';

        let drawing = false;
        const getPos = e => {
            const rect = canvas.getBoundingClientRect();
            return { x: (e.clientX || e.touches[0].clientX) - rect.left, y: (e.clientY || e.touches[0].clientY) - rect.top };
        };

        const start = e => { drawing = true; ctx.beginPath(); const p = getPos(e); ctx.moveTo(p.x, p.y); };
        const draw = e => { if(!drawing) return; const p = getPos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); };
        const stop = () => drawing = false;

        canvas.onmousedown = start; canvas.onmousemove = draw; canvas.onmouseup = stop;
        canvas.ontouchstart = start; canvas.ontouchmove = draw; canvas.ontouchend = stop;
    },
    clear() {
        const canvas = document.getElementById('sigPad');
        canvas.getContext('2d').clearRect(0,0, canvas.width, canvas.height);
    }
};

// ===== WHATSAPP INTEGRATION =====
function finishProject() {
    if (AppState.cart.length === 0) return UIManager.showToast("السلة فارغة!");
    
    const phone = "9677XXXXXXXX"; // رقمك هنا
    let msg = `*طلب مشروع جديد - Omni-Task*%0A`;
    AppState.cart.forEach(i => msg += `- ${i.name} ($${i.price})%0A`);
    msg += `%0A*الإجمالي:* $${AppState.total}%0A*الحالة:* تم التوقيع إلكترونياً ✅`;
    
    UIManager.showToast("جاري تحويلك لواتساب المدير...");
    setTimeout(() => {
        window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
        AppState.cart = [];
        CartManager.update();
        UIManager.showSection('home');
    }, 1500);
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('servicesGrid');
    grid.innerHTML = AppState.services.map(s => `
        <div class="service-card">
            <i class="${s.icon} fa-3x" style="color:var(--secondary)"></i>
            <h3>${s.name}</h3>
            <p>خدمة احترافية بأعلى المعايير</p>
            <div style="font-size:1.5rem; font-weight:900; margin:15px 0">$${s.price}</div>
            <button class="btn btn-primary" onclick="CartManager.add(${s.id})">إضافة للطلب</button>
        </div>
    `).join('');

    document.querySelectorAll('.nav-link').forEach(btn => {
        btn.onclick = () => UIManager.showSection(btn.dataset.section);
    });

    window.addEventListener('load', () => {
        setTimeout(() => document.querySelector('.loader-wrapper').style.display = 'none', 1000);
    });
});

window.showSection = id => UIManager.showSection(id);
window.clearSignature = () => CanvasManager.clear();
