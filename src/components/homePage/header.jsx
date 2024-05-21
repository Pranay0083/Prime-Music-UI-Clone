import { useNavigate } from "react-router-dom";
import Ama from "../assets/pngegg.png"

function Header({ isLogin, setIsLogin }){
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/signin')
    }
    return(
        <>
        <div className="flex justify-between items-center w-full h-16 bg-black pl-2 pb-10">
            <div className="items-center">
                <img src={Ama} alt="Brand Logo" className="h-10" />
            </div>
            <button
                onClick={handleSignIn}
                className="px-6 py-3 bg-cyan-400 rounded-full border border-teal-700 hover:bg-cyan-500 hover:border-teal-800 transition duration-300 ease-in-out shadow-lg"
            >
                {isLogin ? 'Sign Out' : 'Sign In'}
            </button>
        </div>
        <hr className="border-gray-700"/>
        </>
        
    )
}

export default Header