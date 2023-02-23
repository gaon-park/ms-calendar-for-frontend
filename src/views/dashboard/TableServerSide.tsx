// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid, GridColumns, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid'

// ** Custom Components
import ServerSideToolbar from './ServerSideToolbar'

// ** Utils Import
import { CubeHistoryResponse, CubeType } from 'src/model/dashboard/dashboard'
import { CardContent, Grid, FormControl, InputLabel, Select, MenuItem, TextField } from '@mui/material'

const cubeList: CubeType[] = [
  'SUSANG', 'JANGYIN', 'MYUNGJANG', 'RED', 'BLACK', 'ADDITIONAL'
]

interface CubeInfo {
  korean: string
}

const columns: GridColumns = [
  {
    flex: 0.15,
    sortable: false,
    filterable: false,
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
    filterable: false,
    minWidth: 100,
    field: 'cube',
    headerName: '큐브 종류',
    renderCell: (params: GridRenderCellParams) => (
      <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
        {getCubeInfo(params.row.cubeType).korean}
      </Typography>
    ),
    valueGetter: (params: GridValueGetterParams) => {
      return getCubeInfo(params.row.cubeType).korean
    }
  },
  {
    flex: 0.2,
    sortable: false,
    filterable: false,
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
    filterable: false,
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
    filterable: false,
    minWidth: 100,
    headerName: '아이템 등급',
    field: 'item_grade',
    renderCell: (params: GridRenderCellParams) => (
      <Typography variant='body2' sx={{ color: 'text.primary' }}>
        {getGradeInfo(params.row.potentialOptionGrade)}
      </Typography>
    ),
    valueGetter: (params: GridValueGetterParams) => {
      return getGradeInfo(params.row.potentialOptionGrade)
    }
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

const getCubeInfo = (type: CubeType): CubeInfo => {
  let res: CubeInfo
  if (type === 'SUSANG') res = {
    korean: '수상한 큐브'
  }
  else if (type === 'JANGYIN') res = {
    korean: '장인의 큐브'
  }
  else if (type === 'MYUNGJANG') res = {
    korean: '명장의 큐브'
  }
  else if (type === 'RED') res = {
    korean: '레드 큐브'
  }
  else if (type === 'BLACK') res = {
    korean: '블랙 큐브'
  }
  else res = {
    korean: '에디셔널 큐브'
  }
  
  return res
}

const getGradeInfo = (value: 'RARE' | 'NORMAL' | 'EPIC' | 'UNIQUE' | 'LEGENDARY') => {
  let res
  if (value === 'RARE') res = '레어'
  else if (value === 'NORMAL') res = '노말'
  else if (value === 'EPIC') res = '에픽'
  else if (value === 'UNIQUE') res = '유니크'
  else res = '레전드리'

  return res
}

const optionList = [
  'STR', 'DEX', 'LUK', 'INT', '올스탯', '최대 HP', '공격력', '마력', '크리티컬 확률', '데미지', '보스 몬스터 공격 시 데미지', '몬스터 방어율 무시',
  '크리티컬 데미지', '모든 스킬의 재사용 대기시간',
  '메소 획득량', '아이템 드롭률'
]

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

  return (
    <Card>
      <CardHeader title='큐브 사용 내역 (상위 10위 아이템 기준, 결과 최대 1000건)' />
      <CardContent>
        <Grid container spacing={6}>
          <Grid item sm={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id='item-select'>아이템</InputLabel>
              <Select size='small'
                fullWidth
                value={props.item}
                id='select-item'
                label='아이템'
                labelId='item-select'
                onChange={(e) => props.setItem(e.target.value)}
                inputProps={{ placeholder: '아이템' }}
              >
                <MenuItem key={`item_`} value=''>아이템</MenuItem>
                {
                  props.itemList?.map((data, index) => (
                    <MenuItem key={`item_${index}`} value={data}>{data}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id='cube-select'>큐브</InputLabel>
              <Select size='small'
                fullWidth
                value={props.cube}
                id='select-cube'
                label='큐브 '
                labelId='cube-select'
                onChange={(e) => props.setCube(e.target.value)}
                inputProps={{ placeholder: '큐브' }}
              >
                <MenuItem key={`cube_`} value=''>큐브</MenuItem>
                {
                  cubeList.map((data, index) => (
                    <MenuItem key={`cube_${index}`} value={data} sx={{ whiteSpace: 'break-spaces' }}>
                      {getCubeInfo(data).korean}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id='option1-select'>잠재옵션 첫째줄(결과)</InputLabel>
              <Select size='small'
                fullWidth
                value={props.option1}
                id='select-option1'
                label='잠재옵션 첫째줄(결과)'
                labelId='option1-select'
                onChange={(e) => props.setOption1(e.target.value)}
                inputProps={{ placeholder: '잠재옵션 첫째줄(결과)' }}
              >
                <MenuItem key={`option1_`} value=''>잠재옵션 첫째줄(결과)</MenuItem>
                {
                  optionList.map((data, index) => (
                    <MenuItem key={`option1_${index}`} value={data}>{data}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6}>
            <FormControl fullWidth>
              <TextField size='small'
                type={'number'}
                id='optionValue1'
                label='첫째줄 옵션 값'
                onChange={(e) => props.setOptionValue1(+e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id='option2-select'>잠재옵션 둘째줄(결과)</InputLabel>
              <Select size='small'
                fullWidth
                value={props.option2}
                id='select-option2'
                label='잠재옵션 둘째줄(결과)'
                labelId='option2-select'
                onChange={(e) => props.setOption2(e.target.value)}
                inputProps={{ placeholder: '잠재옵션 둘째줄(결과)' }}
              >
                <MenuItem key={`option2_`} value=''>잠재옵션 둘째줄(결과)</MenuItem>
                {
                  optionList.map((data, index) => (
                    <MenuItem key={`option2_${index}`} value={data}>{data}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6}>
            <FormControl fullWidth>
              <TextField size='small'
                type={'number'}
                id='optionValue2'
                label='둘째줄 옵션 값'
                onChange={(e) => props.setOptionValue2(+e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id='option3-select'>잠재옵션 셋째줄(결과)</InputLabel>
              <Select size='small'
                fullWidth
                value={props.option3}
                id='select-option3'
                label='잠재옵션 셋째줄(결과)'
                labelId='option3-select'
                onChange={(e) => props.setOption3(e.target.value)}
                inputProps={{ placeholder: '잠재옵션 셋째줄(결과)' }}
              >
                <MenuItem key={`option3_`} value=''>잠재옵션 셋째줄(결과)</MenuItem>
                {
                  optionList.map((data, index) => (
                    <MenuItem key={`option3_${index}`} value={data}>{data}</MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={12} md={6}>
            <FormControl fullWidth>
              <TextField size='small'
                type={'number'}
                id='optionValue3'
                label='셋째줄 옵션 값'
                onChange={(e) => props.setOptionValue3(+e.target.value)}
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
      />
    </Card>
  )
}

export default TableServerSide
