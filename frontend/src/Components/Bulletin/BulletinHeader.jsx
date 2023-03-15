const BulletinHeader = (bulletin) => {
  return (
    <div className='bulletin__header'>
      <div className='bulletin__header_info'>
        <div className='bulletin__header_info_block_id'>
          <a className='bulletin__header_info_id' href='#'>{bulletin.id}</a>
          <p className='bulletin__header_info_time'>{bulletin.publishDateString}</p>
        </div>
      </div>
      <div className='bulletin__header_user'>
        <a className='bulletin__header_user_name'>{bulletin.ownerLogin}</a>
      </div>
    </div>
  )
}

export default BulletinHeader