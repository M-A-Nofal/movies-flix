import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { useParams } from 'react-router-dom';
import apiRequests from '../api/apiRequests';
import axios from 'axios';
import CatMovie from '../components/CatMovie';
import Loading from '../components/Loading';


function CatPage() {
  const {catName} = useParams();
  const [movies, setMovies] = useState([]);

  const [loading, setLoding] = useState(false);

  const coverMovie = movies[Math.floor(Math.random() * movies.length)]

  let fetchDataFromCatigoryName;
  
  switch (catName) {
    case "Popular":
      fetchDataFromCatigoryName = apiRequests.requestPopular;
      break;
    case "Top Rated":
      fetchDataFromCatigoryName = apiRequests.requestTopRated;
      break;
    case "Trending":
      fetchDataFromCatigoryName = apiRequests.requestTrending;
      break;
    case "Now Playing":
      fetchDataFromCatigoryName = apiRequests.requestNowPlaying;
      break;
    case "Upcoming":
      fetchDataFromCatigoryName = apiRequests.requestUpcoming;
      break;
    case "Horror":
      fetchDataFromCatigoryName = apiRequests.requestHorror;
      break;
  
    default:
      break;
  }

  useEffect(()=>{
    const getCatPage =  async () => {
      setLoding(true);
      const res = await axios.get(fetchDataFromCatigoryName).then((res)=>{
          return res;
      })
      setMovies(res.data.results);
      window.scrollTo(0,0);
      setLoding(false)
  }
  getCatPage();

  },[fetchDataFromCatigoryName])

  return (
    <>
      {loading ? <Loading /> : (
        <>
          <PageHeader coverMovie={coverMovie}/>
          <div className='relative w-[20%] m-auto'>
            <h2 className='text-white mt-2 text-center font-bold md:text-xl p-4 after:hover:transition-all ease-in-out delay-150 duration-300   after:absolute  after:block after:bg-red-500 after:bottom-0 after:left-[50%] after:translate-x-[-50%] after:w-0 after:h-1 after:hover:w-32'>{catName}</h2>
          </div>
          <div className=' grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {movies.map((movie, id)=>(
              <CatMovie key={id} movie={movie} catName={catName}/>
              ))}
          </div>
        </>
      ) }
    </>
  )
}

export default CatPage