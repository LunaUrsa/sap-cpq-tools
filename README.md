This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!

### TODO

## Extension
* make it so the last visited page is what pops up when you activate the extension

#### All
* Cursor doesnt show on some themes?

#### CPQ
* Make the formula creator window size better
* Determine where something is used before it's deleted
* Save and continue button for certain items x2
* Containers
* When you save in workflow it takes you to the wrong tab
* Autocomplete commands
* Document Live Editor
* Production warning

## Framework and Libraries
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
We use Material design components from [Material-UI](https://material-ui.com/).
We use [React Router](https://reactrouter.com/) for routing.
We use symantic-versioning for versioning.

## Angular Commit Message Conventions

This project uses Angular Commit Message Conventions for commit messages. This is to ensure that the commit messages are easy to read and follow a consistent format, and allow automatic versioning. The commit message should be structured as follows:

> <type>(<scope>): <subject>
> <BLANK LINE>
> <body>
> <BLANK LINE>
> <footer>

Type: This describes the kind of change that the commit makes. Common types include:
    feat: A new feature for the user, not a new feature for a build script.
    fix: A bug fix for the user, which can be a correction in the source code or associated documentation.
    docs: Documentation only changes.
    style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
    refactor: A code change that neither fixes a bug nor adds a feature.
    perf: A code change that improves performance.
    test: Adding missing tests or correcting existing tests.
    chore: Changes to the build process or auxiliary tools and libraries such as documentation generation.

Scope (optional): A scope provides additional contextual information. It could be anything specifying the location of the commit change (e.g., login, core, user-dashboard, etc.).

Subject: The subject contains a succinct description of the change:
    Use the imperative, present tense: "change", not "changed" nor "changes".
    Don't capitalize the first letter.
    No dot (.) at the end.

Body (optional): The body should include a detailed description of the change:
    Use the imperative, present tense: "fix", not "fixed" nor "fixes".
    Should include motivation for the change and contrast this with previous behavior.

Footer (optional): The footer is used to reference issue tracker IDs, link pull requests, or provide notes that do not fit in the body:
    BREAKING CHANGE: A footer that starts with BREAKING CHANGE: followed by a description indicates a breaking change that suggests a major version bump if this is part of an automated versioning scheme.