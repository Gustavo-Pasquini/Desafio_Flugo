import { Box, Typography, Stepper, Step, StepLabel, Button, LinearProgress, Paper } from '@mui/material';
import { useState } from 'react';
import InfosPessoais from './InfosPessoais';
import InfosProfissionais from './InfosProfissionais';
import { z } from 'zod';
import { addColaborador } from '../config/colaboradoresFirestore';
// Schema de validação com zod
const colaboradorSchema = z.object({
    nome: z.string().min(2, 'Informe o nome'),
    email: z.string().email('E-mail inválido'),
    departamento: z.string().min(1, 'Selecione um departamento'),
    ativo: z.boolean(),
});

const steps = ['Infos Básicas', 'Infos Profissionais'];

type CadastroColaboradoresProps = {
    setNovoColaborador: React.Dispatch<React.SetStateAction<boolean>>;
};

const CadastroColaboradores = ({setNovoColaborador}: CadastroColaboradoresProps) => {
    const [activeStep, setActiveStep] = useState(0);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [ativo, setAtivo] = useState(true);
    const [departamento, setDepartamento] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Departamentos fictícios para o select
        const departamentos = [
            'Design',
            'TI',
            'Marketing',
            'Produto',
            'RH',
            'Financeiro',
        ];

    // Progresso
        const progress = activeStep === 0 ? 0 : 50;

        // Validação dos steps
        function handleNext() {
            const result = colaboradorSchema.pick({ nome: true, email: true, ativo: true }).safeParse({ nome, email, ativo });
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
            const result = colaboradorSchema.safeParse({ nome, email, departamento, ativo });
                    if (!result.success) {
                        const fieldErrors: { [key: string]: string } = {};
                        (result.error.issues as Array<{ path: (string | number)[]; message: string }>).forEach((err) => {
                            if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
                        });
                        setErrors(fieldErrors);
                        return;
                    }
            setErrors({});
            // Aqui você pode enviar os dados para o backend
            await addColaborador({ nome, email, departamento, ativo, avatar: `https://i.pravatar.cc/150?u=${email}` });
            alert('Colaborador cadastrado com sucesso!');
            setNovoColaborador(false);
        }

    return (
        <Box sx={{ display: 'flex', width: '100%', height: '100%', background: '#f9fafb' }}>
            <Box sx={{ flex: 1, p: 5, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Box sx={{ width: '100%', maxWidth: 900, ml: 'auto', mr: 'auto' }}>
                    <Typography sx={{ color: '#888', fontSize: 16, mb: 1 }}>
                        <button style={{background: 'none', border: 'none', color: '#222', fontWeight: 500}} type='button'  onClick={() => setNovoColaborador(false)}>Colaboradores</button> <span style={{ color: '#bdbdbd' }}>•</span> <span style={{ marginLeft: '15px', color: '#666', fontWeight: 300 }}>Cadastrar Colaborador</span>
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
                                    <InfosPessoais
                                        nome={nome}
                                        setNome={setNome}
                                        email={email}
                                        setEmail={setEmail}
                                        ativo={ativo}
                                        setAtivo={setAtivo}
                                        errors={errors}
                                    />
                                ) : (
                                    <InfosProfissionais
                                        departamento={departamento}
                                        setDepartamento={setDepartamento}
                                        departamentos={departamentos}
                                        errors={errors}
                                    />
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

export default CadastroColaboradores;