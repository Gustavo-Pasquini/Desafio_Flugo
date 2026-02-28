import Box from '@mui/material/Box';
import Sidebar from '../components/Sidebar';
import UserAvatar from '../components/UserAvatar';
import HeaderActions from '../components/HeaderActions';
import ColaboradoresTable from '../components/ColaboradoresTable';
import CadastroColaboradores from '../components/CadastroColaboradores';
import { createColaboradoresCollection, getColaboradores } from '../config/colaboradoresFirestore';
import { useEffect, useState } from 'react';

function Colaboradores() {
  const [novoColaborador, setNovoColaborador] = useState(false);
  const [gestores, setGestores] = useState<({ id: any; nome: any; } | null)[]>([]);

    const formataDadosGestores = (dados: any[]) => {
    return dados.map((colab) => {
        if (colab.nivel !== "gestor") return null;
        return ({
        id: colab.id,
        nome: colab.nome,
        })
    }).filter(g => g !== null);
    }
    

  useEffect(() => {
    document.title = 'Flugo - Gestão de Colaboradores';
    async function initializeFirestore() {
      try {
        await createColaboradoresCollection();
        console.log('Firestore inicializado e coleção de colaboradores criada (se não existia).');
      } catch (error) {
        console.error('Erro ao inicializar Firestore:', error);
      }
    }
    initializeFirestore();
  }, [])

    const fetchColaboradores = async () => {
        try {
        const colaboradoresJaCadastrados = await getColaboradores();
        setGestores(formataDadosGestores(colaboradoresJaCadastrados));
        } catch (error) {
        console.error('Erro ao buscar colaboradores:', error);
        }
    };

    useEffect(() => {
        fetchColaboradores();
    }, []);

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh', background: '#f9fafb', overflow: 'hidden' }}>
      <Sidebar />
      <Box sx={{ flex: 1, p: 5, background: '#f9fafb', display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
        <UserAvatar />
        { novoColaborador ? 
          <CadastroColaboradores setNovoColaborador={setNovoColaborador} gestores={gestores} />
        :
        <>
          <HeaderActions setNovoColaborador={() => { fetchColaboradores(); setNovoColaborador(true); }} />
          <ColaboradoresTable />
        </>
        }
      </Box>
    </Box>
  );
}

export default Colaboradores;
