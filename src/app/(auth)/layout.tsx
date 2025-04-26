import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className='w-[100vw] h-[100vh] flex items-center justify-center'>
      {children}
    </main>
  )
}

export default layout