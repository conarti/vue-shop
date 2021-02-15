const validatePass = (_, value, callback) => {
  const regexp = /[а-яё]/i;
  if (regexp.test(value)) {
    callback(new Error('Пароль не может содержать кириллицу'))
  } else {
    callback()
  }
}

export default {
  email: [
    { type: 'email', required: true, message: 'Пожалуйста, введите корректную почту', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Пожалуйста, введите пароль', trigger: 'blur' },
    { validator: validatePass, trigger: ['change', 'blur'] },
    { min: 6, message: 'Длина пароля не менее 6 символов', trigger: ['change', 'blur'] }
  ]
}
