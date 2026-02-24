import { Box, Typography, TextField, Switch, FormControlLabel } from '@mui/material';

type InfosPessoaisProps = {
  nome: string;
  setNome: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  ativo: boolean;
  setAtivo: (v: boolean) => void;
  errors?: { [key: string]: string };
};

export default function InfosPessoais({ nome, setNome, email, setEmail, ativo, setAtivo, errors }: InfosPessoaisProps) {
  return (
    <>
      <Typography variant="h5" fontWeight={700} sx={{ color: '#444', mb: 3 }}>
        Informações Básicas
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          label="Título"
          value={nome}
          onChange={e => setNome(e.target.value)}
          fullWidth
          error={!!errors?.nome}
          helperText={errors?.nome}
          InputLabelProps={{ sx: { color: '#22c55e', fontWeight: 500 } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#22c55e' },
              '&:hover fieldset': { borderColor: '#16a34a' },
              '&.Mui-focused fieldset': { borderColor: '#22c55e' },
            },
          }}
        />
        <TextField
          label="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          fullWidth
          placeholder="e.g. john@gmail.com"
          error={!!errors?.email}
          helperText={errors?.email}
        />
        <FormControlLabel
          control={<Switch checked={ativo} onChange={e => setAtivo(e.target.checked)} sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#22c55e' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#22c55e' } }} />}
          label={<Typography sx={{ color: '#222', fontWeight: 500 }}>Ativar ao criar</Typography>}
          sx={{ mt: 1 }}
        />
      </Box>
    </>
  );
}
