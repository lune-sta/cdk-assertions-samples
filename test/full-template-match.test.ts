import { Template } from 'aws-cdk-lib/assertions'
import { App } from 'aws-cdk-lib'
import { CdkAssertionsSamplesStack } from '../lib/cdk-assertions-samples-stack'

test('Full template match', () => {
    const app = new App();
    const stack = new CdkAssertionsSamplesStack(app, 'CdkAssertionsSamplesStack', {})
    const template = Template.fromStack(stack)

    const expected = {
        'Resources': {
            'TableCD117FA1': {
                'Type': 'AWS::DynamoDB::Table',
                'Properties': {
                    'KeySchema': [
                        {
                            'AttributeName': 'itemId',
                            'KeyType': 'HASH'
                        }
                    ],
                    'AttributeDefinitions': [
                        {
                            'AttributeName': 'itemId',
                            'AttributeType': 'S'
                        }
                    ]
                }
            }
        }
    }

    template.templateMatches(expected)
})
