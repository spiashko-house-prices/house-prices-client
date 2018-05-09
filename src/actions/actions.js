export const MODEL_LOADING = 'MODEL_LOADING';
export const MODEL_LOADED = 'MODEL_LOADED';
export const CHANGE_FEATURE_VALUE = 'CHANGE_FEATURE_VALUE';
export const LOAD_PREDICTION = 'LOAD_PREDICTION';
export const CHANGE_DATASET = 'CHANGE_DATASET';

export function loadModel(model) {
  return {type: MODEL_LOADED, model};
}

export function loadingModel() {
  return {type: MODEL_LOADING};
}

export function changeFeatureValue(featureName, value) {
  return {type: CHANGE_FEATURE_VALUE, featureName, value};
}

export function loadPrediction(prediction) {
  return {type: LOAD_PREDICTION, prediction};
}

export function changeDataset(datasetName) {
  return {type: CHANGE_DATASET, datasetName};
}