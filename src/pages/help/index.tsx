// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { useProfile } from 'src/hooks/useProfile'
import Link from '@mui/material/Link/Link'

const HelpPage = () => {
  useProfile()

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='유저 관련 참고 사항 👩🏻‍💻'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              0. 검색 시 유저의 ID 를 클릭하면, 유저의 프로필 상세 페이지로 이동합니다.
            </Typography>
            <Typography sx={{ mb: 2 }}>
              1. 유저의 상세 페이지에서 팔로우 요청을 하거나, 팔로우를 취소할 수 있습니다.
            </Typography>
            <Typography sx={{ mb: 2 }}>
              2. 검색은 한 번에 최대 100건 까지 가능합니다. 결과값이 100건 이상으로 중복될 때 키워드나, 필터를 사용해 검색 범위를 줄여주세요.
            </Typography>
            <Typography sx={{ mb: 2 }}>
              3. 나의 프로필 화면에서 팔로잉, 팔로워을 관리할 수 있습니다.
              <Typography sx={{ mb: 2 }}>
                - 팔로우 요청을 승인
              </Typography>
              <Typography sx={{ mb: 2 }}>
                - 나의 팔로워에서 삭제(팔로우 요청을 거절)
              </Typography>
            </Typography>
            <Typography sx={{ mb: 2 }}>
              4. 큐브 데이터를 확인하기 위한 API KEY 는 계정 설정 페이지 [큐브 API 키] 페이지에서 할 수 있습니다.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='일정 관련 참고 사항 🚀'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              0. 계정의 공개, 비공개 상태에 관계없이 '참석자만'을 설정한 일정이면, 일정의 멤버만 보거나 수정할 수 있습니다.
            </Typography>
            <Typography sx={{ mb: 2 }}>
              1. 계정이 비공개 상태라면, '모두에게' 일정은 일정의 멤버, 혹은 팔로워만 볼 수 있습니다.
            </Typography>
            <Typography sx={{ mb: 2 }}>
              2. 일정 추가, 수정 시 멤버 초대는 팔로워이거나 계정이 공개 상태인 유저에게만 보낼 수 있습니다.
            </Typography>
            <Typography sx={{ mb: 2 }}>
              3. 반복 일정은 종료일 미설정 시, 최대 1년 후까지 반복됩니다.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='계정 관련 참고 사항 ⚙️'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              0. 여러분의 구글 이메일은 로그인 시 유저 식별을 위한 값이며, 초기 계정ID와 닉네임으로 사용됩니다.
            </Typography>
            <Typography sx={{ mb: 2 }}>
              1. 계정을 비공개로 설정하는 경우, 팔로워가 아닌 유저에게는 '팔로워', '팔로우' 리스트를 제공하지 않습니다. 
            </Typography>
            <Typography sx={{ mb: 2 }}>
              2. 로그인 후 설정 가능한 계정ID는 같은 값이 존재할 수 없습니다. 닉네임은 중복가능합니다.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='버그, 오타 제보 😞 추가 기능 요청 🥰'></CardHeader>
          <CardContent>
            <Typography sx={{ mb: 2 }}>
              0. 오픈 카톡
              <Link target='_blank' href='https://open.kakao.com/o/sBRuuZDe'>
                {` 뽀돌`}
              </Link>
            </Typography>
            <Typography sx={{ mb: 2 }}>
              1. 이메일
              <Link target="_top" href="mailto:ondol1224@gmail.com?subject=ms-hero 버그 제보">
                {` ondol1224@gmail.com`}
              </Link>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default HelpPage
