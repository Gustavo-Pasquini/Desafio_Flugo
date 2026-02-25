import { Paper, Box, Typography, Avatar, Chip } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import FlugoDataGrid from './FlugoDataGrid';
import { useEffect, useState, useRef } from 'react';
import { getColaboradores } from '../config/colaboradoresFirestore';

const formataDadosRows = (dados: any[]) => {
  return dados.map((colab) => ({
    id: colab.id,
    name: colab.nome,
    email: colab.email,
    department: colab.departamento,
    status: colab.ativo ? 'Ativo' : 'Inativo',
    avatar: colab.avatar || `https://i.pravatar.cc/150?u=${colab.email}`,
  }));
}

const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Nome',
    flex: 1.5,
    display: 'flex',
    renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }} gap={2}>
          <Avatar src={params.row.avatar} alt={params.value} sx={{ width: 36, height: 36 }} />
          <Typography fontWeight={500}>{params.value}</Typography>
        </Box>
    ),
    sortable: true,
  },
  { field: 'email', headerName: 'Email', flex: 2, sortable: true },
  { field: 'department', headerName: 'Departamento', flex: 1.2, sortable: true },
  {
    field: 'status',
    headerName: 'Status',
    flex: 1,
    renderCell: (params) => (
      <Chip
        label={params.value}
        color={params.value === 'Ativo' ? 'success' : 'error'}
        variant="filled"
        sx={{ fontWeight: 500 }}
      />
    ),
    sortable: true,
  },
];

export default function ColaboradoresTable() {

  const [colaboradores, setColaboradores] = useState<any>([]);
  const colaboradoresRef = useRef<any>([]);

  useEffect(() => {
    async function trazColaboradores() {
      try {
        const colaboradoresJaCadastrados = await getColaboradores();
        console.log('Colaboradores:', colaboradoresJaCadastrados);
        setColaboradores(formataDadosRows(colaboradoresJaCadastrados));
        colaboradoresRef.current = formataDadosRows(colaboradoresJaCadastrados);
      } catch (error) {
        console.error('Erro ao buscar colaboradores:', error);
      }
    }
    trazColaboradores();
}, []);

  return (
    <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
      <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden', width: '100%', margin: '0 auto' }}>
        <FlugoDataGrid columns={columns} rows={colaboradores} />
      </Paper>
    </Box>
  );
}
