window.addEventListener('DOMContentLoaded', (event) => {
  const weatherForm = document.querySelector('form');
  weatherForm.addEventListener('submit', (e) => {
    const search = document.querySelector('input');
    const messageOne = document.querySelector('#message-1')
    const messageTwo = document.querySelector('#message-2')

    e.preventDefault();

    const url = `http://localhost:3000/weather?address=${search.value}`;

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    fetch(url).then(res => {
      return res.json();
    }).then(data => {
      if (data.error) {
        console.log(data.error);
        messageOne.textContent = data.error;
        messageTwo.textContent = '';

      } else {
        messageOne.textContent = data.location
        messageTwo.textContent = data.forecast
        console.log(data.location);
        console.log(data.forecast);
      }
    })
  });
});

