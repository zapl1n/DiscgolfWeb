
import { useState, useEffect } from 'react'




const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsLoggedIn(true)
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
    <div >
        {isLoggedIn ? (
            <div >
                <h2>Welcome, Admin!</h2>
                <button  onClick={handleLogout}>Logout</button>
            </div>
        ) : (
            <div  >
                <h2>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            
            <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
       
        )}
       
      
    </div>
  )
}

export default AdminLogin;