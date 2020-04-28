import { getEnvironment } from './../../utils/environment'
const axios = require('axios')

const environment = getEnvironment();

async function registerEvent (bodyApi) {
	return axios.post(`${environment}/events`, {
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
