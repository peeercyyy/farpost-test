import { useEffect, useState } from 'react';

const Modal = ({props, onTextChange, handleModalSubmit}) => {
  const [modalText, setModalText] = useState('');
  
  useEffect(() => {
    onTextChange(modalText)
  }, [modalText, onTextChange])

  const handleInputChange = (event) => {
    setModalText(event.target.value);
  }

  return(
    <div className='modal'>
      <div className="modal__content">
        <div className="modal__header">
          <h5 className='modal__title'>
            {props.type === 'decline' ? 'Отклонить заявку? Нужно написать причину' : 'Можете оставить примечание'}
          </h5>
        </div>
        <div className="modal__body">
          <textarea
              value={modalText}
              onChange={handleInputChange}
              />
        </div>
        <div className="modal__footer">
          <button className="modal__submit" onClick={() => handleModalSubmit(props.type)}>Подтвердить текст</button>
          <button className='modal__close'>Закрыть</button>
        </div>
      </div>
    </div>
  )
}

export default Modal;