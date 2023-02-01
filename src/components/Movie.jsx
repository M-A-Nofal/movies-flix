import React, { useState } from 'react';
import apiConfig from '../api/apiConfig';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import {AiOutlineYoutube} from 'react-icons/ai'; 
import { Link } from 'react-router-dom';
import {UserAuth} from '../context/AuthContext'
import {db} from '../firebase'
import {arrayUnion, doc, updateDoc} from 'firebase/firestore';
import { toast } from 'react-toastify';

const Movie = ({movie, title}) => {

    const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);
    const {user} = UserAuth();

    const notify = () => toast.error("Please sign in to show more !");

    const movieId = doc(db, 'users', `${user?.email}`);

    const saveMovie = async () => {
        if (user?.email) {
            setLike(!like);
            setSaved(true);
            await updateDoc(movieId, {
                saveMovie: arrayUnion ({
                    id: movie.id,
                    title: movie.title,
                    img: movie.backdrop_path
                }),
            });
        }else {
            notify();
        }
    };
    const checkUser = ()=> {
        if(!user?.email) {
            notify();
        }
    }

  return (
    <>
        <div className='w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] inline-block cursor-pointer relative p-2 '>
            <img className='w-full h-auto block' src={`${apiConfig.w500Image(movie?.backdrop_path)}`} alt={movie?.title} />
            <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                {user?.email ? (
                    <Link to={`/${title}/${movie?.id}`} >
                        <div onClick={checkUser} className='flex justify-center items-center h-full text-center'>
                            <p className='white-space-normal text-xs md:text-sm font-bold mb-11'>
                                {movie?.title}
                            </p>
                            <AiOutlineYoutube size={30} className='absolute text-gray-300'/>
                        </div>
                    </Link>
                ) : (
                    <div onClick={checkUser} className='flex justify-center items-center h-full text-center'>
                    <p className='white-space-normal text-xs md:text-sm font-bold mb-11'>
                        {movie?.title}
                    </p>
                    <AiOutlineYoutube size={30} className='absolute text-gray-300'/>
                </div>
                )}
                <p onClick={saveMovie}>
                    {like? <FaHeart className=' absolute top-4 left-4 text-gray-300' /> : <FaRegHeart className=' absolute top-4 left-4 text-gray-300' />}
                </p>
            </div>
        </div>
    </>
  )
}

export default Movie