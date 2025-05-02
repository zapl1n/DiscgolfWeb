import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); // Kontrollige, kas kasutaja on sisse logitud

  const handleLogout = () => {
    localStorage.removeItem('token'); // Eemaldame tokeni
    navigate('/admin/login'); // Suuname login lehele
  };

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: '#242424' }}>
      {/* Toolbar - pealkiri ja nupud */}
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Vasak pool - pealkiri */}
        <Typography variant="h6" component="div">
          Minu Veebirakendus
        </Typography>

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
