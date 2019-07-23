'use strict';
exports.handler = async (event, context) => {
  return {
    items: [
      {type: "ec2", name: "ec2"},
      {type: "lambda", name: "lambda"},
      {type: "fargate", name: "fargate"},
      {type: "clb", name: "clb"},
      {type: "nlb", name: "nlb"},
      {type: "alb", name: "alb"},
      {type: "appsync", name: "appsync"},
      {type: "apigateway", name: "apigateway"},
      {type: "eks", name: "eks"},
      {type: "ecs", name: "ecs"},
      {type: "rds_aurora", name: "rds_aurora"},
      {type: "rds_postgres", name: "rds_postgres"},
      {type: "rds_mysql", name: "rds_mysql"},
      {type: "rds_mariadb", name: "rds_mariadb"},
      {type: "dynamodb", name: "dynamodb"},
      {type: "s3", name: "s3"},
      {type: "efs", name: "efs"},
      {type: "ebs", name: "ebs"}
    ]};
};
