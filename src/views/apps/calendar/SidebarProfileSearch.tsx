// ** MUI Imports
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle'

// ** Types
import { SidebarProfileSearchType } from 'src/types/apps/calendarTypes'

const SidebarProfileSearch = (props: SidebarProfileSearchType) => {

  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleTextChange = () => {
    // ここで再検索処理
  };

  const renderUserSearch = [0, 1, 2, 3].map((v) => {
    const labelId = `checkbox-list-secondary-label-${v}`;

    return (
      <ListItem
        key={v}
        disablePadding
      >
        {/* <ListItemButton> */}
          <Checkbox
            edge="end"
            onChange={handleToggle(v)}
            checked={false}
            inputProps={{ 'aria-labelledby': labelId }}
            sx={{
              padding: 0,
              marginRight: '1rem'
            }}
          />
          <ListItemAvatar>
            <Avatar
              alt={`Avatar n°${v + 1}`}
              src={`/static/images/avatar/${v + 1}.jpg`}
            />
          </ListItemAvatar>
          <ListItemText id={labelId} primary={`Line item ${v + 1}`} />
        {/* </ListItemButton> */}
      </ListItem>
    );
  });

  const renderResultUserSearch = [0, 1, 2, 3].map((v) => {
    const labelId = `checkbox-list-secondary-label-${v}`;

    return (
      <ListItem
        key={v}
        disablePadding
      >
        {/* <ListItemButton> */}
          <Checkbox
            edge="end"
            onChange={handleToggle(v)}
            checked={true}
            inputProps={{ 'aria-labelledby': labelId }}
            sx={{
              padding: 0,
              marginRight: '1rem'
            }}
          />
          <ListItemAvatar>
            <Avatar
              alt={`Avatar n°${v + 1}`}
              src={`/static/images/avatar/${v + 1}.jpg`}
            />
          </ListItemAvatar>
          <ListItemText id={labelId} primary={`Line item ${v + 1}`} />
        {/* </ListItemButton> */}
      </ListItem>
    );
  });

  return (
    <React.Fragment>
      <Box>
        <TextField
          id="input-with-icon-textfield"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          onChange={handleTextChange}
          variant="standard"
        />
        {/* ユーザ検索 最大４件 follow+publicを複合で検索 ロジックとしてはfollowはあらかじめ全て持っておき、publicを動的に検索、それらの中から検索ワードに合うものを表示する。優先度はfollow,public */}
        <List dense sx={{ width: '100%' }}>
          {renderUserSearch}
        </List>

        {/* 検索対象 */}
        <Typography variant='caption' sx={{ mt: 7, mb: 2, textTransform: 'uppercase' }}>
          現在表示中のユーザ
        </Typography>
        <List dense sx={{ width: '100%' }}>
          {/* store.myidsの情報をレンダリング */}
          {renderResultUserSearch}
        </List>
      </Box>
    </React.Fragment>
  )
}

export default SidebarProfileSearch
