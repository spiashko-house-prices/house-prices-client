import {combineReducers} from 'redux';
import {
  CHANGE_DATASET,
  CHANGE_FEATURE_VALUE,
  LOAD_PREDICTION,
  MODEL_LOADED,
  MODEL_LOADING,
} from '../actions/actions';


const amesDataset = {
  backend: process.env.REACT_APP_AMES_BACKEND
};

const kcDataset = {
  backend: process.env.REACT_APP_KC_BACKEND
};

const defDataset = {
  dataset: amesDataset,
};

function datasetReducer(state = defDataset, action){
  switch (action.type) {
    case CHANGE_DATASET:
      switch (action.datasetName){
        case "ames":
          return {...state, dataset: amesDataset};
        case "kc":
          return {...state, dataset: kcDataset};
        default:
          return {...state, dataset: amesDataset};
      }
    default:
      return state;
  }
}

const defLoadState = {
  model: {},
  status: 'loading',
};

function loadReducer(state = defLoadState, action) {
  switch (action.type) {
    case MODEL_LOADING:
      return {...state, status: 'loading'};
    case MODEL_LOADED:
      return {
        ...state,
        model: action.model,
        status: 'loaded',
      };
    default:
      return state;
  }
}

function getSubmissionFormFromModel(model) {
  let result = [];

  model.boolean.forEach(item => {
    result.push({featureName: item.featureName, value: false});
  });

  model.categorical.forEach(item => {
    result.push({featureName: item.featureName, value: item.values[0]});
    return item;
  });

  model.numerical.forEach(item => {
    result.push({featureName: item.featureName, value: item.min});
    return item;
  });

  return result;
}

const defSubmissionFormState = {
  submissionForm: [],
};

function formReducer(state = defSubmissionFormState, action) {
  switch (action.type) {
    case MODEL_LOADED:
      return {
        ...state,
        submissionForm: getSubmissionFormFromModel(action.model),
      };
    case CHANGE_FEATURE_VALUE:
      return {
        ...state, submissionForm: state.submissionForm.map(
            feature => (feature.featureName === action.featureName)
                ? {...feature, value: action.value}
                : feature,
        ),
      };
    default:
      return state;
  }
}

const defLoadPredictionState = {
  prediction: null,
};

function loadPredictionReducer(state = defLoadPredictionState, action) {
  switch (action.type) {
    case MODEL_LOADED:
      return {
        ...state,
        prediction: null,
      };
    case LOAD_PREDICTION:
      return {
        ...state,
        prediction: action.prediction,
      };
    default:
      return state;
  }
}

const housePricesClientApp = combineReducers({
  datasetReducer,
  loadReducer,
  formReducer,
  loadPredictionReducer,
});

export default housePricesClientApp;