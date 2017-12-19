const ROUTES = {
  ROOT: '/',

  // API

  SAVE_USER: '/api/save_user',
  PUT_RANDOM_USERS: '/api/put_random_users',
  GET_USERS: '/api/get_users',
  DELETE_USERS: '/api/delete_users',
  DELETE_USER: '/api/delete_user',

  // Router

  USERS_PAGE: '/users/:page',

  get USER_PAGE() {
    return `${this.USERS_PAGE}/:id`;
  },

  get USER_PAGE_EDIT() {
    return `${this.USERS_PAGE}/:id/edit`;
  },
};

export { ROUTES };
