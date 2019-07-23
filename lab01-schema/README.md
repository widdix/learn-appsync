# Lab 01: Creating a GraphQL API and a schema

## Goal

The first lab is about creating a GraphQL API with AWS AppSync as well as to define the API schema. You will use CloudFormation to create all needed resources.

## Instructions

Before you start, make sure your current working directory is  `learn-appsync`.

### Create GraphQL API with CloudFormation

Copy `lab01-schema/starting-point/appsync.yaml` to your working directory.

```
# MacOS / Linux
cp lab01-schema/starting-point/appsync.yaml .
```

Extend the CloudFormation template `appsync.yaml` as described next.

1. Configure the resource `GraphQLApi` to use an API key for authentication.
1. Create the API key by specifying the `ApiKey` resource. Use `1577750400` (December 31, 2019 12:00:00 AM) as the expiration date for the key.
1. Configure the `GraphQLSchema` resource to define the GraphQL schema for your API. Load the schema definition from S3. You will use the `aws cloudformation package` command to deploy the CloudFormation template. Therefore, you can use a local path when referencing the `schema.sdl` file which you will create next.


### Define GraphQL API Schema

Copy `lab01-schema/starting-point/schema.sdl` to your working directory.

```
# MacOS / Linux
cp lab01-schema/starting-point/schema.sdl .
```

The API offers two queries:

* `getVotingResults` to fetch voting results
* `getServices` to list the available services to vote for

The `schema.sdl` contains both queries already.

```
type Query {
  getVotingResults(nextToken: String): VotingResults
  getServices(nextToken: String): Services
}
```

It is up to you to define the types `VotingResults` and `Services` within the schema.

* `VotingResults`
    * List of `VotingResult` per service
    * String `nextToken` needed to page through multi-page results
* `VotingResult`
    * Enumerated type `service` an internal id for an AWS service
    * Integer `upvotes` the number of votes for the service
* `Services`
    * List of `Service`
    * String `nextToken` needed to page through multi-page results
* `Service`
    * Enumerated type `type` an internal id for the AWS service
    * String `name` a display name for the AWS service

Additional, add an enumerated type for the AWS services with the following types:

```
ec2
lambda
fargate
clb
nlb
alb
appsync
apigateway
eks
ecs
rds_aurora
rds_postgres
rds_mysql
rds_mariadb
dynamodb
s3
efs
ebs
```

### Deploy the API

Package the dependencies for CloudFormation with the following command. Replace `<NICKNAME>` with your nickname (e.g. `andreas`).

```
aws cloudformation package --template-file appsync.yaml --s3-bucket learn-appsync-<NICKNAME> --output-template-file output.yaml
```

Deploy your GraphQL API with the following command. Replace `<NICKNAME>` with your nickname (e.g. `andreas`).

```
aws cloudformation deploy --template-file output.yaml --stack-name learn-appsync-<NICKNAME> --capabilities CAPABILITY_IAM
```

## Help

* CloudFormation [AWS::AppSync::GraphQLApi](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appsync-graphqlapi.html)
* CloudFormation [AWS::AppSync::ApiKey](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appsync-apikey.html)
* CloudFormation [AWS::AppSync::GraphQLSchema](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appsync-graphqlschema.html)
* AppSync [Designing Your Schema](https://docs.aws.amazon.com/appsync/latest/devguide/designing-your-schema.html)
