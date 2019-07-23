# Lab 02: Reading from DynamoDB

## Goal

You will learn how to configure AppSync to forward read requests - so-called queries - to DynamoDB directly. To do so, you will create a DynamoDB table as well as a data source and resolver.

## Instructions

Before you start, make sure your current working directory is  `learn-appsync`.

### Create a DynamoDB table

Copy `lab02-dynamodb-read/starting-point/appsync.yaml` to your working directory.

```
# MacOS / Linux
cp lab02-dynamodb-read/starting-point/appsync.yaml .
```
Extend the CloudFormation template `appsync.yaml` as described in the following.

Add a DynamoDB table to the CloudFormation template `appsync.yaml`. To do so, specify the type and properties of the resource `VoteTable`.

* Use the billing mode *Pay per Request*.
* Specify a single attribute which is also used as the partition key for the table: `service: String`.

That's it. You have configured your database — time to connect the DynamoDB table with your API.

### Create a data source and a resolver

AppSync integrates with DynamoDB. Create a data source and a resolver to forward `getVotingResults` queries from AppSync to DynamoDB.

To define your DynamoDB as a data source for AppSync extend the `VoteDataSource` resource. A few hints:

* Use the IAM role `VoteRole` to grant read and write access to the DynamoDB table.
* Specify the DynamoDB table as well as the region.

You need to configure a resolver next. A resolver connects a query with a data source. On top of that, a resolver uses templates to transform the request as well as the response.

Before you proceed, copy the request and response template (`lab02-dynamodb-read/starting-point/getVotingResults-request.vtl` and `lab02-dynamodb-read/starting-point/getVotingResults-response.vtl`) to your working directory.

```
# MacOS / Linux
cp lab02-dynamodb-read/starting-point/getVotingResults-request.vtl .
cp lab02-dynamodb-read/starting-point/getVotingResults-response.vtl .
```

Next, extend the resource `VotingResultsResolver` in the CloudFormation template `appsync.yaml`. A few hints:

* Use S3 to store the request and response templates. The `aws cloudformation package` command will upload the files from your local directory to S3 automatically.
* The property `FieldName` maps the resolver with the query `getVotingResults` defined in your schema `schema.sdl`.

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
1. Execute the following query.

```
query {
  getVotingResults {
    items {
      service
      upvotes
    }
    nextToken
  }
}
```

As there are no votes stored in your DynamoDB table, the result of your query should look like this.

```
{
  "data": {
    "getVotingResults": {
      "items": [],
      "nextToken": null
    }
  }
}
```

Kudos, you have implemented the first query on your GraphQL, allowing clients to request the up-to-date poll results.

## Help

* CloudFormation [AWS::DynamoDB::Table](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-dynamodb-table.html)
* CloudFormation [AWS::AppSync::DataSource](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appsync-datasource.html)
* CloudFormation [AWS::AppSync::Resolver](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appsync-resolver.html)
* AppSync [Resolver Mapping Template Reference for DynamoDB](https://docs.aws.amazon.com/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html)
