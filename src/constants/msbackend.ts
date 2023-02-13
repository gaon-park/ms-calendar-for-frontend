const GET_OAUTH2_GOOGLE = "/api/oauth2/google" as const;
const POST_REISSUE_TOKEN = "/api/reissue/token" as const;
const LOGOUT = "/api/logout" as const;

const GET_SEARCH_USER = "/api/search/user" as const;
const GET_SEARCH_SCHEDULE = "/api/search/schedule" as const;

const GET_USER_FRIEND = "/api/user/friend" as const;

const POST_FRIEND_REQUEST = "/api/user/friend" as const;
const PUT_FRIEND_DELETE = "/api/user/friend/delete" as const;
const PUT_FRIEND_ACCEPT = "/api/user/friend/accept" as const;
const PUT_FRIEND_REFUSE = "/api/user/friend/refuse" as const;

const GET_USER_PROFILE = "/api/user/profile" as const;
const PUT_USER_PROFILE = "/api/user/profile" as const;
const DELETE_ACCOUNT = "/api/user" as const;

const GET_SCHEDULE = "/api/schedule" as const;
const PUT_SCHEDULE = "/api/schedule" as const;
const POST_SCHEDULE = "/api/schedule" as const;

export const MS_BACKEND_API_PATH = {
  GET_OAUTH2_GOOGLE,
  POST_REISSUE_TOKEN,
  LOGOUT,
  GET_SEARCH_USER,
  GET_SEARCH_SCHEDULE,
  GET_USER_FRIEND,
  POST_FRIEND_REQUEST,
  PUT_FRIEND_DELETE,
  PUT_FRIEND_ACCEPT,
  PUT_FRIEND_REFUSE,
  GET_USER_PROFILE,
  PUT_USER_PROFILE,
  DELETE_ACCOUNT,
  GET_SCHEDULE,
  PUT_SCHEDULE,
  POST_SCHEDULE,
};
