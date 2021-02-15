export default {
  title: [
    { required: true, message: 'Пожалуйста, введите название', trigger: 'blur' },
    { min: 3, message: 'Название не может быть меньше 3 символов', trigger: 'blur' }
  ]
}
