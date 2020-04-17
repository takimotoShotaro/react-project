import { createSelector } from 'reselect';
import authSelectors from "../../auth/authSelectors";
import PermissionChecker from "../../auth/permissionChecker";
import Permissions from 'security/permissions';

const selectRaw = (state) => state.record.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector(
  [selectRaw],
  (raw) => !!raw.loading,
);

const selectPermissionToIsOwner = createSelector(
  [authSelectors.selectCurrentUser],
  (currentUser) =>
    new PermissionChecker(currentUser).match(
      Permissions.values.iamEdit,
    ),
);

export default {
  selectLoading,
  selectRecord,
  selectRaw,
  selectPermissionToIsOwner
};
