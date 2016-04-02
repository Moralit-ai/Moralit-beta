# Bakery

An Optimizely A/B test deployment tool developed by the [Firefox Growth Team](https://wiki.mozilla.org/Growth_Team) at Mozilla.

# Table of Contents

1. [About](https://github.com/mozilla/bakery#about)
2. [Usage](https://github.com/mozilla/bakery#usage)
3. [Contributing](https://github.com/mozilla/bakery#contributing)

# About

Bakery is a remote Optimizely A/B test creation tool which utilizes the [Optimizely REST API](http://developers.optimizely.com/rest/introduction/index.html) and a modified version of the [FunnelEnvy Optimizely-Node Tool](https://github.com/funnelenvy/optimizely-node). The repository hosts two different deployment tools, one on the Web (stable) and one as a Node.js script (unstable). The web application is written using Node.js, Express.js, and Nunjucks. The script is written using Node.js.

# Usage

Clone the repository:

1. Open your Terminal
2. Run `git clone https://github.com/mozilla/bakery.git`
3. Run `cd bakery`

Installing neccessary dependencies:

1. Download and Install [Node](https://nodejs.org/en/download/)
2. Run `npm install`
3. Locate the file [OptimizelyClient.js](https://github.com/mozilla/bakery/blob/additionalEdits/OptimizelyClient.js) in the root directory of Bakery
4. Copy that file to node_modules/optimizely-node-client/lib/ replacing the existing OptimzielyClient.js file

Authenticating Bakery:

1. Generate an API token from the [token generator](http://app.optimizely.com/tokens), or use an existing API token on the account.
2. Copy that token to your [Access.js](https://github.com/mozilla/bakery/blob/additionalEdits/access.js#L3) file, and replace `'your token here'` with the token (don't forget the single quotations around the token).

Running Bakery Web-Tool (Stable):

1. Run `node ./bin/www.js`
2. Open Firefox and navigate to [localhost:3000](http://localhost:3000)

Running Bakery Script-Tool (Unstable):

2. Run `node bakeryScript.js`

# Contributing

Interested in Contributing?

Check out [CONTRIBUTING.md](https://github.com/mozilla/bakery/blob/master/CONTRIBUTING.md)
