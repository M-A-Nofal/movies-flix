import React, { useEffect, useState } from 'react'
import apiConfig from '../../api/apiConfig';
import axios from 'axios';

const Casts = ({id}) => {
    const [casts, setCasts] = useState([]);

  
    useEffect(()=>{
    const requestDetails = `${apiConfig.baseUrl}/movie/${id}/credits?api_key=${apiConfig.apiKey}&language=en-US&page=1`
    const getMovieDetails =  async () => {
        const res = await axios.get(requestDetails).then((res)=>{
        return res;
        })
    setCasts(res.data.cast.slice(0, 5))
}
getMovieDetails();
},[id]);

  return (
    <div className='grid grid-cols-5 gap-3 w-3/4 py-0 px-8'>
        {casts && (
            casts.map((cast) => (
                <div className='hover:scale-110 hoverTransition' key={cast.cast_id}>
                    <div className='w-full'>
                        <img className='pt-8 bg-cover mb-2 w-100 rounded-xl ' src={apiConfig.w500Image(cast.profile_path)} alt="" />
                    </div>
                    <p className='text-sm'>{cast.name}</p>
                </div>
            ))
        )}
    </div>
  )
}

export default Casts