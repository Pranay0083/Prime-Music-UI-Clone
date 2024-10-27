import Header from "../navbar";
import Top20 from "./categories/top20Song"
import FetchTrending from "./categories/trendingSongs"
import FetchTop50 from "./categories/top50Songs";
import Evergreen from "./categories/evergreen";
import Happy from "./categories/happy";
import Romantic from "./categories/romantic";
import Excited from "./categories/excited";
import Sad from "./categories/sad";

const HomePage = () =>{
    return(
        <div className="bg-black min-h-screen flex flex-col p-3">
            <Header />
            <FetchTrending />
            <Top20 />
            <FetchTop50 />
            <Evergreen />
            <Happy />
            <Romantic />
            <Excited />
            <Sad />
        </ div>
    )
}

export default HomePage;
