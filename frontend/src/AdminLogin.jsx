
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Paper, Typography, TextField, Button, Alert, Stack } from '@mui/material'

const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsLoggedIn(true)
            navigate('/admin')
        }
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:8000/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
           
            if(!response.ok) {
                throw new Error('Login failed')
            }

            const data = await response.json()
            console.log('Login successful:', data)

            localStorage.setItem('token', data.token)
            setIsLoggedIn(true)

            navigate('/admin')

        
        } catch (error) {
            setError(error.message)
            console.error('Error logging in:', error)
            
        }
        }
    const handleLogout = () => {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
    }

  return (
    <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="transparent"
        >
            <Paper elevation={3} sx={{ padding: 4, width: '100%', maxWidth: 400, }    }>
                {isLoggedIn ? (
                    <Stack spacing={2} alignItems="center">
                        <Typography variant="h5">Welcome, Admin!</Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Stack>
                ) : (
                    <>
                        <Typography variant="h5" gutterBottom align="center">
                            Admin Login
                        </Typography>
                        <form onSubmit={handleLogin}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                margin="normal"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2 }}
                            >
                                Login
                            </Button>
                            {error && (
                                <Alert severity="error" sx={{ mt: 2 }}>
                                    {error}
                                </Alert>
                            )}
                        </form>
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default AdminLogin;