import axios from 'axios'
import { useEffect, useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import { LuTicketSlash } from 'react-icons/lu'
import DashboardCard from './DashboardCard'
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5'
import { RiProgress2Line } from 'react-icons/ri'
import { FaRegFrownOpen } from 'react-icons/fa'
import Paginations from './Paginations'
import { PiHourglassHighBold } from 'react-icons/pi'
import { toast } from 'react-toastify'

export type ticketDetailType = {
    title: string,
    description: string,
    status: string
    priority: string
    _id: string
    createdAt: string
}

const Dashboard = () => {
    const [ticketDetails, setTicketDetails] = useState<ticketDetailType[]>([])
    const [filteredTickets, setfilteredTickets] = useState<ticketDetailType[]>([])
    const [search, setSearch] = useState<string>("")
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 9 //total cards shown in single page
    const [filterState, setFilterState] = useState({
        status: "all",
        priority: "all"
    })


    const handleStatus = async (e: React.ChangeEvent<HTMLSelectElement>, id: string) => {
        const newStatus = e.target.value
        try {
            setLoading(true);
            await axios.patch(`http://localhost:8000/ticket/update/${id}`, { "status": newStatus })
            toast.success("Status updated successfully.")
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id: string) => {
        try {
            setLoading(true);
            await axios.delete(`http://localhost:8000/ticket/delete/${id}`)
            toast.warn("Ticket deleted successfully.")
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    //fetching all tickets detail
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get("http://localhost:8000/ticket/alltickets")
                const data = response.data
                setTicketDetails(data)
                setfilteredTickets(data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchdata()
    }, [loading])


    //filter tickets on basis of status, priority and search
    useEffect(() => {
        let filtered = ticketDetails;

        if (filterState.status !== "all") {
            filtered = filtered.filter(item => item.status === filterState.status);
        }

        if (filterState.priority !== "all") {
            filtered = filtered.filter(item => item.priority === filterState.priority);
        }

        if (search.trim() !== "") {
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(search.toLowerCase())
            );
        }
        setfilteredTickets(filtered);
    }, [search, filterState, ticketDetails]);

    const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterState(prev => ({ ...prev, [e.target.name]: e.target.value }))
        setCurrentPage(1)
    }

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setCurrentPage(1)
    }

    //pagination logic 
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage
    const currentPosts = filteredTickets.slice(firstPostIndex, lastPostIndex)

    return (
        <div className='pb-3'>
            <div className='md:py-8 my-4'>
                <h1 className='lg:text-4xl md:text-3xl text-2xl font-serif pb-1 font-bold'>Support Dashboard</h1>
                <p className='opacity-75 md:font-medium'>Manage and track your support ticket</p>
            </div>

            {/* Ticket Count Section */}
            <div className='grid lg:grid-cols-5 gap-y-3 gap-x-5 pb-5'>

                <div className='border dark:border-white/50 border-black bg-gray-100 p-3 rounded-md
                dark:bg-black hover:shadow-black dark:hover:shadow-amber-50 shadow-sm'>
                    <p className='flex justify-between items-center text-lg'>Total Tickets <LuTicketSlash /></p>
                    <span className='text-xl font-medium'>{ticketDetails.length}</span>
                </div>

                <div className='border dark:border-white/50 border-black bg-gray-100 p-3 rounded-md
                dark:bg-black hover:shadow-black dark:hover:shadow-amber-50 shadow-sm'>
                    <p className='flex justify-between items-center text-lg'>Open <FaRegFrownOpen /></p>
                    <span className='text-xl font-medium'>{ticketDetails.filter(t => t.status === "Open").length}</span>
                </div>

                <div className='border dark:border-white/50 border-black bg-gray-100 p-3 rounded-md
                dark:bg-black hover:shadow-black dark:hover:shadow-amber-50 shadow-sm'>
                    <p className='flex justify-between items-center text-lg'>In Progress <RiProgress2Line /></p>
                    <span className='text-xl font-medium'>{ticketDetails.filter(t => t.status === "In Progress").length}</span>
                </div>

                <div className='border dark:border-white/50 border-black bg-gray-100 p-3 rounded-md
                dark:bg-black hover:shadow-black dark:hover:shadow-amber-50 shadow-sm'>
                    <p className='flex justify-between items-center text-lg'>Resolved <IoCheckmarkDoneCircleOutline /></p>
                    <span className='text-xl font-medium'>{ticketDetails.filter(t => t.status === "Resolved").length}</span>
                </div>

                <div className='border dark:border-white/50 border-black bg-gray-100 p-3 rounded-md
                dark:bg-black hover:shadow-black dark:hover:shadow-amber-50 shadow-sm'>
                    <p className='flex justify-between items-center text-lg'>High Priority <PiHourglassHighBold /></p>
                    <span className='text-xl font-medium'>{ticketDetails.filter(t => t.priority === "High").length}</span>
                </div>
                
            </div>


            {/* Search and Filter Section */}
            <div className='flex lg:flex-row flex-col gap-4 mt-8 mb-3'>
                <div className='flex items-center gap-2 border dark:border-white/50 border-black dark:bg-black bg-gray-100 p-1 px-2 rounded-md lg:w-270  hover:shadow-black dark:hover:shadow-amber-50 shadow-sm'>
                    <BiSearchAlt className='opacity-90' />
                    <input
                        type="text"
                        placeholder='Search Ticket...'
                        className='outline-none w-full'
                        onChange={handleSearch}
                        value={search}
                    />
                </div>
                <div className='md:space-x-4 space-x-10 flex'>
                    <select
                        name="status"
                        className='dark:bg-black border-black bg-gray-100 w-32 outline-none border dark:border-white/50 md:py-3 py-1.5 px-1 rounded-md  hover:shadow-black dark:hover:shadow-amber-50 shadow-sm'
                        onChange={handleFilter}
                    >
                        <option value="all">All Status</option>
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                    </select>

                    <select
                        name="priority"
                        className='dark:bg-black border-black bg-gray-100 w-30 outline-none border dark:border-white/50 md:py-3 py-1.5 px-1 rounded-md  hover:shadow-black dark:hover:shadow-amber-50 shadow-sm'
                        onChange={handleFilter}
                    >
                        <option value="all">All Priority</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
            </div>


            {/* Ticket Cards Section */}
            <div className='md:pt-8  pt-4 mb-3.5'>
                <h1 className='text-2xl font-semibold pb-5'>Tickets ({filteredTickets.length})</h1>
                <DashboardCard ticketDetails={currentPosts} handleDelete={handleDelete} handleStatus={handleStatus} />
                {/* Pagination Section */}
                <Paginations totalPosts={filteredTickets.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
            </div>
        </div>
    )
}

export default Dashboard


