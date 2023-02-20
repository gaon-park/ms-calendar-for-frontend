// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Avatar, Box, CardMedia } from '@mui/material'

const CardPost = () => {

    return (
        <Card
            raised
            sx={{
                maxWidth: 1280,
                margin: '0 auto',
            }}
        >
            <CardContent>
                <Box
                    key={'key'}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Avatar src={'/images/avatars/1.png'} sx={{ mr: 3, width: 38, height: 38 }} />
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Box sx={{ mr: 2, display: 'flex', mb: 0.4, flexDirection: 'column' }}>
                            <Typography variant='body2' sx={{ mb: 0.5, fontWeight: 600, color: 'text.primary' }}>
                                nickname
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    '& svg': { mr: 1.5, color: 'text.secondary', verticalAlign: 'middle' }
                                }}
                            >
                                <Typography variant='caption'>@accountid</Typography>
                            </Box>
                        </Box>

                    </Box>
                </Box>
            </CardContent>
            <CardMedia
                component={'img'}
                height='360'
                sx={{
                    padding: '0',
                    objectFit: 'contain'
                }}
                image='/images/test-image.png' />
            <CardContent>
                <Typography variant='body2'>
                    좋아요 댓글
                </Typography>
            </CardContent>
            <CardContent>
                <Typography variant='body2'>
                    Cancun is back, better than ever! Over a hundred Mexico resorts have reopened and the state tourism minister
                    predicts Cancun will draw as many visitors in 2006 as it did two years ago.
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardPost
