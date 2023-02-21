// ** React Imports
import { useState, useEffect, forwardRef, useCallback, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import FormControlLabel from '@mui/material/FormControlLabel'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Third Party Imports
import DatePicker from 'react-datepicker'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

// ** Types
import { EventDateType, AddEventSidebarType } from 'src/types/apps/calendarTypes'
import { RepeatCode, ScheduleUpdateCode } from 'src/common/api/msBackend/user/schedule'
import { generateDate } from 'src/@core/utils/calc-date'
import { convertDateFormat, convertDatetimeFormat } from 'src/@core/utils/format'
import { useRecoilValue } from 'recoil'
import { myProfile } from 'src/store/profile/user'
import { getInitials } from 'src/@core/utils/get-initials'
import { SimpleUserResponse } from 'src/model/user/user'
import { SearchUserForScheduleInvite } from 'src/common/api/msBackend/search'

import useSWR from "swr"
import { acceptEvent, refuseEvent } from 'src/store/apps/calendar'
import Chip from 'src/@core/components/mui/chip'
import Avatar from 'src/@core/components/mui/avatar'
import Autocomplete from '@mui/material/Autocomplete/Autocomplete'
import Badge from 'src/@core/components/mui/badge'

interface PickerProps {
  label?: string
  error?: boolean
  registername?: string
}

interface DefaultStateType {
  title: string
  allDay: boolean
  view: string
  description: string
  endDate: Date | undefined
  startDate: Date
  repeatCode: string | RepeatCode;
  repeatEnd: Date | undefined;
  guests: string[] | string | undefined
  scheduleUpdateCode: string | ScheduleUpdateCode | undefined
}

const defaultState: DefaultStateType = {
  title: '',
  guests: [],
  allDay: true,
  description: '',
  endDate: generateDate({ minutes: 30 }),
  repeatCode: '',
  repeatEnd: generateDate({ date: 7 }),
  view: '',
  startDate: new Date(),
  scheduleUpdateCode: 'ONLY_THIS',
}

const AddEventSidebar = (props: AddEventSidebarType) => {
  // ** Props
  const {
    store,
    dispatch,
    addEvent,
    updateEvent,
    drawerWidth,
    calendarApi,
    deleteEvent,
    handleSelectEvent,
    addEventSidebarOpen,
    handleAddEventSidebarToggle,
  } = props

  // ** States
  const [values, setValues] = useState<DefaultStateType>(defaultState)
  const profile = useRecoilValue(myProfile)

  const [keyword, setKeyword] = useState('')
  const [guestOpen, setGuestOpen] = useState<boolean>(false)
  const [guestOptions, setGuestOptions] = useState<SimpleUserResponse[]>([])

  const guestLimit = 6 // 同時閲覧できる最大ユーザ数
  const [guestSelected, setGuestSelected] = useState<SimpleUserResponse[]>([])
  const checkDisable = useCallback((option: SimpleUserResponse) => guestLimit <= guestSelected.length && !guestSelected.includes(option), [guestLimit, guestSelected]);

  const handleGuestChanged = async (newSelected: SimpleUserResponse[]) => {
    const ids = newSelected.map((o) => o.id)
    setGuestSelected(newSelected)
    setValues({ ...values, guests: ids })
  }

  const { data } = useSWR(
    { keyword },
    () => SearchUserForScheduleInvite({
      keyword
    }),
    {
      revalidateIfStale: false,
      revalidateOnFocus: true,
      revalidateOnReconnect: true
    }
  )

  useEffect(() => {
    if (typeof data !== 'undefined') {
      setGuestOptions(data.data)
    }
  }, [data])

  const {
    control,
    setValue,
    clearErrors,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { title: '' } })

  const handleSidebarClose = async () => {
    setValues(defaultState)
    clearErrors()
    dispatch(handleSelectEvent(null))
    handleAddEventSidebarToggle()
  }

  function forOfficial() {
    return values.view === "Official"
  }

  function isPublic() {
    return values.view === "Public"
  }

  const onAccept = () => {
    if (store.selectedEvent !== null && store.selectedEvent.id !== null) {
      dispatch(acceptEvent(store.selectedEvent.id)) 
    }
    handleSidebarClose()
  }

  const onRefuse = () => {
    if (store.selectedEvent !== null && store.selectedEvent.id !== null) {
      dispatch(refuseEvent(store.selectedEvent.id))
    }
    handleSidebarClose()
  }

  const onSubmit = (data: { title: string }) => {
    const modifiedEvent = {
      title: data.title,
      end: (!values.allDay && values.endDate) ? convertDatetimeFormat(values.endDate) : undefined,
      allDay: values.allDay,
      start: convertDatetimeFormat(values.startDate),
      memberIds: typeof (values.guests) === "string" ? [values.guests] : (values.guests ?? []),
      note: values.description,
      isPublic: isPublic(),
      forOfficial: forOfficial()
    }

    if (store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) {
      dispatch(addEvent(
        {
          repeatInfo: (values.repeatCode !== '' && values.repeatEnd) ? {
            repeatCode: values.repeatCode,
            end: convertDateFormat(values.repeatEnd)
          } : undefined,
          ...modifiedEvent
        }
      ))
    } else {
      dispatch(updateEvent(
        {
          scheduleId: store.selectedEvent.id,
          scheduleUpdateCode: values.scheduleUpdateCode ?? 'ONLY_THIS',
          ...modifiedEvent
        }
      ))
    }
    calendarApi.refetchEvents()
    handleSidebarClose()
  }

  const handleViewEvent = (e: SelectChangeEvent<any>) => {
    if (e.target.value === "Official") {
      setValues({ ...values, allDay: false, view: e.target.value });
    } else {
      setValues({ ...values, view: e.target.value })
    }
  }

  const handleDeleteEvent = () => {
    if (store.selectedEvent) {
      dispatch(deleteEvent({
        scheduleId: store.selectedEvent.id,
        scheduleUpdateCode: values.scheduleUpdateCode ?? 'ONLY_THIS',
        forOfficial: forOfficial()
      }))
    }

    // calendarApi.getEventById(store.selectedEvent.id).remove()
    handleSidebarClose()
  }

  const handleStartDate = (date: Date) => {
    if (values.endDate && date > values.endDate) {
      setValues({ ...values, startDate: new Date(date), endDate: new Date(date) })
    }
  }

  const resetToStoredValues = useCallback(() => {
    if (store.selectedEvent !== null) {
      const event = store.selectedEvent
      setValue('title', event.title || '')
      setValues({
        title: event.title || '',
        allDay: event.allDay,
        guests: event.extendedProps.guests?.map(o => o.id) || [],
        description: event.extendedProps.description || '',
        view: event.extendedProps.forOfficial ? "Official" :
          (event.extendedProps.isPublic == true ? 'Public' :
            (event.extendedProps.isPublic == false ? 'Private' : 'Public')),
        endDate: event.end ? event.end : generateDate({ minutes: 30 }),
        repeatCode: event.extendedProps.repeatInfo?.repeatCode ?? '',
        repeatEnd: event.extendedProps.repeatInfo?.end ?? generateDate({ date: 7 }),
        startDate: event.start !== null ? event.start : new Date(),
        scheduleUpdateCode: event.extendedProps.scheduleUpdateCode || 'ONLY_THIS',
      })

      const optionIds = guestOptions.map((o) => o.id)
      const plus: SimpleUserResponse[] = event.extendedProps.guests?.filter((o) => !optionIds.includes(o.id)) ?? []
      plus.forEach((o) => guestOptions.push(o))

      setGuestSelected(event.extendedProps.guests ?? [])
    }
  }, [setValue, store.selectedEvent])

  const resetToEmptyValues = useCallback(() => {
    setValue('title', '')
    setValues(defaultState)
  }, [setValue])

  useEffect(() => {
    if (store.selectedEvent !== null) {
      resetToStoredValues()
    } else {
      resetToEmptyValues()
    }
  }, [addEventSidebarOpen, resetToStoredValues, resetToEmptyValues, store.selectedEvent])

  const PickersComponent = forwardRef(({ ...props }: PickerProps, ref) => {
    return (
      <TextField
        inputRef={ref}
        fullWidth
        {...props}
        label={props.label || ''}
        sx={{ width: '100%' }}
        error={props.error}
      />
    )
  })

  const RenderSidebarFooter = () => {
    if (store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) {
      return (
        <Fragment>
          <Button type='submit' variant='contained' sx={{ mr: 4 }}>
            추가
          </Button>
          <Button variant='outlined' color='secondary' onClick={resetToEmptyValues}  sx={{ mr: 4 }}>
            초기화
          </Button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Button variant='outlined' color='secondary' onClick={onAccept} sx={{ mr: 4 }}>
            참석
          </Button>
          <Button variant='outlined' color='secondary' onClick={onRefuse} sx={{ mr: 4 }}>
            불참
          </Button>
          <Button type='submit' variant='contained' sx={{ mr: 4 }}>
            수정
          </Button>
        </Fragment>
      )
    }
  }

  const RenderOwner = () => {
    if (store.selectedEvent !== null) {
      const owner = store.selectedEvent.extendedProps.owner
      if (owner !== undefined) {

        return (
          <>
            <Box sx={{ mb: 6 }}>
              <Chip
                variant='outlined'
                label={owner.accountId}
                key={owner.accountId}
                avatar={
                  owner.avatarImg !== null ? <Avatar src={owner.avatarImg} alt={owner.accountId} />
                    : <CustomAvatar
                      skin='light'
                      color='primary'
                    >
                      {getInitials(owner.nickName)}
                    </CustomAvatar>
                }
              />
            </Box>
          </>
        )
      }
    }

    return null
  }

  return (
    <Drawer
      anchor='right'
      open={addEventSidebarOpen}
      onClose={handleSidebarClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: ['100%', drawerWidth] } }}
    >
      <Box
        className='sidebar-header'
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'background.default',
          p: theme => theme.spacing(3, 3.255, 3, 5.255)
        }}
      >
        <Typography variant='h6'>
          {store.selectedEvent !== null && store.selectedEvent.title.length ? 'Update Event' : 'Add Event'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {store.selectedEvent !== null && store.selectedEvent.title.length ? (
            <IconButton
              size='small'
              onClick={handleDeleteEvent}
              sx={{ color: 'text.primary', mr: store.selectedEvent !== null ? 1 : 0 }}
            >
              <Icon icon='mdi:delete-outline' fontSize={20} />
            </IconButton>
          ) : null}
          <IconButton size='small' onClick={handleSidebarClose} sx={{ color: 'text.primary' }}>
            <Icon icon='mdi:close' fontSize={20} />
          </IconButton>
        </Box>
      </Box>
      <Box className='sidebar-body' sx={{ p: theme => theme.spacing(5, 6) }}>
        <DatePickerWrapper>
          {
            values.view !== 'Official' && store.selectedEvent?.id !== 0 ?
              (
                RenderOwner()
              ) : null
          }
          <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Controller
                name='title'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange } }) => (
                  <TextField label='Title' value={value} onChange={onChange} error={Boolean(errors.title)} />
                )}
              />
              {errors.title && (
                <FormHelperText sx={{ color: 'error.main' }} id='event-title-error'>
                  이 필드는 필수입니다
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='event-view'>공개 범위 설정</InputLabel>
              <Select
                label='View'
                value={values.view}
                labelId='event-view'
                onChange={handleViewEvent}
              >
                {
                  profile !== undefined && profile.role === 'ADMIN' ? <MenuItem value='Official'>公式</MenuItem> : null
                }
                <MenuItem value='Public'>모두에게</MenuItem>
                <MenuItem value='Private'>참석자만</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ mb: 6 }}>
              <DatePicker
                selectsStart
                id='event-start-date'
                endDate={values.endDate as EventDateType}
                selected={values.startDate as EventDateType}
                startDate={values.startDate as EventDateType}
                showTimeSelect={!values.allDay}
                dateFormat={!values.allDay ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'}
                customInput={<PickersComponent label='일정 시작' registername='startDate' />}
                onChange={(date: Date) => setValues({ ...values, startDate: new Date(date) })}
                onSelect={handleStartDate}
              />
            </Box>
            <Box sx={{ mb: 6 }}>
              {!values.allDay ? <DatePicker
                selectsEnd
                id='event-end-date'
                endDate={values.endDate as EventDateType}
                selected={values.endDate as EventDateType}
                minDate={values.startDate as EventDateType}
                startDate={values.startDate as EventDateType}
                showTimeSelect={!values.allDay}
                dateFormat={!values.allDay ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd'}
                customInput={<PickersComponent label='일정 종료' registername='endDate' />}
                onChange={(date: Date) => setValues({ ...values, endDate: new Date(date) })}
              /> : null}
            </Box>
            <FormControl sx={{ mb: 6 }}>
              <FormControlLabel
                label='하루종일'
                control={
                  <Switch checked={values.allDay} onChange={e => setValues({ ...values, allDay: e.target.checked })} />
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Autocomplete
                  multiple
                  fullWidth
                  getOptionDisabled={checkDisable}
                  open={guestOpen}
                  value={guestSelected}
                  options={guestOptions}
                  onChange={(e, newSelected) => handleGuestChanged(newSelected)}
                  onOpen={() => setGuestOpen(true)}
                  onClose={() => setGuestOpen(false)}
                  id='autocomplete-asynchronous-request'
                  getOptionLabel={option => `${option.nickName}(@${option.nickName})`}
                  isOptionEqualToValue={(option, value) => (option.accountId === value.accountId || option.nickName === value.nickName)}
                  renderInput={params => (
                    <TextField
                      {...params}
                      onChange={e => setKeyword(e.target.value)}
                      label='Guest'
                      InputProps={{
                        ...params.InputProps,
                      }}
                    />
                  )}
                  renderTags={(value: SimpleUserResponse[], getTagProps) =>
                    value.map((option: SimpleUserResponse, index: number) => (
                      <Badge
                        key={'invite_' + index}
                        overlap='circular'
                        badgeContent={<Icon icon={
                          store.selectedEvent?.extendedProps.guests?.find((o) => o.id === option.id)?.acceptedStatus === 'ACCEPTED'
                            ? 'material-symbols:check-circle-outline-sharp'
                            : store.selectedEvent?.extendedProps.guests?.find((o) => o.id === option.id)?.acceptedStatus === 'REFUSED' ?
                              'heroicons:x-circle' : ''
                        } />}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                        <Chip
                          variant='outlined'
                          label={option.accountId}
                          {...(getTagProps({ index }) as {})}
                          key={option.accountId}
                          avatar={
                            option.avatarImg !== null ?
                              <Avatar src={option.avatarImg} alt={option.accountId} />
                              : <CustomAvatar
                                skin='light'
                                color='primary'
                              >
                                {getInitials(option.nickName)}
                              </CustomAvatar>
                          }
                        />
                      </Badge>
                    ))
                  }
                />
              </Box>
            </FormControl>
            <TextField
              rows={4}
              multiline
              fullWidth
              sx={{ mb: 6 }}
              label='Description'
              id='event-description'
              value={values.description}
              onChange={e => setValues({ ...values, description: e.target.value })}
            />
            {!(store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) ?
              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel id='event-scheduleUpdateCode'>수정범위(반복)</InputLabel>
                <Select
                  label='ScheduleUpdateCode'
                  value={values.scheduleUpdateCode}
                  labelId='event-scheduleUpdateCode'
                  onChange={e => setValues({ ...values, scheduleUpdateCode: e.target.value })}
                >
                  <MenuItem value='ONLY_THIS'>이 일정만</MenuItem>
                  <MenuItem value='ALL'>반복중인 일정 모두</MenuItem>
                  <MenuItem value='THIS_AND_FUTURE'>이 이후의 일정</MenuItem>
                </Select>
              </FormControl> : null}

            {(store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) ?
              <FormControl fullWidth sx={{ mb: 6 }}>
                <InputLabel id='event-repeatCode'>반복 설정</InputLabel>
                <Select
                  label='RepeatCode'
                  value={values.repeatCode}
                  labelId='event-repeatCode'
                  onChange={e => {
                    if (e.target.value === '') {
                      setValues({ ...values, repeatCode: e.target.value, repeatEnd: undefined })
                    } else {
                      setValues({ ...values, repeatCode: e.target.value })
                    }
                  }}>
                  <MenuItem value=''>설정 없음</MenuItem>
                  <MenuItem value='DAYS'>매일</MenuItem>
                  <MenuItem value='WEEKS'>매주</MenuItem>
                  <MenuItem value='MONTHS'>매월</MenuItem>
                  <MenuItem value='YEARS'>매년</MenuItem>
                </Select>
              </FormControl> : null}
            {(store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) && values.repeatCode !== "" ?
              <Box sx={{ mb: 6 }}>
                <DatePicker
                  selectsStart
                  id='event-repeatEnd'
                  endDate={values.endDate as EventDateType}
                  selected={values.repeatEnd as EventDateType}
                  dateFormat={'yyyy-MM-dd'}
                  customInput={<PickersComponent label='반복 종료' registername='repeatEnd' />}
                  onChange={(date: Date) => setValues({ ...values, repeatEnd: new Date(date) })}
                />
              </Box> : null}

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <RenderSidebarFooter />
            </Box>
          </form>
        </DatePickerWrapper>
      </Box>
    </Drawer>
  )
}

export default AddEventSidebar
