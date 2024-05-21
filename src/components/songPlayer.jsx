import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
const Songs = ({token}) => {
    const [songs, setSongs] = useState([])
    useEffect(() => {
        fetchSong();

    }, []);
    const { id } = useParams();
    const fetchSong = async () => {
        try {
            const response = await fetch(`https://academics.newtonschool.co/api/v1/musicx/song/${id}`, {
                headers: {
                    'accept': 'application/json',
                    'projectID': 'f104bi07c490',
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            console.log(data);
            setSongs(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    return (
        <div className="bg-black text-white pt-[70px] h-[100dvh] flex flex-col justify-center items-center ">
            {songs.length == 0 ?
            <h1>loading...</h1>
            :
            <>
            <div>
                <img src={songs.data.thumbnail} alt={songs.data.thumbnail} className="m-2 mb-5"/>
            </div>
            <h1 className='font-[700] text-4xl mb-3'>{songs.data.title}</h1>
            <div className='flex flex-row text-slate-400'><i className="fa-solid "/> {' '}{songs.data.featured}</div>
            {songs.data.artist.map((data)=>{
                return(
                <span className='text-slate-400'>{data.name}, </span>
            )})}
            <br></br>
            <audio src={songs.data.audio_url} controls className='mb-3 '></audio>
            </>
            }
        </div>
    )
}
export default Songs