// --- الإعدادات العامة ---
const MY_WHATSAPP = "201234567890"; // ضع رقمك الحقيقي هنا

let state = {
    user: localStorage.getItem('omni_user') || null,
    cart: [],
    orders: JSON.parse(localStorage.getItem('omni_orders')) || []
};

// --- تشغيل التطبيق ---
function initApp() {
    updateUI();
    initCanvas();
}

function showPage(id) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if(id === 'contract') setTimeout(initCanvas, 100);
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.innerText = msg;
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 3000);
}

// --- نظام الهوية ---
function handleAuth() {
    if(state.user) {
        if(confirm("هل تود تسجيل الخروج؟")) {
            localStorage.removeItem('omni_user');
            location.reload();
        }
    } else {
        let name = prompt("مرحباً بك! أدخل اسمك الكامل لبدء التعامل:");
        if(name && name.trim().length > 2) {
            state.user = name;
            localStorage.setItem('omni_user', name);
            updateUI();
            showToast(`أهلاً بك يا ${name}`);
        }
    }
}

// --- نظام السلة ---
function addToCart(service, price) {
    state.cart.push({ service, price, id: Date.now() });
    updateUI();
    showToast(`تم إضافة ${service} بنجاح`);
}

function updateUI() {
    // تحديث عداد السلة وزر الدخول
    document.getElementById('cart-count').innerText = state.cart.length;
    document.getElementById('auth-btn').innerText = state.user ? state.user : "دخول";

    // تحديث قائمة السلة
    const cartList = document.getElementById('cart-list');
    if(state.cart.length === 0) {
        cartList.innerHTML = '<p style="text-align:center; padding:40px;">السلة فارغة حالياً</p>';
    } else {
        cartList.innerHTML = state.cart.map(item => `
            <div class="card" style="display:flex; justify-content:space-between; margin-bottom:15px; border-right:5px solid var(--primary);">
                <span>${item.service}</span>
                <b>$${item.price}</b>
            </div>
        `).join('');
    }

    const total = state.cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('cart-total').innerText = `$${total}`;

    // تحديث جدول الطلبات
    const ordersBody = document.getElementById('orders-body');
    ordersBody.innerHTML = state.orders.map(o => `
        <tr>
            <td>#${o.id}</td>
            <td>${o.services}</td>
            <td><span style="color:green; font-weight:bold;">${o.status}</span></td>
            <td>$${o.total}</td>
        </tr>
    `).join('');
}

// --- التوقيع الرقمي ---
let canvas, ctx, drawing = false;

function initCanvas() {
    canvas = document.getElementById('sig-pad');
    if(!canvas) return;
    ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 180;

    const start = (e) => { drawing = true; ctx.beginPath(); };
    const end = () => drawing = false;
    const draw = (e) => {
        if(!drawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#007bff';
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    canvas.onmousedown = start; canvas.ontouchstart = (e) => { start(); e.preventDefault(); };
    window.onmouseup = end; canvas.ontouchend = end;
    canvas.onmousemove = draw; canvas.ontouchmove = (e) => { draw(e); e.preventDefault(); };
}

function clearSig() { ctx.clearRect(0, 0, canvas.width, canvas.height); }

// --- إنهاء الطلب والواتساب ---
function finalizeOrder() {
    if(!state.user) return handleAuth();
    if(state.cart.length === 0) return alert("السلة فارغة!");

    const orderId = Math.floor(Math.random() * 9000) + 1000;
    const servicesText = state.cart.map(i => i.service).join(' و ');
    const total = state.cart.reduce((s, i) => s + i.price, 0);

    const newOrder = {
        id: orderId,
        services: servicesText,
        total: total,
        status: 'نشط'
    };

    state.orders.unshift(newOrder);
    localStorage.setItem('omni_orders', JSON.stringify(state.orders));

    // إرسال لواتساب
    const msg = `🚀 *طلب جديد من Omni-Task* %0A%0A` +
                `👤 *العميل:* ${state.user} %0A` +
                `🔢 *رقم الطلب:* #${orderId} %0A` +
                `📦 *الخدمات:* ${servicesText} %0A` +
                `💰 *الإجمالي:* $${total} %0A` +
                `✅ *الحالة:* العقد موقع إلكترونياً`;

    window.open(`https://wa.me/${MY_WHATSAPP}?text=${msg}`, '_blank');
    
    state.cart = [];
    updateUI();
    showPage('my-orders');
    showToast("تم إرسال طلبك بنجاح!");
}
