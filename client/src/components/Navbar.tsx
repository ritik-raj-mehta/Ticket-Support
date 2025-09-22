import { Button } from 'antd'
import { FaPlus } from 'react-icons/fa'
import { MdSupportAgent } from 'react-icons/md'
import { Link, NavLink } from 'react-router-dom'
import ButtonToggle from "./buttons/ToggleButton"

const Navbar = () => {
  return (

    <header className="fixed top-0 left-0 w-full backdrop-blur-md z-50">

      <div className="max-w-[1520px] mx-auto px-4 sm:px-6 lg:px-8 border-b">
        <div className="flex items-center justify-between h-16">


          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-lg hidden md:flex">
              <MdSupportAgent className="text-4xl" />
            </div>
            <Link to="/" className="md:text-xl font-bold">
              SupportDesk
            </Link>
          </div>


          <div className="flex items-center space-x-3">
            <NavLink
              className={({ isActive }) => (isActive ? "hidden" : "")}
              to="/create"
            >
              <Button type="primary">
                <FaPlus className="h-4 w-4 md:mr-2" />
                New Ticket
              </Button>
            </NavLink>
            <ButtonToggle />
          </div>
        </div>
      </div>
    </header>


  )
}

export default Navbar
