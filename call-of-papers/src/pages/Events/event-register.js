const axios = require('axios')

async function registerEvent (bodyApi) {
	return axios.post(`http://localhost:3001/events`, {
    method: 'post',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(bodyApi)
  })
  .then(res => JSON.parse(res.data.body))
  .catch(function(error) {
    return error.response.data
  })
}

module.exports = registerEvent
