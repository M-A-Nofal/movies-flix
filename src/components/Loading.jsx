import React from 'react';
import { Puff } from 'react-loader-spinner'


const Loading = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <Puff
            height="80"
            width="80"
            radius={1}
            color="#dc2626"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    </div>
  )
}

export default Loading