

const SERVER_URL = "http://192.168.0.3:8200/api/v1/"
export const postRequest = async function(endpoint, data) {
  let dataRequest = {
    data,
    _channel: "web"
  };

  const rawResponse = await fetch(SERVER_URL + endpoint, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataRequest)
  });
  const content = await rawResponse.json();

  return content;
}