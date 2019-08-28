import React from 'react';
import './App.css';

function App() {
  const images = [
    { id: 0, url: 'assets/0.gif' },
    { id: 1, url: 'assets/1.gif' },
    { id: 2, url: 'assets/2.gif' },
    { id: 3, url: 'assets/3.gif' },
    { id: 4, url: 'assets/4.gif' },
    { id: 5, url: 'assets/5.gif' },
    { id: 6, url: 'assets/6.gif' },
    { id: 7, url: 'assets/7.gif' },
    { id: 8, url: 'assets/8.gif' },
    { id: 9, url: 'assets/9.gif' },
    { id: 10, url: 'assets/10.gif' },
    { id: 11, url: 'assets/11.gif' },
    { id: 12, url: 'assets/12.gif' },
    { id: 13, url: 'assets/13.gif' },
    { id: 14, url: 'assets/14.gif' },
    { id: 15, url: 'assets/15.gif' },
    { id: 16, url: 'assets/16.gif' },
    { id: 17, url: 'assets/17.gif' },
    { id: 18, url: 'assets/18.gif' },
    { id: 19, url: 'assets/19.gif' },
    { id: 20, url: 'assets/20.gif' },
    { id: 21, url: 'assets/21.gif' },
    { id: 22, url: 'assets/22.gif' },
  ];

  const findNextId = (currentid) => {
    let newid = Math.floor(Math.random() * images.length);
    if (currentid && newid === currentid) {
      newid++;
      if (newid > images.length) newid = 0;
    }
    return newid;
  }

  const audio = new Audio('assets/ban.mp3');
  audio.load();

  const [id, setId] = React.useState(findNextId());
  const [count, setCount] = React.useState(0);
  const [count1, setCount1] = React.useState(0);
  const [count2, setCount2] = React.useState(0);
  const [count3, setCount3] = React.useState(0);
  const [count4, setCount4] = React.useState(0);
  const [isClicked, setClicked] = React.useState(false);

  const handleKeyDown = (e) => {
    e.preventDefault();

    if (!isClicked) {
      setClicked(true);
      switch (e.keyCode) {
        case 13:
          setCount(count + 1);
          break;
        case 49: // 1
          setCount1(count1 + 1);
          break;
        case 50: // 2 
          setCount2(count2 + 1);
          break;
        case 51: // 3 
          setCount3(count3 + 1);
          break;
        case 52: // 4 
          setCount4(count4 + 1);
          break;
        default:
          setClicked(false);
          return;
      }
      //if (e.keyCode === 13 || e.target.value === 'imageElement') {
      audio.pause();
      audio.currentTime = 0;
      audio.play();
      setId(findNextId(id));
      // }

      setTimeout(() => {
        setClicked(false);
      }, 50);
    }
    else {
      console.log("too busy, request rejected");
    }
  }
  const handleTouchEvent = (e) => {
    handleKeyDown(e);
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('touchend', handleTouchEvent);
    return (() => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('touchend', handleTouchEvent);
    });
  });

  const findImage = function (id) {
    return images.find((image) => {
      return image.id === id;
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <ul className="App-list">
          <li>Player1: {count} </li>
          <li>Player2: {count1} </li>
          <li>Player3: {count2} </li>
          <li>Player4: {count3} </li>
          <li>Player5: {count4} </li>
        </ul>
      </header>
      <div className="Input">
        <input type="image" className="App-image" value="imageElement" onClick={handleKeyDown} src={findImage(id).url} alt="" />
      </div>
    </div>
  );
}
export default App;
