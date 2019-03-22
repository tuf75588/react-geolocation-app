const _endpoint = 'http://localhost:5000/api/v1/messages'

export function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude })
      }, geoError => {
        resolve(fetch('https://ipapi.co/json').then(response => {
          return response.json();
        }).then(data => {
          return data

        }))
      })
    }
  })
}

export function getMessages() {
  return fetch(_endpoint).then(messages => messages.json().then(data => data))
}

export  function loadData() {
  return Promise.all([getMessages(), getLocation()]).then(data => {
    return data
  })
}