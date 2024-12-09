// Register the hooks file (ensure it's properly imported here)
module.exports = {
    default: {
        require: [
            './src/hooks/global_hooks.ts',
            './src/steps/*.ts',
        ], // Include both hooks and step definitions
        requireModule: [
            "ts-node/register"
        ],
        format: ['pretty']
    }
};
