Community = {
  define: (id, definition) => {
    Community.modules[id] = definition(Community.require)
  },
  require: (dependencies, callback) => {
    const modules = Community.modules

    if (_.isArray(dependencies)) {
      callback.apply(
        this,
        dependencies.map(dependency => modules[dependency])
      )
    } else {
      if (_.isFunction(callback)) callback(dependencies)
    }
  },
  modules: {}
}

Community.define('request', () => {
  axios.interceptors.response.use(response => {
    if (200 === response.status) {
      return response.data
    }
    return Promise.reject(response)
  })

  axios.form = (form, config) => {
    const data = new FormData()

    _.filter(form, field => field.nodeName === 'INPUT').forEach(field => {
      if (field.name.trim()) {
        data.append(field.name.trim(), field.value.trim())
      }
    })

    return axios(Object.assign({
      url: form.action,
      data: data,
      method: form.method
    }, config))
  }

  return axios
})

Community.define('util.validator', () => {
  const regex = {
    text: /^\S{2,16}$/,
    email: /^\w+@\w+(\.\w)+/,
    number: /^[0-9]+$/,
    password: /\w{6,32}/
  }

  return (field, callback) => {
    if (_.isString(field)) {
      field = document.querySelector(field)
    }
    if (!(field instanceof HTMLInputElement)) return

    if (field.required) {
      field.addEventListener('input', () => {
        if (_.isFunction(callback)) {
          callback(regex[field.type].test(field.value))
        }
      })
    } else {
      if (_.isFunction(callback)) callback(true)
    }
  }
})
