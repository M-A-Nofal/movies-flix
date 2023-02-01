import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiConfig from '../../api/apiConfig';
import VideoList from './VideoList';
import Category from '../../components/Category';
import apiRequests from '../../api/apiRequests';
import Casts from './Casts';
import Loading from '../../components/Loading';

const MovieDetails = () => {
  const {id} = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoding] = useState(false);

  useEffect(()=>{
    const getMovieDetails =  async () => {
      setLoding(true);
      const res = await axios.get(apiRequests.requestDetails(id)).then((res)=>{
        return res;
      })
      setMovie(res.data);
      window.scrollTo(0,0);
      setLoding(false)
  }
  getMovieDetails();
  },[id]);

  return (
    <>
    {loading ? <Loading /> : (
      <div className='w-full h-screen text-white'>
        <div className='w-full h-full'>
          <div className=' absolute w-full h-screen bg-gradient-to-r from-black'></div>
          <img className=' w-full h-full object-cover' src={`${apiConfig.originalImage(movie?.backdrop_path)}`} alt={movie?.title} />
          <div className=' absolute w-full top-[30%] p-4 md:p-8'>
            <h1 className=' text-3xl md:text-5xl font-bold '>{movie?.title}</h1>
            <div className=' flex mt-3 '>
              {
                movie.genres && movie.genres.slice(0, 3).map((genre, i) => (
                  <span key={i} className=' cursor-pointer hover:border-red-500 hover:bg-red-600 w-[70] py-2 px-6 border rounded-full mr-3 mt-3 text-xs text-bold hoverTransition'>{genre.name}</span>
                ))
              }
            </div>
            <div className='my-5'>
              <button className=' border rounded-full bg-red-600 border-red-500 text-white py-2 px-5 hover:border-gray-500 hover:bg-opacity-0 hoverTransition'>Play</button>
              <button className=' border rounded-full text-white border-gray-500 py-2 px-5 ml-4 hover:bg-red-600 hover:border-red-500 hoverTransition'>Watch Trailer</button>
            </div>
            <p className='text-gray-400 text-sm pb-2'>Released: {movie?.release_date}</p>
            <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[40%]'>{movie?.overview}</p>
            <div className='container mt-28'>
              <h2 className='text-white mt-2 font-bold md:text-2xl px-6 py-1  w-fit'>Casts</h2>
              <div>
                <Casts id={movie.id} />
              </div>
            </div>
            <div className=' mt-28'>
              <div className='  py-0 px-8'>
                <VideoList id={movie.id} />
              </div>
              <div>
                <div>
                  <Category title='Similar' catId='7' fetchData={apiRequests.requestSimilar(id)}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default MovieDetails