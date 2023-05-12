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
  cardModel.findByIdAndRemove(cardId)
    .orFail()
    .then((card) => res.status(OK_STATUS).send(card))
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
