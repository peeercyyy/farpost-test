import { forwardRef } from 'react';
import BulletinHeader from './BulletinHeader'
import BulletinMain from './BulletinMain'

const Bulletin = forwardRef(({bulletin}, ref) => {
  return (
    <div className='bulletin' ref={ref} tabIndex='0'>
      <BulletinHeader bulletin={bulletin} />
      <BulletinMain bulletin={bulletin} />
    </div>
  )
})

export default Bulletin;