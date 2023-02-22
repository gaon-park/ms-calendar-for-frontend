// ** React Imports
import { ReactNode } from 'react'

// ** MUI Components
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Image from "next/image";

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports
import { SignIn } from 'src/hooks/oauth'
import Container from '@mui/material/Container/Container';
import Grid from '@mui/material/Grid/Grid';

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
            구글 계정으로 로그인
          </Button>
        </Grid>
      </Box>
    </Container>
  )
}

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default LoginPage
