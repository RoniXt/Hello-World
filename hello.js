const name = prompt("What is your name?");
document.getElementById("output").textContent = "Hello " + name;

// Save name to database
fetch('/api/greet', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
});

// Show all names when button is clicked
document.getElementById('showNames').addEventListener('click', async () => {
    const response = await fetch('/api/greetings');
    const greetings = await response.json();
    const list = document.getElementById('namesList');
    list.innerHTML = '';
    greetings.forEach(g => {
        const li = document.createElement('li');
        li.textContent = `${g.name} - ${g.timestamp}`;
        list.appendChild(li);
    });
});
