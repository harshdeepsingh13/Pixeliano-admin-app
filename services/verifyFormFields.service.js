export default (formData) => {
  let unVerifiedFields = [];
  for (let [key, value] of Object.entries(formData)) {
    if ((!value.value) && value.value === '') {
      unVerifiedFields.push(key);
    }
  }
  return unVerifiedFields;
}
