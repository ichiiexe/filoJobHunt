import { Search, MapPin } from "lucide-react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <form className="flex items-center justify-between border w-full max-w-200 border-black/10 rounded-2xl py-2 px-4 bg-white">
      <div className="flex items-center gap-2 flex-1">
        <Search className="text-black/50" />
        <input
          type="text"
          placeholder="Job title, keywords, or company"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="outline-none w-full"
        />
      </div>

      {/* Divider */}
      <div className="w-px h-6 bg-gray-300 mx-4" />

      <div className="flex items-center gap-2 flex-1">
        <MapPin className="text-black/50" />
        <input
          type="text"
          placeholder="City, state, or remote"
          className="outline-none w-full"
        />
      </div>

      <button className="bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 ml-4">
        Search Jobs
      </button>
    </form>
  );
};

export default SearchBar;
