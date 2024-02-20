export const regexObjets = {
  regex: {
    letraMayusculaYEspacios: /^[\sA-ZÁÉÍÓÚÜÑ\s]+$/i,
    onlyPositiveNumbers: /^[1-9]\d*$/,
    emailRegex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    hora24Hour: {
      valid: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
      message:
        'Formato de hora inválido. Debe ser en formato HH:MM y estar entre 00:00 y 23:59',
    },
  },
};
