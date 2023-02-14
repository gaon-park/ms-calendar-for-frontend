// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Theme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

const FooterContent = () => {
  // ** Var
  const hidden = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2 }}>
        {`© 2023, Made by `}
        {/* todo */}
        <Link target='_blank' href='#'>
          리부트 뽀돌
        </Link>
      </Typography>
      <Typography sx={{ mr: 1, fontSize: 12 }}>
        ms-hero.kr isn’t endorsed by NEXON Korea and doesn’t reflect the views or opinions of Nexon KOREA or anyone officially involved in producing or managing MapleStory.
      </Typography>
      {hidden ? null : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', '& :not(:last-child)': { mr: 4 } }}>
          <Link target="_top" href="mailto:ondol1224@gmail.com?subject=ms-hero 버그 제보">
            버그 제보
          </Link>
        </Box>
      )}
    </Box>
  )
}

export default FooterContent
