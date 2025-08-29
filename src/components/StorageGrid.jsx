import { useState, useEffect } from 'react';
import { MapPin, File, Info } from 'lucide-react';

const StorageGrid = ({ files, selectedCluster = null }) => {
  const [gridData, setGridData] = useState({});
  const [hoveredCell, setHoveredCell] = useState(null);

  useEffect(() => {
    if (files.length > 0) {
      // Filter files by selected cluster if specified
      const filteredFiles = selectedCluster 
        ? files.filter(file => file.cluster === selectedCluster)
        : files;

      // Calculate grid dimensions
      const maxRow = Math.max(...filteredFiles.map(f => f.row || 0));
      const maxColumn = Math.max(...filteredFiles.map(f => f.column || 0));

      // Create grid data structure
      const grid = {};
      filteredFiles.forEach(file => {
        const key = `${file.row}-${file.column}`;
        if (!grid[key]) {
          grid[key] = [];
        }
        grid[key].push(file);
      });

      setGridData({
        grid,
        maxRow: maxRow + 1,
        maxColumn: maxColumn + 1,
        totalFiles: filteredFiles.length
      });
    }
  }, [files, selectedCluster]);

  const getClusterColor = (cluster) => {
    const colors = {
      'C': 'bg-blue-500',
      'K': 'bg-green-500',
      'G': 'bg-purple-500',
      'J': 'bg-yellow-500',
      'A': 'bg-red-500',
      'B': 'bg-indigo-500',
      'M': 'bg-pink-500',
      'N': 'bg-orange-500',
      'P': 'bg-teal-500',
      'T': 'bg-cyan-500'
    };
    return colors[cluster] || 'bg-gray-500';
  };

  const getClusterName = (cluster) => {
    const names = {
      'C': 'Colombo',
      'K': 'Kandy',
      'G': 'Galle',
      'J': 'Jaffna',
      'A': 'Anuradhapura',
      'B': 'Batticaloa',
      'M': 'Matara',
      'N': 'Negombo',
      'P': 'Polonnaruwa',
      'T': 'Trincomalee'
    };
    return names[cluster] || cluster;
  };

  if (!gridData.maxRow || !gridData.maxColumn) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="text-center text-gray-500">
          <File size={48} className="mx-auto mb-4 text-gray-300" />
          <p>No files found for this cluster</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MapPin size={20} className="text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">
            Storage Grid {selectedCluster && `- ${getClusterName(selectedCluster)} (${selectedCluster})`}
          </h3>
        </div>
        <div className="text-sm text-gray-500">
          {gridData.totalFiles} files • {gridData.maxRow}×{gridData.maxColumn} grid
        </div>
      </div>

      {/* Grid Container */}
      <div className="overflow-x-auto">
        <div 
          className="inline-grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${gridData.maxColumn}, minmax(40px, 1fr))`,
            gridTemplateRows: `repeat(${gridData.maxRow}, 40px)`
          }}
        >
          {/* Column Headers */}
          {Array.from({ length: gridData.maxColumn }, (_, col) => (
            <div key={`header-${col}`} className="flex items-center justify-center text-xs font-medium text-gray-500 bg-gray-50 rounded border">
              {col}
            </div>
          ))}

          {/* Grid Cells */}
          {Array.from({ length: gridData.maxRow }, (_, row) => (
            <>
              {/* Row Header */}
              <div key={`row-header-${row}`} className="flex items-center justify-center text-xs font-medium text-gray-500 bg-gray-50 rounded border">
                {row}
              </div>
              
              {/* Row Cells */}
              {Array.from({ length: gridData.maxColumn }, (_, col) => {
                const cellKey = `${row}-${col}`;
                const cellFiles = gridData.grid[cellKey] || [];
                const hasFiles = cellFiles.length > 0;
                
                return (
                  <div
                    key={`cell-${row}-${col}`}
                    className={`
                      relative border rounded cursor-pointer transition-all duration-200
                      ${hasFiles 
                        ? 'bg-green-100 border-green-300 hover:bg-green-200' 
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }
                    `}
                    onMouseEnter={() => setHoveredCell({ row, col, files: cellFiles })}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    {hasFiles && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-wrap gap-0.5 justify-center">
                          {cellFiles.slice(0, 3).map((file, index) => (
                            <div
                              key={file.id}
                              className={`w-2 h-2 rounded-full ${getClusterColor(file.cluster)}`}
                              title={`${file.fileId} (${file.cluster})`}
                            />
                          ))}
                          {cellFiles.length > 3 && (
                            <div className="w-2 h-2 rounded-full bg-gray-400 text-xs flex items-center justify-center">
                              <span className="text-[6px] text-white font-bold">+</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>

      {/* Hover Tooltip */}
      {hoveredCell && hoveredCell.files.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <Info size={16} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-900">
              Location {hoveredCell.row}-{hoveredCell.col} ({hoveredCell.files.length} files)
            </span>
          </div>
          <div className="space-y-1">
            {hoveredCell.files.map(file => (
              <div key={file.id} className="flex items-center gap-2 text-sm">
                <div className={`w-3 h-3 rounded-full ${getClusterColor(file.cluster)}`} />
                <span className="font-medium">{file.fileId}</span>
                <span className="text-gray-500">({getClusterName(file.cluster)})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Cluster Legend</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {Object.entries({
            'C': 'Colombo', 'K': 'Kandy', 'G': 'Galle', 'J': 'Jaffna', 'A': 'Anuradhapura',
            'B': 'Batticaloa', 'M': 'Matara', 'N': 'Negombo', 'P': 'Polonnaruwa', 'T': 'Trincomalee'
          }).map(([code, name]) => (
            <div key={code} className="flex items-center gap-2 text-xs">
              <div className={`w-3 h-3 rounded-full ${getClusterColor(code)}`} />
              <span className="text-gray-600">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StorageGrid;
