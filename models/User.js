const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

// Определение схемы для пользователя
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true, // Добавляем проверку уникальности для email
    validate: {
      // Пользовательская валидация для проверки уникальности email
      validator: async function (value) {
        if (!this.isModified('email')) return; // Проверка, если email не был изменен
        const user = await User.findOne({ email: value });
        if (user) throw new Error('This email is already registered'); // Если найден пользователь с таким email, выбрасываем ошибку
      }
    }
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['admin', 'user']
  },
  image: {
    type: String
  }
});


// Метод для проверки пароля
UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

// Middleware, выполняющийся перед сохранением пользователя
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Если пароль не изменен, переходим к следующему middleware

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR); // Генерация соли
  const hash = await bcrypt.hash(this.password, salt); // Хеширование пароля

  this.password = hash; // Заменяем пароль на хеш

  next(); // Переходим к следующему middleware
});

// Преобразование объекта пользователя перед отправкой JSON
UserSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password; // Удаляем пароль из JSON-представления объекта пользователя
    return ret;
  }
});

// Создание модели пользователя на основе схемы
const User = mongoose.model('User', UserSchema);

module.exports = User; // Экспорт модели пользователя
