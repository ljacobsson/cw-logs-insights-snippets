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
    let metadata;
    try {
        const str = Buffer.from((metadataResponse.data as any).content, 'base64')
            .toString('utf8')
            .replace(/[^:]\/\/.*/g, '');
        console.log(str);
        metadata = JSON.parse(str);
    } catch (e) {
        console.log(e);
        metadata = {
            title: event.name.replace(/-/g, ' '),
        };
    }

    return { snippet, metadata };
};
