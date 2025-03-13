import { useState } from "react";
import SaveDialog from "./SaveDialog";

const SideBar = ({ graphName, xAxis, yAxis, selectedFilters }) => {
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);

  // Toggle export options dropdown
  const toggleExportOptions = () => {
    setShowExportOptions(!showExportOptions);
  };

  // Export as PNG
  const exportAsPNG = () => {
    const canvas = document.getElementById('studentChart');
    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }
    
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'student-chart.png';
    link.click();
    
    setShowExportOptions(false);
  };

  // Export as PDF
  const exportAsPDF = () => {
    // Import jsPDF dynamically
    import('jspdf').then(jsPDFModule => {
      const jsPDF = jsPDFModule.default;
      
      const canvas = document.getElementById('studentChart');
      if (!canvas) {
        console.error("Canvas element not found");
        return;
      }
      
      const dataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape');
      
      // Add the image to the PDF (scaling it to fit)
      const imgProps = pdf.getImageProperties(dataURL);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataURL, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      // Save the PDF
      pdf.save('student-chart.pdf');
    }).catch(error => {
      console.error("Error loading jsPDF:", error);
      alert("Failed to generate PDF. Please make sure jsPDF is installed.");
    });
    
    setShowExportOptions(false);
  };

  return (
    <div className="w-1/4 h-screen bg-gray-700 rounded-lg">
      <div className="flex flex-col gap-4 justify-center items-center h-full">
        <h1 className="font-bold text-white text-3xl underline">Whats your next Action?</h1>
        
        <div className="relative">
          <button 
            onClick={toggleExportOptions} 
            className="w-40 h-12 rounded-lg bg-blue-600 font-bold text-white"
          >
            Export Graph
          </button>
          
          {showExportOptions && (
            <div className="absolute top-full left-0 mt-2 w-full bg-gray-800 rounded-lg shadow-lg z-10">
              <button 
                onClick={exportAsPNG}
                className="w-full py-2 px-4 text-left text-white hover:bg-blue-700"
              >
                Download as PNG
              </button>
              <button 
                onClick={exportAsPDF}
                className="w-full py-2 px-4 text-left text-white hover:bg-blue-700"
              >
                Download as PDF
              </button>
            </div>
          )}
        </div>
        
        <button className="w-40 h-12 rounded-lg bg-blue-600 font-bold text-white">
          Edit Graph
        </button>
        <button className="w-40 h-12 rounded-lg bg-blue-600 font-bold text-white">
          Duplicate Graph
        </button>
        <button 
          onClick={() => setShowSaveDialog(true)}
          className="w-40 h-12 rounded-lg bg-blue-600 font-bold text-white"
        >
          Save for later
        </button>
      </div>

      {/* Save Dialog */}
      <SaveDialog 
        isOpen={showSaveDialog} 
        onClose={() => setShowSaveDialog(false)}
        graphName={graphName}
        xAxis={xAxis}
        yAxis={yAxis}
        selectedFilters={selectedFilters}
      />
    </div>
  );
};

export default SideBar;