// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColumns, GridRenderCellParams, GridRowClassNameParams, GridValueGetterParams } from '@mui/x-data-grid'
import Autocomplete from '@mui/material/Autocomplete/Autocomplete';

// ** Custom Components
import ServerSideToolbar from './ServerSideToolbar'

// ** Utils Import
import { CubeHistoryResponse } from 'src/model/dashboard/dashboard'
import CardContent from '@mui/material/CardContent/CardContent'
import Grid from '@mui/material/Grid/Grid'
import FormControl from '@mui/material/FormControl/FormControl'
import TextField from '@mui/material/TextField/TextField'
import InputAdornment from '@mui/material/InputAdornment/InputAdornment'

const cubeList: string[] = [
  '수상한 큐브', '장인의 큐브', '명장의 큐브', '레드 큐브', '블랙 큐브', '에디셔널 큐브'
]

const columns: GridColumns = [
  {
    flex: 0.15,
    sortable: false,
    minWidth: 120,
    field: 'item',
    headerName: '아이템',
    renderCell: (params: GridRenderCellParams) => (
      <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600, whiteSpace: 'pre-line' }}>
        {params.row.targetItem}
      </Typography>
    ),
    valueGetter: (params: GridValueGetterParams) => {
      return params.row.targetItem
    }
  },
  {
    flex: 0.05,
    sortable: false,
    minWidth: 100,
    field: 'cube',
    headerName: '큐브 종류',
    renderCell: (params: GridRenderCellParams) => (
      <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
        {params.row.cubeType}
      </Typography>
    ),
    valueGetter: (params: GridValueGetterParams) => {
      return params.row.cubeType
    }
  },
  {
    flex: 0.2,
    sortable: false,
    minWidth: 200,
    field: 'before_option',
    headerName: '이전 옵션',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary', whiteSpace: 'pre-line' }}>
        {params.row.beforeOption1 + "\n" + params.row.beforeOption2 + "\n" + params.row.beforeOption3}
      </Typography>
    ),
    valueGetter: (params: GridValueGetterParams) => {
      return params.row.beforeOption1 + "\n" + params.row.beforeOption2 + "\n" + params.row.beforeOption3
    }
  },
  {
    flex: 0.2,
    sortable: false,
    field: 'after_option',
    minWidth: 200,
    headerName: '이후 옵션',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary', whiteSpace: 'pre-line' }}>
        {params.row.afterOption1 + "\n" + params.row.afterOption2 + "\n" + params.row.afterOption3}
      </Typography>
    ),
    valueGetter: (params: GridValueGetterParams) => {
      return params.row.afterOption1 + "\n" + params.row.afterOption2 + "\n" + params.row.afterOption3
    }
  },
  {
    flex: 0.05,
    sortable: false,
    minWidth: 100,
    headerName: '아이템 등급',
    field: 'item_grade',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.potentialOptionGrade}
      </Typography>
    ),
  },
  {
    flex: 0.05,
    minWidth: 50,
    headerName: '등급업',
    field: 'item_upgrade',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {params.row.itemUpgrade ? 'o' : ''}
      </Typography>
    ),
    valueGetter: (params: GridValueGetterParams) => {
      return (params.row.itemUpgrade ? 'o' : '')
    }
  },
]

const optionList = [
  'STR', 'DEX', 'LUK', 'INT', '올스탯', '최대 HP', '공격력', '마력', '크리티컬 확률', '데미지', '보스 몬스터 공격 시 데미지', '몬스터 방어율 무시',
  '크리티컬 데미지', '모든 스킬의 재사용 대기시간',
  '메소 획득량', '아이템 드롭률'
].sort()

interface Props {
  rows: CubeHistoryResponse[]
  itemList: string[]
  item: string
  setItem: (o: string) => void
  cube: string
  setCube: (o: string) => void
  option1: string
  setOption1: (o: string) => void
  option2: string
  setOption2: (o: string) => void
  option3: string
  setOption3: (o: string) => void
  setOptionValue1: (o: number) => void
  setOptionValue2: (o: number) => void
  setOptionValue3: (o: number) => void
}

