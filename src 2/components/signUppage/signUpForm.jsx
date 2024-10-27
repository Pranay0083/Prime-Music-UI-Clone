import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function SignUpForm({setToken}) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePass, setRePass] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!name || !email || !password || !rePass) {
            alert('All fields are required');
            return;
        }
        if (!email.includes('@')) {
            alert('Email must have "@"');
            return;
        }
        if (password.length < 6 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[!@#$%^&*()_]/.test(password)) {
            alert('Password must be at least 6 characters long and include both lower and uppercase letters and symbols');
            return;
        }
        if (password !== rePass) {
            alert('Passwords do not match');
            return;
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = { email, password, name, appType : "music" };
            try {
                const response = await fetch('https://academics.newtonschool.co/api/v1/user/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'projectID': 'f104bi07c490',
                        'accept': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                });
                const datas = await response.json();
                if (datas.status === "fail") {
                    alert("email already exists.")
                }
                else {
                    setToken(datas.token)
                    navigate('/signin')
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
    return (
        <form className="drop-shadow-sm	 flex flex-col px-9 py-10 mt-6 bg-white rounded-lg border border-solid border-zinc-100 max-md:px-5 max-md:max-w-full"
            onSubmit={handleSubmit} >
            <h2 className="text-4xl text-zinc-800 max-md:max-w-full">Create account</h2>
            <label htmlFor="name" className="mt-7 text-xl text-stone-700 max-md:max-w-full ">Your name</label>

            <input
                id="name"
                type="name"
                placeholder="First and last name"
                value={name}
                className="border-2 flex flex-col justify-center px-1.5 py-1.5 mt-1.5 bg-black bg-opacity-0 max-md:max-w-full rounded-md"
                onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email" className="mt-1.5 text-lg text-neutral-700 max-md:max-w-full ">Email</label>
            <input
                id="email"
                type="email"
                placeholder="Your Mail Id"
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 flex flex-col justify-center px-1.5 py-1 mt-1.5 bg-black bg-opacity-0 max-md:max-w-full rounded-md"
            />

            <label htmlFor="password" className="mt-1.5 text-lg text-neutral-700 max-md:max-w-full ">Password</label>
            <input
                id="password"
                type="password"
                placeholder="Atleast 6 characters"
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 flex flex-col justify-center px-1.5 py-1 mt-1.5 bg-black bg-opacity-0 max-md:max-w-full rounded-md"
            />

            <label htmlFor="password" className="mt-1.5 text-lg text-neutral-700 max-md:max-w-full ">Re-enter password</label>
            <input
                id="password"
                type="password"
                placeholder="Re-enter password"
                onChange={(e) => setRePass(e.target.value)}
                className="border-2 flex flex-col justify-center px-1.5 py-1 mt-1.5 bg-black bg-opacity-0 max-md:max-w-full rounded-md"
            />

            <button
                type="submit"
                className="flex flex-col mt-9 text-lg text-lime-900 whitespace-nowrap  max-md:max-w-full  justify-center items-center px-5 py-1 bg-yellow-400 rounded-lg border border-yellow-400 border-solid"
            >
                Create your Amazon account
            </button>

            <hr className="m-7"/>
            
            <p>
                Already have an account? <Link to="/signin" className="text-blue-500"> Sign In <i class="fa-solid fa-caret-right" style={{ color: 'blue' }}></i> </Link>
            </p>
            
        </form>
    );
}

export default SignUpForm