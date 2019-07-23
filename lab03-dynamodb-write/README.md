# Lab 03: Writing to DynamoDB

## Goal

You will learn how to configure AppSync to forward write requests - so called mutations - to DynamoDB directly. You will create a data source, a resolver and request/response templates to do so.

## Instructions

Before you start, make sure your current working directory is set to `learn-appsync`.

Next, copy all files from `lab03-dynamodb-write/starting-point/`  to your working directory.

```
# MacOS / Linux
cp lab03-dynamodb-write/starting-point/* .
```

### Add a mutation to your schema

So far your GraphQL schema specifies only queries. A query is reading data, it is not allowed to modify any data. To allow clients to vote for their favorite AWS service, you need to add a write request to your API. In GraphQL a write request is called *mutation*.

We have already extended the schema defined in `schema.sdl`.

```
schema {
  query: Query
  mutation: Mutation
}
```

It is up on you to add the following mutation to `schema.sdl`:

* Name: `vote`
* Input parameters: `service` of type `ServiceType`
* Return value is either `true` or `false`


### Create a request template

Have a look at the `appsync.yaml` template. We have added a new resolver (resource `VoteResolver`) linked with the mutation `vote`.

Next, you will modify the request and response templates for the resolver.

Let's start with the request template `vote-request.vtl`.

* Update an item.
* Use the request parameter `service` as the partition key for the item.
* Use a DynamoDB expression to increase the item attribute `upvotes` by `1`.

Let's keep the response template `vote-response.vtl` simple. Just return `true`.

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
1. Select *Queries* from the sub navigation.


Execute the following query to vote for the service `ec2`.

```
mutation {
  vote(service:ec2) 
}
```

Execute the following query to vote for the service `fargate`.

```
mutation {
  vote(service:fargate) 
}
```

Execute the following query to get the up-to-date results.


As there are no votes stored in your DynamoDB table the result of your query should look like this.

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

Great, you have added a *mutation* to your GraphQL API.

## Help

* CloudFormation [AWS::AppSync::Resolver](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-appsync-resolver.html)
* AppSync [Resolver Mapping Template Reference for DynamoDB](https://docs.aws.amazon.com/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html)
* DynamoDB [Update Expressions](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.UpdateExpressions.html)
