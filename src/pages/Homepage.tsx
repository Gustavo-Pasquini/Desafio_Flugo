import { Box } from "@mui/material"
import Sidebar from "../components/Sidebar"
import UserAvatar from "../components/UserAvatar";

const Homepage = () => {
    return (
            <Box sx={{ display: 'flex', width: '100vw', height: '100vh', background: '#f9fafb' }}>
                <Sidebar />
                <Box sx={{ flex: 1, p: 5, background: '#f9fafb', display: 'flex', flexDirection: 'column', overflow: 'auto', position: 'relative' }}>
                    <Box sx={{ position: 'absolute', top: 24, right: 32, zIndex: 10 }}>
                        <UserAvatar />
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <img src="/flugo_opacity.png" alt="Flugo" style={{ width: 600, height: 240 }} />
                        <h1 style={{ textAlign: 'center', color: "#222", marginBottom: -12 }}>Bem-vindo à página inicial</h1>
                        <h5 style={{ textAlign: 'center', color: "#666" }}>O sistema de gestão da sua empresa</h5>
                    </Box>
                </Box>
            </Box>
    )
}

export default Homepage;