import axios from "axios";

const GITHUB_API_URL = "https://api.github.com/users";

export const fetchGitHubProfile = async (username: string) => {
  try {
    const { data } = await axios.get(`${GITHUB_API_URL}/${username}`);
    return {
      username: data.login,
      name: data.name,
      avatar: data.avatar_url,
      bio: data.bio,
      location: data.location,
      joinedGithub: data.created_at,
    };
  } catch (error) {
    throw new Error("Error fetching GitHub profile");
  }
};

export const fetchTopLanguages = async (username: string) => {
  try {
    const { data: repos } = await axios.get(`${GITHUB_API_URL}/${username}/repos`);
    
    const languageCount: Record<string, number> = {};

    for (const repo of repos) {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
      }
    }

    const sortedLanguages = Object.keys(languageCount).sort((a, b) => languageCount[b] - languageCount[a]);
    return sortedLanguages.slice(0, 3);
  } catch (error) {
    throw new Error("Error fetching top languages");
  }
};
