// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'

// ** Third Party Imports
import Typography from '@mui/material/Typography/Typography'
import Link from '@mui/material/Link/Link'
import { useState } from 'react'
import { PostApiKey } from 'src/common/api/msBackend/user/profile'
import Dialog from '@mui/material/Dialog/Dialog'
import DialogContent from '@mui/material/DialogContent/DialogContent'
import DialogActions from '@mui/material/DialogActions/DialogActions'
import Icon from 'src/@core/components/icon'
import Box from '@mui/material/Box/Box'
import { useRouter } from 'next/router'

const CreateApiKeyCard = () => {
  const [apiKey, setApiKey] = useState<string>('')
  const [resultMessage, setResultMessage] = useState<string>('')
  const [result, setResult] = useState<boolean>(true)
  const [savedDialogOpen, setSavedDialogOpen] = useState<boolean>(false)
  const [btnDisable, setBtnDisable] = useState<boolean>(false)

  const router = useRouter()

  const onSubmit = async () => {
    setBtnDisable(true)
    await PostApiKey({ apiKey })
      .then(() => {
        setResult(true)
        setResultMessage('데이터 집계완료!')
        setSavedDialogOpen(true)
        setBtnDisable(false)
      })
      .catch(() => {
        setResult(false)
        setResultMessage('API Key가 유효하지 않은 것 같아요..')
        setSavedDialogOpen(true)
        setBtnDisable(false)
      })
  }

  const handleSavedDialogClose = () => setSavedDialogOpen(false)

  return (
    <Grid>
      <Card>
        <CardHeader title='넥슨 개발자 API Key 등록' />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <form>
                <FormControl fullWidth sx={{ mb: 5 }}>
                  <TextField
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    label='API Key 값'
                    placeholder='API Key 값'
                  />
                </FormControl>
                <Button disabled={btnDisable} onClick={onSubmit} variant='contained' fullWidth>
                  등록
                </Button>
              </form>
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}
            >
              <Typography sx={{ mb: 6, color: 'text.secondary' }}>
                API key 는 서버에서 큐브 결과값을 가져오기 위해 사용하는 데이터로, <Link target='_blank' href='https://developers.nexon.com/Maplestory'>
                  {` 넥슨 개발자 센터`}
                </Link> 에서 발급 가능합니다.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Dialog fullWidth maxWidth='xs' open={savedDialogOpen} onClose={handleSavedDialogClose}>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              '& svg': {
                mb: 14,
                color: result ? 'success.main' : 'error.main'
              }
            }}
          >
            <Icon
              fontSize='5.5rem'
              icon={result ? 'mdi:check-circle-outline' : 'mdi:close-circle-outline'}
            />
            <Typography variant='h4' sx={{ mb: 12 }}>
              {resultMessage}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant='contained' color='success' onClick={() => router.reload()}>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default CreateApiKeyCard
