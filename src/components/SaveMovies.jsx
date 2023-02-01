import React, { useEffect, useState } from 'react'
import apiConfig from '../api/apiConfig';
import {AiOutlineYoutube} from 'react-icons/ai'; 
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { db } from '../firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { AiOutlineClose } from 'react-icons/ai';
import { UserAuth } from '../context/AuthContext';

const SaveMovies = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();

  const slideToLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideToRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  useEffect(() => {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
      setMovies(doc.data()?.saveMovie);
    });
  }, [user?.email]);

  const movieRef = doc(db, 'users', `${user?.email}`)
  const deleteShow = async (passedID) => {
      try {
        const result = movies.filter((item) => item.id !== passedID)
        await updateDoc(movieRef, {
          saveMovie: result
        })
      } catch (error) {
          console.log(error)
      }
  }
  return (
    <> 
    {movies && (
      <>
        <div className='flex justify-between items-center mt-2 '>
          <h2 className='text-white font-bold md:text-xl p-4'>My Movies</h2>
        </div>
        <div className=' relative flex items-center group'>
          <MdChevronLeft size={40} onClick={slideToLeft} className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' />
            <div id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative '>
              {movies.map((movie, id) => (
                <div key={id} className='w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] inline-block cursor-pointer relative p-2 '>
                  <img className='w-full h-auto block' src={`${apiConfig.w500Image(movie?.img)}`} alt={movie?.title} />
                  <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                    <div className='flex justify-center items-center h-full text-center'>
                      <p className='white-space-normal text-xs md:text-sm font-bold mb-11'>
                        {movie?.title}
                      </p>
                      <p onClick={()=> deleteShow(movie.id)} className='absolute text-gray-300 top-4 right-4'><AiOutlineClose /></p>
                        <AiOutlineYoutube size={30} className='absolute text-gray-300'/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          <MdChevronRight size={40} onClick={slideToRight} className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' />
        </div>
      </>
    )}
    </>
  )
}

export default SaveMovies