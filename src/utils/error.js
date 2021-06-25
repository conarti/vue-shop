const ERROR_CODES = {
  EMAIL_NOT_FOUND: 'Пользователь с таким email не найден',
  INVALID_PASSWORD: 'Неверный пароль',
  EMAIL_EXISTS: 'Пользователь с таким email уже существует'
}

export function error(code) {
  return ERROR_CODES[code] ? ERROR_CODES[code] : `Неизвестная ошибка: ${code}`
}
