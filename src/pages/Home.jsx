import React, { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Category from '../components/Category'
import apiRequests from '../api/apiRequests'
import axios from 'axios';
import Loading from '../components/Loading';

function Home() {
  // page header logic
  const [movies, setMovies] = useState([]);
  const coverMovie = movies[Math.floor(Math.random() * movies.length)]

  const [loading, setLoding] = useState(false);

  useEffect(()=>{
    const getMovies =  async () => {
      setLoding(true);
      const res = await axios.get(apiRequests.requestUpcoming).then((res)=>{
          return res;
      })
      setMovies(res.data.results);
      window.scrollTo(0,0);
      setLoding(false)
  }
  getMovies();
  
  },[]);

  return (
    <> {loading ? <Loading /> : (
      <>
      <PageHeader coverMovie={coverMovie} />
      <Category catId='1' title="Popular" fetchData={apiRequests.requestPopular} />
      <Category catId='2' title="Top Rated" fetchData={apiRequests.requestTopRated} />
      <Category catId='3' title="Trending" fetchData={apiRequests.requestTrending} />
      <Category catId='4' title="Now Playing" fetchData={apiRequests.requestNowPlaying} />
      <Category catId='5' title="Upcoming" fetchData={apiRequests.requestUpcoming} />
      <Category catId='6' title="Horror" fetchData={apiRequests.requestHorror} />
      </>
    )}

    </>
  )
}

export default Home