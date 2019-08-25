import React from 'react';
import './App.css';

function App() {
  const images = [
    {id:1, url: 'assets/1.jpg'},
    {id:2, url: 'assets/2.jpg'},
    {id:3, url: 'assets/3.jpg'},
    {id:4, url: 'assets/4.jpg'},
    {id:5, url: 'assets/5.jpg'},
    {id:6, url: 'assets/6.jpg'},
    {id:7, url: 'assets/7.jpg'},
  ];

  const audio = new Audio('assets/ban.mp3');
  const inputEl = React.useRef(null);
  const [id, setId] = React.useState(2);
  const [count, setCount] = React.useState(0);
  let submitFlag = false;

  React.useEffect(() => {
    inputEl.current.focus();
    document.addEventListener('keydown', onKeyPress);
    return (() => {
      document.removeEventListener('keydown', onKeyPress);
    });
  });

  const onKeyPress = function (e) {
    if(!submitFlag) {
      submitFlag = true;
      e.preventDefault();
      let newid = Math.floor(Math.random() * images.length) + 1;
      if (newid === id) {
        newid++;
        if (newid > images.length) newid = 1;
      }
      if (e.keyCode === 13 || e.target.value === 'imageElement') {
        setId(newid);
        setCount(count + 1);
        audio.play();
      }
      //console.log(e);
      setInterval(() => {
        submitFlag = false;
      }, 150);
    }
    return false;
  }

  const findImage = function(id) {
    return images.find((image) => { return image.id === id });
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>image thumbnail app</h2>
        <h2>Count: {count}</h2>
      </header>
      <div className="Input">
        <input type="image" className="App-image" ref={inputEl} value="imageElement" onClick={onKeyPress} src={findImage(id).url} alt="" />
      </div>
    </div>
  );
}
export default App;
