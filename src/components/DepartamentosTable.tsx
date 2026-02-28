import { Box, Paper, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FlugoDataGrid from './FlugoDataGrid';

export default function DepartamentosTable({ departamentos, colaboradores, setEditDep, setDeleteDep }: any) {
  const columns = [
    { field: 'nome', headerName: 'Nome', flex: 2 },
    {
      field: 'gestor',
      headerName: 'Gestor',
      flex: 2,
      renderCell: (params: any) => {
        const gestor = colaboradores.find((c: any) => c.id === params.value);
        return gestor ? gestor.nome : '-';
      }
    },
    {
      field: 'colaboradores',
      headerName: 'Colaboradores',
      flex: 3,
      renderCell: (params: any) => {
        // Busca colaboradores vinculados ao departamento
        const colabs = colaboradores.filter((c: any) => c.departamento === params.row.nome).map((c: any) => c.nome);
        return colabs.length ? colabs.join(', ') : '-';
      }
    },
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 1,
      sortable: false,
      renderCell: (params: any) => (
        <Box>
          <Tooltip title="Editar">
            <IconButton color="primary" onClick={() => setEditDep(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir">
            <IconButton color="error" onClick={() => setDeleteDep(params.row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden', width: '100%', margin: '0 auto' }}>
      <FlugoDataGrid columns={columns} rows={departamentos} setSelectedRows={() => {}} />
    </Paper>
  );
}
