const name = prompt("What is your name?");
document.getElementById("output").textContent = "Hello " + name;

// Save name to database
fetch('/api/greet', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
});
