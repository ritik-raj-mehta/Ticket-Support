import { Button } from 'antd'
import { SlCalender } from 'react-icons/sl'
import { Link } from 'react-router-dom'
import type { ticketDetailType } from './Dashboard'

type ticketType = {
    ticketDetails: ticketDetailType[]
    handleDelete: (id: string) => void
    handleStatus: (e: React.ChangeEvent<HTMLSelectElement>, id: string) => void
}

const DashboardCard = ({ ticketDetails, handleDelete, handleStatus }: ticketType) => {
    //formate the date and time
    const formatDateTime = (dateString: string | undefined) => {
        if (!dateString) return "Date not available";
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    return (

        <div>
            {ticketDetails.length !== 0 ? (<div className='grid xl:grid-cols-3 md:grid-cols-2 gap-5'>

                {
                    ticketDetails.map((data, k) => (

                        <div className=' border dark:border-white/50 border-black 
                        dark:bg-black bg-gray-100 p-3 rounded-md  hover:shadow-black dark:hover:shadow-amber-50 shadow-sm' key={k}>
                            <div className=' flex md:gap-x-4 gap-x-2'><p>#{data._id.slice(20,)}</p>
                                <p className={`${data.priority === "High" ? 'bg-red-500 ' : data.priority === "Medium" ? 'bg-blue-500 ' : data.priority === "Low" ? 'bg-green-500 ' : ''} rounded-xl text-sm  px-3 py-0.5 font-medium`}>{data.priority}</p>

                                <p className={`${data.status === "Open" ? 'bg-red-500 ' : data.status === "In Progress" ? 'bg-yellow-500 ' : data.status === "Resolved" ? 'bg-green-500 ' : ''} rounded-xl text-sm  px-3 py-0.5 font-medium`}>{data.status}</p>
                            </div>

                            <div>
                                <h1 className='text-lg font-medium pt-3'>{data.title}</h1>
                                <p className='opacity-80 font-medium md:text-md text-sm py-1'>{data.description}</p>
                            </div>

                            <div className='flex lg:flex-row flex-col justify-between py-2.5 lg:items-center gap-y-2'>
                                <p className="flex items-center gap-x-3 text-sm"><SlCalender className="opacity-90" /> {formatDateTime(data?.createdAt)}</p>
                                <Link to={`/ticket/${data._id}`} className='dark:bg-gray-700/80 dark:hover:bg-gray-800/80 
                                border-black border bg-gray-300 hover:bg-gray-400 py-1 px-2 rounded-md text-sm md:font-medium w-fit '>View Detail</Link>
                            </div>

                            <div className='flex justify-between py-1'>
                                <div className='space-x-2 my-auto'>
                                    <label htmlFor="status">Status</label>
                                    <select  id="status" className='outline-none border dark:border-white/50 border-black p-0.5 rounded-md dark:bg-black bg-blue-200' onChange={(e) => handleStatus(e, data._id)} value={data.status}>
                                        <option value="Open">Open</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Resolved">Resolved</option>
                                    </select>
                                </div>


                                <Button onClick={() => handleDelete(data._id)} danger type='primary'>Delete</Button>

                            </div>
                        </div>

                    ))
                }

            </div>) : (<div><h1 className='text-center md:text-4xl text-2xl md:py-16 py-10'>No Ticket Found</h1></div>)}
        </div>

    )
}



export default DashboardCard