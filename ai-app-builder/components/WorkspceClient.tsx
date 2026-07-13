import React from 'react'

const workspceClient = () => {
  return (
    <div className='flex h-[calc(180vh-4rem)] overflow-hidden bg-[#0a0a0a]'>
        {/* chat panal  */}
        <div className='w-[320px] shrink-0 border-r border-white/6 bg-[#0d0d0d] flex 
        items-center justify-center'>
          <p className='text-xs text-white/20'>chat panel coming soon</p>
        </div>

        {/* code panel  */}
        <div className='flex flex-col flex-1 overflow-hidden items-center justify-center'>
            <p className='text-xs text-white/20'>code panel coming soon</p>

        </div>
    </div>
  )
}

export default workspceClient