import React from 'react'

function ListInformation({title}) {
  return (
    <div className='flex flex-col gap-y-4 md:p-5  '>
        <h4 className='text-black font-inter font-bold text-16'>{title}</h4>
        <div className='flex flex-col gap-y-2'>
            <span className='flex gap-x-4'>
                <p className='text-black font-inter font-bold text-14'>Name</p>
                <p className='text-black font-inter font-bold text-14'>:</p>
                <p className='text-black font-inter font-bold text-14'>Manoah Luka k</p>
            </span> 

            <span className='flex gap-x-2'>
            <p className='text-black font-inter font-bold text-14'>Reg no</p>
                <p className='text-black font-inter font-bold text-14'>:</p>
                <p className='text-black font-inter font-bold text-14'>Uj/2015/ns/0190</p>
            </span>  

            <span className='flex gap-x-2'>
            <p className='text-black font-inter font-bold text-14'>Department</p>
                <p className='text-black font-inter font-bold text-14'>:</p>
                <p className='text-black font-inter font-bold text-14'>Mathematics</p>
            </span> 

            <span className='flex gap-x-2'>
                <p className='text-black font-inter font-bold text-14'>Faculty</p>
                <p className='text-black font-inter font-bold text-14'>:</p>
                <p className='text-black font-inter font-bold text-14'>Natural scinces</p>
            </span> 

            <span className='flex gap-x-2'>
            <p className='text-black font-inter font-bold text-14'>Institution:</p>
            <p className='text-black font-inter font-bold text-14'>:</p>
            <p className='text-black font-inter font-bold text-14'>University of jos</p>
            </span> 
        </div>
    </div>
  )
}

export default ListInformation