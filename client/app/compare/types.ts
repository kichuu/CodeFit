export interface Candidate {
    _id: string
    username: string
    name: string
    avatar: string
    bio: string
    location: string
    joinedGithub: string
    topLanguages: string[]
    totalCommits: number
    totalPRs: number
    totalIssues: number
    commitQualityScore: number
    openSourceContributed: string
    totalRepos: number
    codeReviewThoroughness: string
  }
  

  export interface CompareSelectorProps {
    onCompare: (candidates: Candidate[]) => void
  }