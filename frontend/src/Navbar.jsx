

import { AppBar, Toolbar, Typography, Box, Button, TextField, InputAdornment, IconButton } from '@mui/material';


import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import logo from './assets/logol6pu.png'


function Navbar({onSearch}) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Kontrollige, kas kasutaja on sisse logitud

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eemaldame tokeni
    navigate('/admin/login'); // Suuname login lehele
  };

  const handleSearch = () => {
   onSearch(searchQuery); // Kutsume välja otsingu funktsiooni
   
  }
  const location = useLocation();

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: 'transparent' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component="div">
          <img src={logo} alt="Logo" style={{ height: '40px', paddingTop:'30px',paddingLeft:'10px' }} />
        </Typography>

        {/* Ainult /postitused lehel näita otsingut */}
        {location.pathname === '/postitused' && (
          <Box sx={{ flexGrow: 1, maxWidth: 200 }}>
            <TextField
              sx={{
  backgroundColor: 'transparent',
  borderRadius: 2,
  marginLeft: 2,
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#646cff', 
    },
    '&:hover fieldset': {
      borderColor: '#646cff', 
    },
    '&.Mui-focused fieldset': {
      borderColor: '#646cff', 
    },
  },
  '& input': {
    color: 'white',
    outline: 'none !important',
  },
}}
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Otsi postitusi..."
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value
                setSearchQuery(value)
              onSearch(value)}
              }
            />
          </Box>
        )}

        <Box>
          {/* Avalehe nupp on alati nähtav */}
          <Button color="inherit" component={Link} to="/">
            Avaleht
          </Button>
          {token ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/postitused">
                Postitused
              </Button>
              <Button color="inherit" component={Link} to="/kontakt">
                Kontakt
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
