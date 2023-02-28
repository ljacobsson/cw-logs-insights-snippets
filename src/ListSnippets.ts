import { Octokit } from '@octokit/rest';
const octokit = new Octokit();

export const handler = async (): Promise<any> => {
    const response = await octokit.repos.getContent({
        owner: 'aws-samples',
        repo: 'serverless-snippets',
        path: '',
    });

    const TWO_DAYS = 60 * 60 * 48;
    const secondsSinceEpoch = Math.round(Date.now() / 1000);
    const ttl = secondsSinceEpoch + 24 * TWO_DAYS;
    return {
        Items: (response.data as any[])
            .filter((p) => p.name.startsWith('cloudwatch-'))
            .map((p) => {
                return { name: p.name, ttl };
            }),
    };
};
