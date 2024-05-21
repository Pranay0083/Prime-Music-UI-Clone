import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignInForm({setIsLogin, setToken}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleOpenRegister = ()=>{
        navigate('/signup')
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        const user = {email:email, password:password, appType : "music"}
        try {
            const response = await fetch('https://academics.newtonschool.co/api/v1/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'projectID': 'f104bi07c490',
                    'accept': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const datas = await response.json();
            if (datas.status === "fail") {
                alert("Wrong email or password");
            }
            else {
                setIsLogin(true)
                setToken(datas.token)
                navigate('/')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
        <form onSubmit={handleSignIn} className="drop-shadow-sm	 flex flex-col px-9 py-12 mt-6 bg-white rounded-lg border border-solid border-zinc-100 max-md:px-5 max-md:max-w-full ">
            <h2 className="text-4xl text-zinc-800 max-md:max-w-full">Sign in</h2>
            <label htmlFor="email" className="mt-7 text-xl text-stone-700 max-md:max-w-full ">Enter Your Email</label>
            
            <input
                id="email"
                type="email"
                placeholder="Enter Your Email"
                onChange={(e)=>setEmail(e.target.value)}
                className="border-2 flex flex-col justify-center px-1.5 py-1.5 mt-1.5 bg-black bg-opacity-0 max-md:max-w-full rounded-md"
            />
            <label htmlFor="password" className="mt-1.5 text-lg text-neutral-700 max-md:max-w-full ">Enter Your Password</label>
            <input
                id="password"
                type="password"
                placeholder="Enter Your Password"
                onChange={(e)=>setPassword(e.target.value)}
                className="border-2 flex flex-col justify-center px-1.5 py-1 mt-1.5 bg-black bg-opacity-0 max-md:max-w-full rounded-md" 
            />
            
            <button
                type="submit"
                onClick={handleSignIn}
                className="wflex flex-col px-1.5 py-1 mt-9 text-lg text-lime-900 whitespace-nowrap  max-md:max-w-full  justify-center items-center bg-yellow-400 rounded-lg border border-yellow-400 border-solid"
            >
                    Continue
            </button>
        </form>

        <div class="flex items-center mt-9">
            <hr class="border-solid border-1 neutral-400 flex-grow" />
            <span class="mx-4 text-neutral-400">New to Amazon?</span>
            <hr class="border-solid border-1 neutral-400 flex-grow" />
        </div>
        <button onClick={handleOpenRegister}
            type="submit"
            className=" items-center rounded-lg border border-solid flex flex-col justify-center px-1.5 py-1 mt-9 text-lg text-lime-900 whitespace-nowrap bg-black bg-opacity-0 max-md:max-w-full"
            >
            Create your Amazon account
        </button>
        </>
    );
}


export default SignInForm
