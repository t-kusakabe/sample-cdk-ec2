#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { SampleCdkEc2Stack } from '../lib/sample-cdk-ec2-stack';

const app = new cdk.App();
new SampleCdkEc2Stack(app, 'SampleCdkEc2Stack', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION
  }
});
