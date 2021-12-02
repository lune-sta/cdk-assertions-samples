import { Template, Match, Capture } from 'aws-cdk-lib/assertions'
import { App } from 'aws-cdk-lib'
import { CdkAssertionsSamplesStack } from '../lib/cdk-assertions-samples-stack'

test('Fine grained', () => {
    const app = new App()
    const stack = new CdkAssertionsSamplesStack(app, 'CdkAssertionsSamplesStack', {})
    const template = Template.fromStack(stack)

    // Functionが1つ作られていることを確認する
    template.resourceCountIs('AWS::Lambda::Function', 1)

    // Resource Matching & Retrieval
    // Propertiesが正しいことを確認する
    template.hasResourceProperties('AWS::Lambda::Function', {
        'Handler': 'index.handler'
    })

    // Properties以外を確認したい場合はhasResource()を使う
    template.hasResource('AWS::DynamoDB::Table', {
        'UpdateReplacePolicy': 'Delete'
    })

    // 生成されるIAM Roleをすべて表示する
    console.log(template.findResources('AWS::IAM::Role'))

    // Match.objectLike は部分一致
    template.hasResourceProperties('AWS::DynamoDB::Table', {
        'ProvisionedThroughput': Match.objectLike({
            'ReadCapacityUnits': 5
        })
    })

    // Match.objectEquals は完全一致
    template.hasResourceProperties('AWS::DynamoDB::Table', {
        'ProvisionedThroughput': Match.objectEquals({
            'ReadCapacityUnits': 5,
            'WriteCapacityUnits': 5
        })
    })

    // 存在しないことを確認する
    template.hasResourceProperties('AWS::DynamoDB::Table', {
        'DummyKey': Match.absent()
    })

    // 存在することを確認する
    template.hasResourceProperties('AWS::DynamoDB::Table', {
        'TableName': Match.anyValue()
    })

    // 値をキャプチャーするにはCapture()を使う
    const capture = new Capture()
    template.hasResourceProperties('AWS::Lambda::Function', {
        Runtime: capture
    })
    console.log(capture.asString())
    // > nodejs14.x
})
