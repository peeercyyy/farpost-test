import BulletinHeader from './BulletinHeader'
import BulletinMain from './BulletinMain'

const Bulletin = (bulletin) => {
  return (
    <div className='bulletin'>
      <BulletinHeader bulletin={bulletin} />
      <BulletinMain bulletin={bulletin} />
    </div>
  )
}

export default Bulletin