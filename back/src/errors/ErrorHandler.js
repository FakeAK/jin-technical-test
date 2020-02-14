import { ApiInternalError } from './InternalError';
import { InvalidQueryParameterError } from './InvalidQueryParameterError';

function ErrorHandler(err) {
  switch (err.constructor) {
    case InvalidQueryParameterError:
      throw new InvalidQueryParameterError(err.message, err.status);
    default:
      throw new ApiInternalError(err.message, 500);
  }
}

module.exports = {
  ErrorHandler
}