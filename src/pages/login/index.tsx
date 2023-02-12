import { Box } from "@mui/material"
import { ReactNode } from "react"
import BlankLayout from "src/@core/layouts/BlankLayout"

const LoginPage = () => {
  return (
    <Box className='content-right'>
      LoginPage
    </Box>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
