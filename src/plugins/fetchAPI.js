const SERVER_URL = 'https://service.ey-dev.com/time-manager/'

export const FETCH_API_POST = (url, data) => {
    return  fetch(SERVER_URL + url, {
        method: 'POST', // or 'PUT'
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'include', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => response.json()).catch((error)=>{console.log(error.message)})
}

export const FETCH_API_GET = (url) => {
    return  fetch(SERVER_URL + url).then(response => response.json()).catch((error)=>{console.log(error.message)})
}
