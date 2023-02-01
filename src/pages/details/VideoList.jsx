import React, { useEffect, useRef, useState } from 'react'
import apiConfig from '../../api/apiConfig';
import axios from 'axios';

const VideoList = ({id}) => {
  const [videos, setVideos] = useState([]);

  useEffect(()=>{
    const requestVideos = `${apiConfig.baseUrl}/movie/${id}/videos?api_key=${apiConfig.apiKey}&language=en-US&page=1`
    const getMovieVideos =  async () => {
      const res = await axios.get(requestVideos).then((res)=>{
        return res;
      })
      setVideos(res.data.results.slice(0, 5))
    }
    getMovieVideos();
  },[id])

  return (
    <>
      {videos && (
        videos.map((video, id) => (
          <Video key={id} video={video} />
        ))
      )}
    </>
  )
};

const Video = ({video}) => {
  const iframeRef = useRef(null);

  useEffect(()=>{
    const height = iframeRef.current.offsetWidth * 9 / 16 + 'px';
    iframeRef.current.setAttribute('height', height);
  },[])

  return (
    <>
      <div className=' mb-12'>
        <div className=' mb-6'>
          <h2>{video.name}</h2>
        </div>
        <iframe 
          src={`https://www.youtube.com/embed/${video.key}`}
          ref={iframeRef}
          width='100%'
          title='video'
        >
        </iframe>
      </div>
    </>
  )
}

export default VideoList;