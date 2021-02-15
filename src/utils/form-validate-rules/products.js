export default {
  title: [
    { required: true, message: 'Пожалуйста, введите название', trigger: 'blur' },
    { min: 3, message: 'Название не может быть меньше 3 символов', trigger: 'blur' },
  ],
  img: [
    { required: true, message: 'Пожалуйста, введите ссылку на изображение', trigger: 'blur' },
    { min: 3, message: 'Здесь не может быть меньше 3 символов', trigger: 'blur' },
  ],
  category: [
    { required: true, message: 'Пожалуйста, выберите категорию', trigger: 'blur' },
  ],
  price: [
    { required: true, message: 'Пожалуйста, введите стоимость', trigger: 'blur' },
    { type: 'number', message: 'Введите число', trigger: 'blur' },
  ],
  count: [
    { required: true, message: 'Пожалуйста, введите количество', trigger: 'blur' },
    { type: 'number', message: 'Введите число', trigger: 'blur' },
  ]
}
