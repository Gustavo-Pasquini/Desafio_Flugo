import { Box, Typography, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Sidebar() {
  return (
    <Box sx={{ width: 240, background: '#fff', borderRight: '1px dashed #e5e7eb', p: 3, display: 'flex', flexDirection: 'column', gap: 4, minHeight: '100vh' }}>
      <Box display="flex" alignItems="center" gap={1}>
        <img src="/flugo.png" alt="Flugo" style={{ width: 87, height: 32 }} />
      </Box>
      <Box mt={4}>
        <Button variant="text" startIcon={<PersonIcon />} sx={{ justifyContent: 'space-around', color: '#222', fontWeight: 500, textTransform: 'none', borderRadius: 2, width: '100%' }} endIcon={<ArrowForwardIosIcon />}>
          Colaboradores
        </Button>
      </Box>
    </Box>
  );
}
