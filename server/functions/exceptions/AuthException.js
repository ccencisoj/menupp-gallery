const { BaseException } = require("./BaseException");

class AuthException extends BaseException {
  constructor(message) {
    super("AuthException", message, 400);
  }
}

exports.AuthException = AuthException;
