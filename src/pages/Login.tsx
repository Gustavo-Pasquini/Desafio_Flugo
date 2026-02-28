import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  error?: string;
  loading?: boolean;
}

const Login = ({ onLogin, error, loading }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#fefefe',
        
      }}
    >
      <Paper sx={{ p: 4, minWidth: 520, maxWidth: 520 }}>
        {/* <Typography variant="h5" mb={2} align="center">Login</Typography> */}
        <img src="/flugo.png" alt="Flugo" style={{ width: 87, height: 32, display: 'block', margin: '0 auto 24px' }} />
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <Typography color="error" variant="body2" mt={1}>{error}</Typography>}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' } }} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default Login;
