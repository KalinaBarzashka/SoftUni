const extractDataForm = (fromRef, formConfig) => {
  return formConfig.reduce((acc, inputName) => {
    acc[inputName] = fromRef.elements[inputName].value;
    return acc;
  }, {});
};

const fillFormWithData = (fromRef, formValue) => {
  if(!formValue) {
    return;
  }

  Object.entries(formValue).map(([inputName, value]) => {
    if(!fromRef.elements.namedItem(inputName)) {
      return;
    }

    fromRef.elements.namedItem(inputName).value = value;
  });
};

const clearForm = (fromRef, formConfig) => {
  formConfig.map(key => {
    fromRef.elements.namedItem(key).value = '';
  });
};

export const createFormEntity = (fromRef, formConfig) => {
  //return the current form value as object
  const getValue = () => extractDataForm(fromRef, formConfig);

  //fills all possible form fields based on incoming object
  //@param {{[key:string]}} formValue

  const setValue = (formValue) => fillFormWithData(fromRef, formValue);

  //clears the form
  const clear = () => clearForm(fromRef, formConfig);

  return {
    getValue,
    setValue,
    clear
  };
}