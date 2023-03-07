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

const GET_DASHBOARD_FOR_ITEM_TABLE_PERSONAL = "/api/dashboard/personal/for-item" as const;

const GET_ITEM_FILTER_OPTIONS_FOR_SEARCH = "/api/dashboard/personal/item-options/for-search" as const;
const GET_ITEM_FILTER_OPTIONS = "/api/dashboard/personal/item-options" as const;
const GET_WHOLE_RECORD_DASHBOARD = "/api/dashboard/whole-record" as const;
const GET_WHOLE_RECORD_DASHBOARD_PERSONAL = "/api/dashboard/personal/whole-record" as const;

const GET_CUBE_OVERVIEW = "/api/dashboard/cube-overview" as const;
const GET_CUBE_OVERVIEW_PERSONAL = "/api/dashboard/personal/cube-overview" as const;

const GET_GRADE_UP_DASHBOARD_LEGENDARY = "/api/dashboard/grade-up/legendary" as const;
const GET_GRADE_UP_DASHBOARD_UNIQUE = "/api/dashboard/grade-up/unique" as const;
const GET_GRADE_UP_DASHBOARD_PERSONAL_LEGENDARY = "/api/dashboard/personal/grade-up/legendary" as const;
const GET_GRADE_UP_DASHBOARD_PERSONAL_UNIQUE = "/api/dashboard/personal/grade-up/unique" as const;

const GET_TOP_FIVE = "/api/dashboard/top-five" as const;
const GET_TOP_FIVE_PERSONAL = "/api/dashboard/personal/top-five" as const;

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

  GET_DASHBOARD_FOR_ITEM_TABLE_PERSONAL,

  GET_ITEM_FILTER_OPTIONS_FOR_SEARCH,
  GET_ITEM_FILTER_OPTIONS,
  GET_WHOLE_RECORD_DASHBOARD,
  GET_WHOLE_RECORD_DASHBOARD_PERSONAL,
  GET_CUBE_OVERVIEW,
  GET_CUBE_OVERVIEW_PERSONAL,

  GET_GRADE_UP_DASHBOARD_LEGENDARY,
  GET_GRADE_UP_DASHBOARD_UNIQUE,
  GET_GRADE_UP_DASHBOARD_PERSONAL_LEGENDARY,
  GET_GRADE_UP_DASHBOARD_PERSONAL_UNIQUE,

  GET_TOP_FIVE,
  GET_TOP_FIVE_PERSONAL,
};
