import { Box, Typography, Button } from '@mui/material';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh', background: '#f9fafb' }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
        <ErrorOutlineIcon sx={{ fontSize: 80, color: '#22c55e' }} />
        <Typography variant="h3" sx={{ color: '#22c55e', fontWeight: 700 }}>404</Typography>
        <Typography variant="h5" sx={{ color: '#16a34a', mb: 2 }}>Página não encontrada</Typography>
        <Typography variant="body1" sx={{ color: '#16a34a', mb: 4, textAlign: 'center', maxWidth: 400 }}>
          A página que você tentou acessar não existe ou foi removida.<br />Verifique o endereço ou volte para a página inicial.
        </Typography>
        <Button variant="contained" sx={{ bgcolor: '#22c55e', '&:hover': { bgcolor: '#16a34a' }, color: '#fff', fontWeight: 600 }} onClick={() => navigate('/login')}>
          Ir para Login
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
