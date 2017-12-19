const validationParams = {
  emailMin: 7,
  emailMax: 40,
};

function validators(ln) {
  return {
    //   email: [
    //     {
    //       validator(value) {
    //         return (
    //           value.length >= validationParams.emailMin && value.length <= validationParams.emailMax
    //         );
    //       },
    //       message: ln.ERRORS.EMAIL_WRONG_LENGTH.replace('&', `${validationParams.emailMin}`).replace(
    //         '&',
    //         String(validationParams.emailMax)
    //       ),
    //     },
    //     {
    //       validator(value) {
    //         return /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i.test(
    //           value
    //         );
    //       },
    //       message: ln.ERRORS.EMAIL_INVALID,
    //     },
    //   ],
    //
    //   getErrorsForField(field, value) {
    //     if (!this[field]) return { message: ln.ERRORS.NO_VALIDATOR.replace('&', field) };
    //
    //     for (let i = 0; i < this[field].length; i++) {
    //       const { validator, message } = this[field][i];
    //
    //       if (!validator(value)) return { message };
    //     }
    //
    //     return false;
    //   },
    //
    //   validationParams,
  };
}

export default validators;
