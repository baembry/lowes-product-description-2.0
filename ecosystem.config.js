module.exports = {
  apps: [
    {
      name: 'lowes-product-description',
      script: './server.js',
    },
  ],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-216-43-170.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/lowes2.pem',
      ref: 'origin/master',
      repo: 'https://github.com/baembry/lowes-product-description-2.0.git',
      path: '/home/ubuntu/lowesProductDescription',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js',
    },
  },
};
