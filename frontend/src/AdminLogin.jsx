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

            if (!response.ok) {
                throw new Error('Login failed')
            }

            const data = await response.json()
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
            bgcolor="#121212"
        >
            <Paper
                elevation={5}
                sx={{
                    padding: 4,
                    width: '100%',
                    maxWidth: 400,
                    backgroundColor: '#1e1e1e',
                    color: '#fff',
                    borderRadius: 3,
                }}
            >
                {isLoggedIn ? (
                    <Stack spacing={2} alignItems="center">
                        <Typography variant="h5" color="white">
                            Welcome, Admin!
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleLogout}
                            sx={{ textTransform: 'none' }}
                        >
                            Logout
                        </Button>
                    </Stack>
                ) : (
                    <>
                        <Typography variant="h5" align="center" gutterBottom color="white">
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
                                InputLabelProps={{ style: { color: '#bbb' } }}
                                InputProps={{
                                    style: { color: '#fff' },
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#555',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#888',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#bbb',
                                        },
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                margin="normal"
                                InputLabelProps={{ style: { color: '#bbb' } }}
                                InputProps={{
                                    style: { color: '#fff' },
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#555',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#888',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#bbb',
                                        },
                                    },
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt: 2,
                                    backgroundColor: '#333',
                                    color: '#fff',
                                    '&:hover': {
                                        backgroundColor: '#444',
                                    },
                                    textTransform: 'none',
                                }}
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
    )
}

export default AdminLogin
