// ** React Imports
import { useState, useEffect, forwardRef, useCallback, Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Select from '@mui/material/Select'
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
  endDate: new Date(),
  repeatCode: 'None',
  repeatEnd: new Date(),
  view: 'Business',
  startDate: new Date(),
  scheduleUpdateCode: 'ONLY_THIS',
}

function convertDatetimeFormat(date: Date) {
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = (date.getDate()).toString().padStart(2, "0");
  const hour = (date.getHours()).toString().padStart(2, "0");
  const min = (date.getMinutes()).toString().padStart(2, "0");

  return date.getFullYear().toString() + "-" + month + "-" + day + "T" + hour + ":" + min;
}

function convertDateFormat(date: Date) {
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = (date.getDate()).toString().padStart(2, "0");

  return date.getFullYear().toString() + "-" + month + "-" + day;
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
    handleAddEventSidebarToggle
  } = props

  // ** States
  const [values, setValues] = useState<DefaultStateType>(defaultState)

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

  const onSubmit = (data: { title: string }) => {
    const modifiedEvent = {
      title: data.title,
      end: (!values.allDay && values.endDate) ? convertDatetimeFormat(values.endDate) : undefined,
      allDay: values.allDay,
      start: convertDatetimeFormat(values.startDate),
      memberIds: typeof(values.guests) === "string" ? [values.guests] : (values.guests ?? []),
      note: values.description,
      isPublic: isPublic(),
      forOfficial: forOfficial()
    }

    if (store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) {
      dispatch(addEvent(
        {
          repeatInfo: (values.repeatCode !== 'NONE' && values.repeatEnd) ? {
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
        guests: event.extendedProps.guests || [],
        description: event.extendedProps.description || '',
        view: event.extendedProps.forOfficial ? "Official" :
          (event.extendedProps.isPublic == true ? 'Public' :
          (event.extendedProps.isPublic == false ? 'Private' : 'Public')),
        endDate: event.end ? event.end : event.start,
        repeatCode: event.extendedProps.repeatInfo?.repeatCode ?? 'NONE',
        repeatEnd: event.extendedProps.repeatInfo?.end ?? new Date(),
        startDate: event.start !== null ? event.start : new Date(),
        scheduleUpdateCode: event.extendedProps.scheduleUpdateCode || 'ONLY_THIS',
      })
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
          <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
            Add
          </Button>
          <Button size='large' variant='outlined' color='secondary' onClick={resetToEmptyValues}>
            Reset
          </Button>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
            Update
          </Button>
          <Button size='large' variant='outlined' color='secondary' onClick={resetToStoredValues}>
            Reset
          </Button>
        </Fragment>
      )
    }
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
                  This field is required
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='event-view'>公開設定</InputLabel>
              <Select
                label='View'
                value={values.view}
                labelId='event-view'
                onChange={e => setValues({ ...values, view: e.target.value })}
              >
                <MenuItem value='Official'>公式</MenuItem>
                <MenuItem value='Public'>公開</MenuItem>
                <MenuItem value='Private'>非公開</MenuItem>
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
                dateFormat={!values.allDay ? 'yyyy-MM-dd hh:mm' : 'yyyy-MM-dd'}
                customInput={<PickersComponent label='Start Date' registername='startDate' />}
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
                dateFormat={!values.allDay ? 'yyyy-MM-dd hh:mm' : 'yyyy-MM-dd'}
                customInput={<PickersComponent label='End Date' registername='endDate' />}
                onChange={(date: Date) => setValues({ ...values, endDate: new Date(date) })}
              /> : null}
            </Box>
            <FormControl sx={{ mb: 6 }}>
              <FormControlLabel
                label='All Day'
                control={
                  <Switch checked={values.allDay} onChange={e => setValues({ ...values, allDay: e.target.checked })} />
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='event-guests'>Guests</InputLabel>
              <Select
                multiple
                label='Guests'
                value={values.guests}
                labelId='event-guests'
                id='event-guests-select'
                onChange={e => setValues({ ...values, guests: e.target.value })}
              >
                <MenuItem value='bruce'>Bruce</MenuItem>
                <MenuItem value='clark'>Clark</MenuItem>
                <MenuItem value='diana'>Diana</MenuItem>
                <MenuItem value='john'>John</MenuItem>
                <MenuItem value='barry'>Barry</MenuItem>
              </Select>
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
              <InputLabel id='event-scheduleUpdateCode'>更新対象</InputLabel>
              <Select
                label='ScheduleUpdateCode'
                value={values.scheduleUpdateCode}
                labelId='event-scheduleUpdateCode'
                onChange={e => setValues({ ...values, scheduleUpdateCode: e.target.value })}
              >
                <MenuItem value='ONLY_THIS'>現在のスケジュール</MenuItem>
                <MenuItem value='ALL'>全てのスケジュール</MenuItem>
                <MenuItem value='THIS_AND_FUTURE'>現在とそれ以降のスケジュール</MenuItem>
              </Select>
            </FormControl> : null}


            {(store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) ?
            <FormControl fullWidth sx={{ mb: 6 }}>
              <InputLabel id='event-repeatCode'>繰り返し設定</InputLabel>
              <Select
                label='RepeatCode'
                value={values.repeatCode}
                labelId='event-repeatCode'
                onChange={e => {
                  if (e.target.value === 'NONE') {
                    setValues({ ...values, repeatCode: e.target.value, repeatEnd: undefined })
                  } else {
                    setValues({ ...values, repeatCode: e.target.value })
                  }
                }}>
                <MenuItem value='NONE'>設定しない</MenuItem>
                <MenuItem value='DAYS'>毎日</MenuItem>
                <MenuItem value='WEEKS'>毎週</MenuItem>
                <MenuItem value='MONTHS'>毎月</MenuItem>
                <MenuItem value='YEARS'>毎年</MenuItem>
              </Select>
            </FormControl> : null}
            {(store.selectedEvent === null || (store.selectedEvent !== null && !store.selectedEvent.title.length)) && values.repeatCode !== "NONE" ?
            <Box sx={{ mb: 6 }}>
              <DatePicker
                selectsStart
                id='event-repeatEnd'
                endDate={values.endDate as EventDateType}
                selected={values.repeatEnd as EventDateType}
                showTimeSelect={values.repeatCode !== 'NONE'}
                dateFormat={'yyyy-MM-dd'}
                customInput={<PickersComponent label='リピート終了日' registername='repeatEnd' />}
                onChange={(date: Date) => setValues({ ...values, repeatEnd: new Date(date) })}
                onSelect={handleStartDate}
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
