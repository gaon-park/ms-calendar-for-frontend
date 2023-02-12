import { useEffect, useState } from "react";
import useSWR from "swr";
import { GetUserProfile } from "src/common/api/msBackend/user/profile";
import { AuthCookie } from "src/common/cookie/cookies";
import { MS_BACKEND_API_PATH } from "src/constants/msbackend";
import { IProfileResponse } from "src/model/user/profile";

export const useProfile = () => {
  const [profile, setProfile] = useState<IProfileResponse>();
  const option = {
    revalidateIfStale: false,
    revalidateOnFocus: true,
    revalidateOnReconnect: true
  }
  const { data, error } = useSWR(
    (new AuthCookie().backendAccessCookie.getToken()) ? {} : null,
    GetUserProfile,
    option
  );

  useEffect(() => {
    if (error) return;
    const profile = data?.data;
    if (!profile) return;
    if (data.config.url !== MS_BACKEND_API_PATH.GET_USER_PROFILE) return;
    setProfile(profile);
  }, [data, error]);

  return {
    profile,
  };
};
