const config = {
    "*.{css, html, json, md, yml}": ["eslint --fix"],
    "*.{js, jsx, ts, tsx}": ["eslint --fix", "prettier --write"],
}

module.exports = config
