const jp = {
  lp: {
    message: '無料で、アルバイトの勤怠を管理',
    startNow: '今すぐはじめる',
    home: 'ホーム',
    blog: '開発ブログ',
    legal: '利用規約',
    privacyPolicy: 'プライバシーポリシー',
  },

  common: {
    or: 'または',
    cancel: 'キャンセル',
    reset: 'リセット',
    save: '保存',
    search: '検索',
    edit: '編集',
    remove: '削除',
    new: '新規',
    export: 'エクセル出力',
    noDataToExport: 'データなし',
    import: 'エクセル登録',
    discard: '捨てる',
    yes: 'はい',
    no: 'いいえ',
    pause: 'Pause',
    areYouSure: 'よいでしょうか？',
    view: '見る',
    destroy: '削除',
    mustSelectARow: '行を選択してください',
    start: 'from',
    end: 'to',
  },

  app: {
    title: ' ',
  },

  entities: {
    staff: {
      name: '従業員',
      description: '従業員を管理します',
      label: '従業員',
      menu: '従業員',
      exporterFileName: 'staff_export',
      list: {
        menu: '従業員',
        title: '従業員',
      },
      create: {
        success: '保存しました。',
      },
      update: {
        success: '保存しました。',
      },
      destroy: {
        success: '保存しました。',
      },
      destroyAll: {
        success: '保存しました。',
      },
      edit: {
        title: '従業員を編集します',
      },
      fields: {
        id: 'Id',
        'user': 'ユーザ',
        'photo': '写真',
        'name': '名前',
        'unitPrice': '時間給',
        'phoneNumber': '電話番号',
        'emailAddress': 'メールアドレス',
        'address': '住所',
        'note': 'メモ',
        createdAt: '作成日時',
        updatedAt: '更新日時',
        createdAtRange: '作成日時',
      },
      enumerators: {},
      new: {
        title: '従業員作成',
      },
      view: {
        title: '従業員詳細',
      },
      importer: {
        title: '従業員作成',
        fileName: 'staff_import_template',
        hint:
          'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    shift: {
      name: '従業員',
      description: '従業員を管理します',
      label: '従業員',
      menu: 'シフト',
      exporterFileName: 'staff_export',
      list: {
        menu: '従業員',
        title: '従業員',
      },
      create: {
        success: '保存しました。',
      },
      update: {
        success: '保存しました。',
      },
      destroy: {
        success: '保存しました。',
      },
      destroyAll: {
        success: '保存しました。',
      },
      edit: {
        title: '従業員を編集します',
      },
      fields: {
        id: 'Id',
        'user': 'ユーザ',
        'photo': '写真',
        'name': '名前',
        'unitPrice': '時間給',
        'phoneNumber': '電話番号',
        'emailAddress': 'メールアドレス',
        'address': '住所',
        'note': 'メモ',
        createdAt: '作成日時',
        updatedAt: '更新日時',
        createdAtRange: '作成日時',
      },
      enumerators: {},
      new: {
        title: '従業員作成',
      },
      view: {
        title: '従業員詳細',
      },
      importer: {
        title: '従業員作成',
        fileName: 'staff_import_template',
        hint:
          'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    record: {
      name: '履歴',
      description: '履歴を管理します',
      label: '履歴',
      menu: '履歴',
      exporterFileName: 'record_export',
      list: {
        menu: '履歴',
        title: '履歴',
      },
      create: {
        success: '保存しました',
      },
      update: {
        success: '保存しました',
      },
      destroy: {
        success: '保存しました',
      },
      destroyAll: {
        success: '保存しました',
      },
      edit: {
        title: '編集する',
      },
      fields: {
        id: 'Id',
        'user': 'ユーザ',
        'staff': '従業員',
        'startDateTimeRange': '開始時間',
        'startDateTime': '開始時間',
        'endDateTimeRange': '終了時間',
        'endDateTime': '終了時間',
        'unitPrice': '時間単価',
        'note': 'メモ',
        createdAt: '作成時間',
        updatedAt: '更新時間',
        createdAtRange: '作成時間',
      },
      enumerators: {},
      new: {
        title: '新規履歴',
      },
      view: {
        title: '履歴詳細',
      },
      importer: {
        title: 'Import Records',
        fileName: 'record_import_template',
        hint:
          'Files/Images columns must be the URLs of the files separated by space.',
      },
    },
  },

  auth: {
    profile: {
      title: 'プロフィール編集',
      success: '保存しました。',
    },
    createAnAccount: 'アカウントを作成する',
    rememberMe: '記録する',
    forgotPassword: 'パスワードを忘れた',
    signin: 'サインイン',
    signup: '登録',
    signout: 'サインアウト',
    alreadyHaveAnAccount:
      'サインインする',
    signinWithAnotherAccount:
      'サインインする',
    emailUnverified: {
      message: `メールを確認してください <strong>{0}</strong>`,
      submit: `メールを再送信する`,
    },
    emptyPermissions: {
      message: `アカウントがまだ承認されていません。承認されるまでお待ち下さい。`,
    },
    passwordResetEmail: {
      message: 'パスワード再設定のメールを送信する',
      error: `メールが正しくありません。`,
    },
    passwordReset: {
      message: 'パスワード再設定',
    },
    emailAddressVerificationEmail: {
      error: `メールが正しくありません。`,
    },
    verificationEmailSuccess: `メールを送信しました。`,
    passwordResetEmailSuccess: `メールを送信しました`,
    passwordResetSuccess: `パスワードを変更しました`,
    verifyEmail: {
      success: 'メールを確認しました',
      message:
        'メールを確認しています',
    },
  },

  roles: {
    owner: {
      label: 'Owner',
      description: 'Full access to all resources',
    },
    editor: {
      label: 'Editor',
      description: 'Edit access to all resources',
    },
    viewer: {
      label: 'Viewer',
      description: 'View access to all resources',
    },
    auditLogViewer: {
      label: 'Audit Log Viewer',
      description: 'Access to view audit logs',
    },
    iamSecurityReviewer: {
      label: 'Security Reviewer',
      description: `Full access to manage users roles`,
    },
    entityEditor: {
      label: 'Entity Editor',
      description: 'Edit access to all entities',
    },
    entityViewer: {
      label: 'Entity Viewer',
      description: 'View access to all entities',
    },
    staffEditor: {
      label: 'Staff Editor',
      description: 'Edit access to Staff',
    },
    staffViewer: {
      label: 'Staff Viewer',
      description: 'View access to Staff',
    },
    recordEditor: {
      label: 'Record Editor',
      description: 'Edit access to Records',
    },
    recordViewer: {
      label: 'Record Viewer',
      description: 'View access to Records',
    },
  },

  iam: {
    title: 'Identity and Access Management',
    menu: 'IAM',
    disable: 'Disable',
    disabled: 'Disabled',
    enabled: 'Enabled',
    enable: 'Enable',
    doEnableSuccess: 'User enabled successfully',
    doDisableSuccess: 'User disabled successfully',
    doDisableAllSuccess: 'User(s) disabled successfully',
    doEnableAllSuccess: 'User(s) enabled successfully',
    doAddSuccess: 'User(s) saved successfully',
    doUpdateSuccess: 'User saved successfully',
    viewBy: 'View By',
    users: {
      name: 'users',
      label: 'Users',
      exporterFileName: 'users_export',
      doRemoveAllSelectedSuccess:
        'Permissions removed successfully',
    },
    roles: {
      label: 'Roles',
      doRemoveAllSelectedSuccess:
        'Permissions removed successfully',
    },
    edit: {
      title: 'Edit User',
    },
    new: {
      title: 'New User(s)',
      titleModal: 'New User',
      emailsHint:
        'Separate multiple email addresses using the comma character.',
    },
    view: {
      title: 'View User',
      activity: 'Activity',
    },
    importer: {
      title: 'Import Users',
      fileName: 'users_import_template',
      hint:
        'Files/Images columns must be the URLs of the files separated by space. Relationships must be the ID of the referenced records separated by space. Roles must be the role ids separated by space.',
    },
    errors: {
      userAlreadyExists:
        'User with this email already exists',
      userNotFound: 'User not found',
      disablingHimself: `You can't disable yourself`,
      revokingOwnPermission: `You can't revoke your own owner permission`,
    },
  },

  user: {
    fields: {
      id: 'Id',
      authenticationUid: 'Authentication Uid',
      avatars: 'Avatar',
      email: 'Email',
      emails: 'Email(s)',
      fullName: 'Name',
      firstName: 'First Name',
      lastName: 'Last Name',
      status: 'Status',
      disabled: 'Disabled',
      phoneNumber: 'Phone Number',
      role: 'Role',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
      roleUser: 'Role/User',
      roles: 'Roles',
      createdAtRange: 'Created at',
      password: 'Password',
      rememberMe: '記憶する',
    },
    enabled: 'Enabled',
    disabled: 'Disabled',
    validations: {
      // eslint-disable-next-line
      email: 'Email ${value} is invalid',
    },
  },

  auditLog: {
    menu: 'Audit Logs',
    title: 'Audit Logs',
    exporterFileName: 'audit_log_export',
    entityNamesHint:
      'Separate multiple entities using the comma character.',
    fields: {
      id: 'Id',
      timestampRange: 'Period',
      entityName: 'Entity',
      entityNames: 'Entities',
      entityId: 'Entity ID',
      action: 'Action',
      values: 'Values',
      timestamp: 'Date',
      createdByEmail: 'User Email',
    },
  },
  settings: {
    title: 'Settings',
    menu: 'Settings',
    save: {
      success:
        'Settings saved successfully. The page will reload in {0} seconds for changes to take effect.',
    },
    fields: {
      primary: 'Primary Color',
      secondary: 'Secondary Color',
      shade: 'Shade',
    },
  },
  home: {
    menu: 'ホーム',
    message: `This page uses fake data for demonstration purposes only. You can edit it at frontend/view/home/HomePage.js.`,
    charts: {
      day: 'Day',
      red: 'Red',
      green: 'Green',
      yellow: 'Yellow',
      grey: 'Grey',
      blue: 'Blue',
      orange: 'Orange',
      months: {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
      },
      eating: 'Eating',
      drinking: 'Drinking',
      sleeping: 'Sleeping',
      designing: 'Designing',
      coding: 'Coding',
      cycling: 'Cycling',
      running: 'Running',
      customer: 'Customer',
    },
  },
  attendance: {
    menu: '記録',
    description: '勤怠を記録します',
    start: '記録を開始する',
    end: '記録を終了する',
    name: '名前',
    record: '記録する',
    noRecord: '記録なし',
    undo: '１つ前の記録を元に戻す',
    startTime: '開始時間',
    endTime: '終了時間',
  },
  errors: {
    backToHome: 'Back to home',
    403: `Sorry, you don't have access to this page`,
    404: 'Sorry, the page you visited does not exist',
    500: 'Sorry, the server is reporting an error',
    forbidden: {
      message: 'Forbidden',
    },
    validation: {
      message: 'An error occurred',
    },
    defaultErrorMessage: 'Ops, an error occurred',
  },
  // See https://github.com/jquense/yup#using-a-custom-locale-dictionary
  /* eslint-disable */
  validation: {
    mixed: {
      default: '${path} が正しくありません',
      required: '${path} は必須です',
      oneOf:
        '${path} must be one of the following values: ${values}',
      notOneOf:
        '${path} must not be one of the following values: ${values}',
      notType: ({path, type, value, originalValue}) => {
        return `${path} must be a ${type}`;
      },
    },
    string: {
      length:
        '${path} must be exactly ${length} characters',
      min: '${path} must be at least ${min} characters',
      max: '${path} must be at most ${max} characters',
      matches:
        '${path} must match the following: "${regex}"',
      email: '${path} must be a valid email',
      url: '${path} must be a valid URL',
      trim: '${path} must be a trimmed string',
      lowercase: '${path} must be a lowercase string',
      uppercase: '${path} must be a upper case string',
      selected: '${path} must be selected',
    },
    number: {
      min:
        '${path} must be greater than or equal to ${min}',
      max: '${path} must be less than or equal to ${max}',
      lessThan: '${path} must be less than ${less}',
      moreThan: '${path} must be greater than ${more}',
      notEqual: '${path} must be not equal to ${notEqual}',
      positive: '${path} must be a positive number',
      negative: '${path} must be a negative number',
      integer: '${path} must be an integer',
    },
    date: {
      min: '${path} field must be later than ${min}',
      max: '${path} field must be at earlier than ${max}',
    },
    boolean: {},
    object: {
      noUnknown:
        '${path} field cannot have keys not specified in the object shape',
    },
    array: {
      min: '${path} field must have at least ${min} items',
      max:
        '${path} field must have less than or equal to ${max} items',
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: 'Upload',
    image: 'You must upload an image',
    size: 'File is too big. Max allowed size is {0}',
    formats: `Invalid format. Must be '{0}'.`,
  },
  importer: {
    line: 'Line',
    status: 'Status',
    pending: 'Pending',
    imported: 'Imported',
    error: 'Error',
    total: `{0} imported, {1} pending and {2} with error`,
    importedMessage: `Processed {0} of {1}.`,
    noNavigateAwayMessage:
      'Do not navigate away from this page or import will be stopped.',
    completed: {
      success:
        'Import completed. All rows were successfully imported.',
      someErrors:
        'Processing completed, but some rows were unable to be imported.',
      allErrors: 'Import failed. There are no valid rows.',
    },
    form: {
      downloadTemplate: 'Download the template',
      hint:
        'Click or drag the file to this area to continue',
    },
    list: {
      discardConfirm:
        'Are you sure? Non-imported data will be lost.',
    },
    errors: {
      invalidFileEmpty: 'The file is empty',
      invalidFileExcel:
        'Only excel (.xlsx) files are allowed',
      invalidFileUpload:
        'Invalid file. Make sure you are using the last version of the template.',
      importHashRequired: 'Import hash is required',
      importHashExistent: 'Data has already been imported',
    },
  },

  autocomplete: {
    loading: 'Loading...',
    noOptions: 'No data found',
  },

  imagesViewer: {
    noImage: 'No image',
  },

  table: {
    noData: 'データはありません',
    loading: 'Loading...',
  },

  pagination: {
    labelDisplayedRows: '{0}-{1} of {2}',
    labelRowsPerPage: 'Per page:',
  },
};

export default jp;
