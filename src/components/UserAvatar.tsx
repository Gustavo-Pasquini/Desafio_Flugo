import { Box, Avatar } from '@mui/material';

export default function UserAvatar() {
  return (
    <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
      <Avatar src="https://randomuser.me/api/portraits/women/5.jpg" />
    </Box>
  );
}
