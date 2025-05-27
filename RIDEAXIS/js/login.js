 document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const foundUser = users.find(user => user.username === username && user.password === password);

    if (foundUser) {
      alert('Login successful!');
      // Redirect or proceed
    } else {
      alert('Invalid username or password');
    }
  });