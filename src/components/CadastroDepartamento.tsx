
import { Box, Typography, Stepper, Step, StepLabel, Button, LinearProgress, Paper, TextField, MenuItem, Chip } from '@mui/material';
import { useState, useEffect } from 'react';
import { z } from 'zod';
import { addDepartamento, updateDepartamento } from '../config/departamentosFirestore';

const departamentoSchema = z.object({
  nome: z.string().min(2, 'Informe o nome do departamento'),
  gestor: z.string().min(1, 'Selecione o gestor'),
});

const steps = ['Informações Básicas', 'Colaboradores'];

export default function CadastroDepartamento({ departamento, onClose, gestores, colaboradores: colaboradoresProp, tipo }: any) {
  const [activeStep, setActiveStep] = useState(0);
  const [nome, setNome] = useState(departamento?.nome || '');
  const [gestor, setGestor] = useState(departamento?.gestor || '');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [colaboradores, setColaboradores] = useState<any[]>(colaboradoresProp);

  // Atualiza lista de colaboradores ao prop mudar
  useEffect(() => {
    setColaboradores(colaboradoresProp);
  }, [colaboradoresProp]);

  // ...existing code...

  const progress = activeStep === 0 ? 0 : 50;

  function handleNext() {
    const result = departamentoSchema.pick({ nome: true, gestor: true }).safeParse({ nome, gestor });
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      (result.error.issues as Array<{ path: (string | number)[]; message: string }>).forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setActiveStep(s => s + 1);
  }

  async function handleConcluir() {
    const result = departamentoSchema.safeParse({ nome, gestor });
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      (result.error.issues as Array<{ path: (string | number)[]; message: string }>).forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    const dep = { nome, gestor };
    if (tipo === 'edicao' && departamento) {
      await updateDepartamento(departamento.id, dep);
      alert('Departamento editado com sucesso!');
      onClose();
    } else {
      await addDepartamento(dep);
      alert('Departamento cadastrado com sucesso!');
      onClose();
    }
  }

  return (
    <Box sx={{ display: 'flex', width: '100%', height: '100%', background: '#f9fafb' }}>
      <Box sx={{ flex: 1, p: 5, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
        <Box sx={{ width: '100%', maxWidth: 900, ml: 'auto', mr: 'auto' }}>
          <Typography sx={{ color: '#888', fontSize: 16, mb: 1 }}>
            <button style={{background: 'none', border: 'none', color: '#222', fontWeight: 500}} type='button'  onClick={onClose}>
              Departamentos
            </button> <span style={{ color: '#bdbdbd' }}>•</span> <span style={{ marginLeft: '15px', color: '#666', fontWeight: 300 }}>{tipo === 'edicao' ? 'Editar Departamento' : 'Cadastrar Departamento'}</span>
          </Typography>
          <Box sx={{ width: '100%', mb: 3 }}>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 4, borderRadius: 2, background: '#e5e7eb', '& .MuiLinearProgress-bar': { background: '#22c55e' } }} />
            <Typography sx={{ fontSize: 12, color: '#bdbdbd', textAlign: 'right', mt: 0.5 }}>{progress}%</Typography>
          </Box>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 4, mt: 2 }}>
            <Box sx={{ display: 'flex', gap: 6 }}>
              <Stepper activeStep={activeStep} orientation="vertical" sx={{ minWidth: 180 }}>
                {steps.map((label, idx) => (
                  <Step
                    key={label}
                    completed={activeStep > idx}
                    sx={{
                      '& .MuiStepIcon-root': {
                        color: '#bdbdbd',
                      },
                      '& .MuiStepIcon-root.Mui-active, & .MuiStepIcon-root.Mui-completed': {
                        color: '#22c55e',
                      },
                      '& .MuiStepLabel-label': {
                        color: activeStep === idx ? '#222' : '#bdbdbd',
                        fontWeight: activeStep === idx ? 700 : 400,
                      },
                    }}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Box sx={{ flex: 1 }}>
                {activeStep === 0 ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                      label="Nome do departamento"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                      error={!!errors.nome}
                      helperText={errors.nome}
                      fullWidth
                    />
                    <TextField
                      select
                      label="Gestor"
                      value={gestor}
                      onChange={e => setGestor(e.target.value)}
                      error={!!errors.gestor}
                      helperText={errors.gestor}
                      fullWidth
                    >
                      <MenuItem value="" disabled>Selecione</MenuItem>
                      {gestores.map((g: any) => (
                        <MenuItem key={g.id} value={g.id}>{g.nome}</MenuItem>
                      ))}
                    </TextField>
                  </Box>
                ) : (
                  <Box>
                    <Typography variant="subtitle1" mb={1}>Colaboradores deste departamento</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      {colaboradores.filter((c: any) => c.departamento === nome).map((colab: any) => (
                        <Chip key={colab.id} label={colab.nome} />
                      ))}
                    </Box>
                    <TextField select label="Adicionar colaborador" value="" onChange={async e => {
                      const id = e.target.value;
                      if (!id) return;
                      // Atualiza colaborador para este departamento
                      const res = await import('../config/colaboradoresFirestore');
                      await res.updateColaborador(id, { departamento: nome });
                      // Atualiza lista local para refletir mudança imediatamente
                      setColaboradores(prev => prev.map((c: any) => c.id === id ? { ...c, departamento: nome } : c));
                    }} fullWidth sx={{ mb: 2 }}>
                      <MenuItem value="">Selecione</MenuItem>
                      {colaboradores.filter((c: any) => c.departamento !== nome).map((c: any) => (
                        <MenuItem key={c.id} value={c.id}>{c.nome}</MenuItem>
                      ))}
                    </TextField>
                  </Box>
                )}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6 }}>
              <Button
                sx={{ color: '#bdbdbd', fontWeight: 600, textTransform: 'none' }}
                onClick={() => setActiveStep(s => Math.max(0, s - 1))}
                disabled={activeStep === 0}
              >
                Voltar
              </Button>
              {activeStep === 0 ? (
                <Button
                  variant="contained"
                  sx={{ background: '#22c55e', borderRadius: 2, textTransform: 'none', fontWeight: 600, px: 5, '&:hover': { background: '#16a34a' } }}
                  onClick={handleNext}
                >
                  Próximo
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{ background: '#22c55e', borderRadius: 2, textTransform: 'none', fontWeight: 600, px: 5, '&:hover': { background: '#16a34a' } }}
                  onClick={async () => await handleConcluir()}
                >
                  Concluir
                </Button>
              )}
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
