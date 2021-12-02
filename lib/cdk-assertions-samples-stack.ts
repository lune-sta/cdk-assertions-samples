import { Construct }  from 'constructs'
import { Stack, StackProps, RemovalPolicy,
  aws_lambda_nodejs as lambda,
  aws_apigateway as apigateway,
  aws_dynamodb as dynamodb } from 'aws-cdk-lib'

export class CdkAssertionsSamplesStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props)

    const db = new dynamodb.Table(this, 'Table', {
      partitionKey: {
        name: 'itemId',
        type: dynamodb.AttributeType.STRING,
      },
      tableName: 'items',
      removalPolicy: RemovalPolicy.DESTROY,
    })

    const backend = new lambda.NodejsFunction(this, 'Function', {
      entry: './lambda/index.ts',
    })

    db.grantReadWriteData(backend)

    new apigateway.LambdaRestApi(this, 'Api', {
      handler: backend
    })
  }
}
