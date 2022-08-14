import CloudWatchLogs from 'aws-sdk/clients/cloudwatchlogs';
import { DynamoDBStreamEvent } from 'aws-lambda';
const cloudwatchlogs = new CloudWatchLogs();
export const handler = async (event: DynamoDBStreamEvent): Promise<void> => {
    for (const record of event.Records) {
        if (record.eventName === 'REMOVE') {
            {
                await cloudwatchlogs
                    .deleteQueryDefinition({
                        queryDefinitionId: record.dynamodb?.OldImage?.QueryId.S || '',
                    })
                    .promise();
            }
        }
    }
};
