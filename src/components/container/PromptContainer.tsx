import React from 'react'

const PromptContainer = ({content}:{content:string}) => {
  return (
    <div className='w-fit p-[.8rem] md:p-[1rem] rounded-[10px] bg-gray-800 text-white'>
      <p className='text-[.9rem] md:text-[1rem]'>{content}</p>
    </div>
  )
}

export default PromptContainer