export const  calculateMatchPercent = (gitHubData: any, benchmark: any): number => {
    const weightCommits = 0.6;
    const weightPRs = 0.2;
    const weightIssues = 0.2;

    const commitScore = gitHubData.totalCommits >= benchmark.totalCommits 
        ? 100 
        : (gitHubData.totalCommits / benchmark.totalCommits) * 100;

    const prScore = gitHubData.totalPRs >= benchmark.totalPRs 
        ? 100 
        : (gitHubData.totalPRs / benchmark.totalPRs) * 100;

    const issueScore = gitHubData.totalIssues >= benchmark.totalIssues 
        ? 100 
        : (gitHubData.totalIssues / benchmark.totalIssues) * 100;

    const matchPercent = 
        (commitScore * weightCommits) +
        (prScore * weightPRs) +
        (issueScore * weightIssues);

    return Math.round(matchPercent);
};
