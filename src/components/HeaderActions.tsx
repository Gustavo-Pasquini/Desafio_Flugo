import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type HeaderActionsProps = {
  setNovoColaborador: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function HeaderActions({ setNovoColaborador }: HeaderActionsProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, marginTop: 16 }}>
  <Typography variant="h5" fontWeight={700} sx={{ color: '#222' }}>Colaboradores</Typography>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button 
            onClick={() => setNovoColaborador(true)}
            variant="contained" 
            startIcon={<AddIcon />} 
            sx={{ background: '#22c55e', borderRadius: 2, textTransform: 'none', fontWeight: 600, '&:hover': { background: '#16a34a' } }}
        >
          Novo Colaborador
        </Button>
      </Box>
    </div>
  );
}
