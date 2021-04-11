export const types = {
  FETCH_GET_REQUEST: 'FETCH_GET_REQUEST',
  FETCH_GET_FAILURE: 'FETCH_GET_FAILURE',
  FETCH_GET_SUCCESS: 'FETCH_GET_SUCCESS',
  FETCH_POST_REQUEST: 'FETCH_POST_REQUEST',
  FETCH_POST_FAILURE: 'FETCH_POST_FAILURE',
  FETCH_POST_SUCCESS: 'FETCH_POST_SUCCESS',
  FETCH_PUT_REQUEST: 'FETCH_PUT_REQUEST',
  FETCH_PUT_FAILURE: 'FETCH_PUT_FAILURE',
  FETCH_PUT_SUCCESS: 'FETCH_PUT_SUCCESS',
  FETCH_DELETE_REQUEST: 'FETCH_DELETE_REQUEST',
  FETCH_DELETE_FAILURE: 'FETCH_DELETE_FAILURE',
  FETCH_DELETE_SUCCESS: 'FETCH_DELETE_SUCCESS',
  UPDATE_MENU_HEIGHT: 'UPDATE_MENU_HEIGHT',
  UPDATE_STATE: 'UPDATE_STATE',
}

export const fetchGetRequestAction = () => (
  {
    type: types.FETCH_GET_REQUEST,
    payload: {
      loading: true
    }
  }
)

export const fetchGetSuccessAction = (attributName, data) => (
  {
    type: types.FETCH_GET_SUCCESS,
    payload: {
        [attributName]: data, 
          loading: false,
      }
  }
)

export const fetchGetFailureAction = (attributName) => (
  {
    type: types.FETCH_GET_FAILURE,
    payload: {[attributName]: [], loading: false, message: "Hubo algún error al ejecutar la consulta", messageClass: "formErrorMessage"}
  }
)

export const fetchPostRequestAction = () => (
  {
    type: types.FETCH_POST_REQUEST,
    payload: {
      loading: true
    }
  }
)

export const fetchPostSuccessAction = (object) => (
  {
    type: types.FETCH_POST_SUCCESS,
    payload: {
        ...object, 
        loading: false
      }
  }
)

export const fetchPostFailureAction = (object) => (
  {
    type: types.FETCH_POST_FAILURE,
    payload: {
        ...object, 
        loading: false
      }
  }
)

export const fetchPutRequestAction = () => (
  {
    type: types.FETCH_PUT_REQUEST,
    payload: {
      loading: true, 
      message: ""
    }
  }
)

export const fetchPutSuccessAction = (object) => (
  {
    type: types.FETCH_PUT_SUCCESS,
    payload: {
        ...object, 
        loading: false
      }
  }
)

export const fetchPutFailureAction = (object) => (
  {
    type: types.FETCH_PUT_FAILURE,
    payload: {
        ...object, 
        loading: false
      }
  }
)

export const fetchDeleteRequestAction = () => (
  {
    type: types.FETCH_DELETE_REQUEST,
    payload: {
      loading: true, 
      message: ""
    }
  }
)

export const fetchDeleteSuccessAction = (object) => (
  {
    type: types.FETCH_DELETE_SUCCESS,
    payload: {
        ...object, 
        loading: false
      }
  }
)

export const fetchDeleteFailureAction = (object) => (
  {
    type: types.FETCH_DELETE_FAILURE,
    payload: {
        ...object, 
        loading: false
      }
  }
)

export const updateMenuHeightAction = (newHeight) => (
  {
    type: types.UPDATE_MENU_HEIGHT,
    payload: {menuHeight: newHeight}
  }
)

export const updateStateAction = (object) => (
  {
    type: types.UPDATE_STATE,
    payload: object
  }
)





