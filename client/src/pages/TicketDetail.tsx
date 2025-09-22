import { FaPaperPlane, FaRegComment, FaUser } from "react-icons/fa"
import BackButton from "../components/buttons/BackButton"
import { SlCalender } from "react-icons/sl"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { MdOutlineUpdate } from "react-icons/md";

type ticketDetailType = {
    title: string,
    description: string,
    status: string
    priority: string
    _id: string
    createdAt: string
    updatedAt : string
    comments: string[]
}

const TicketDetail = () => {

    const { id } = useParams();
    const [data, setData] = useState<ticketDetailType>()
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);


    //adding comment
    const handleAddComment = async () => {
        if (!newComment.trim()) {
            toast.error("Please write the comment.")
            return;
        }
        try {
            setLoading(true);
            await axios.patch(`http://localhost:8000/ticket/update/${id}`, {
                comment: newComment,
            });
           toast.success("Comment added successfully.");
            setNewComment("");
        } catch (error) {
            console.log("Error adding comment");
        } finally {
            setLoading(false);
        }
    };

    //updating status of the ticket
    const handleStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value  
        try {
            setLoading(true);
            await axios.patch(`http://localhost:8000/ticket/update/${id}`, { "status": newStatus })
            toast.success("Status updated successfully.");
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    //fetching ticket by id
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:8000/ticket/ticket/${id}`)
            setData(response.data)
        }
        fetchData()
    }, [loading])

    //formating time and date
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
        <div className="xl:px-60 lg:px-40 md:px-10 px-5 pt-15">

            <BackButton />
            <div>

            {/* Header With Title */}
                <div className="border rounded-lg dark:border-white/50 border-black dark:bg-black bg-gray-100  md:p-5 p-3 mb-5">
                    <div className="flex justify-between ">
                        <div className="flex gap-x-4 sm:flex-row flex-col gap-y-3">
                            <p>#{data?._id}</p>
                            <p className={`${data?.priority === "High" ? 'bg-red-500 ' : data?.priority === "Medium" ? 'bg-blue-500 ' : data?.priority === "Low" ? 'bg-green-500 ' : ''} rounded-xl text-sm  px-3 py-0.5 font-medium w-fit`}>{data?.priority} Priority</p>
                            <p className={`${data?.status === "Open" ? 'bg-red-500 ' : data?.status === "In Progress" ? 'bg-yellow-500 ' : data?.status === "Resolved" ? 'bg-green-500 ' : ''} rounded-xl text-sm  px-4 py-0.5 font-medium w-fit`}>{data?.status}</p>
                        </div>
                    </div>

                    <div className="flex pt-5 justify-between md:flex-row flex-col gap-y-3">
                        <h1 className="md:text-2xl text-lg md:font-semibold ">{data?.title}</h1>
                        <div>
                            <select name="status" id="" className="border rounded-sm dark:border-white/50 px-3 py-0.5 dark:bg-black border-black bg-gray-100 outline-none" value={data?.status} onChange={handleStatus}>
                                <option value="Resolved">Resolved</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Open">Open</option>
                            </select>
                        </div>
                    </div>
                </div>


                
                <div className="flex md:flex-row flex-col gap-x-6">
                    <div className="md:w-180">

                        {/* Description Section */}
                        <div className="border dark:border-white/50 border-black dark:bg-black bg-gray-100 md:p-5 p-3 rounded-lg mb-5">
                            <h1 className="md:text-2xl text-xl font-medium pb-3">Description</h1>
                            <p>{data?.description}</p>
                        </div>

                        {/* Comment Section */}
                        <div className="border dark:border-white/50 border-black dark:bg-black bg-gray-100 md:p-5 p-3 rounded-lg mb-5">

                            <div className="">
                                <h3 className="flex items-center gap-x-4 md:text-2xl text-xl font-medium pb-5"><FaRegComment /> Comments ({data?.comments.length})</h3>

                                {
                                    data?.comments.length !== 0 ? (<div className="flex gap-x-3 pb-3">
                                        <FaUser className="md:text-2xl text-xl mt-2" />

                                        <div >
                                            <h3 className="font-semibold md:text-lg">Admin</h3>
                                            {
                                                data?.comments.map((k) => (
                                                    <p className="font-serif md:font-light">{k}</p>
                                                ))
                                            }
                                        </div>
                                    </div>) : ("")
                                }

                                <hr className="border dark:border-white/30" />
                                <div className="flex flex-col gap-y-3 pt-3 pb-7">
                                    <label className="font-semibold" htmlFor="">Add A Comment</label>
                                    <textarea className='dark:bg-gray-950 outline-none dark:border-white/50 border bg-gray-200 border-black  px-3 rounded-md py-0.5 mx-0.5' name="" id="" rows={4}
                                        placeholder="Write your comments here..." onChange={(e) => setNewComment(e.target.value)} value={newComment}></textarea>

                                </div>
                                <button className='flex md:w-50 md:px-0 px-3 items-center md:gap-5 gap-3 hover:bg-blue-400 bg-blue-500 justify-center py-2 rounded-md md:font-semibold' onClick={handleAddComment}><FaPaperPlane />Add Comment</button>
                            </div>
                        </div>
                    </div>

                    {/* Ticket Information Section */}
                    <div className="md:w-84 lg:h-90 md:h-92 border md:mb-0 mb-5 dark:border-white/50 border-black dark:bg-black bg-gray-100 p-3 rounded-lg">
                        <h2 className="text-xl font-medium">Ticket Information</h2>
                        <p className="pt-4 pb-1">Created At</p>
                        <p className="flex items-center gap-x-3"><SlCalender className="opacity-90" />{formatDateTime(data?.createdAt)}</p>
                        
                        {data?.updatedAt.length !== 0 ? (<div><p className="pt-4 pb-1">Last Updated At</p>
                        <p className="flex items-center gap-x-2"><MdOutlineUpdate className="opacity-90 text-xl"/>{formatDateTime(data?.updatedAt)}</p></div>) : ("")}
                        
                        
                        <p className="py-5">Priority <span className={`${data?.priority === "High" ? 'bg-red-500 ' : data?.priority === "Medium" ? 'bg-blue-500 ' : data?.priority === "Low" ? 'bg-green-500 ' : ''} rounded-xl text-sm  px-3 py-0.5 font-medium`}>{data?.priority}</span></p>
                        <div className="space-y-2">
                            <p>Status</p>
                            <div className="flex gap-x-1">
                                <span className="text-2xl">{data?.status === "Resolved" ? (<IoCheckmarkDoneCircleOutline />) : ("")}</span>
                                <p className={`${data?.status === "Open" ? 'bg-red-500 ' : data?.status === "In Progress" ? 'bg-yellow-500 ' : data?.status === "Resolved" ? 'bg-green-500 ' : ''} rounded-xl text-sm  px-4 py-0.5 font-medium w-fit`}>{data?.status}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default TicketDetail