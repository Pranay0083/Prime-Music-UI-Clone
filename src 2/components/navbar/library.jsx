
import { useState } from 'react';
import * as React from 'react';

export default function Library() {
    const [showLib, setShowLib] = useState(false);

    return (
        <div className={`w-full flex self-center items-center justify-between relative`}>
            <div 
                className="text-zinc-500 cursor-pointer p-4 px-12" 
                onClick={() => setShowLib(!showLib)}
            >
                <i className="fa-solid fa-headphones pr-2"></i>
                Library
                <i className="fa-solid fa-caret-down pl-2"></i>
            </div>
            {showLib && (
                <div className="absolute top-full mt-2 right-0 bg-black text-white rounded-xl border-gray-600 border-2 z-10">
                    <div className='w-40 pt-3 py-2 px-4 justify-center content-center border-b-2 border-gray-600' >
                        <button type="button" title="View Profile">
                            Music
                        </button>
                    </div>
                    <div className='w-40 py-2 px-4 justify-center content-center' >
                        <button type="button" title="View Profile">
                        Albums
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
