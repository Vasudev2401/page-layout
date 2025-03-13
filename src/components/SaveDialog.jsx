import { useState, useEffect } from "react";

const SaveDialog = ({ isOpen, onClose, graphName, xAxis, yAxis, selectedFilters }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Generate description based on graph properties
  useEffect(() => {
    if (isOpen) {
      // Set default name from the graph name
      setName(graphName || "Graph 1");
      
      // Generate description
      const graphType = "Bar graph";
      const parameters = xAxis && yAxis ? `parameters ${xAxis} and ${yAxis}` : "parameters";
      const filterCount = 0;
      const filterText = `with ${filterCount} filters` ;
      
      setDescription(`${graphType} of ${parameters} ${filterText}`);
    }
  }, [isOpen, graphName, xAxis, yAxis, selectedFilters]);

  // Handle save
  const handleSave = () => {
    // Here you would implement the actual saving logic
    console.log("Saving graph:", { name, description });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-700 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Save the graph for later</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white"
          >
            &times;
          </button>
        </div>
        
        <div className="mb-4">
          <label className="block text-white mb-2">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 bg-gray-600 rounded-lg text-white"
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-white mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 bg-gray-600 rounded-lg text-white h-24"
          />
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
          >
            CONFIRM
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveDialog;