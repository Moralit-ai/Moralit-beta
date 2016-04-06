# Moralit.ai

An artificially intelligent "personal assistant" simulation capable of ethical decision making, developed by [Francesco Polizzi](http://linkedin.com/in/Francescostl), [Kelsey Hrubes](http://kelseyhrub.es/), and [Brendon Geils](http://brendongeils.com/) at [HackPrinceton](https://hackprinceton.com/). View a live verison of this app at [http://moralit-ai.herokuapp.com/](http://moralit-ai.herokuapp.com/)

# Table of Contents

1. [About](https://github.com/moralit-ai/moralit-beta#about)
2. [Inspiration](https://github.com/moralit-ai/moralit-beta#inspiration)
3. [How we built it](https://github.com/moralit-ai/moralit-beta#process)
2. [Usage](https://github.com/moralit-ai/moralit-beta#usage)

# About

Moralit.ai is an artificially intelligent personal assistant which uses natural language processing and machine learning to perform moral decision making. By adhering to [deontological principles](https://en.wikipedia.org/wiki/Deontological_ethics) surrounding murder, suffering, adultery, and deception, moralit.it determines the ethical permissibility of performing action requests from the user.

# Inspiration

If you hold to the material nature of the world around us, AI with true AMA could mean an end to the problem of conscious life and could bring about ethical obligations to these rational "persons." With AI performing ever larger feats of intelligent processing, artificial moral agency (AMA) is becoming a topic of discussion among many philosophers, computer scientists, and layman alike. Inspired by recent moral dilemmas faced by developers of artificially intelligent software (Tay.ai at Microsoft, self driving car software at Tesla, etc), the aim of this project is to explore the means by which an AI which can rationalize its own moral decisions.

# Process

First, we created four Kantian universals to feed our AI that it is absolutely unable to participate in or act on:

1. Murder
2. Creating suffering
3. Adultery
4. Deception

We then used api.ai for natural language processing which allowed us to understand the domain of the users speech. Based upon the domain, intent, and original user text, we process ethical reasoning where necessary. In certain cases such as completing math functions, asking for the time, and authorizing/opening software applications, we bypassed any ethical processing. When the text didn't fall into one of those domains, we compared it to the AI's current knowledge of the 4 forbidden universals. When running into an ethical problem, the AI defers to denying the user's request or refusing to answer the question.

The second portion of ethical reasoning (which has not yet been connected, but was developed to 90%) uses machine learning to train our AI about further censoring of topics in its realm of work. For example, when a user requests to search the web for "how to build a bomb," there is an obvious ethical intersection with our first Kantian universal. The AI uses an API to grab the main context in a sentence and ranks its relevance to our four principles using ML and after that point, we compare the users request with a constant value which we deem "permissible." If the relevance score is below our constant permissible score value, we return the answer (in this case, a web search), and if it is not, we deny the users request.

# Usage

Clone the repository:

1. Open your Terminal
2. Run `git clone https://github.com/moralit-ai/moralit-beta.git`
3. Run `cd moralit-beta`

Installing neccessary dependencies:

1. Download and Install [Node](https://nodejs.org/en/download/)
2. Run `npm install`

Running Moralit-ai locally:

1. Run `node ./bin/www.js`
2. Navigate to localhost:3000

