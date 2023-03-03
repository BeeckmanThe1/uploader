module.exports = {
    tagFormat: 'v${version}',
    branches: ['main'],
    "plugins": [
        "@semantic-release/commit-analyzer",
        "@semantic-release/release-notes-generator",
        "@semantic-release/changelog",
        "@semantic-release/npm",
        [
            "@semantic-release/changelog",
            {
                "changelogFile": "docs/CHANGELOG.md"
            }
        ]
    ]
}