const JobFilters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const filterValue = type === "checkbox" ? checked : value;
    setFilters((prev) => ({ ...prev, [name]: filterValue }));
  };

  return (
    <div className="max-w-80 bg-red-500">
      <h1>Filters</h1>
      <ul>
        <li className="flex items-center">
          <input
            type="checkbox"
            name="remoteOnly"
            checked={filters.remoteOnly || false}
            onChange={handleChange}
            className="rounded bg-gray-700 border-gray-600"
          />
          <span className="ml-2 text-gray-300">Remote only</span>
        </li>
        <h1 className="text-lg font-semibold text-gray-200 mt-4 mb-2">
          Category
        </h1>
        <li className="flex items-center">
          <input
            type="checkbox"
            name="technology"
            checked={filters.technology || false}
            onChange={handleChange}
            className="rounded bg-gray-700 border-gray-600"
          />
          <span className="ml-2 text-gray-300">Technology</span>
        </li>
        <li className="flex items-center">
          <input
            type="checkbox"
            name="design"
            checked={filters.design || false}
            onChange={handleChange}
            className="rounded bg-gray-700 border-gray-600"
          />
          <span className="ml-2 text-gray-300">Design</span>
        </li>
        <li className="flex items-center">
          <input
            type="checkbox"
            className="rounded bg-gray-700 border-gray-600"
          />
          <span className="ml-2 text-gray-300">Marketing</span>
        </li>
        <li className="flex items-center">
          <input
            type="checkbox"
            className="rounded bg-gray-700 border-gray-600"
          />
          <span className="ml-2 text-gray-300">Sales</span>
        </li>
        <li className="flex items-center">
          <input
            type="checkbox"
            className="rounded bg-gray-700 border-gray-600"
          />
          <span className="ml-2 text-gray-300">Finance</span>
        </li>
        <li className="flex items-center">
          <input
            type="checkbox"
            className="rounded bg-gray-700 border-gray-600"
          />
          <span className="ml-2 text-gray-300">Healthcare</span>
        </li>
        <li className="flex items-center">
          <input
            type="checkbox"
            className="rounded bg-gray-700 border-gray-600"
          />
          <span className="ml-2 text-gray-300">Education</span>
        </li>
        <li>
          <input type="checkbox" /> Engineering
        </li>

        <h1>Job Type</h1>
        <li>
          <input type="checkbox" /> Full-time
        </li>
        <li>
          <input type="checkbox" /> Part-time
        </li>
        <li>
          <input type="checkbox" /> Contract
        </li>
        <li>
          <input type="checkbox" /> Internship
        </li>
        <li>
          <input type="checkbox" /> Temporary
        </li>
        <li>
          <input type="checkbox" /> Unknown
        </li>

        <h1>Experience Level</h1>
        <li>
          <input type="checkbox" /> No experience
        </li>
        <li>
          <input type="checkbox" /> With experience
        </li>
        <li>
          <input type="checkbox" /> Entry
        </li>
        <li>
          <input type="checkbox" /> Mid
        </li>
        <li>
          <input type="checkbox" /> Senior
        </li>
      </ul>
    </div>
  );
};

export default JobFilters;
