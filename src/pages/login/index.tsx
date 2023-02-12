// ** React Imports
import { ReactNode } from 'react'

// ** MUI Components
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Image from "next/image";

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import { Container, Grid } from '@mui/material'
import { SignIn } from 'src/hooks/oauth'

const LoginPage = () => {

  return (
    <Container component="main" maxWidth="xs">
      <Box
        justifyContent="center"
        alignItems={"center"}
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container justifyContent="center">
          <Image
            src="/images/maple_logo.png"
            alt={""}
            width={397}
            height={219}
          />
        </Grid>
        <Grid container justifyContent="center">
          <Button variant="contained" color="success" onClick={() => SignIn()}>
            SignIn with Google
          </Button>
        </Grid>
      </Box>
    </Container>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

LoginPage.guestGuard = true

export default LoginPage
