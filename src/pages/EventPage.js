import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useEffect, useState } from 'react';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
// components
import moment from 'moment/moment';
import {apiRequest } from '../services/events';
import ModalComponent from '../components/modal';
import { EventForm } from '../sections/forms';
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { EventListHead, EventListToolbar } from '../sections/@dashboard/events';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Event Name', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'totalComission', label: 'Comission', alignRight: false },
  { id: 'attendees', label: 'Attendees', alignRight: false },
  { id: 'location', label: 'Location', alignRight: false },
  { id: 'eventtime', label: 'Event time', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This is frontend sorting like a datatable
function applySortFilter(array, comparator, query) {
  if (!array || !Array.isArray(array)) return []
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}



export default function EventPage() {
  const [open, setOpen] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [modalOpen, setModalOpen] = useState(false)
  const [postData, setPostData] = useState("")
  const [events, setEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState("")
  const [isLoading, setisLoading] = useState(true)
  const [popUpMessage, setPopUpMessage] = useState("")
  const [showPopUpAlert, setShowPopUpAlert] = useState(true)
  const [popupSeverity, setPopupSeverity] = useState("success")
  

  const handleOpenMenu = (event, row) => {
    console.log("open", row)
    setSelectedEvent(row)
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(false);
    setSelectedEvent("");
    console.log("cloose", selectedEvent)

  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleEdit = () => {
    setModalOpen(true)
    setOpen(null);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    fetchRequest({url:`/events/${selectedEvent.id}`,type: 'DELETE'}).then(() => {
        fetchRequest({url: '/events'})
    })
    setOpen(null);
  };


 
  const fetchRequest = ({url = "/events", type="GET", data=null, headers = []}) => {
    setisLoading(true)
    return apiRequest({url, type,data,headers})
    .then((res) => {
      setShowPopUpAlert(true)
      if (type !== "GET"){
        setPopupSeverity('success')
        setPopUpMessage(`Operation Performed Successfully`)
      }else if(Array.isArray(res) && res[0].id)
          setEvents(res)
    })
    .catch((err) => {
      setShowPopUpAlert(true)
      setPopupSeverity('error')
      setPopUpMessage(`Request Failed, \n\t${  err}`)
      
      console.error(err)}) 
    .finally(() => {
      setisLoading(false)
    })
  }


  useEffect(() => {
    console.log("postData", postData)
    if(postData.id){
      delete postData.attendees
      fetchRequest({url:`/events/${postData.id}`,type: 'PATCH', data: postData}).then(() => {
        fetchRequest({url: '/events'})
      })

    }else if(postData){
      console.log("pusging", postData)
      fetchRequest({url:`/events`,type: 'POST', data: {...postData}}).then(() => {
        fetchRequest({url: '/events'})
      })      
    }

    setModalOpen(false)

  }, [postData])

  useEffect(() => {
    fetchRequest({url: '/events'})
  }, [])
    const filteredEvents = ([...applySortFilter(events, getComparator(order, orderBy), filterName)]);

  return (
    <>
      <Helmet>
        <title> Events </title>
      </Helmet>
       <Snackbar open={showPopUpAlert} anchorOrigin={{ vertical: "top", horizontal: "right" }} autoHideDuration={6000} onClose={() => setShowPopUpAlert(false)}>
        <Alert severity={popupSeverity} sx={{ width: '100%' }}>
          {popUpMessage}
        </Alert>
      </Snackbar>
      <ModalComponent children={<EventForm selectedEvent={selectedEvent} setPostData={setPostData}/>} setOpen={setModalOpen} open={modalOpen} />
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Events
          </Typography>
          <Button onClick={() => {setModalOpen(true); setSelectedEvent("")}} variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Event
          </Button>
        </Stack>
        <Card>
          <EventListToolbar filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            {isLoading ?
             (<Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>)
              :
            (<TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <EventListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={events.length}
                  onRequestSort={handleRequestSort}
                />
                <TableBody>
                  {filteredEvents.map((row) => {
                    const { id, name, isActive, description, eventAt,location,price,attendees } = row;
                    return (
                      <TableRow hover key={`row_${id}`} tabIndex={-1} role="checkbox">

                        <TableCell component="th" scope="row" padding="normal">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{description}</TableCell>
                        <TableCell align="left">£{price || 0}</TableCell>
                        <TableCell align="left">£{((0.1*price)*attendees).toFixed(2)}</TableCell>
                        <TableCell align="left">{attendees || 0}</TableCell>
                        <TableCell align="left">{location}</TableCell>
                        <TableCell align="left">{moment(eventAt).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
                        <TableCell align="left">
                          <Label color={(isActive === false && 'error') || 'success'}>{isActive ? 'Yes' : 'No'}</Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, row)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>

                {!filteredEvents.length && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            No Data Found
                          </Typography>

                          {filterName ?? 
                              (<Typography variant="body2">
                                No results found for &nbsp;
                                <strong>&quot;{filterName}&quot;</strong>.
                              </Typography>)
                            }
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>)
            }
          </Scrollbar>
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={ () => handleEdit() }>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem onClick={(e) => handleDelete(e) } sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
