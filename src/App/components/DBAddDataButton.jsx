import React from 'react';
import { Button } from "@mui/material";

function AddDataButton({ endpoint, data, onSuccess, onError, content, from }) {
  const handleAddData = async () => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const result = await response.json();
        onSuccess && onSuccess(result);
        console.log("Data added successfully:", result);
      } else {
        onError && onError(`Failed to add data: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      onError && onError(`Network error: ${error.toString()}`);
    }
  };

  return (
    <Button 
      onClick={handleAddData}
      variant="contained" 
      color="primary"
    >
      {content}
    </Button>
  );
}

export default AddDataButton;

