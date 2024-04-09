export const generalValidation = {
  matchesLetrasAndNumbers: /^[\sA-ZÁÉÍÓÚÜÑ0-9.]+$/i,
  matchesEmail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  matchesDNI: /^\d{8}$/,
  matchesPhones: /^[0-9]{9}$/,
  matchesRuc: /^\d{11}$/,
  matchesLetras: /^[\sA-ZÁÉÍÓÚÜÑ]+$/i,
  matchesDireccion: /[a-zA-Z].*[0-9].*|[0-9].*[a-zA-Z]/,
};

export const messageValidation = {
  msgEmail: 'Emal incorrecto',
  msgDNI: 'El DNI debe tener exactamente 8 dígitos',
  msgPassword: 'Contraseña inválido',
  msgRuc: 'Ruc Inválido',
  msgLetras: 'Solo puede contener letras',
  msgDireccion: 'Debe contener letras y números',
  msgPhones: 'El teléfono debe tener 9 dígitos',
};
