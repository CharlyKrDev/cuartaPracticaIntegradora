class ManagerError extends Error {
    static createError({ name, cause, message, code, details }) {
      const error = new ManagerError(message);
      error.name = name;
      error.cause = cause;
      error.code = code;
      error.details = details;
      console.error(error);
      return error;
    }
  }
  
  export default ManagerError;
  