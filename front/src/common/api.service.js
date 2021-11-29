

// const SERVER_URL = "http://localhost:8200/api/v1/"
// const SERVER_URL = "http://192.168.0.2:8200/api/v1/"
// const SERVER_URL = "http://192.168.0.9:8200/api/v1/"
const SERVER_URL = "https://app.blackbozz.com/geoda/api/v1/"
export const postRequest = async function(endpoint, data, user) {

  let opts = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data,
      _channel: "web"
    })
  }

  if (user) {
    opts.headers.Authorization = "Bearer " + user.token;
  }

  const rawResponse = await fetch(SERVER_URL + endpoint, opts);
  
  const content = await rawResponse.json();

  if (rawResponse.status != 200) throw content;
  return content;
}


export const postMultimedia = async function(endpoint, form, user) {

  let opts = {
    method: 'POST',
    headers: {
    },
    body: form
  }

  if (user) {
    opts.headers.Authorization = "Bearer " + user.token;
  }

  const rawResponse = await fetch(SERVER_URL + endpoint, opts);
  
  const content = await rawResponse.json();

  if (rawResponse.status != 200) throw content;
  return content;
}