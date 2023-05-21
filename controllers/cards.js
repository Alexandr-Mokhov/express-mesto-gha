const cardModel = require('../models/card');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  OK_STATUS,
  CREATED_STATUS,
} = require('../statusCodes');

const getCards = (req, res, next) => {
  cardModel.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.status(OK_STATUS).send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  cardModel.create({ name, link, owner })
    .then((card) => res.status(CREATED_STATUS).send(card))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  cardModel.findById(cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() === req.user._id) {
        return cardModel
          .deleteOne({ _id: cardId })
          .orFail()
          .then((cardDelete) => res.status(OK_STATUS).send(cardDelete))
          .catch(next);
      }
      return Promise.reject(new ForbiddenError('Удаление карточки другого пользователя запрещено.'));
    })
    .catch(next);
};

function updateCard(control, req, res, next) {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    control,
    { new: true },
  )
    .orFail()
    .then((card) => res.status(OK_STATUS).send(card))
    .catch(next);
}

const likeCard = (req, res, next) => {
  updateCard({ $addToSet: { likes: req.user._id } }, req, res, next);
};

const dislikeCard = (req, res, next) => {
  updateCard({ $pull: { likes: req.user._id } }, req, res, next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
