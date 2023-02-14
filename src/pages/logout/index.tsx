// ** MUI Imports
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import { useLogoutAuth } from 'src/hooks/useAuth'
import { useLogoutProfile } from 'src/hooks/useProfile'

const Home = () => {
    useLogoutAuth()
    useLogoutProfile()

    const router = useRouter()
    router.push('/')

    return (
        <Typography sx={{ mb: 2 }}>
            Loading...
        </Typography>
    )
}

export default Home
