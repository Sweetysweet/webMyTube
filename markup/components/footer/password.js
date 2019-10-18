const form = document.querySelector('form');

form.addEventListener('submit', function(event){
    event.preventDefault();
    const inputs = form.querySelectorAll('.form__input');
    console.log(inputs);
    inputs.forEach(function(searchinput) {
        console.log(searchinput.value);
    });
    form.classList.add('isSubmited');
    alert('Добро пожаловать');
});