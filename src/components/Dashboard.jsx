import React from 'react'
import Sidebar from './Sidebar'


const Dashboard = () => {
  return (

      
  <section className='overflow-y-scroll h-screen'>
  <div className='flex flex-col'>
    {/* navbar */}
       
      
     {/* main */}
   <div className='mx-10'>
    {/* filter */}

<div className='flex justify-between'>
    <div className='flex flex-col'>
        <label>Branch</label>
        <select>
            <option>All</option>
        </select>
    </div>

    {/* date */}
    <div className='flex gap-8'>
    <div className='flex flex-col'>
    <label>From</label>
    <input type='date' />
    </div>
    <div className='flex flex-col'>
    <label>To</label>
    <input type='date' />
    </div>
    </div>
</div>




   </div>
    </div>
  </section>

  )
}

export default Dashboard