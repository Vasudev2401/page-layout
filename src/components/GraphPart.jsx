import { useEffect, useState } from "react";

const options = ["State", "District", "Centre Code", "Block", "School Type", "Age Group", "Gender"];

// Function to process student data
const processStudentData = (students) => {
  return students
    .map((student) => {
      if (!student.awcentre) return null;

      const awcentreParts = student.awcentre.split(" - ");
      if (awcentreParts.length !== 5) return null;

      const [state, district, centreCode, block, schoolType] = awcentreParts;

      return {
        State: state,
        District: district,
        CentreCode: centreCode,
        Block: block,
        SchoolType: schoolType,
        AgeGroup: student.age,
        Gender: student.gender,
      };
    })
    .filter((item) => item !== null);
};

const GraphBar = () => {
  const [selectedFilters, setSelectedFilters] = useState(["", "", "", "", ""]);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});

  // Fetch and process student data
  useEffect(() => {
    fetch("/studentData.json")
      .then((response) => response.json())
      .then((data) => {
        const processedData = processStudentData(data);
        setStudentData(processedData);

        // Extract unique values for each option from student data
        const uniqueValues = {};
        options.forEach((opt) => {
          uniqueValues[opt] = [...new Set(processedData.map((item) => item[opt]))].sort();
        });
        setFilterOptions(uniqueValues);
      })
      .catch((error) => console.error("Error fetching student data:", error));
  }, []);

  // Function to handle filter selection
  const handleSelectChange = (index, value) => {
    const newSelectedFilters = [...selectedFilters];
    newSelectedFilters[index] = value;
    setSelectedFilters(newSelectedFilters);
  };

  return (
    <div className="w-3/4 h-screen bg-gray-700 rounded-lg flex flex-col gap-4 p-3">
      <div className="p-2 h-1/5 bg-gray-600 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-white text-3xl underline text-left px-4">Graph-Name</h1>

          {/* X-Axis and Y-Axis Dropdowns */}
          <div className="flex gap-4">
            <select
              value={xAxis}
              onChange={(e) => setXAxis(e.target.value)}
              className="w-40 h-10 rounded-lg p-2 bg-gray-700 font-bold text-white"
            >
              <option value="" disabled>Select X-Axis</option>
              {options.filter((opt) => opt !== yAxis).map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            <select
              value={yAxis}
              onChange={(e) => setYAxis(e.target.value)}
              className="w-40 h-10 rounded-lg p-2 bg-gray-700 font-bold text-white"
            >
              <option value="" disabled>Select Y-Axis</option>
              {options.filter((opt) => opt !== xAxis).map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filters Section */}
        <div className="mt-1 p-3 flex justify-start items-center w-full h-3/5 gap-4">
          {options
            .filter((opt) => opt !== xAxis && opt !== yAxis) // Remove X and Y-Axis from filters
            .slice(0, 5) // Ensure exactly 5 dropdowns are rendered
            .map((currentFilter, index) => (
              <select
                key={index}
                value={selectedFilters[index] || ""}
                onChange={(e) => handleSelectChange(index, e.target.value)}
                className="w-40 h-12 rounded-lg p-2 bg-gray-700 font-bold text-white"
              >
                <option value="" disabled>
                  {currentFilter || `Filter ${index + 1}`}
                </option>
                {filterOptions[currentFilter]?.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ))}
        </div>
      </div>

      {/* Graph Section */}
      <div className="h-4/5 bg-gray-600 rounded-lg p-2">
        <div className="w-full h-full bg-gray-500 rounded-lg">
          <img className="w-full h-full object-cover" src="../assets/Percentage-graph-660.webp" alt="Graph" />
        </div>
      </div>
    </div>
  );
};

export default GraphBar;
