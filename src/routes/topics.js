// GET /topics
function getTopics(request, reply) {

  return reply('No topic list')
}

// GET /topics/{id}
function getTopicById(request, reply) {

  return reply('You want to view topic: ' + request.params.id)
}

module.exports = [{
  method: 'GET',
  path: '/topics',
  handler: getTopics
}, {
  method: 'GET',
  path: '/topics/{id}',
  handler: getTopicById
}]
