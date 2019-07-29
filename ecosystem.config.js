module.exports = {
  apps: [
    {
      name: 'lowes-product-description',
      script: './server.js',
    },
  ],
  deploy: {
    production: {
      user: 'linux',
      host: 'ec2-3-17-37-8.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/lowes.pem',
      ref: 'origin/master',
      repo: 'https://github.com/baembry/lowes-product-description-2.0.git',
      path: '/home',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js',
    },
  },
};
