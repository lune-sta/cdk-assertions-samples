import { Template } from 'aws-cdk-lib/assertions'
import { App } from 'aws-cdk-lib'
import { CdkAssertionsSamplesStack } from '../lib/cdk-assertions-samples-stack'

test('Snapshot test', () => {
    const app = new App()
    const stack = new CdkAssertionsSamplesStack(app, 'CdkAssertionsSamplesStack', {})
    const template = Template.fromStack(stack)

    expect(template.toJSON()).toMatchSnapshot()
})