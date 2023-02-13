export default [
    {
        status: 'FRIEND',
        profile_friend_overview_str: 'FRIEND',
        profile_friend_request_str: 'DELETE FRIEND',
        profile_friend_request_icon: 'mdi:account-minus-outline'
    },
    {
        status: 'WAITING_MY_RESPONSE',
        profile_friend_overview_str: 'WAITING_MY_RESPONSE',
        profile_friend_request_str: 'ACCEPT FRIEND',
        profile_friend_request_icon: 'mdi:account-plus-outline'
    },
    {
        status: 'WAITING_OPP_RESPONSE',
        profile_friend_overview_str: 'WAITING_OPP_RESPONSE',
        profile_friend_request_str: 'CANCEL REQUEST',
        profile_friend_request_icon: 'mdi:account-minus-outline'
    },
    {
        status: '',
        profile_friend_overview_str: '',
        profile_friend_request_str: 'SEND REQUEST',
        profile_friend_request_icon: 'mdi:account-plus-outline'
    }
]
