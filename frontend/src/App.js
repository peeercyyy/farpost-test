import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Bulletin from './Components/Bulletin/Bulletin';
import './App.css';
import Modal from './Components/Modal/Modal';

function App() {
  const [data, setData] = useState(null);
  const [firstBulletin, setFirstBulletin] = useState(null);
  const [focusedBulletin, setBulletin] = useState(0);
  const [approvedIndex, setApproved] = useState([]);
  const [declinedIndex, setDeclined] = useState([]);
  const [escalatedIndex, setEscalated] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalType, setModalType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bulletins = useRef([]);

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

  useEffect(() => {
    const handleEnterDown = (event) => {
      if (event.key === 'Enter') {
        setIsLoading(true);
      }
    };

    document.addEventListener('keydown', handleEnterDown);

    return () => {
      document.removeEventListener('keydown', handleEnterDown);
    };
  }, []);

  useEffect(() => {
    if (firstBulletin) {
      firstBulletin.focus();
    }
  }, [firstBulletin]);

  function handleKeyDown(event) {
    if (isModalVisible) {
      if (event.key === 'Escape') {
        setIsModalVisible(false);
      }
    } else {
      if (event.keyCode === 32) {
        // spacebar
        event.preventDefault();
        const currentBulletin = bulletins.current[focusedBulletin];
        const bulletinId = currentBulletin.dataset.id;
        currentBulletin.classList.add('approve');
        setApproved([...approvedIndex, { id: bulletinId }]);
        console.log(data.length - 1);
        console.log(focusedBulletin);
        setBulletin((prevBulletin) => (prevBulletin === data.length - 1 ? 0 : prevBulletin + 1));
        bulletins.current[focusedBulletin === data.length - 1 ? 0 : focusedBulletin + 1].focus();
        console.log(declinedIndex);
        console.log(escalatedIndex);
      } else if (event.shiftKey && event.key === 'Enter') {
        event.preventDefault();
        setModalType('escalate');
        setIsModalVisible(true);
        setModalText('');
      } else if (event.key === 'Delete') {
        event.preventDefault();
        setModalType('decline');
        setIsModalVisible(true);
        setModalText('');
      } else if (event.key === 'F7') {
        event.preventDefault();
        console.log(event.key);
      }
    }
  }
  const handleModalTextChange = (text) => {
    setModalText(text);
  };

  const handleModalSubmit = (type) => {
    const currentBulletin = bulletins.current[focusedBulletin];
    const bulletinId = currentBulletin.dataset.id;
    if (type === 'decline') {
      currentBulletin.classList.add('decline');
      setDeclined([...declinedIndex, { id: bulletinId, comment: modalText }]);
    } else if (type === 'escalate') {
      currentBulletin.classList.add('escalate');
      setEscalated([...escalatedIndex, { id: bulletinId, comment: modalText }]);
    }
    setIsModalVisible(false);
    setBulletin((prevBulletin) => (prevBulletin === data.length - 1 ? 0 : prevBulletin + 1));
    bulletins.current[focusedBulletin === data.length - 1 ? 0 : focusedBulletin + 1].focus();
  };

  function handleClick(index) {
    setBulletin(index);
    bulletins.current[index].focus();
  }

  return (
    <div
      className='App'
      onKeyDown={handleKeyDown}>
      {!data ? (
        <p className='press_enter'>Нажмите кнопку Enter, чтобы загрузить данные</p>
      ) : (
        data.map((item, index) => (
          <Bulletin
            bulletin={item}
            key={item.id}
            ref={(element) => {
              bulletins.current[index] = element;
              if (index === 0) {
                setFirstBulletin(element);
              }
            }}
            onKeyDown={handleKeyDown}
            onClick={() => {
              handleClick(index);
            }}
          />
        ))
      )}
      {isModalVisible && (
        <Modal
          props={{ type: modalType }}
          onTextChange={handleModalTextChange}
          handleModalSubmit={handleModalSubmit}
        />
      )}
      {/* <button onClick={() => sendData(approvedIndexes, rejectedIndexes, escalatedIndexes)}>F7</button> */}
    </div>
  );
}

export default App;
