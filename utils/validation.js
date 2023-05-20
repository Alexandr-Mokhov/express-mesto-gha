const { celebrate, Joi } = require('celebrate');

// eslint-disable-next-line no-useless-escape
const linkPattern = /https?:\/\/[\w\-\.\_\~\:\/\?\#\[\]\@\!\$\&\'\(\)\*\+\,\;\=\#]{1,}/;

const registrationValidation = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .email()
      .required()
      .messages({ // не знаю нужно ли изменять тексты сообщений в этих местах, может убрать?
        'string.base': '"email" должно быть текстом', // все равно ошибка от Joi приходит отличающаяся от прочих ошибок
        'string.empty': '"email" не должно быть пустым',
        'string.email': 'В этом поле должен быть "email"',
        'any.required': '"email" обязательное поле',
      }),
    password: Joi
      .string()
      .min(4)
      .required()
      .messages({
        'string.base': '"Пароль" должно быть текстом',
        'string.empty': '"Пароль" не должно быть пустым',
        'string.min': 'Минимальная длина "Пароля" 4 знака',
        'any.required': '"Пароль" обязательное поле',
      }),
    name: Joi
      .string()
      .min(2)
      .max(30)
      .messages({
        'string.base': '"Имя" должно быть текстом',
        'string.empty': '"Имя" не должно быть пустым',
        'string.min': 'Минимальная длина "имени" 2 знака',
        'string.max': 'Максимальная длина "имени" 30 знаков',
      }),
    about: Joi
      .string()
      .min(2)
      .max(30)
      .messages({
        'string.base': '"О себе" должно быть текстом',
        'string.empty': '"О себе" не должно быть пустым',
        'string.min': 'Минимальная длина "о себе" 2 знака',
        'string.max': 'Максимальная длина "о себе" 30 знаков',
      }),
    avatar: Joi
      .string()
      .regex(linkPattern)
      .messages({
        'string.base': '"Ссылка" должна быть текстом',
        'string.empty': '"Ссылка" не должна быть пустым',
        'string.pattern.base': 'Это поле должно соответствовать ссылке',
      }),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .email()
      .required()
      .messages({
        'string.base': '"email" должно быть текстом',
        'string.empty': '"email" не должно быть пустым',
        'string.email': 'В этом поле должен быть "email"',
        'any.required': '"email" обязательное поле',
      }),
    password: Joi
      .string()
      .min(4)
      .required()
      .messages({
        'string.base': '"Пароль" должно быть текстом',
        'string.empty': '"Пароль" не должно быть пустым',
        'string.min': 'Минимальная длина "Пароля" 4 знака',
        'any.required': '"Пароль" обязательное поле',
      }),
  }),
});

const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .min(2)
      .max(30)
      .required()
      .messages({
        'string.base': '"Имя" должно быть текстом',
        'string.empty': '"Имя" не должно быть пустым',
        'string.min': 'Минимальная длина "имени" 2 знака',
        'string.max': 'Максимальная длина "имени" 30 знаков',
        'any.required': '"Имя" обязательное поле',
      }),
    about: Joi
      .string()
      .min(2)
      .max(30)
      .required()
      .messages({
        'string.base': '"О себе" должно быть текстом',
        'string.empty': '"О себе" не должно быть пустым',
        'string.min': 'Минимальная длина "о себе" 2 знака',
        'string.max': 'Максимальная длина "о себе" 30 знаков',
        'any.required': '"О себе" обязательное поле',
      }),
  }),
});

const userAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi
      .string()
      .regex(linkPattern)
      .required()
      .messages({
        'string.base': '"Ссылка" должна быть текстом',
        'string.empty': '"Ссылка" не должна быть пустым',
        'string.pattern.base': 'Это поле должно соответствовать ссылке',
        'any.required': '"Ссылка" обязательное поле',
      }),
  }),
});

const cardCreateValidation = celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .min(2)
      .max(30)
      .required()
      .messages({
        'string.base': '"Имя" должно быть текстом',
        'string.empty': '"Имя" не должно быть пустым',
        'string.min': 'Минимальная длина "имени" 2 знака',
        'string.max': 'Максимальная длина "имени" 30 знаков',
        'any.required': '"Имя" обязательное поле',
      }),
    link: Joi
      .string()
      .regex(linkPattern)
      .required()
      .messages({
        'string.base': '"Ссылка" должна быть текстом',
        'string.empty': '"Ссылка" не должна быть пустым',
        'string.pattern.base': 'Это поле должно соответствовать ссылке',
        'any.required': '"Ссылка" обязательное поле',
      }),
  }),
});

const cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi
      .string()
      .hex()
      .length(24)
      .required()
      .messages({
        'string.base': '"Идентификатор" должен быть текстом',
        'string.hex': '"Идентификатор" должен состоять из шестнадцатиричных чисел',
        'string.length': '"Идентификатор" должен быть длиной 24 знака',
        'any.required': '"Идентификатор" обязательное поле',
      }),
  }),
});

const userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi
      .string()
      .hex()
      .length(24)
      .required()
      .messages({
        'string.base': '"Идентификатор" должен быть текстом',
        'string.hex': '"Идентификатор" должен состоять из шестнадцатиричных чисел',
        'string.length': '"Идентификатор" должен быть длиной 24 знака',
        'any.required': '"Идентификатор" обязательное поле',
      }),
  }),
});

module.exports = {
  registrationValidation,
  loginValidation,
  userValidation,
  userAvatarValidation,
  cardCreateValidation,
  cardIdValidation,
  userIdValidation,
};
