module.exports = (arrWithObjectId, objectId) => {
  let flag = false;
  for (let i = 0; i < arrWithObjectId.length; i += 1)
    if (arrWithObjectId[i].toString === objectId.toString) {
      flag = true;
      break;
    }
  return flag;
};
