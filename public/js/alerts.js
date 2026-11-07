export const showAlert = (type, msg) => {
    hideAlert();
    const alert = document.createElement('div');
    alert.className = `alert alert--${type}`;
    alert.setAttribute('role', type === 'error' ? 'alert' : 'status');
    alert.textContent = msg;
    document.body.prepend(alert);
    window.setTimeout(() => {hideAlert()}, 5000);
}

export const hideAlert = () => {
    const el = document.querySelector('.alert');
    if(el) el.parentElement.removeChild(el);
}
