import { Box, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';

export default function UserAvatar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    window.location.href = '/login';
  };

  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
      <IconButton onClick={handleMenu} size="small">
        <Avatar src="https://randomuser.me/api/portraits/women/5.jpg" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>
    </Box>
  );
}
