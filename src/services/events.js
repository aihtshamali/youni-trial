
// if we want to update our payload
const validatePayload = (payload) => JSON.stringify(payload) // {...payload, eventAt: moment(Date.parse("Sat Oct 08 2022 05:23:42 GMT+0100 (British Summer Time)"))})



const apiRequest = ({url, type = 'GET', data = null, headers = [] } ) => {
   let reqOptions = {
      "method": type,
      "headers": {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${process.env.REACT_APP_SECRET}`,
        ...headers,
      },
    };
    if(!['GET', 'DELETE'].includes(type)){
        reqOptions = {...reqOptions, body: validatePayload(data)};
    }
    return (fetch(`${`${process.env.REACT_APP_BACKEND_URL}${url}` }`, {...reqOptions})) 
    .then((res) => res.json())
}


const getEvents = async (setisLoading) => fetch(`${process.env.REACT_APP_BACKEND_URL}/events`, {
      "method": "GET",
      "headers": {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${process.env.REACT_APP_SECRET}`
      }
    }) .then((res) => res.json())
        .then((json) => json)
        .catch((err) => console.error(err))
        .finally(() => {
            setisLoading(false)
        })


const saveEvent = async (postData) => fetch(`${process.env.REACT_APP_BACKEND_URL}/events`, {
      "method": "POST",
      "headers": {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${process.env.REACT_APP_SECRET}`
      },
      "body": validatePayload(postData),
    }) .then((res) => res.json())
        .then((json) => json)
        .catch((err) => console.error(err))

const updateEvent = async (id, postData) => fetch(`${process.env.REACT_APP_BACKEND_URL}/events/${id}`, {
      "method": "PATCH",
      "headers": {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${process.env.REACT_APP_SECRET}`
      },
      "body": validatePayload(postData), 
    }) .then((res) => res.json())
        .then((json) => json)
        .catch((err) => console.error(err))


const deleteEvent = async (id) => fetch(`${process.env.REACT_APP_BACKEND_URL}/events/${id}`, {
      "method": "DELETE",
      "headers": {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${process.env.REACT_APP_SECRET}`
      },
    }) .then((res) => res.json())
        .then((json) => json)
        .catch((err) => console.error(err))


module.exports = {
    apiRequest,
    getEvents,
    saveEvent,
    updateEvent,
    deleteEvent
}