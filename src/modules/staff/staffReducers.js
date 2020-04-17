import list from 'modules/staff/list/staffListReducers';
import form from 'modules/staff/form/staffFormReducers';
import view from 'modules/staff/view/staffViewReducers';
import destroy from 'modules/staff/destroy/staffDestroyReducers';
import importerReducer from 'modules/staff/importer/staffImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
