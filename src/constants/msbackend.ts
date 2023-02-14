const GET_OAUTH2_GOOGLE = "/api/oauth2/google" as const;
const POST_REISSUE_TOKEN = "/api/reissue/token" as const;
const LOGOUT = "/api/logout" as const;

const GET_SEARCH_USER = "/api/search/user" as const;
const GET_SEARCH_SCHEDULE = "/api/search/schedule" as const;

const GET_USER_FOLLOW = "/api/user/follow" as const;
const GET_USER_FOLLOWER = "/api/user/follower" as const;

const POST_FOLLOW_REQUEST = "/api/user/follow" as const;
const PUT_FOLLOW_CANCEL = "/api/user/follow/cancel" as const;
const PUT_FOLLOW_ACCEPT = "/api/user/follow/accept" as const;
const PUT_FOLLOWER_DELETE = "/api/user/follower/delete" as const;

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
  GET_USER_FOLLOW,
  GET_USER_FOLLOWER,

  POST_FOLLOW_REQUEST,
  PUT_FOLLOW_CANCEL,
  PUT_FOLLOW_ACCEPT,
  PUT_FOLLOWER_DELETE,
  GET_USER_PROFILE,
  PUT_USER_PROFILE,
  DELETE_ACCOUNT,
  GET_SCHEDULE,
  PUT_SCHEDULE,
  POST_SCHEDULE,
};
