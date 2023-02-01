import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Movie from './Movie';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';


const Category = ({title, fetchData, catId}) => {
    

    const [movies, setMovies] = useState([]);

    useEffect(()=> {
        const getCategory =  async () => {
            const res = await axios.get(fetchData).then((res)=>{
                return res;
            })
            setMovies(res.data.results);
        }
        getCategory();
    },[fetchData]);

    const slideToLeft = () => {
        let slider = document.getElementById('slider' + catId);
        slider.scrollLeft = slider.scrollLeft - 500;
    };

    const slideToRight = () => {
        let slider = document.getElementById('slider' + catId);
        slider.scrollLeft = slider.scrollLeft + 500;
    };

  return (
    <>
        <div className='flex justify-between items-center mt-2 '>
            <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
            <Link to={title} className=' border text-white border-gray-500 py-2 px-5 rounded-full mr-2 hover:bg-red-600 hover:border-red-500 hoverTransition'>View More</Link>
        </div>
        <div className=' relative flex items-center group'>
            <MdChevronLeft size={40} onClick={slideToLeft} className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' />
                <div id={'slider' + catId} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative '>
                    {movies.map((movie, id) => (
                        <Movie key={id} movie={movie} title={title}/>
                    ))}
                </div>
            <MdChevronRight size={40} onClick={slideToRight} className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' />
        </div>
    </>
  )
}

export default Category