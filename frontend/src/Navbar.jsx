import { AppBar, Toolbar, Typography, Box, Button, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Kontrollige, kas kasutaja on sisse logitud

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eemaldame tokeni
    navigate('/admin/login'); // Suuname login lehele
  };

  const handleSearch = () => {
    console.log('Otsing:', searchQuery);
  }

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: 'transparent' }}>
      {/* Toolbar - pealkiri ja nupud */}
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Vasak pool - pealkiri */}
        <Typography variant="h6" component="div">
          Siia läheb kunagi logo
        </Typography>
        {/* Keskel - pealkiri */}
        <Box sx={{ flexGrow:1, maxWidth:200}}>
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
                outline: 'none !important', // fallback
              }
            }}
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Otsi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton  edge="end" onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            />

         
        </Box>

        {/* Parem pool - nupud */}
        <Box>
          {/* Kui kasutaja on sisse logitud, kuvame ainult logout nupu */}
          {token ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/">
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
