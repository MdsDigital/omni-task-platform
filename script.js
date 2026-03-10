const WHATSAPP_NUM = "201234567890"; // استبدله برقمك

let state = {
    cart: [],
    user: localStorage.getItem('omni_user') || null
};

function showPage(id) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    if(id === 'cart') initSignature();
    window.scrollTo(0,0);
}

function addToCart(name, price) {
    state.cart.push({name, price});
    alert(`تم إضافة ${name} لسلتك الأسطورية!`);
    updateCartUI();
}

function updateCartUI() {
    const display = document.getElementById('cart-display');
    if(state.cart.length === 0) {
        display.innerHTML = "<p>السلة فارغة</p>";
        return;
    }
    display.innerHTML = state.cart.map(i => `<div style="display:flex; justify-content:space-between; margin-bottom:10px;"><span>${i.name}</span><b>$${i.price}</b></div>`).join('');
}

// نظام التوقيع
let canvas, ctx, drawing = false;
function initSignature() {
    canvas = document.getElementById('sig-pad');
    ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 150;
    
    canvas.onmousedown = () => drawing = true;
    window.onmouseup = () => drawing = false;
    canvas.onmousemove = (e) => {
        if(!drawing) return;
        const rect = canvas.getBoundingClientRect();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#00d4ff';
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    };
}

function submitOrder() {
    if(state.cart.length === 0) return alert("السلة فارغة!");
    const items = state.cart.map(i => i.name).join(', ');
    const msg = `🚀 طلب جديد من Omni-Task:%0A📦 الخدمات: ${items}%0A✅ تم توقيع العقد إلكترونياً.`;
    window.open(`https://wa.me/${WHATSAPP_NUM}?text=${msg}`, '_blank');
}

function handleAuth() {
    const name = prompt("أدخل اسمك الكريم:");
    if(name) {
        state.user = name;
        localStorage.setItem('omni_user', name);
        document.getElementById('auth-btn').innerText = name;
    }
}
