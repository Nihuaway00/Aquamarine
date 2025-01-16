module.exports = {
    apps: [{
        name: 'web',
        script: 'dist/main.js',
        instances: 'max',
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
    }]
};