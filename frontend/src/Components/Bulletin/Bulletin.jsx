import { forwardRef } from 'react';
import BulletinHeader from './BulletinHeader'
import BulletinMain from './BulletinMain'

const Bulletin = forwardRef(({ bulletin, onClick }, ref) => {
  return (
    <div className='bulletin' ref={ref} tabIndex='0' data-id={bulletin.id} onClick={onClick} >
      <BulletinHeader bulletin={bulletin} />
      <BulletinMain bulletin={bulletin} />
    </div>
  )
})

export default Bulletin;