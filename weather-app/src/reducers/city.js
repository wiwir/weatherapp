import { SET_CITY } from "./../actions";

export const city = (state = {}, action) => {
  switch (action.type) {
    case SET_CITY:
      return action.payload; // si existe la propiedad city se va agregar el action.payload, city hace referencia a la propiedad
    default:
      return state;
  }
};
