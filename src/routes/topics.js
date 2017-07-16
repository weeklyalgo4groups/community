// GET /topics
function getTopics(request, reply) {

  return reply.view('topics', {
    topics: [{
      id: "abc123456",
      title: "这是一段发帖测试文字",
      category: "瞎扯淡",
      account: {
        id: 1111,
        avatar: "/images/avatar.png",
        username: "新用户AAA"
      },
      lastReply: {
        id: "abc567890",
        timeago: "1 小时前",
        account: {
          id: 2222,
          username: "新用户BBB"
        }
      },
      replyCount: 34
    }, {
      id: "abc123456",
      title: "这是一段发帖测试文字",
      category: "瞎扯淡",
      account: {
        id: 1111,
        avatar: "/images/avatar.png",
        username: "新用户AAA"
      },
      lastReply: {
        id: "abc567890",
        timeago: "1 小时前",
        account: {
          id: 2222,
          username: "新用户BBB"
        }
      },
      replyCount: 34
    }, {
      id: "abc123456",
      title: "这是一段发帖测试文字",
      category: "瞎扯淡",
      account: {
        id: 1111,
        avatar: "/images/avatar.png",
        username: "新用户AAA"
      },
      lastReply: {
        id: "abc567890",
        timeago: "1 小时前",
        account: {
          id: 2222,
          username: "新用户BBB"
        }
      },
      replyCount: 34
    }]
  })
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
