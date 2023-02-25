import Box from "@mui/material/Box/Box"
import Card from "@mui/material/Card/Card"
import CardContent from "@mui/material/CardContent/CardContent"
import Avatar from '@mui/material/Avatar'
import Typography from "@mui/material/Typography/Typography"
import { CubeCount } from "src/model/dashboard/dashboard"
import Grid from "@mui/material/Grid/Grid"

interface Props {
  registeredApiKeyCount: number | null
  cc: CubeCount
}

interface DataType {
  title: string
  imgSrc: string
  count: number
  imgWidth: number
  imgHeight: number
}

const CubeCountCard = (props: Props) => {
  const { registeredApiKeyCount, cc } = props

  const data: DataType[] = [
    {
      title: '수상한 큐브',
      imgSrc: '/images/cube/susang.png',
      count: cc.susangCount,
      imgWidth: 30,
      imgHeight: 30,
    },
    {
      title: '장인의 큐브',
      imgSrc: '/images/cube/jangyin.png',
      count: cc.jangyinCount,
      imgWidth: 30,
      imgHeight: 30,
    },
    {
      title: '명장의 큐브',
      imgSrc: '/images/cube/myungjang.png',
      count: cc.myungjangCount,
      imgWidth: 30,
      imgHeight: 30,
    },
    {
      title: '레드 큐브',
      imgSrc: '/images/cube/red.png',
      count: cc.redCount,
      imgWidth: 35,
      imgHeight: 30,
    },
    {
      title: '블랙 큐브',
      imgSrc: '/images/cube/black.png',
      count: cc.blackCount,
      imgWidth: 35,
      imgHeight: 30,
    },
    {
      title: '에디셔널 큐브',
      imgSrc: '/images/cube/additional.png',
      count: cc.additionalCount,
      imgWidth: 35,
      imgHeight: 30,
    }
  ]

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h5'>수집된 큐브 이벤트:
          {registeredApiKeyCount !== null ? ` ${registeredApiKeyCount.toLocaleString()} 명이 ` : ` `}
          {cc.allCount.toLocaleString()} 회
        </Typography>
      </Grid>

      {
        data.map((o, index) => (
          <Grid item xs={12} sm={6} md={4} key={`cubeCount_${index}`}>
            <Card>
              <CardContent>
                <Box key={index}
                  sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                    <Avatar variant='square' alt='Mary Vaughn' src={o.imgSrc} sx={{ width: o.imgWidth, height: o.imgHeight, mr: 2.75 }} />
                    <Typography>
                      {o.title}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant='body2'>
                      {`${o.count.toLocaleString()} 회`}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))
      }
    </Grid>
  )
}

export default CubeCountCard