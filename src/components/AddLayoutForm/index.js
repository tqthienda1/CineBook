import React, { useState } from 'react';

const AddLayoutForm = () => {
  const [formStep, setFormStep] = useState(1);
  const [rows, setRows] = useState('');
  const [columns, setColumns] = useState('');
  const [matrix, setMatrix] = useState([]);

  const handleNext = (e) => {
    e.preventDefault();
    const rowNum = parseInt(rows, 10);
    const colNum = parseInt(columns, 10);

    if (isNaN(rowNum) || isNaN(colNum) || rowNum <= 0 || colNum <= 0) {
      alert('Please enter valid positive numbers for rows and columns');
      return;
    }

    // Tạo ma trận rỗng kích thước rowNum x colNum
    const initialMatrix = Array.from({ length: rowNum }, () => Array(colNum).fill(false));
    setMatrix(initialMatrix);
    setFormStep(2); // Chuyển sang bước render ma trận
  };

  const toggleCell = (rowIndex, colIndex) => {
    const updatedMatrix = matrix.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? !cell : cell)),
    );
    setMatrix(updatedMatrix);
  };

  return (
    <div>
      {formStep === 1 && (
        <form onSubmit={handleNext}>
          <label>
            Number of rows:
            <input type="number" value={rows} onChange={(e) => setRows(e.target.value)} required min="1" />
          </label>
          <label>
            Number of columns:
            <input type="number" value={columns} onChange={(e) => setColumns(e.target.value)} required min="1" />
          </label>
          <button type="submit" style={{ backgroundColor: 'blue', color: 'white' }}>
            Next
          </button>
          <button
            type="button"
            onClick={() => {
              setRows('');
              setColumns('');
            }}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </button>
        </form>
      )}

      {formStep === 2 && (
        <div>
          {matrix.map((row, rIdx) => (
            <div key={rIdx} style={{ display: 'flex', justifyContent: 'center', marginBottom: 5 }}>
              {row.map((cell, cIdx) => (
                <button
                  key={cIdx}
                  onClick={() => toggleCell(rIdx, cIdx)}
                  style={{
                    width: 30,
                    height: 30,
                    margin: 2,
                    backgroundColor: cell ? '#4CAF50' : '#eee',
                    border: '1px solid #333',
                    cursor: 'pointer',
                    position: 'absolute',
                  }}
                  title={`Row ${rIdx + 1}, Seat ${cIdx + 1}`}
                >
                  {cell ? 'X' : ''}
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AddLayoutForm;
