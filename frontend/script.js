document.addEventListener('DOMContentLoaded', async () => {
    const list = document.getElementById('itemsList');
    const response = await fetch('https://lookup-backend.onrender.com/api/items');
    const items = await response.json();
    list.innerHTML = '';
    items.reverse().forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.status.toUpperCase()}:</strong> ${item.name}<br>${item.description}<br>` +
                       (item.image ? `<img src="${item.image}" width="100">` : '');
        list.appendChild(li);
    });
});
