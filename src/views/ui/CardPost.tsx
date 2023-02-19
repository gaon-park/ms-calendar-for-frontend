// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { Avatar, CardHeader, CardMedia, IconButton } from '@mui/material'

const CardPost = () => {

    return (
        <Card>
            <CardHeader
                avatar={<Avatar>G</Avatar>}
                action={
                    <IconButton aria-label="settings">
                    </IconButton>
                }
                title="nickName"
                subheader="@accountId"
            />
            <CardMedia
                component={'img'}
                height='500' image='/images/test-image.png' />
            <CardContent>
                <Typography variant='h6' sx={{ mb: 2 }}>
                    Influencing The Influencer
                </Typography>
                <Typography variant='body2'>
                    Cancun is back, better than ever! Over a hundred Mexico resorts have reopened and the state tourism minister
                    predicts Cancun will draw as many visitors in 2006 as it did two years ago.
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardPost
