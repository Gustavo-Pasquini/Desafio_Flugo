import Box from '@mui/material/Box';
import Sidebar from './components/Sidebar';
import UserAvatar from './components/UserAvatar';
import HeaderActions from './components/HeaderActions';
import ColaboradoresTable from './components/ColaboradoresTable';
import CadastroColaboradores from './components/CadastroColaboradores';
import { useState } from 'react';

function App() {

  const [novoColaborador, setNovoColaborador] = useState(false);

  return (
    <Box sx={{ display: 'flex', width: '100vw', height: '100vh', background: '#f9fafb' }}>
      <Sidebar />
      <Box sx={{ flex: 1, p: 5, background: '#f9fafb', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <UserAvatar />
        { novoColaborador ? 
          <CadastroColaboradores setNovoColaborador={setNovoColaborador} />
        :
        <>
          <HeaderActions setNovoColaborador={setNovoColaborador} />
          <ColaboradoresTable />
        </>
        }
      </Box>
    </Box>
  );
}

export default App;
