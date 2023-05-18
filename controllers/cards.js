const jwt = require('jsonwebtoken');
const cardModel = require('../models/card');
const { handleResponseError } = require('../utils/utils');
const {
  OK_STATUS,
  CREATED_STATUS,
} = require('../statusCodes');

const getCards = (req, res) => {
  cardModel.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(OK_STATUS).send(cards))
    .catch((err) => handleResponseError(err, res));
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  cardModel.create({ name, link, owner })
    .then((card) => res.status(CREATED_STATUS).send(card))
    .catch((err) => handleResponseError(err, res));
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  const { authorization } = req.headers;
  const token = authorization.replace('Bearer ', '');
  const payload = jwt.verify(token, 'some-secret-key');
  cardModel.findById(cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() === payload._id) {
        cardModel.findByIdAndRemove(cardId)
          .orFail()
          .then((cardDelete) => res.status(OK_STATUS).send(cardDelete))
          .catch((err) => handleResponseError(err, res));
      }

      return Promise.reject(new Error('Нельзя удалять чужую карточку'));
    })
    .catch((err) => handleResponseError(err, res));
};

const likeCard = (req, res) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.status(CREATED_STATUS).send(card))
    .catch((err) => handleResponseError(err, res));
};

const dislikeCard = (req, res) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.status(OK_STATUS).send(card))
    .catch((err) => handleResponseError(err, res));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
