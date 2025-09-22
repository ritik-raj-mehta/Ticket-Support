import { FaPaperPlane } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import BackButton from '../components/buttons/BackButton'
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

type FormDataType = {
  title: string
  description: string
  priority: string
}

const TicketForm = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState<FormDataType>({
    title: "",
    description: "",
    priority: "Low"
  })


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      if (!formData.title.trim() || !formData.description.trim()) {
        toast.error("All fields are required.");
        return;
      }

      await axios.post("http://localhost:8000/ticket/create", formData)
      toast.success("Your ticket added successfully.")
      navigate("/")

      setFormData({
        title: "",
        description: "",
        priority: "Low"
      })

    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div className='flex justify-center pt-16'>
      <div className='pb-10 px-3 lg:w-180 md:w-150 '>
        <BackButton />
        <h1 className='md:text-3xl text-2xl font-semibold pb-2'>Create New Ticket</h1>
        <p className='opacity-70 text-sm font-medium pb-10'>Describe your issue in detail so our support team can help you quickly.</p>

        <div className='dark:border-white/50 border-black dark:bg-black bg-gray-100 border px-4 rounded-lg'>
          <h2 className='md:text-2xl text-xl font-semibold py-5'>Ticket Information</h2>
          <div>
            <form className='space-y-4' onSubmit={handleForm}>

              {/* Title Input */}
              <div className='flex flex-col gap-y-1'>
                <label className='md:text-lg font-semibold' htmlFor="title">Title</label>
                <input type="text" className='dark:bg-gray-950 border-black bg-gray-100 outline-none dark:border-white/50 border md:px-3 px-2 rounded-md py-0.5 mx-0.5' id='title' placeholder='Brief description your issue...' onChange={handleChange} name='title' value={formData.title} />
              </div>

              {/* Description Input*/}
              <div className='flex flex-col gap-y-1'>
                <label className='md:text-lg font-semibold' htmlFor="description">Description</label>
                <textarea className='dark:bg-gray-950 outline-none dark:border-white/50 border-black bg-gray-100 border md:px-3 px-2 rounded-md py-0.5 mx-0.5' name="description" id="description" rows={5}
                  placeholder='Please provide the detailed information about the issue, including steps to reproduce if applicable...' value={formData.description} onChange={handleChange}></textarea>
              </div>

              {/* Priority Dropdown */}
              <div className='flex flex-col md:pb-5 space-y-1'>
                <label className='md:text-lg font-semibold' htmlFor="">Priority</label>
                <select className='dark:bg-black border-black bg-gray-100 outline-none border py-0.5 rounded-sm dark:border-white/50' name="priority" id="" onChange={handleChange} value={formData.priority}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              {/* Buttons */}
              <div className='flex gap-5 md:pb-10 pb-5 md:flex-row flex-col-reverse'>
                <Link to='/' className='md:w-1/2 text-center border dark:border-white/50 border-black dark:bg-black bg-gray-100 rounded-md py-1'>Cancel</Link>

                <button type='submit' className='flex md:w-1/2 items-center gap-5 bg-blue-400 border-black border dark:bg-blue-500 justify-center py-1 rounded-md font-semibold'><FaPaperPlane />Create Ticket</button>
              </div>

            </form>
          </div>
        </div>
      </div>

    </div>
  )
}

export default TicketForm