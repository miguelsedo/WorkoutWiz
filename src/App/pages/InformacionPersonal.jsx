import React, { useState, useEffect, useContext } from 'react';
import { AppLayout } from "../layout/AppLayout";
import { Grid, Typography, TextField, Snackbar } from "@mui/material";
import { useSelector } from 'react-redux';
import { UserContext } from '../../hooks';
import AddDataButton from '../components/DBAddDataButton';
import { useNavigate } from 'react-router-dom';

export const InformacionPersonal = () => {
  const uid = useSelector(state => state.auth.uid);
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  // Local state to manage form data
  const [formData, setFormData] = useState({
    Nombre: '',
    Apellidos: '',
    Edad: '',
    Altura: '',
    Peso: ''
  });

  // State to manage Snackbar visibility
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Synchronize local state with global state
  useEffect(() => {
    setFormData({
      Nombre: userData.Nombre || '',
      Apellidos: userData.Apellidos || '',
      Edad: userData.Edad || '',
      Altura: userData.Altura || '',
      Peso: userData.Peso || ''
    });
  }, [userData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    const { Nombre, Apellidos, Edad, Altura, Peso } = formData;

    // Check if all fields are filled
    if (!Nombre || !Apellidos || !Edad || !Altura || !Peso) {
      console.error('Please fill in all fields');
      return;
    }

    try {
      await setUserData(formData); // Update global context and trigger backend update
      setOpenSnackbar(true); // Open the Snackbar on success
      setTimeout(() => {
        setOpenSnackbar(false); // Close the Snackbar after 3 seconds
        navigate('/'); // Navigate to the homepage
      }, 3000);
    } catch (error) {
      console.error('Failed to update data:', error);
    }
  };

  return (
    <AppLayout>
      <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '80vh', color: '#7b00ff' }}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h3">Información personal</Typography>
            </Grid>
            <Grid item>
              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                name="Nombre"
                value={formData.Nombre}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Apellidos"
                variant="outlined"
                fullWidth
                name="Apellidos"
                value={formData.Apellidos}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Edad"
                variant="outlined"
                fullWidth
                name="Edad"
                value={formData.Edad}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Altura"
                variant="outlined"
                fullWidth
                name="Altura"
                value={formData.Altura}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Peso"
                variant="outlined"
                fullWidth
                name="Peso"
                value={formData.Peso}
                onChange={handleChange}
              />
            </Grid>
            <Grid item container justifyContent="center">
              <AddDataButton
                endpoint="http://localhost:3001/add-data"
                data={{
                  tableName: 'persona',
                  data: {
                    ID: uid,
                    ...formData
                  }
                }}
                onError={handleSave} // Trigger handleSave on success
                content="Guardar"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        open={openSnackbar}
        message="Datos guardados correctamente"
        autoHideDuration={1000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={() => setOpenSnackbar(false)}
        sx={{
          '.MuiSnackbarContent-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            color: 'white',
            fontSize: '1rem',
          }
        }}
      />
    </AppLayout>
  );
};
