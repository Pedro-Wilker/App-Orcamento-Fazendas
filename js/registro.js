const form = document.getElementById('cadastro-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const sobrename = document.getElementById('sobrename').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!name || !email || !password ) {
    alert('Todos os campos são obrigatórios');
    form.insertBefore(errorDiv, form.firstChild); 
    return; 
  } 

  const profile = {
    name,
    sobrename,
    email,
    password
  };


  localStorage.setItem('profile', JSON.stringify(profile));

  window.location.href = '../home.html';
});
