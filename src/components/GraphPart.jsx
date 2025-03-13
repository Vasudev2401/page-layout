import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import SideBar from "./SidePart";

const GraphBar = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [selectedFilters, setSelectedFilters] = useState(["", "", "", "", ""]);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [studentData, setStudentData] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});
  const [graphName, setGraphName] = useState("Graph-Name");

  const options = ["State", "District", "Centre Code", "Block", "School Type", "Age Group", "Gender"];

  // Handle filter selection
  const handleSelectChange = (index, value) => {
    const newFilters = [...selectedFilters];
    newFilters[index] = value;
    setSelectedFilters(newFilters);
  };

  useEffect(() => {
    // Create simple chart when component mounts
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      // Sample data
      const data = {
        labels: ['Karnataka', 'Tamil Nadu', 'Maharashtra', 'Delhi', 'Gujarat', 'Rajasthan'],
        datasets: [
          {
            label: 'Number of Students',
            data: [65, 59, 80, 81, 56, 55],
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      };
      
      // Create new chart
      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: graphName,
              color: 'white',
              font: {
                size: 18
              }
            },
            legend: {
              labels: {
                color: 'white'
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Students',
                color: 'white'
              },
              ticks: {
                color: 'white'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            },
            x: {
              title: {
                display: true,
                text: 'State',
                color: 'white'
              },
              ticks: {
                color: 'white'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              }
            }
          }
        }
      });
    }
    
    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [graphName]);

  return (
    <div className="flex w-full">
      <div className="w-3/4 h-screen bg-gray-700 rounded-lg flex flex-col gap-4 p-3">
        <div className="p-2 h-1/5 bg-gray-600 rounded-lg">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-white text-3xl underline text-left px-4">{graphName}</h1>

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
        <div className="h-4/5 bg-gray-600 rounded-lg p-3">
          <div className="w-full h-full bg-gray-500 rounded-lg flex justify-center items-center">
            <canvas ref={chartRef} id="studentChart" style={{ width: '100%', height: '100%' }}></canvas>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <SideBar 
        graphName={graphName}
        xAxis={xAxis}
        yAxis={yAxis}
        selectedFilters={selectedFilters}
      />
    </div>
  );
};

export default GraphBar;