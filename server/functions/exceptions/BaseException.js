class BaseException extends Error {
  constructor(name, message, code) {
    super(message);
    this.name = name;
    this.code = code;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
    };
  }
}

exports.BaseException = BaseException;
