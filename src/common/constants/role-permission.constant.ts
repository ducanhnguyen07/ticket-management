import { RoleConstant } from './role.constant';

const RolePermission = {
  [RoleConstant.USER]: [
    // user
    "user_read",
    "user_create",
    "user_update",
    "user_delete",

    // ticket
    "ticket_read",
    "ticket_create",
    "ticket_update",
    "ticket_delete",
  ],

  [RoleConstant.ADMIN]: [
    // user
    "user_read",
    "user_create",
    "user_update",
    "user_delete",

    // ticket
    "ticket_read",
    "ticket_create",
    "ticket_update",
    "ticket_delete",
  ],
};

export default RolePermission;
