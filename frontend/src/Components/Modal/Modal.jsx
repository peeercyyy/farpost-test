import { useEffect, useState } from 'react';

const Modal = ({props, onTextChange, handleModalSubmit, handleModalClose}) => {
  const [modalText, setModalText] = useState('');
  
  useEffect(() => {
    onTextChange(modalText)
  }, [modalText, onTextChange])

  const handleInputChange = (event) => {
    setModalText(event.target.value);
  }

  return(
    <div className='modal'>
      <div className='modal__content'>
        <div className='modal__header'>
          <h5 className='modal__title'>
            {props.type === 'decline' ? 'Отклонить заявку? Нужно написать причину' : 'Можете оставить примечание'}
          </h5>
        </div>
        <div className="modal__body">
          <textarea className='modal__textarea'
              value={modalText}
              onChange={handleInputChange}
              required={props.type === 'decline' ? true : false}
              />
        </div>
        <div className='modal__footer'>
          <button className='modal__submit' onClick={() => handleModalSubmit(props.type)}>Подтвердить текст</button>
          <button className='modal__close' onClick={handleModalClose}>Закрыть</button>
        </div>
      </div>
    </div>
  )
}

export default Modal;