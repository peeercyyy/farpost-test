import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Bulletin from './Components/Bulletin/Bulletin';
import './App.css';

function App() {
  const bulletins = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [activeBulletin, setBulletin] = useState(0);

  useEffect(() => {
    if (bulletins.current.length && bulletins.current[activeBulletin]) {
      bulletins.current[activeBulletin].focus();
    }
  }, [activeBulletin]);

  function handleKeyDown(event) {
    if (event.keyCode === 32) {
      // Spacebar
      event.preventDefault();
      console.log(activeBulletin);
      setBulletin(activeBulletin === bulletins.current.length - 1 ? 0 : activeBulletin + 1);
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        setIsLoading(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      axios
        .get('/bulletin_data')
        .then((data) => {
          setData(data.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsLoading(false);
          console.error(err);
        });
    }
  }, [isLoading]);

  return (
    <div
      className='App'
      onKeyDown={handleKeyDown}>
      {!data ? (
        <p>Нажмите кнопку Enter, чтобы загрузить данные</p>
      ) : (
        data.map((item) => (
          <Bulletin
            bulletin={item}
            key={item.id}
            ref={(bulletin) => {
              bulletins.current.concat(bulletin);
            }}
          />
        ))
      )}
    </div>
  );
}

export default App;
