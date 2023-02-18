// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useProfile } from 'src/hooks/useProfile'

const Home = () => {
  useProfile()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='스케줄 관련 참고 사항 🚀'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              0. 계정의 공개, 비공개 상태에 관계없이 public 이 아닌 스케줄이라면, 스케줄의 멤버만 보거나 수정할 수 있습니다.
            </Typography>
            <Typography sx={{ mb: 2 }}>
              1. 계정이 비공개 상태라면, public 스케줄 또한 스케줄의 멤버만 볼 수 있습니다.
            </Typography>
            <Typography sx={{ mb: 2 }}>
              2. 스케줄 추가, 수정 시 멤버 초대는 팔로우중이거나 계정이 공개 상태인 유저에게만 보낼 수 있습니다.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='계정 관련 참고 사항 ⚙️'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              0. PublicFlg: 계정을 공개, 비공개 상태로 바꿀 수 있습니다. 
            </Typography>
            <Typography sx={{ mb: 2 }}>
              1. NotificationFlg: 오른쪽 상단에 표시되는 알림을 받거나, 받지 않도록 할 수 있습니다. 
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Home
