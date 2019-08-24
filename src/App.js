import React from 'react';
import './App.css';

function App() {
  const images = [
    {id:1, url: 'img/1.jpg'},
    {id:2, url: 'img/2.jpg'},
    {id:3, url: 'img/3.jpg'},
    {id:4, url: 'img/4.jpg'},
    {id:5, url: 'img/5.jpg'},
    {id:6, url: 'img/6.jpg'},
    {id:7, url: 'img/7.jpg'},
  ];

  const audio = new Audio('ban.mp3');
  const inputEl = React.useRef(null);
  const [id, setId] = React.useState(2);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    //inputEl.current.focus();
    document.addEventListener('keydown', onKeyPress);
    return (() => {
      document.removeEventListener('keydown', onKeyPress);
    });
  });

  const onKeyPress = function (e) {
    let newid = Math.floor(Math.random() * images.length) + 1;
    if(newid === id) {
      newid++;
      if(newid > images.length) newid = 1;
    }
    if(e.keyCode === 13) {
      setId(newid);
      setCount(count+1);
      audio.play();
    }
  }

  const findImage = function(id) {
    return images.find((image) => { return image.id === id });
  }

  return (
    <div className="App">
      <header className="header">
        <h1>image thumbnail app</h1>
        <h2>Count: {count}</h2>
      </header>
      <div className="Input">
        <input type="image" ref={inputEl} onKeyPress={onKeyPress} src={findImage(id).url} width="800" alt="" />
      </div>
    </div>
  );
}
export default App;
