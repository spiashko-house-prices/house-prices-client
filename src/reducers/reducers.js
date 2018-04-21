import {combineReducers} from 'redux';
import {
  CHANGE_FEATURE_VALUE,
  LOAD_PREDICTION,
  MODEL_LOADED,
  MODEL_LOADING,
} from '../actions/actions';

const defLoadState = {
  model: {},
  status: 'empty',
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
  loadReducer,
  formReducer,
  loadPredictionReducer,
});

export default housePricesClientApp;