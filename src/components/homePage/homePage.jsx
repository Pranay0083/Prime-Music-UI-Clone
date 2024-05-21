import Header from "./header";
import Top20 from "./top20Song"
import FetchTrending from "./trendingSongs"

const HomePage = () =>{
    return(
        <div className="bg-black min-h-screen flex flex-col p-10">
            <Header />
            <FetchTrending />
            <Top20 />
        </ div>
    )
}

export default HomePage;
