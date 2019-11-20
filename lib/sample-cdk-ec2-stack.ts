import cdk = require('@aws-cdk/core');
import ec2 = require('@aws-cdk/aws-ec2/lib');

export class SampleCdkEc2Stack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    let vpc = ec2.Vpc.fromLookup(this, 'VPC', {
      vpcId: this.node.tryGetContext('vpc_id')
    });

    const cidrIp = this.node.tryGetContext('cidr_ip');
    const securityGroup = new ec2.SecurityGroup(this, 'SecurityGroup', {
      vpc
    });
    securityGroup.addEgressRule(ec2.Peer.anyIpv4(), ec2.Port.allTraffic());
    securityGroup.addIngressRule(ec2.Peer.ipv4(cidrIp), ec2.Port.tcp(22));

    let ec2Instance = new ec2.CfnInstance(this, 'myInstance', {
      imageId: new ec2.AmazonLinuxImage({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2
      }).getImage(this).imageId,
      instanceType: new ec2.InstanceType('t3.small').toString(),
      networkInterfaces: [{
        associatePublicIpAddress: true,
        deviceIndex: '0',
        groupSet: [securityGroup.securityGroupId],
        subnetId: vpc.publicSubnets[0].subnetId
      }],
      keyName: this.node.tryGetContext('key_pair')
    });

    new cdk.CfnOutput(this, 'Id', { value: ec2Instance.ref });
    new cdk.CfnOutput(this, 'PublicIp', { value: ec2Instance.attrPublicIp });
  }
}
