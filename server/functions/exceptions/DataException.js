const { BaseException } = require("./BaseException");

class DataException extends BaseException {
  constructor(message) {
    super("DataException", message, 400);
  }
}

exports.DataException = DataException;
