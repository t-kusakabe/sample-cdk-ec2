# Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

## Usage

```
cdk deploy --profile private_dev -c cidr_ip={$CIDR_IP} -c key_pair={$KEYPAIR_NAME} -c vpc_id={$VPC_ARN}
```
