import Footer from "../footer";
import SignUpForm from "./signUpForm";

function SignUp({setToken}) {
    return (
        <div className="flex flex-col justify-center bg-black bg-opacity-0">
            <section className="flex overflow-hidden relative flex-col items-center px-5 pb-20 w-full min-h-[879px] max-md:max-w-full">
                <div className="flex relative flex-col px-1.5 py-1 max-w-full bg-black bg-opacity-0 w-[533px]">
                    <div className="flex gap-0 self-center text-base whitespace-nowrap text-stone-500">
                        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/13255941677d5831152734d33517c836fd9955d675c80c32a737cb35cba2b520?apiKey=d9edbd9b9779410cb6e09fa7760d29d8&" alt="Amazon Logo" className="h-20 shrink-0 w-full aspect-[2.63]" />
                        <span className="my-auto">.in</span>
                    </div>
                    <SignUpForm setToken={setToken}/>
                </div>
            <Footer />
            </section>
        </div>
    );
}

export default SignUp