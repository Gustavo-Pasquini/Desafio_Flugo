import { Paper, Box, Typography, Avatar, Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import FlugoDataGrid from './flugoDataGrid';

const rows = [
  { id: 1, name: 'Fernanda Torres', email: 'fernandatorres@flugo.com', department: 'Design', status: 'Ativo', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: 2, name: 'Joana D’Arc', email: 'joanadarc@flugo.com', department: 'TI', status: 'Ativo', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: 3, name: 'Mari Froes', email: 'marifroes@flugo.com', department: 'Marketing', status: 'Ativo', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: 4, name: 'Clara Costa', email: 'claracosta@flugo.com', department: 'Produto', status: 'Inativo', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
];

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
  return (
    <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
      <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden', width: '100%', margin: '0 auto' }}>
        <FlugoDataGrid columns={columns} rows={rows} />
      </Paper>
    </Box>
  );
}
