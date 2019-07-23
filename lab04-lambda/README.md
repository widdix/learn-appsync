# Lab 04: Invoking a Lambda function

## Goal

Sometimes forwarding read and write requests to DynamoDB is not sufficient. This lab is about using AWS Lambda to execute your code.

## Instructions

Before you start, make sure your current working directory is `learn-appsync`.

Next, copy all files from `lab04-lambda/starting-point/`  to your working directory.

```
# MacOS / Linux
cp lab04-lambda/starting-point/starting-point/* .
```
### Create a Lambda function

To provide a list of all AWS services, you will implement a simple Lambda function. Open the file `index.js` which includes source code written in Node.js.

Add a few additional services to the `items` property of the return value.

* `cloudfront`
* `elasticache`
* `kms`

Next, you need to extend the CloudFormation template `appsync.yaml` to create a Lambda function. Use the Serverless Application Model (SAM) and fill in the required properties for the resource `ServicesFunction`.

* Use the Node.js 8.10 runtime.
* Reference the code at `./index.js` the `aws cloudformation package` command will upload the JavaScript file automatically.

### Add a data source and a resolver for AWS Lambda 

We have also added a data source and a resolver to `appsync.yaml`.

Have a look at the properties of the `ServicesDataSource` and `ServicesResolver` resources. The configuration is similar to lab 02 and lab 03.

The same is true for the request and response templates. Check out the following files:

* `getServices-request.vtl`
* `getServices-response.vtl`

### Deploy the changes

Package the dependencies for CloudFormation with the following command. Replace `<NICKNAME>` with your nickname (e.g. `andreas`).

```
aws cloudformation package --template-file appsync.yaml --s3-bucket learn-appsync-<NICKNAME> --output-template-file output.yaml
```

Deploy your GraphQL API with the following command. Replace `<NICKNAME>` with your nickname (e.g. `andreas`).

```
aws cloudformation deploy --template-file output.yaml --stack-name learn-appsync-<NICKNAME> --capabilities CAPABILITY_IAM
```

### Test the API

1. Open the AWS Management Console.
1. Switch to the AppSync service.
1. Select your API.
1. Select *Queries* from the sub-navigation.


Execute the following query to vote for the service `ec2`.

```
query {
  getServices {
    items {
      type
      name
    }
    nextToken
  }
}
```

The query should return a list of AWS services.

That's it. You are ready to build your application with AppSync.

## Help

* SAM [What Is the AWS Serverless Application Model (AWS SAM)?](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html)
* SAM [AWS::Serverless::Function](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md#awsserverlessfunction)
