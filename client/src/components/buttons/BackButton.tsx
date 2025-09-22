import { FaLongArrowAltLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const BackButton = () => {
  return (
    <div>
        <Link className='flex items-center gap-x-4 py-5 md:text-lg text-md' to="/"><FaLongArrowAltLeft />Back to Dashboard</Link>
    </div>
  )
}

export default BackButton