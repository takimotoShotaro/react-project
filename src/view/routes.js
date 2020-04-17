import Permissions from 'security/permissions';
import { i18n } from 'i18n';
import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import HistoryIcon from '@material-ui/icons/History';
import Edit from "@material-ui/icons/Edit";
import SettingsIcon from '@material-ui/icons/Settings';
import People from "@material-ui/icons/People";
import EventNote from "@material-ui/icons/EventNote";

const permissions = Permissions.values;

const privateRoutes = [
  {
    path: '/home',
    icon: <HomeIcon />,
    label: i18n('home.menu'),
    menu: {
      exact: true,
    },
    loader: () => import('view/home/HomePage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/profile',
    loader: () => import('view/auth/ProfileFormPage'),
    permissionRequired: null,
    exact: true,
    menu: false,
  },

  {
    path: '/iam',
    loader: () => import('view/iam/list/IamPage'),
    permissionRequired: permissions.iamRead,
    exact: true,
    icon: <PersonAddIcon />,
    label: i18n('iam.menu'),
    menu: true,
  },
  {
    path: '/iam/new',
    loader: () => import('view/iam/new/IamNewPage'),
    menu: false,
    permissionRequired: permissions.iamCreate,
    exact: true,
  },
  {
    path: '/iam/importer',
    loader: () =>
      import('view/iam/importer/IamImporterPage'),
    menu: false,
    permissionRequired: permissions.iamImport,
    exact: true,
  },
  {
    path: '/iam/:id/edit',
    loader: () => import('view/iam/edit/IamEditPage'),
    menu: false,
    permissionRequired: permissions.iamEdit,
    exact: true,
  },
  {
    path: '/iam/:id',
    loader: () => import('view/iam/view/IamViewPage'),
    menu: false,
    permissionRequired: permissions.iamRead,
    exact: true,
  },

  {
    path: '/audit-logs',
    icon: <HistoryIcon />,
    label: i18n('auditLog.menu'),
    loader: () => import('view/auditLog/AuditLogPage'),
    menu: true,
    permissionRequired: permissions.auditLogRead,
  },

  {
    path: '/settings',
    icon: <SettingsIcon />,
    label: i18n('settings.menu'),
    loader: () => import('view/settings/SettingsFormPage'),
    permissionRequired: permissions.settingsEdit,
    menu: true,
  },

  {
    path: '/attendance',
    icon: <Edit />,
    label: i18n('attendance.menu'),
    menu: {
      exact: true,
    },
    loader: () => import('view/attendance/AttendanceViewPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/shift',
    icon: <EventNote />,
    label: 'シフト',
    menu: {
      exact: true,
    },
    loader: () => import('view/shift/ShiftPage'),
    permissionRequired: null,
    exact: true,
  },

  {
    path: '/staff',
    loader: () => import('view/staff/list/StaffListPage'),
    permissionRequired: permissions.staffRead,
    exact: true,
    icon: <People />,
    label: i18n('entities.staff.menu'),
    menu: true,
  },
  {
    path: '/staff/new',
    loader: () => import('view/staff/form/StaffFormPage'),
    menu: false,
    permissionRequired: permissions.staffCreate,
    exact: true,
  },
  {
    path: '/staff/importer',
    loader: () =>
      import('view/staff/importer/StaffImporterPage'),
    menu: false,
    permissionRequired: permissions.staffImport,
    exact: true,
  },
  {
    path: '/staff/:id/edit',
    loader: () => import('view/staff/form/StaffFormPage'),
    menu: false,
    permissionRequired: permissions.staffEdit,
    exact: true,
  },
  {
    path: '/staff/:id',
    loader: () => import('view/staff/view/StaffViewPage'),
    menu: false,
    permissionRequired: permissions.staffRead,
    exact: true,
  },

  {
    path: '/record',
    loader: () => import('view/record/list/RecordListPage'),
    permissionRequired: permissions.recordRead,
    exact: true,
    icon: <HistoryIcon />,
    label: i18n('entities.record.menu'),
    menu: true,
  },
  {
    path: '/record/new',
    loader: () => import('view/record/form/RecordFormPage'),
    menu: false,
    permissionRequired: permissions.recordCreate,
    exact: true,
  },
  {
    path: '/record/importer',
    loader: () =>
      import('view/record/importer/RecordImporterPage'),
    menu: false,
    permissionRequired: permissions.recordImport,
    exact: true,
  },
  {
    path: '/record/:id/edit',
    loader: () => import('view/record/form/RecordFormPage'),
    menu: false,
    permissionRequired: permissions.recordEdit,
    exact: true,
  },
  {
    path: '/record/:id',
    loader: () => import('view/record/view/RecordViewPage'),
    menu: false,
    permissionRequired: permissions.recordRead,
    exact: true,
  },
];

const publicRoutes = [
  {
    path: '/',
    loader: () => import('view/lp/HomePage'),
  },
  {
    path: '/legal',
    loader: () => import('view/lp/LegalPage'),
  },
  {
    path: '/privacy_policy',
    loader: () => import('view/lp/PrivacyPolicyPage'),
  },
  {
    path: '/auth/signin',
    loader: () => import('view/auth/SigninPage'),
  },
  {
    path: '/auth/signup',
    loader: () => import('view/auth/SignupPage'),
  },
  {
    path: '/auth/forgot-password',
    loader: () => import('view/auth/ForgotPasswordPage'),
  },
];

const emptyPermissionsRoutes = [
  {
    path: '/auth/empty-permissions',
    loader: () => import('view/auth/EmptyPermissionsPage'),
  },
];

const emailUnverifiedRoutes = [
  {
    path: '/auth/email-unverified',
    loader: () => import('view/auth/EmailUnverifiedPage'),
  },
];

const simpleRoutes = [
  {
    path: '/auth/password-reset',
    loader: () => import('view/auth/PasswordResetPage'),
  },
  {
    path: '/auth/verify-email',
    loader: () => import('view/auth/VerifyEmailPage'),
  },
  {
    path: '/403',
    loader: () => import('view/shared/errors/Error403Page'),
  },
  {
    path: '/500',
    loader: () => import('view/shared/errors/Error500Page'),
  },
  {
    path: '**',
    loader: () => import('view/shared/errors/Error404Page'),
  },
];

export default {
  privateRoutes,
  publicRoutes,
  emptyPermissionsRoutes,
  emailUnverifiedRoutes,
  simpleRoutes,
};
