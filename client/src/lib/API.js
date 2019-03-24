
const API_URL =  'https://express-api-starter-rwanwwzmcr.now.sh/api/v1/messages'
export function getLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude })
        //fallback if user does not use geolocation API supplied by browser.
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
  return fetch(API_URL)
    .then(res => res.json())
    .then(messages => {
      const haveSeenLocation = {};
      return messages.reduce((all, message) => {
        const key = `${message.latitude.toFixed(3)}${message.longitude.toFixed(3)}`;
        if (haveSeenLocation[key]) {
          haveSeenLocation[key].otherMessages = haveSeenLocation[key].otherMessages || [];
          haveSeenLocation[key].otherMessages.push(message);
        } else {
          haveSeenLocation[key] = message;
          all.push(message);
        }
        return all;
      }, []);
    });
}

export function sendMessage(message) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {

      'Content-type': 'application/json'
    },
    body: JSON.stringify(message)
  }).then(message => message.json())
}