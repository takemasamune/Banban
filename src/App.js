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

  const findNextId = (currentid) => {
    let newid = Math.floor(Math.random() * images.length) + 1;
    if (currentid && newid === currentid) {
      newid++;
      if (newid > images.length) newid = 1;
    }
    return newid;
  }

  const audio = new Audio('assets/ban.mp3');
  const [id, setId] = React.useState(findNextId());
  const [count, setCount] = React.useState(0);
  const [isClicked, setClicked] = React.useState(false);
  
  const updateState = () => {
    audio.play();
    setId(findNextId(id));
    setCount(count + 1);
  }

  const handleKeyDown = (e) => {
    if (!isClicked) {
      setClicked(true);
      if (e.keyCode === 13 || e.target.value === 'imageElement') {
        updateState();
      }

      setTimeout(() => {
        setClicked(false);
      }, 50);
    }
    else {
      console.log("too busy, request rejected");
    }
  }
  const handleTouchEvent = (e) => {
    audio.load();
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchstart', handleTouchEvent);
    return (() => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchstart', handleTouchEvent);
    });
  });

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
        <input type="image" className="App-image" value="imageElement" onClick={handleKeyDown} src={findImage(id).url} alt="" />
      </div>
    </div>
  );
}
export default App;
