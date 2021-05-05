console.log('Client Side JS file');

const url = 'http://puzzle.mead.io/puzzle';

fetch(url).then(res => {
  const data = res.json();
  return data
}).then((data) => {
  console.log(data);
});

