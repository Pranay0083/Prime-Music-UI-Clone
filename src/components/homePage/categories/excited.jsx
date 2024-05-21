import * as React from "react";
import { useNavigate } from "react-router-dom";

const Excited=()=>{
    const [excited, setExcited] = React.useState([])

    const navigate = useNavigate();

    const fetchExcited = async () => {
        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/musicx/song?mood=excited', {
                headers: {
                    'accept': 'application/json',
                    'projectID': 'f104bi07c490'
                }
            });
            const data = await response.json();
            console.log('setExcited', data)
            setExcited(data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    React.useEffect(()=>{
        fetchExcited();
    },[])

    return(
        <div  className='bg-black text-white pt-8 pl-5'>
            <div className='excited '>
                <h1 className='text-base font-bold text-neutral-300 px-3 py-2'>Excited Songs</h1>
                <div className='flex flex-row overflow-scroll scroll-smooth transition-[scroll] duration-[0.3s] ease-[ease-in-out]' >
                    {excited.map((item) => {
                        return (
                            <div
                                className='m-1'
                                onClick={() => {
                                    navigate(`/song/${item._id}`)
                                }}>
                                <img src={item.thumbnail} alt={(item.name) + 'thumbnail'} className='h-[220px] w-[220px] max-w-none rounded-md m-2' />
                                <div className="text-gray-500 w-48 overflow-hidden whitespace-nowrap text-ellipsis">
                                    <h2 className='text-white font-[500]'>{item.title}</h2>
                                    {item.artist.map((items) => {
                                        return (
                                            <span className='text-sm text-gray-500'>{items.name}, </span>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}


export default Excited;