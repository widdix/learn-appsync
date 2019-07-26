# learn-appsync

Labs helping you to get started with [AWS AppSync](https://aws.amazon.com/appsync/). You will build an API allowing clients to vote for their favorite AWS services step by step.

The examples are based on the [widdix/aws-cutting-edge-appsync](https://github.com/widdix/aws-cutting-edge-appsync) repository.

Are you looking for an instructor-led workshop based on these labs? Say [hello@widdix.net](mailto:hello@widdix.net).

## Labs

* [Lab 01: Creating a GraphQL API and a schema](lab01-schema/)
* [Lab 02: Reading from DynamoDB](lab02-dynamodb-read/)
* [Lab 03: Writing to DynamoDB](lab03-dynamodb-write/)
* [Lab 04: Invoking a Lambda function](lab04-lambda/)

## Setup your lab environment

Clone or [download](https://github.com/widdix/learn-appsync/archive/master.zip) this repository on your local machine.

Create an S3 bucket storing deployment artifacts. Replace `<NICKNAME>` with your nickname (e.g. `andreas`).

```
aws s3 mb s3://learn-appsync-<NICKNAME>
```

## Clean up

Make sure you are deleting all the resources created while going through the labs.

Replace `<NICKNAME>` with your nickname (e.g. `andreas`).

```
aws s3 rb --force s3://learn-appsync-<NICKNAME>
aws cloudformation delete-stack --stack-name learn-appsync-<NICKNAME>
```

## More Labs

We offer AWS workshops tailored to your needs. See [widdix/learn-*](https://github.com/widdix?q=learn-) for more labs.
