

import { AppBar, Toolbar, Typography, Box, Button, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';


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
          Siia läheb kunagi logo
        </Typography>

        {/* Ainult /postitused lehel näita otsingut */}
        {location.pathname === '/postitused' && (
          <Box sx={{ flexGrow: 1, maxWidth: 200 }}>
            <TextField
              sx={{
                backgroundColor: '#646cff',
                borderRadius: 2,
                marginLeft: 2,
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent',
                    boxShadow: 'none',
                  },
                  '&.Mui-focused': {
                    boxShadow: 'none',
                    outline: 'none',
                  },
                },
                '& input': {
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
