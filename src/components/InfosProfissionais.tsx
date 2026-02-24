import { Box, TextField, Typography, MenuItem } from "@mui/material";

type InfosProfissionaisProps = {
  departamento: string;
  setDepartamento: (v: string) => void;
  departamentos: string[];
  errors?: { [key: string]: string };
};

export default function InfosProfissionais({ departamento, setDepartamento, departamentos, errors }: InfosProfissionaisProps) {
  return (
    <>
      <Typography variant="h5" fontWeight={700} sx={{ color: '#444', mb: 3 }}>
        Informações Profissionais
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <TextField
          select
          label="Selecione um departamento"
          value={departamento}
          onChange={e => setDepartamento(e.target.value)}
          fullWidth
          SelectProps={{ displayEmpty: true }}
          sx={{ background: '#fafafa' }}
          error={!!errors?.departamento}
          helperText={errors?.departamento}
        >
          <MenuItem value="" disabled>
            Selecione um departamento
          </MenuItem>
          {departamentos.map(dep => (
            <MenuItem key={dep} value={dep}>{dep}</MenuItem>
          ))}
        </TextField>
      </Box>
    </>
  );
}
