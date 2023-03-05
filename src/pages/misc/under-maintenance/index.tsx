// ** React Imports
import { ReactNode } from 'react'

// ** MUI Components
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box, { BoxProps } from '@mui/material/Box'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import FooterIllustrations from 'src/views/pages/misc/FooterIllustrations'

// ** Styled Components
const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const TreeIllustration = styled('img')(({ theme }) => ({
  left: '0.375rem',
  bottom: '5.5rem',
  position: 'absolute',
  [theme.breakpoints.down('lg')]: {
    left: 0,
    bottom: 0
  }
}))

const UnderMaintenance = () => {
  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          <Typography variant='h5' sx={{ mb: 1, fontSize: '1.5rem !important' }}>
            사이트 점검중! 🚧
          </Typography>
          <Typography variant='body2'>
            죄송합니다. 금방 돌려놓을게요!
          </Typography>
        </BoxWrapper>
      </Box>
      <FooterIllustrations image={<TreeIllustration alt='tree' src='/images/pages/tree-3.png' />} />
    </Box>
  )
}

UnderMaintenance.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default UnderMaintenance
