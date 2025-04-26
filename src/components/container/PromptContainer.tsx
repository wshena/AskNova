import React from 'react'

const PromptContainer = ({content}:{content:string}) => {
  return (
    <div className='w-fit p-[1rem] rounded-[10px] bg-gray-800 text-white'>
      <p>{content}</p>
    </div>
  )
}

export default PromptContainer