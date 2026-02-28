import { Box, Typography, Stepper, Step, StepLabel, Button, LinearProgress, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import InfosPessoais from './InfosPessoais';
import InfosProfissionais from './InfosProfissionais';
import { z } from 'zod';
import { addColaborador, updateColaborador } from '../config/colaboradoresFirestore';
import { getDepartamentos, updateDepartamento } from '../config/departamentosFirestore';
// Schema de validação com zod
const colaboradorSchema = z.object({
    nome: z.string().min(2, 'Informe o nome'),
    email: z.string().email('E-mail inválido'),
    departamento: z.string().min(1, 'Selecione um departamento'),
    ativo: z.boolean(),
    cargo: z.string().min(2, 'Informe o cargo'),
    dataAdmissao: z.string().min(10, 'Informe a data de admissão'),
    nivel: z.string().min(2, 'Informe o nível hierárquico'),
    gestor: z.string().nullable(),
    salario: z.string().min(2, 'Informe o salário base'),
});

const steps = ['Infos Básicas', 'Infos Profissionais'];

type CadastroColaboradoresProps = {
    setNovoColaborador?: React.Dispatch<React.SetStateAction<boolean>>;
    tipo?: 'novo' | 'edicao';
    colaborador?: any;
    onClose?: () => void;
    gestores: ({ id: any; nome: any; } | null)[];
};

const CadastroColaboradores = ({ setNovoColaborador, tipo = 'novo', colaborador, onClose, gestores }: CadastroColaboradoresProps) => {
    const [activeStep, setActiveStep] = useState(0);
    const [nome, setNome] = useState(colaborador?.nome || '');
    const [email, setEmail] = useState(colaborador?.email || '');
    const [ativo, setAtivo] = useState(colaborador?.ativo ?? true);
    const [departamento, setDepartamento] = useState(colaborador?.departamento || '');
    const [cargo, setCargo] = useState(colaborador?.cargo || '');
    const [dataAdmissao, setDataAdmissao] = useState(colaborador?.dataAdmissao || '');
    const [nivel, setNivel] = useState(colaborador?.nivel || '');
    const [gestor, setGestor] = useState(colaborador?.gestor || '');
    const [salario, setSalario] = useState(colaborador?.salario || '');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});


    // Departamentos do banco de dados
    const [departamentos, setDepartamentos] = useState<any[]>([]);
    useEffect(() => {
        async function fetchDepartamentos() {
            const deps = await getDepartamentos();
            setDepartamentos(deps);
        }
        fetchDepartamentos();
    }, []);

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
            const result = colaboradorSchema.safeParse({ nome, email, departamento, ativo, cargo, dataAdmissao, nivel, gestor, salario });
            if (!result.success) {
                const fieldErrors: { [key: string]: string } = {};
                (result.error.issues as Array<{ path: (string | number)[]; message: string }>).forEach((err) => {
                    if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
                });
                setErrors(fieldErrors);
                return;
            }
            setErrors({});

            // Atualizar departamentos no Firestore
            const novoDep = departamentos.find((d: any) => d.nome === departamento);
            if (tipo === 'edicao' && colaborador) {
                // Se mudou de departamento, remova do antigo e adicione ao novo
                if (colaborador.departamento !== departamento) {
                    const antigoDep = departamentos.find((d: any) => d.nome === colaborador.departamento);
                    if (antigoDep) {
                        await updateDepartamento(antigoDep.id, {
                            ...antigoDep,
                            colaboradores: (antigoDep.colaboradores || []).filter((id: string) => id !== colaborador.id)
                        });
                    }
                    if (novoDep) {
                        await updateDepartamento(novoDep.id, {
                            ...novoDep,
                            colaboradores: [...(novoDep.colaboradores || []), colaborador.id]
                        });
                    }
                }
                await updateColaborador(colaborador.id, { nome, email, departamento, ativo, cargo, dataAdmissao, nivel, gestor, salario, avatar: colaborador.avatar });
                alert('Colaborador editado com sucesso!');
                if (onClose) onClose();
            } else {
                // Cadastro novo colaborador: adiciona ao departamento
                const colabRef = await addColaborador({ nome, email, departamento, ativo, cargo, dataAdmissao, nivel, gestor, salario, avatar: `https://i.pravatar.cc/150?u=${email}` });
                if (novoDep) {
                    await updateDepartamento(novoDep.id, {
                        ...novoDep,
                        colaboradores: [...(novoDep.colaboradores || []), colabRef.id]
                    });
                }
                alert('Colaborador cadastrado com sucesso!');
                if (setNovoColaborador) setNovoColaborador(false);
            }
        }

    return (
        <Box sx={{ display: 'flex', width: '100%', height: '100%', background: '#f9fafb' }}>
            <Box sx={{ flex: 1, p: 5, display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <Box sx={{ width: '100%', maxWidth: 900, ml: 'auto', mr: 'auto' }}>
                                        <Typography sx={{ color: '#888', fontSize: 16, mb: 1 }}>
                                                <button style={{background: 'none', border: 'none', color: '#222', fontWeight: 500}} type='button'  onClick={() => {
                                                    if (tipo === 'edicao' && onClose) onClose();
                                                    else if (setNovoColaborador) setNovoColaborador(false);
                                                }}>
                                                    Colaboradores
                                                </button> <span style={{ color: '#bdbdbd' }}>•</span> <span style={{ marginLeft: '15px', color: '#666', fontWeight: 300 }}>{tipo === 'edicao' ? 'Editar Colaborador' : 'Cadastrar Colaborador'}</span>
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
                                        departamentos={departamentos.map(d => d.nome)}
                                        cargo={cargo}
                                        setCargo={setCargo}
                                        dataAdmissao={dataAdmissao}
                                        setDataAdmissao={setDataAdmissao}
                                        nivel={nivel}
                                        setNivel={setNivel}
                                        gestor={gestor}
                                        setGestor={setGestor}
                                        gestores={gestores.filter(g => g?.id !== colaborador?.id)}
                                        salario={salario}
                                        setSalario={setSalario}
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