export const calculateTerraces = async (formData) => {
  try {
    console.log('Sending data to server:', formData);
    
    const response = await fetch('https://calculadora-terraco-backend.onrender.com/api/calculadora/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      
      try {
        const errorData = await response.json();
        console.error('Server error details:', errorData);
        
        if (errorData.details) {
          const errors = [];
          for (const [field, messages] of Object.entries(errorData.details)) {
            errors.push(`${field}: ${messages.join(', ')}`);
          }
          errorMessage = `Validation errors: ${errors.join('; ')}`;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        } else {
          errorMessage = JSON.stringify(errorData);
        }
      } catch (parseError) {
        console.error('Could not parse error response:', parseError);
        errorMessage = `HTTP ${response.status} - ${response.statusText}`;
      }
      
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Success response:', data);
    return data;
  } catch (error) {
    console.error('Full error details:', error);
    throw error;
  }
};