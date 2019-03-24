
const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/api/v1/messages' : 'https://express-api-starter-rwanwwzmcr.now.sh/api/v1/messages'
console.log(API_URL);
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