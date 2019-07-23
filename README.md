# learn-appsync

Labs helping you to get started with [AWS AppSync](https://aws.amazon.com/appsync/). You will build an API allowing clients to vote for their favorite AWS services step by step.

The examples are based on the [widdix/aws-cutting-edge-appsync](https://github.com/widdix/aws-cutting-edge-appsync) repository.

Are you looking for an instructor-led workshop based on these labs? Say [hello@widdix.net](mailto:hello@widdix.net).

## Labs

* [Lab 01: Create GraphQL API and schema](lab01-schema/)
* [Lab 02: Reading from DynamoDB](lab02-dynamodb-read/)
* [Lab 03: Writing to DynamoDB](lab03-dynamodb-write/)
* [Lab 04: Invoking a Lambda function](lab04-lambda/)

## Setup your personal lab environment

Clone this repository on your local machine.

```
git clone https://github.com/widdix/learn-appsync.git
```

Create an S3 bucket storing deployment artifacts. Replace `<NICKNAME>` with your nickname (e.g. `andreas`).

```
aws s3 mb s3://learn-appsync-<NICKNAME>
```

## Clean up

Make sure you are deleting all the resources created while going through the labs.

Replace `<NICKNAME>` with your nickname (e.g. `andreas`).

```
aws s3 rb --force s3://learn-appsync-<NICKNAME>
```

## More Labs

See [widdix/learn-codepipeline](https://github.com/widdix/learn-codepipeline) for labs to learn AWS CodePipeline.
