const registerEvent = require('./event-register');

const requestPayload = {
  event: 'Evento de Jest',
  userId: 123,
  description: 'Desvende os segredos do Jest!',
  schedule: '18 Abril, 07:30',
  local: 'FATEC',
  organizer: 'Sharing Talks',
  categories: ['frontend'],
  limited_spaces: false,
  partners: ['palestrantes']
}

const responsePayload = {
  "event": "Evento de Jest",
  "userId": 123,
  "description": "Desvende os segredos do Jest!",
  "schedule": "18 Abril, 07:30",
  "local": "FATEC",
  "organizer": "Sharing Talks",
  "categories": [
    "frontend"
  ],
  "limited_spaces": false,
  "partners": [
    "palestrantes"
  ]
}

test('register new event', async () => {
  let response = await registerEvent(requestPayload)
  delete response.id
  expect(response).toEqual(responsePayload);
});
