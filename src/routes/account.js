const Boom = require('boom')
const Joi = require('joi')

const actionType = {
  ACCOUNT: '/account',
  SIGN_UP: '/account/sign_up',
  SIGN_IN: '/account/sign_in'
}

// GET /account
function getAccount(request, reply) {

  return reply.view('account', {
    action: actionType.ACCOUNT
  })
}

// GET /account/sign_up
function getSignUp(request, reply) {

  return reply.view('account', {
    action: actionType.SIGN_UP
  })
}

// POST /account/sign_up
function postSignUp(request, reply) {

}

// GET /account/sign_in
function getSignIn(request, reply) {

  return reply.view('account', {
    action: actionType.SIGN_IN
  })
}

// POST /account/sign_in
function postSignIn(request, reply) {
  const payload = request.payload
  const db = request.mongo.db

  db.collection('accounts').findOne(payload, (err, result) => {
    if (err || !result) {
      return reply(Boom.unauthorized('账号或密码不正确，请重试'))
    }
    return reply('/')
  })
}

const common = {
  username: Joi.string().min(2).max(16).required(),
  password: Joi.string().min(6).max(32).required()
}
const signUpScheme = Joi.object(Object.assign({
  repassword: common.password,
  email: Joi.string().min(5).required()
}, common))
const signInScheme = Joi.object(common)

module.exports = [{
  method: 'GET',
  path: actionType.ACCOUNT,
  handler: getAccount
}, {
  method: 'GET',
  path: actionType.SIGN_UP,
  handler: getSignUp
}, {
  method: 'POST',
  path: actionType.SIGN_UP,
  config: {
    handler: postSignUp,
    validate: {
      payload: signUpScheme
    }
  }
}, {
  method: 'GET',
  path: actionType.SIGN_IN,
  handler: getSignIn
}, {
  method: 'POST',
  path: actionType.SIGN_IN,
  config: {
    handler: postSignIn,
    validate: {
      payload: signInScheme
    }
  }
}]
