const BulletinMain = (bulletin) => {
  return (
    <div className='bulletin__main'>
      <h1 className='bulletin__main_subject_title'>{bulletinSubject}</h1>
      <div className="bulletin__main_subject_block">
        <div className='bulletin__main_subject_text_block'>
          <p className='bulletin__main_subject_text'>{bulletin.bulletinText}</p>
        </div>
        <div className='bulletin__main_subject_gallery'></div>
      </div>
    </div>
  )
}

export default BulletinMain;