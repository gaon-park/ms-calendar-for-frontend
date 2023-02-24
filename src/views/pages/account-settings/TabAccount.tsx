// ** React Imports
import { useState, ElementType, ChangeEvent, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Select from '@mui/material/Select'
import Dialog from '@mui/material/Dialog'
import { styled } from '@mui/material/styles'
import Checkbox from '@mui/material/Checkbox'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardHeader from '@mui/material/CardHeader'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormHelperText from '@mui/material/FormHelperText'
import Button, { ButtonProps } from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'

// ** Third Party Imports
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

import CustomAvatar from 'src/@core/components/mui/avatar'
import { CustomAvatarProps } from 'src/@core/components/mui/avatar/types'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

import { IProfile, PutJsonRequest } from 'src/model/user/profile'
import worldData from 'src/model/worldData'
import jobDetailData from 'src/model/jobDetailData'
import { DeleteAccount, PutJsonUserProfile } from 'src/common/api/msBackend/user/profile'
import { useProfile } from 'src/hooks/useProfile'
import { useSetRecoilState } from 'recoil'
import { myProfile } from 'src/store/profile/user'
import Switch from '@mui/material/Switch/Switch'

const ProfilePicture = styled(CustomAvatar)<CustomAvatarProps>(({ theme }) => ({
  width: 120,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  border: `5px solid ${theme.palette.common.white}`,
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  backgroundColor: theme.palette.background.default,
  '& svg': {
    fontSize: '1.75rem'
  },
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const TabAccount = () => {
  const { profile } = useProfile()
  const initialData: PutJsonRequest = {
    nickName: '',
    accountId: '',
    isPublic: false,
    avatarImg: '',
    world: '',
    job: '',
    jobDetail: '',
    notificationFlg: true,
  }

  const [inputValue, setInputValue] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [resultMessage, setResultMessage] = useState<string>('')
  const [formData, setFormData] = useState<PutJsonRequest>(initialData)
  const [imgSrc, setImgSrc] = useState<string>('')
  const [result, setResult] = useState<boolean>(true)
  const [savedDialogOpen, setSavedDialogOpen] = useState<boolean>(false)
  const [saveBtn, setSaveBtn] = useState<boolean>(true)

  const setMyProfile = useSetRecoilState<IProfile | undefined>(myProfile)

  useEffect(() => {
    if (profile === undefined) return
    setFormData({
      nickName: profile.nickName,
      accountId: profile.accountId,
      isPublic: profile.isPublic,
      avatarImg: profile.avatarImg ?? '',
      world: profile.world,
      job: profile.job,
      jobDetail: profile.jobDetail,
      notificationFlg: profile.notificationFlg
    })
    if (imgSrc === '' && profile.avatarImg !== null) {
      setImgSrc(profile.avatarImg!)
    }
  }, [profile])

  useEffect(() => {
    if (formData.accountId.replace(' ', '') === '') setSaveBtn(false)
    else if (formData.nickName.replace(' ', '') === '') setSaveBtn(false)
    else setSaveBtn(true)
  }, [formData])

  // ** Hooks
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { checkbox: false } })

  const handleAccountIdChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const blank_pattern = /[\s]/g
    const allow_pattern = /[^A-Za-z,-_.]/ig
    setFormData({
      ...formData,
      ['accountId']: event.target.value
        .replace(blank_pattern, '')
        .replace(allow_pattern, '')
    })
  }

  const handleNickNameChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const blank_pattern = /[\s]/g
    const special_pattern = /[~!@\#$%^&*\()\=+'\;\/\`:\"\\,\[\]?|{}]/gi
    setFormData({
      ...formData,
      ['nickName']: event.target.value
        .replace(blank_pattern, '')
        .replace(special_pattern, '')
    })
  }

  const handleClose = () => setOpen(false)

  const handleSavedDialogClose = () => setSavedDialogOpen(false)

  const onSubmit = () => setOpen(true)

  const handleInputImageChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => {
        setImgSrc(reader.result as string)
      }
      reader.readAsDataURL(files[0])
      if (reader.result !== null) {
        setInputValue(reader.result as string)
      }
    }
  }
  const handleInputImageReset = () => {
    setInputValue('')
    if (profile !== undefined) {
      setImgSrc(profile.avatarImg ?? '')
      setFormData({ ...formData, ['avatarImg']: profile?.avatarImg ?? '' })
    }
  }

  const putUserProfile = async () => {
    await PutJsonUserProfile({ ...formData, avatarImg: (imgSrc) })
      .then((res) => {
        setResult(true)
        setResultMessage('저장 완료!')
        setMyProfile(res.data.profile)
        setSavedDialogOpen(true)
      }).catch(() => {
        setResult(false)
        setResultMessage('AccountID가 중복된 것 같아요..')
        setSavedDialogOpen(true)
      })
  }

  const deactivateAccount = async () => {
    await DeleteAccount()
      .then(() => {
        location.href = '/'
      }).catch(() => {
        setResult(false)
        setResultMessage('실패.. 관리자에게 연락해주세요.')
      })
  }

  return (
    <Grid container spacing={6}>
      {/* Account Details Card */}
      <Grid item xs={12}>
        <Card>
          <form>
            <CardContent sx={{ pb: theme => `${theme.spacing(10)}` }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {
                  imgSrc !== '' ? (<ProfilePicture src={imgSrc} alt='Profile Pic' />)
                    : (<ProfilePicture alt='Profile Pic' skin='light'>{getInitials(formData.nickName)}</ProfilePicture>)
                }

                <div>
                  <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                    이미지 업로드
                    <input
                      hidden
                      type='file'
                      value={inputValue}
                      accept='image/png, image/jpeg'
                      onChange={handleInputImageChange}
                      id='account-settings-upload-image'
                    />
                  </ButtonStyled>
                  <ResetButtonStyled color='secondary' variant='outlined' onClick={handleInputImageReset}>
                    초기화
                  </ResetButtonStyled>
                  <Typography variant='caption' sx={{ mt: 4, display: 'block', color: 'text.disabled' }}>
                    PNG, JPEG만 가능해요
                  </Typography>
                </div>
              </Box>
            </CardContent>
            <CardContent>
              <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    inputProps={{ maxLength: 15 }}
                    label='계정ID'
                    placeholder='계정ID'
                    value={formData.accountId}
                    onChange={e => handleAccountIdChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    inputProps={{ maxLength: 15 }}
                    label='닉네임'
                    placeholder='닉네임'
                    value={formData.nickName}
                    onChange={e => handleNickNameChange(e)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>직업 분류</InputLabel>
                    <Select
                      label='직업 분류'
                      value={formData.job}
                      onChange={e => setFormData({ ...formData, ['job']: e.target.value })}
                    >
                      {
                        jobDetailData.map((data, index) => (
                          <MenuItem key={`job_${index}`} value={data.category}>{data.category}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>세부 직업</InputLabel>
                    <Select
                      label='세부 직업'
                      value={formData.jobDetail}
                      onChange={e => setFormData({ ...formData, ['jobDetail']: e.target.value })}
                    >
                      {
                        jobDetailData.filter((data) => data.category === formData.job)
                          .map((data) => (
                            data.sub.map((sub, index) => (
                              <MenuItem key={`jobDetail_${index}`} value={sub}>{sub}</MenuItem>
                            ))
                          ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl fullWidth>
                    <InputLabel>월드</InputLabel>
                    <Select
                      label='월드'
                      value={formData.world}
                      onChange={e => setFormData({ ...formData, ['world']: e.target.value })}
                    >
                      {
                        worldData.map((data, index) => (
                          <MenuItem key={`world_${index}`} value={data.value}>{data.value}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    label='공개 계정'
                    labelPlacement='end'
                    control={<Switch checked={formData.isPublic} onChange={e => setFormData({ ...formData, ['isPublic']: e.target.checked })} />} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    label='알림 설정'
                    labelPlacement='end'
                    control={<Switch checked={formData.notificationFlg} onChange={e => setFormData({ ...formData, ['notificationFlg']: e.target.checked })} />} />
                </Grid>
                <Grid item xs={12}>
                  <Button disabled={!saveBtn} variant='contained' sx={{ mr: 4 }} onClick={putUserProfile}>
                    변경 사항 저장
                  </Button>
                  <Button type='reset' variant='outlined' color='secondary' onClick={() => setFormData(initialData)}>
                    입력 초기화
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </Card>
      </Grid>

      {/* Delete Account Card */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='계정 삭제' />
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ mb: 4 }}>
                <FormControl>
                  <Controller
                    name='checkbox'
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <FormControlLabel
                        label='계정에 연결된 모든 큐브 이벤트, 일정, 팔로잉, 팔로워, 프로필 사진을 삭제할래요'
                        sx={errors.checkbox ? { '& .MuiTypography-root': { color: 'error.main' } } : null}
                        control={
                          <Checkbox
                            {...field}
                            size='small'
                            name='validation-basic-checkbox'
                            sx={errors.checkbox ? { color: 'error.main' } : null}
                          />
                        }
                      />
                    )}
                  />
                  {errors.checkbox && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-checkbox'>
                      계정을 삭제하시려면 체크박스에 체크해주세요.
                    </FormHelperText>
                  )}
                </FormControl>
              </Box>
              <Button variant='contained' color='error' type='submit' disabled={errors.checkbox !== undefined}>
                삭제
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>

      {/* Deactivate Account Dialogs */}
      <Dialog fullWidth maxWidth='xs' open={open} onClose={handleClose}>
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ maxWidth: '85%', textAlign: 'center', '& svg': { mb: 4, color: 'warning.main' } }}>
              <Icon icon='mdi:alert-circle-outline' fontSize='5.5rem' />
              <Typography>정말 삭제하시겠어요..?</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant='contained' onClick={() => deactivateAccount()}>
            네
          </Button>
          <Button variant='outlined' color='secondary' onClick={() => handleClose()}>
            아니요
          </Button>
        </DialogActions>
      </Dialog>
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
          <Button variant='contained' color='success' onClick={handleSavedDialogClose}>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

export default TabAccount