const TableServerSide = (props: Props) => {

  // ** State
  const [pageSize, setPageSize] = useState<number>(10)
  const [itemOpen, setItemOpen] = useState<boolean>(false)
  const [cubeOpen, setCubeOpen] = useState<boolean>(false)
  const [option1Open, setOption1Open] = useState<boolean>(false)
  const [option2Open, setOption2Open] = useState<boolean>(false)
  const [option3Open, setOption3Open] = useState<boolean>(false)

  return (
    <Card sx={{
      '& .cold': {
        backgroundColor: '#b9d5ff91',
        color: '#1a3e72',
      },
    }}>
      <CardHeader title='큐브 사용 내역 (최대 1000건, 최대 3개월 전 ~ 어제 데이터 조회가능)'
        subheader='각 열은 필터링이 가능합니다. 등급업 조회 시, o 필터를 걸어주세요' />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item sm={12} md={6} xs={6}>
            <FormControl fullWidth>
              <Autocomplete
                fullWidth
                size='small'
                open={itemOpen}
                options={props.itemList}
                onChange={(e, newSelected) => props.setItem(newSelected ?? "")}
                onOpen={() => setItemOpen(true)}
                onClose={() => setItemOpen(false)}
                id='autocomplete-item'
                isOptionEqualToValue={(option, value) => option === value}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='아이템'
                    InputProps={{
                      ...params.InputProps,
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6} xs={6}>
            <FormControl fullWidth>
              <Autocomplete
                fullWidth
                size='small'
                open={cubeOpen}
                options={cubeList}
                onChange={(e, newSelected) => props.setCube(newSelected ?? "")}
                onOpen={() => setCubeOpen(true)}
                onClose={() => setCubeOpen(false)}
                id='autocomplete-cube'
                isOptionEqualToValue={(option, value) => option === value}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='큐브'
                    InputProps={{
                      ...params.InputProps,
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6} xs={6}>
            <FormControl fullWidth>
              <Autocomplete
                fullWidth
                size='small'
                open={option1Open}
                options={optionList}
                onChange={(e, newSelected) => props.setOption1(newSelected ?? "")}
                onOpen={() => setOption1Open(true)}
                onClose={() => setOption1Open(false)}
                id='autocomplete-option1'
                isOptionEqualToValue={(option, value) => option === value}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='잠재옵션 첫째줄(결과)'
                    InputProps={{
                      ...params.InputProps,
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6} xs={6}>
            <FormControl fullWidth>
              <TextField size='small'
                type={'number'}
                id='optionValue1'
                label='첫째줄 옵션 값(x%이상)'
                onChange={(e) => props.setOptionValue1(+e.target.value)}
                InputProps={{ endAdornment: <InputAdornment position='end'>%</InputAdornment> }}
              />
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6} xs={6}>
            <FormControl fullWidth>
              <Autocomplete
                fullWidth
                size='small'
                open={option2Open}
                options={optionList}
                onChange={(e, newSelected) => props.setOption2(newSelected ?? "")}
                onOpen={() => setOption2Open(true)}
                onClose={() => setOption2Open(false)}
                id='autocomplete-option2'
                isOptionEqualToValue={(option, value) => option === value}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='잠재옵션 둘째줄(결과)'
                    InputProps={{
                      ...params.InputProps,
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6} xs={6}>
            <FormControl fullWidth>
              <TextField size='small'
                type={'number'}
                id='optionValue2'
                label='둘째줄 옵션 값(x%이상)'
                onChange={(e) => props.setOptionValue2(+e.target.value)}
                InputProps={{ endAdornment: <InputAdornment position='end'>%</InputAdornment> }}
              />
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6} xs={6}>
            <FormControl fullWidth>
              <Autocomplete
                fullWidth
                size='small'
                open={option3Open}
                options={optionList}
                onChange={(e, newSelected) => props.setOption3(newSelected ?? "")}
                onOpen={() => setOption3Open(true)}
                onClose={() => setOption3Open(false)}
                id='autocomplete-option3'
                isOptionEqualToValue={(option, value) => option === value}
                renderInput={params => (
                  <TextField
                    {...params}
                    label='잠재옵션 셋째줄(결과)'
                    InputProps={{
                      ...params.InputProps,
                    }}
                  />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6} xs={6}>
            <FormControl fullWidth>
              <TextField size='small'
                type={'number'}
                id='optionValue3'
                label='셋째줄 옵션 값(x%이상)'
                onChange={(e) => props.setOptionValue3(+e.target.value)}
                InputProps={{ endAdornment: <InputAdornment position='end'>%</InputAdornment> }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
      <DataGrid
        autoHeight
        pagination
        rows={props.rows ?? []}
        rowHeight={80}
        rowCount={props.rows?.length ?? 0}
        columns={columns}
        checkboxSelection
        pageSize={pageSize}
        rowsPerPageOptions={[10, 30, 50]}
        components={{ Toolbar: ServerSideToolbar }}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        componentsProps={{
          baseButton: {
            variant: 'outlined'
          },
        }}
        getRowClassName={(params: GridRowClassNameParams<any>) => {
          if (params.row.itemUpgrade) return 'cold'
          else return ''
        }}
      />
    </Card>
  )
}

export default TableServerSide
