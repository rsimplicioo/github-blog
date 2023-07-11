import { useCallback, useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ExternalLink } from "../../../../components/ExternalLink";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { faBuilding, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { ProfileContainer, ProfileDetails, ProfilePicture } from "./styles";
import { api } from "../../../../lib/axios";
import { Spinner } from "../../../../components/Spinner";

interface ProfileData {
  login: string;
  bio: string;
  avatar_url: string;
  html_url: string;
  name: string;
  company?: string;
  followers?: number;
}

const username = import.meta.env.VITE_GITHUB_USERNAME;

export function Profile() {
  const [profileData, setProfileData] = useState<ProfileData>(
    {} as ProfileData
  );
  const [isLoading, setIsLoading] = useState(true);

  const getProfileData = useCallback(
    async (query: string = "") => {
      try {
        const response = await api.get(`/users/${username}`);

        setProfileData(response.data);
      } finally {
        setIsLoading(false);
      }
    },
    [profileData]
  );

  useEffect(() => {
    getProfileData();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ProfileContainer>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ProfilePicture src={profileData.avatar_url} />

          <ProfileDetails>
            <header>
              <h1>{profileData.name}</h1>

              <ExternalLink
                text="github"
                href={profileData.html_url}
                target="_blank"
              />
            </header>
            <p>{profileData.bio}</p>
            <ul>
              <li>
                <FontAwesomeIcon icon={faGithub} />
                {profileData.login}
              </li>
              {profileData?.company && (
                <li>
                  <FontAwesomeIcon icon={faBuilding} />
                  {profileData.company}
                </li>
              )}
              <li>
                <FontAwesomeIcon icon={faUserGroup} />
                {profileData.followers} seguidores
              </li>
            </ul>
          </ProfileDetails>
        </>
      )}
    </ProfileContainer>
  );
}
