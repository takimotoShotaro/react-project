import Roles from 'security/roles';
const roles = Roles.values;

class Permissions {
  static get values() {
    return {
      iamEdit: {
        id: 'iamEdit',
        allowedRoles: [
          roles.owner,
          roles.iamSecurityReviewer,
          roles.editor,
        ],
        allowedStorageFolders: ['user'],
      },
      iamCreate: {
        id: 'iamCreate',
        allowedRoles: [
          roles.owner,
          roles.iamSecurityReviewer,
          roles.editor,
        ],
      },
      iamImport: {
        id: 'iamImport',
        allowedRoles: [
          roles.owner,
          roles.iamSecurityReviewer,
          roles.editor,
        ],
      },
      iamRead: {
        id: 'iamRead',
        allowedRoles: [
          roles.owner,
          roles.iamSecurityReviewer,
          roles.editor,
          roles.viewer,
        ],
      },
      iamUserAutocomplete: {
        id: 'iamUserAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,

          roles.staffEditor,
          roles.staffViewer,
          roles.recordEditor,
          roles.recordViewer,
        ],
      },
      auditLogRead: {
        id: 'auditLogRead',
        allowedRoles: [roles.owner, roles.auditLogViewer, roles.viewer],
      },
      settingsEdit: {
        id: 'settingsEdit',
        allowedRoles: [roles.owner],
      },
      staffImport: {
        id: 'staffImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          // roles.entityEditor,
          roles.staffEditor,
        ],
      },
      staffCreate: {
        id: 'staffCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.staffEditor,
        ],
        allowedStorageFolders: ['staff'],
      },
      staffEdit: {
        id: 'staffEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.staffEditor,
        ],
        allowedStorageFolders: ['staff'],
      },
      staffDestroy: {
        id: 'staffDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.staffEditor,
        ],
        allowedStorageFolders: ['staff'],
      },
      staffRead: {
        id: 'staffRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.staffEditor,
          roles.staffViewer,
        ],
      },
      staffAutocomplete: {
        id: 'staffAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.staffEditor,
          roles.staffViewer,
          roles.recordEditor,
          roles.recordViewer,
        ],
      },

      recordImport: {
        id: 'recordImport',
        allowedRoles: [
          roles.owner,
          roles.editor,
          // roles.entityEditor,
          roles.recordEditor,
        ],
      },
      recordCreate: {
        id: 'recordCreate',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.recordEditor,
        ],
        allowedStorageFolders: ['record'],
      },
      recordEdit: {
        id: 'recordEdit',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.recordEditor,
        ],
        allowedStorageFolders: ['record'],
      },
      recordDestroy: {
        id: 'recordDestroy',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.entityEditor,
          roles.recordEditor,
        ],
        allowedStorageFolders: ['record'],
      },
      recordRead: {
        id: 'recordRead',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.recordEditor,
          roles.recordViewer,
        ],
      },
      recordAutocomplete: {
        id: 'recordAutocomplete',
        allowedRoles: [
          roles.owner,
          roles.editor,
          roles.viewer,
          roles.entityEditor,
          roles.recordEditor,
          roles.recordViewer,

        ],
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

export default Permissions;
