Community.require(['request'], request => {
  const form = document.querySelector('#js-form')

  if (!form) return

  Community.require(['util.validator'], validator => {
    let results = []
    let submit = form.querySelector('#js-submit')

    if (!submit) return

    _.filter(form, field => field.nodeName === 'INPUT').forEach((field, i) => {
      results[i] = false
      validator(field, result => {
        results[i] = result
        if (results.every(result => result)) {
          submit.removeAttribute('disabled')
        } else {
          submit.setAttribute('disabled','disabled')
        }
      })
    })
    submit.addEventListener('click', e => {
      e.preventDefault()
      request.form(form).then(data => {
        location.href = data
      })
    })
  })
})
