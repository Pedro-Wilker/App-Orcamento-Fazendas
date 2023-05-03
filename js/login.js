const form = document.querySelector('form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

function login(event) {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  const profile = JSON.parse(localStorage.getItem('profile'));

  if (profile && email === profile.email && password === profile.password) {
    window.location.href = 'perfil.html';
  } else {
    alert('Email ou senha incorretos. Tente novamente.');
  }
}

form.addEventListener('submit', login);