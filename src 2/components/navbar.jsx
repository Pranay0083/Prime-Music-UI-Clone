import Avatar from "./navbar/avatar";
import Library from "./navbar/library";
import SearchBar from "./navbar/searchBar";
import Logo from "../components/assets/pngegg.png";

export default function Navbar() {
  return (
    <div className="h-full w-full flex px-6 bg-black border-b-2 border-white border-opacity-15 sticky">
      <div className="items-center p-4">
        <img src={Logo} alt="Brand Logo" className="h-10 max-w-44 flex" />
      </div>
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <div className="text-white flex p-4 px-12 text-l">
            <i className="fa-solid fa-house pr-2"></i>
            HOME
          </div>
          <div className="text-white flex p-4 text-l">
            <i className="fa-solid fa-podcast pr-2"></i>
            PODCASTS
          </div>
          <Library />
        </div>

        <div className="flex items-center py-4 pr-4">
          <SearchBar />
          <Avatar />
        </div>
      </div>
    </div>
  );
}
