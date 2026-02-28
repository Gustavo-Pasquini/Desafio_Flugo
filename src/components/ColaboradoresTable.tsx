import { Paper, Box, Typography, Avatar, Chip, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GridColDef } from '@mui/x-data-grid';
import FlugoDataGrid from './FlugoDataGrid';
import { useEffect, useState, useRef } from 'react';
import { getColaboradores, deleteColaborador } from '../config/colaboradoresFirestore';
import CadastroColaboradores from './CadastroColaboradores';

const formataDadosRows = (dados: any[]) => {
  return dados.map((colab) => ({
    id: colab.id,
    name: colab.nome,
    email: colab.email,
    department: colab.departamento,
    status: colab.ativo ? 'Ativo' : 'Inativo',
    avatar: colab.avatar || `https://i.pravatar.cc/150?u=${colab.email}`,
    gestor: colab.gestor,
    cargo: colab.cargo,
    dataAdmissao: colab.dataAdmissao,
    nivel: colab.nivel,
    salario: colab.salario,
  }));
}

  const formataDadosGestores = (dados: any[]) => {
  return dados.map((colab) => {
      if (colab.nivel !== "gestor") return null;
      return ({
      id: colab.id,
      nome: colab.nome,
      })
  }).filter(g => g !== null);
  }


export default function ColaboradoresTable() {
  const [filterNome, setFilterNome] = useState('');
  const [filterEmail, setFilterEmail] = useState('');
  const [filterDepartamento, setFilterDepartamento] = useState('');

  const [colaboradores, setColaboradores] = useState<any>([]);
  const colaboradoresRef = useRef<any>([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedColab, setSelectedColab] = useState<any>(null);
  const [editColab, setEditColab] = useState<any>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [deleteManyDialogOpen, setDeleteManyDialogOpen] = useState(false);
  const [gestores, setGestores] = useState<({ id: any; nome: any; } | null)[]>([]);

  const fetchColaboradores = async () => {
    try {
      const colaboradoresJaCadastrados = await getColaboradores();
      setColaboradores(formataDadosRows(colaboradoresJaCadastrados));
      colaboradoresRef.current = formataDadosRows(colaboradoresJaCadastrados);
      setGestores(formataDadosGestores(colaboradoresJaCadastrados));
    } catch (error) {
      console.error('Erro ao buscar colaboradores:', error);
    }
  };

  // Filtro aplicado nos dados
  const filteredRows = colaboradores.filter((row: any) => {
    const nomeMatch = row.name.toLowerCase().includes(filterNome.toLowerCase());
    const emailMatch = row.email.toLowerCase().includes(filterEmail.toLowerCase());
    const depMatch = filterDepartamento ? row.department === filterDepartamento : true;
    return nomeMatch && emailMatch && depMatch;
  });

  useEffect(() => {
    fetchColaboradores();
  }, []);

    useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  const handleEditClick = (colab: any) => {
    fetchColaboradores();
    setEditColab({
      ...colab,
      nome: colab.name,
      departamento: colab.department,
      ativo: colab.status === 'Ativo',
      gestor: colab.gestor,
      cargo: colab.cargo,
      dataAdmissao: colab.dataAdmissao,
      nivel: colab.nivel,
      salario: colab.salario,
    });
  };

  const handleDeleteClick = (colab: any) => {
    setSelectedColab(colab);
    setDeleteDialogOpen(true);
  };


  const handleDeleteConfirm = async () => {
    if (!selectedColab) return;
    await deleteColaborador(selectedColab.id);
    setDeleteDialogOpen(false);
    setSelectedColab(null);
    fetchColaboradores();
  };

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
    {
      field: 'actions',
      headerName: 'Ações',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title="Editar">
            <IconButton color="primary" onClick={() => handleEditClick(params.row)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir">
            <IconButton color="error" onClick={() => handleDeleteClick(params.row)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];


  return (
    <>
      {editColab ? (
        <CadastroColaboradores
          tipo="edicao"
          colaborador={editColab}
          onClose={() => { setEditColab(null); fetchColaboradores(); }}
          gestores={gestores}
        />
      ) : (
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', flexDirection: 'column' }}>
          <Box sx={{ width: '100%', mb: 2, display: selectedRows.length > 0 ? 'flex' : 'none', justifyContent: 'flex-end' }}>
          </Box>
          <Paper elevation={3} sx={{ borderRadius: 4, overflow: 'hidden', width: '100%', margin: '0 auto' }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Box sx={{ padding: 2, display: 'flex', gap: 2 }}>
                <TextField
                  label="Filtrar por nome"
                  value={filterNome}
                  onChange={e => setFilterNome(e.target.value)}
                  size="small"
                  sx={{ minWidth: 180 }}
                  />
                <TextField
                  label="Filtrar por email"
                  value={filterEmail}
                  onChange={e => setFilterEmail(e.target.value)}
                  size="small"
                  sx={{ minWidth: 180 }}
                  />
                <TextField
                  select
                  label="Filtrar por departamento"
                  value={filterDepartamento}
                  onChange={e => setFilterDepartamento(e.target.value)}
                  size="small"
                  sx={{ minWidth: 180 }}
                  >
                  <MenuItem value="">Todos</MenuItem>
                  {[...new Set(colaboradores.map((c: any) => c.department))]
                    .filter(dep => typeof dep === 'string' && dep.trim() !== '')
                    .map(dep => (
                      <MenuItem key={String(dep)} value={String(dep)}>{String(dep)}</MenuItem>
                    ))}
                </TextField>
              </Box>
            </Box>
            <FlugoDataGrid
              columns={columns}
              rows={filteredRows}
              setSelectedRows={setSelectedRows}
            />
          </Paper>
          <Button variant="contained" color="error" onClick={() => setDeleteManyDialogOpen(true)} style={{ marginTop: 16, display: selectedRows.length > 0 ? 'block' : 'none', alignSelf: 'flex-end' }}>
            Excluir selecionados ({selectedRows.length})
          </Button>
        </Box>
      )}

      {/* Dialog de exclusão individual */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Excluir Colaborador</DialogTitle>
        <DialogContent>
          Tem certeza que deseja excluir este colaborador?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancelar</Button>
          <Button variant="contained" color="error" onClick={handleDeleteConfirm}>Excluir</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog de exclusão múltipla */}
      <Dialog open={deleteManyDialogOpen} onClose={() => setDeleteManyDialogOpen(false)}>
        <DialogTitle>Excluir Selecionados</DialogTitle>
        <DialogContent>
          Tem certeza que deseja excluir os colaboradores selecionados?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteManyDialogOpen(false)}>Cancelar</Button>
          <Button variant="contained" color="error" onClick={async () => {
            for (const id of selectedRows) {
              await deleteColaborador(id);
            }
            setDeleteManyDialogOpen(false);
            setSelectedRows([]);
            fetchColaboradores();
          }}>Excluir Todos</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
