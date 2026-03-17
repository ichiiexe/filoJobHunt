import { Search, MapPin } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchTerm = formData.get("searchTerm");
    const location = formData.get("location");
    onSearch({ title: searchTerm, location });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between w-full max-w-4xl border border-gray-700 rounded-2xl py-2 px-4 bg-gray-800 dark:bg-gray-800 shadow-xl"
    >
      <div className="flex items-center gap-2 flex-1">
        <Search className="text-gray-400" />
        <input
          name="searchTerm"
          type="text"
          placeholder="Job title, keywords, or company"
          className="outline-none w-full bg-gray-800 text-gray-100 placeholder-gray-500"
        />
      </div>

      <div className="flex items-center gap-2 flex-1">
        <MapPin className="text-gray-400" />
        <input
          name="location"
          type="text"
          placeholder="City, state, or remote"
          className="outline-none w-full bg-gray-800 text-gray-100 placeholder-gray-500"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl ml-4 transition"
      >
        Search Jobs
      </button>
    </form>
  );
};

export default SearchBar;
