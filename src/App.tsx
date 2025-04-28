import React, { useState } from 'react';
import MDXEditorComponent from './MDXEditorComponent';

import './App.css';

const App: React.FC = () => {
  // Set initial content to avoid null issue
  const [updatedData, setUpdatedData] = useState<string | null>(`
    ## Welcome to MDX Editor
    
    This is an example of **MDX** content.
    You can add more **text** and **code** here.
    `);

  return (
    <div className="App">

      {/* Pass the setter function for updatedData to MDXEditorComponent */}
      <MDXEditorComponent changedData={updatedData} setChangedData={setUpdatedData} />
      
      {/* Display the updated content from MDXEditorComponent */}
      <pre>{JSON.stringify(updatedData, null, 2)}</pre>
    </div>
  );
};

export default App;
