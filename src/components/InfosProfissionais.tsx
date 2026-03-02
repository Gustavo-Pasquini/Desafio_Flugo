import { Box, TextField, Typography, MenuItem } from "@mui/material";

type InfosProfissionaisProps = {
  departamento: string;
  setDepartamento: (v: string) => void;
  departamentos: string[];
  cargo: string;
  setCargo: (v: string) => void;
  dataAdmissao: string;
  setDataAdmissao: (v: string) => void;
  nivel: string;
  setNivel: (v: string) => void;
  gestor: string;
  setGestor: (v: string) => void;
  gestores: ({ id: any; nome: any; } | null)[];
  salario: string;
  setSalario: (v: string) => void;
  errors?: { [key: string]: string };
};

export default function InfosProfissionais({ departamento, setDepartamento, departamentos, cargo, setCargo, dataAdmissao, setDataAdmissao, nivel, setNivel, gestor, setGestor, gestores, salario, setSalario, errors }: InfosProfissionaisProps) {
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
          error={!!errors?.departamento}
          helperText={errors?.departamento}
          InputLabelProps={{ sx: { color: '#22c55e', fontWeight: 500 } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#22c55e' },
              '&:hover fieldset': { borderColor: '#16a34a' },
              '&.Mui-focused fieldset': { borderColor: '#22c55e' },
            },
          }}
        >
          <MenuItem value="" disabled>
            Selecione um departamento
          </MenuItem>
          {departamentos.map(dep => (
            <MenuItem key={dep} value={dep}>{dep}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Cargo"
          value={cargo}
          onChange={e => setCargo(e.target.value)}
          fullWidth
          error={!!errors?.cargo}
          helperText={errors?.cargo}
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
          label="Data de admissão"
          type="date"
          value={dataAdmissao}
          onChange={e => setDataAdmissao(e.target.value)}
          fullWidth
          error={!!errors?.dataAdmissao}
          helperText={errors?.dataAdmissao}
          InputLabelProps={{ shrink: true, sx: { color: '#22c55e', fontWeight: 500 } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#22c55e' },
              '&:hover fieldset': { borderColor: '#16a34a' },
              '&.Mui-focused fieldset': { borderColor: '#22c55e' },
            },
          }}
        />
        <TextField
          select
          label="Nível hierárquico"
          value={nivel}
          onChange={e => setNivel(e.target.value)}
          fullWidth
          error={!!errors?.nivel}
          helperText={errors?.nivel}
          InputLabelProps={{ sx: { color: '#22c55e', fontWeight: 500 } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#22c55e' },
              '&:hover fieldset': { borderColor: '#16a34a' },
              '&.Mui-focused fieldset': { borderColor: '#22c55e' },
            },
          }}          
        >
          <MenuItem value="" disabled>
            Selecione o nível
          </MenuItem>
          <MenuItem value="junior">Júnior</MenuItem>
          <MenuItem value="pleno">Pleno</MenuItem>
          <MenuItem value="senior">Sênior</MenuItem>
          <MenuItem value="gestor">Gestor</MenuItem>
        </TextField>
        <TextField
          select
          label="Gestor responsável"
          value={gestor}
          onChange={e => setGestor(e.target.value)}
          fullWidth
          error={!!errors?.gestor}
          helperText={errors?.gestor}
          InputLabelProps={{ sx: { color: '#22c55e', fontWeight: 500 } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#22c55e' },
              '&:hover fieldset': { borderColor: '#16a34a' },
              '&.Mui-focused fieldset': { borderColor: '#22c55e' },
            },
          }}          
        >
          <MenuItem value="" disabled>
            Selecione o gestor
          </MenuItem>
          {(gestores?.map(g => (
            <MenuItem key={g?.id} value={g?.id}>{g?.nome}</MenuItem>
          ))
          )}
        </TextField>
        <TextField
          label="Salário base"
          type="number"
          value={salario}
          onChange={e => setSalario(e.target.value)}
          fullWidth
          error={!!errors?.salario}
          helperText={errors?.salario}
          InputLabelProps={{ sx: { color: '#22c55e', fontWeight: 500 } }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#22c55e' },
              '&:hover fieldset': { borderColor: '#16a34a' },
              '&.Mui-focused fieldset': { borderColor: '#22c55e' },
            },
          }}
        />
      </Box>
    </>
  );
}
