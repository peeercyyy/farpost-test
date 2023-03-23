import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Bulletin from './Components/Bulletin/Bulletin';
import './App.css';
import Modal from './Components/Modal/Modal';

let limit = 10;
let offset = 0;

function App() {
  const [data, setData] = useState(null);
  const [firstBulletin, setFirstBulletin] = useState(null);
  const [focusedBulletin, setBulletin] = useState(0);
  const [newData, setNewData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalText, setModalText] = useState('');
  const [modalType, setModalType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bulletins = useRef([]);

  useEffect(() => {
    if (isLoading) {
      getData();
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
        const classList = currentBulletin.classList;
        const solution = 'approve';
        const comment = '';
        setNewData((prevData) => changeNewData(prevData, Number(bulletinId), solution, comment, data[focusedBulletin]));
        if (classList.contains('approve')) {
        } else if (classList.contains('decline') || classList.contains('escalate')) {
          classList.remove('decline', 'escalate');
          classList.add('approve');
        } else {
          classList.add('approve');
        }
        setBulletin((prevBulletin) => (prevBulletin === data.length - 1 ? 0 : prevBulletin + 1));
        bulletins.current[focusedBulletin === data.length - 1 ? 0 : focusedBulletin + 1].focus();
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
        sendData(newData);
      }
    }
  }

  const getData = () => {
    axios
      .get(`/bulletin_data?offset=${offset}&limit=${limit}`)
      .then((data) => {
        setData(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error(err);
      });
  };

  const handleModalTextChange = (text) => {
    setModalText(text);
  };

  const handleModalSubmit = (type) => {
    const currentBulletin = bulletins.current[focusedBulletin];
    const bulletinId = currentBulletin.dataset.id;
    const classList = currentBulletin.classList;
    const solution = type;
    const comment = modalText;
    if (type === 'decline') {
      setNewData((prevData) => changeNewData(prevData, Number(bulletinId), solution, comment, data[focusedBulletin]));
      if (classList.contains('decline')) {
      } else if (classList.contains('approve') || classList.contains('escalate')) {
        classList.remove('approve', 'escalate');
        classList.add('decline');
      } else {
        classList.add('decline');
      }
    } else if (type === 'escalate') {
      setNewData((prevData) => changeNewData(prevData, Number(bulletinId), solution, comment, data[focusedBulletin]));
      if (classList.contains('escalate')) {
      } else if (classList.contains('approve') || classList.contains('decline')) {
        classList.remove('approve', 'decline');
        classList.add('escalate');
      } else {
        classList.add('escalate');
      }
    }
    setIsModalVisible(false);
    setBulletin((prevBulletin) => (prevBulletin === data.length - 1 ? 0 : prevBulletin + 1));
    bulletins.current[focusedBulletin === data.length - 1 ? 0 : focusedBulletin + 1].focus();
  };

  const changeNewData = (prevData, idToReplace, newSolution, newComment, newData) => {
    let isUpdated = false;
    const result = prevData.map((item) => {
      if (item.id === idToReplace) {
        isUpdated = true;
        return { ...item, solution: newSolution, comment: newComment };
      }
      return item;
    });
    if (!isUpdated) {
      result.push({ ...newData, solution: newSolution, comment: newComment });
    }
    return result;
  };

  const handleClick = (index) => {
    setBulletin(index);
    bulletins.current[index].focus();
  };

  const sendData = (result) => {
    axios
      .post('/result', result)
      .then((res) => console.log(res))
      .then((offset += limit))
      .then(setData([]))
      .then(setNewData([]))
      .then(getData())
      .catch((error) => console.error(error));
  };

  return (
    <div
      className='App'
      onKeyDown={handleKeyDown}>
      {!data ? (
        <p className='press_enter'>Нажмите кнопку Enter, чтобы загрузить данные</p>
      ) : typeof data === 'string' ? (
        <p className='press_enter'>{data}</p>
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
    </div>
  );
}

export default App;
