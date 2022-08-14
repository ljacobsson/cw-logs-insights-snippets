/* eslint-disable @typescript-eslint/no-explicit-any */
import { Octokit } from '@octokit/rest';
const octokit = new Octokit();

export const handler = async (event: any): Promise<any> => {
    console.log(event);
    const snippetResponse = await octokit.repos.getContent({
        owner: 'aws-samples',
        repo: 'serverless-snippets',
        path: `${event.name}/snippet.txt`,
    });
    const metadataResponse = await octokit.repos.getContent({
        owner: 'aws-samples',
        repo: 'serverless-snippets',
        path: `${event.name}/snippet-data.json`,
    });
    const snippet = Buffer.from((snippetResponse.data as any).content, 'base64').toString('utf8');
    const metadata = JSON.parse(Buffer.from((metadataResponse.data as any).content, 'base64').toString('utf8'));

    return { snippet, metadata };
};
