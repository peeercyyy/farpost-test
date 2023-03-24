const Info = () => {
  return(
    <div className='info'>
      <div className='info__approve'>
        <p className='info__approve_name'>Одобрить</p>
        <p className="info__approve_color"> </p>
        <p className="info__approve_key">Пробел</p>
      </div>
      <div className='info__decline'>
        <p className='info__decline_name'>Отклонить</p>
        <p className="info__decline_color"> </p>
        <p className="info__decline_key">Del</p>
      </div>
      <div className='info__escalate'>
        <p className='info__escalate_name'>Эскалация</p>
        <p className="info__escalate_color"> </p>
        <p className="info__escalate_key">Shift + Enter</p>
      </div>
      <div className='info__save'>
        <p className='info__save_name'>Сохранить</p>
        <p className="info__save_color"> </p>
        <p className="info__save_key">F7</p>
      </div>
    </div>
  )
};

export default Info