import usericon from '../../usericon.svg'

const BulletinHeader = ({bulletin}) => {
  return (
    <div className='bulletin__header'>
      <div className='bulletin__header_wrapper'>
        <div className='bulletin__header_info'>
            <a className='bulletin__header_info_id' href='#'>{bulletin.id}</a>
            <p className='bulletin__header_info_dash'>—</p>
            <p className='bulletin__header_info_time'>{bulletin.publishDateString}</p>
        </div>
        <div className='bulletin__header_user'>
          <img className='bulletin__header_user_logo' src={usericon} alt='Логотип пользователя'/>
          <a className='bulletin__header_user_name'>{bulletin.ownerLogin}</a>
        </div>
      </div>
      <div className='bulletin__header_rectangle' />
    </div>
  )
}

export default BulletinHeader;