function handleErrors(err) {
  console.log('errorhandle: ', err.message);
  let message = '';

  // incorrect email
  if (err.message === 'incorrect email') {
    message += 'Email address is not registered. ';
  }

  if (err.message === 'email or code is missing') {
    message += 'email or code is missing. ';
  }

  if (err.message === 'user is not registered') {
    message += 'user is not registered. ';
  }

  // incorrect password
  else if (err.message === 'incorrect password') {
    message += 'Password is incorrect. ';
  }

  // objectId didnot match
  if (err.message.includes('Cast to ObjectId')) {
    message += 'id is invalid.';
  }
  // duplicate email error
  else if (err.code === 11000) {
    Object.entries(err?.keyValue).forEach((elem) => {
      const strArr = elem[0].split('');
      strArr[0] = strArr[0].toUpperCase();
      message += `${strArr.join('')} '${elem[1]}' is already registered. `;
    });
  }

  //  user validation errors
  else if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      message += `${properties.message}. `;
      return null;
    });
  }

  //  post validation errors
  else if (err.message.includes('post validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      message += `${properties.message}. `;
      return null;
    });
  }
  //  else
  else message += 'something went wrong.';

  return message;
}

module.exports = handleErrors;
