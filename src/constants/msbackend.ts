const GET_OAUTH2_GOOGLE = "/api/oauth2/google" as const;
const POST_REISSUE_TOKEN = "/api/reissue/token" as const;
const LOGOUT = "/api/logout" as const;

const GET_SEARCH_USER = "/api/search/user" as const;
const GET_SEARCH_USER_PROFILE = "/api/search/user/profile" as const;
const GET_SEARCH_SCHEDULE = "/api/search/schedule" as const;
const GET_SEARCH_USER_FOR_SCHEDULE_INVITE = "/api/search/schedule-invite-target" as const;

const GET_USER_FOLLOW = "/api/user/follow" as const;
const GET_USER_FOLLOWER = "/api/user/follower" as const;

const POST_FOLLOW_REQUEST = "/api/user/follow" as const;
const PUT_FOLLOW_CANCEL = "/api/user/follow/cancel" as const;
const PUT_FOLLOW_ACCEPT = "/api/user/follow/accept" as const;
const PUT_FOLLOWER_DELETE = "/api/user/follower/delete" as const;

const GET_USER_PROFILE = "/api/user/profile" as const;
const PUT_USER_PROFILE = "/api/user/profile" as const;
const DELETE_ACCOUNT = "/api/user" as const;

const POST_API_KEY = "/api/user/api-key" as const;
const GET_API_KEY = "/api/user/api-key" as const;

const GET_NOTIFICATIONS = "/api/user/notifications" as const;
const READ_ALL_NOTIFICATIONS = "/api/user/notifications/read-all" as const;
const READ_ONE_NOTIFICATION = "/api/user/notification/read" as const;

const GET_OTHER_SCHEDULE = "/api/schedule/other" as const;
const GET_SCHEDULE = "/api/schedule" as const;
const PUT_SCHEDULE = "/api/schedule" as const;
const POST_SCHEDULE = "/api/schedule" as const;
const PUT_API_SCHEDULE_REFUSE = "/api/schedule/refuse" as const;
const PUT_API_SCHEDULE_DELETE = "/api/schedule/delete" as const;
const PUT_API_SCHEDULE_ACCEPT = "/api/schedule/accept" as const;

export const MS_BACKEND_API_PATH = {
  GET_OAUTH2_GOOGLE,
  POST_REISSUE_TOKEN,
  LOGOUT,

  GET_SEARCH_USER,
  GET_SEARCH_USER_PROFILE,
  GET_SEARCH_SCHEDULE,
  GET_SEARCH_USER_FOR_SCHEDULE_INVITE,

  GET_USER_FOLLOW,
  GET_USER_FOLLOWER,

  POST_FOLLOW_REQUEST,
  PUT_FOLLOW_CANCEL,
  PUT_FOLLOW_ACCEPT,
  PUT_FOLLOWER_DELETE,

  GET_USER_PROFILE,
  PUT_USER_PROFILE,
  DELETE_ACCOUNT,

  POST_API_KEY,
  GET_API_KEY,

  GET_NOTIFICATIONS,
  READ_ALL_NOTIFICATIONS,
  READ_ONE_NOTIFICATION,

  GET_OTHER_SCHEDULE,
  GET_SCHEDULE,
  PUT_SCHEDULE,
  POST_SCHEDULE,
  PUT_API_SCHEDULE_REFUSE,
  PUT_API_SCHEDULE_DELETE,
  PUT_API_SCHEDULE_ACCEPT,
};
