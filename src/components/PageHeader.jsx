import React from 'react';
import apiConfig from '../api/apiConfig.js'

const PageHeader = ({coverMovie}) => {


  const sliceString = (str, num) => {
    if(str?.length > num) {
      return str.slice(0,200) + '';
    }else {
      return str;
    }
  };

  return (
    <div className='w-full h-screen text-white'>
      <div className='w-full h-full'>
        <div className=' absolute w-full h-screen bg-gradient-to-r from-black'></div>
        <img className=' w-full h-full object-cover' src={`${apiConfig.originalImage(coverMovie?.backdrop_path)}`} alt={coverMovie?.title} />
        <div className=' absolute w-full top-[25%] p-4 md:p-8'>
          <h1 className=' text-3xl md:text-5xl font-bold '>{coverMovie?.title}</h1>
          <div className='my-5'>
            <button className=' border bg-red-600 border-red-500 text-white py-2 px-5 hover:border-gray-500 hover:bg-opacity-0 hoverTransition'>Play</button>
            <button className=' border text-white border-gray-500 py-2 px-5 ml-4 hover:bg-red-600 hover:border-red-500 hoverTransition'>Watch Trailer</button>
          </div>
          <p className='text-gray-400 text-sm pb-2'>Released: {coverMovie?.release_date}</p>
          <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[40%]'>{sliceString(coverMovie?.overview, 200)}</p>
        </div>
      </div>
    </div>
  )
}

export default PageHeader