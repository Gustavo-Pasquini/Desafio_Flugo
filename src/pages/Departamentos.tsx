
import { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import Sidebar from '../components/Sidebar';
import UserAvatar from '../components/UserAvatar';
import DepartamentosTable from '../components/DepartamentosTable';
import CadastroDepartamento from '../components/CadastroDepartamento';
import { getDepartamentos, deleteDepartamento } from '../config/departamentosFirestore';
import { getColaboradores } from '../config/colaboradoresFirestore';
import AddIcon from '@mui/icons-material/Add';

export default function Departamentos() {
  const [departamentos, setDepartamentos] = useState<any[]>([]);
  const [colaboradores, setColaboradores] = useState<any[]>([]);
  const [gestores, setGestores] = useState<any[]>([]);
  const [editDep, setEditDep] = useState<any>(null);
  const [deleteDep, setDeleteDep] = useState<any>(null);
  const [cadastroOpen, setCadastroOpen] = useState(false);

  const fetchData = async () => {
    const deps = await getDepartamentos();
    const colabs = await getColaboradores();
    setDepartamentos(deps);
    setColaboradores(colabs);
    setGestores(colabs.filter((c: any) => c.nivel === 'gestor'));
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh', background: '#f9fafb', overflow: 'hidden' }}>
      <Sidebar />
      <Box sx={{ flex: 1, p: 5, background: '#f9fafb', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <UserAvatar />
        <Box sx={{ width: '100%', mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
                onClick={() => setCadastroOpen(true)}
                variant="contained" 
                startIcon={<AddIcon />} 
                sx={{ background: '#22c55e', borderRadius: 2, textTransform: 'none', fontWeight: 600, '&:hover': { background: '#16a34a' } }}
            >
            Novo Departamento
            </Button>
        </Box>
        {(!cadastroOpen && !editDep) ? (
            <DepartamentosTable
              departamentos={departamentos}
              colaboradores={colaboradores}
              setEditDep={setEditDep}
              setDeleteDep={setDeleteDep}
            />
        ) : null}
        {cadastroOpen && (
          <CadastroDepartamento
            tipo="novo"
            onClose={() => { setCadastroOpen(false); fetchData(); }}
            gestores={gestores}
            colaboradores={colaboradores}
          />
        )}
        {editDep && (
          <CadastroDepartamento
            tipo="edicao"
            departamento={editDep}
            onClose={() => { setEditDep(null); fetchData(); }}
            gestores={gestores}
            colaboradores={colaboradores}
          />
        )}
        <Dialog open={!!deleteDep} onClose={() => setDeleteDep(null)}>
          <DialogTitle>Excluir Departamento</DialogTitle>
          <DialogContent>
            Tem certeza que deseja excluir este departamento?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDep(null)}>Cancelar</Button>
            <Button variant="contained" color="error" onClick={async () => {
              // Verifica se há colaboradores vinculados
              const vinculados = colaboradores.filter((c: any) => c.departamento === deleteDep.nome);
              if (vinculados.length > 0) {
                alert('Não é possível excluir o departamento. Existem colaboradores vinculados.');
                return;
              }
              await deleteDepartamento(deleteDep.id);
              setDeleteDep(null);
              fetchData();
            }}>Excluir</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
