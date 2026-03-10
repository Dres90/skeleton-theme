# Shopify Starter Theme

[![Tests badge][]][Tests page]

## Table of Contents

<!-- toc -->

- [Getting started](#getting-started)
- [Steps for development](#steps-for-development)
- [Developer notes](#developer-notes)
- [Developer tools](#developer-tools)
  - [Shopify CLI](#shopify-cli)
  - [Theme Check](#theme-check)
  - [Continuous Integration](#continuous-integration)
    - [Shopify/lighthouse-ci-action](#shopifylighthouse-ci-action)
    - [Shopify/theme-check-action](#shopifytheme-check-action)

<!-- tocstop -->

## Getting started

- Install [Shopify CLI](https://github.com/Shopify/shopify-cli) in your local environment
  - Ensure you have a Shopify Account with the proper access to the Store you will be developing in.
- Clone the main branch from the GitHub repository
- In a command prompt, navigate to the cloned repository
- Make sure you are using the node version defined in the `.node-version` file.
- Run `npm install` to install dependencies
- Run `shopify theme dev -s [store-prefix]`, where `store-prefix` is the identifier for the store. This will be stored in the session so you do not need to specify the store again unless you change to another one.
- The first time you run this `shopify theme dev -s [store-prefix]` it will guide you through the login process. (If at any point you need to log out you can run `shopify auth logout`). You are now ready to start development.
- Please also consider using the recommended extensions listed in the .vscode/extensions.json file.

## Steps for development

For any new development work:

1. Create a feature branch from `main`
2. Run `shopify theme dev` from the root of the repository. This will start a development theme only visible to the developer. You should be able to preview your theme with the URLs provided by the command. This command also returns a url that can be used to share with other team members to preview your work. Keep in mind this link will only be live while you are still running the command.
3. In a different terminal, run `npm run watch:css` to compile the stylesheets and watch for changes. You can also run `npm run build:css` to just compile the stylesheets.
4. Make any changes to the theme files, these will be automatically sync to your development theme in the store.
5. If you need to persist this theme for further collaboration you can run `shopify theme push --unpublished`. This will persist your theme in the store and can be previewed at any point in the theme list under: https://admin.shopify.com/store/[store-prefix]/themes
6. Once you have completed your updates run `shopify theme check`. This will ensure your changes and your formatting adheres to the recommendations from Shopify. Fix any issues that are reported by this command.
7. Commit your changes and create a pull request from your feature branch to `main`.

## Developer notes

- The theme uses PostCSS for the stylesheets. You can find the list of plugins used in the `postcss.config.js` file.
- We are adding new CSS files in the `src/css` directory and then compiling them into the `assets/` directory using the watch command. Using the build command will compile the stylesheets into the `assets/` directory too.
- When you create a new stylesheet with the \_ prefix, PostCSS will compile it but won't create a file in the `assets/` directory. You can use this file as a partial to be included in other stylesheets that are compiled.
- The breakpoints are defined in the `src/css/breakpoints.js` file.
- The rest of the variables are defined in the `src/css/_variables.css` file as custom properties.
- Media queries are defined in the `src/css/_media-queries.css` file.
- Take a look at the sample files to see how the variables, mixins and media queries are used.

## Developer tools

There are a number of really useful tools that the Shopify Themes team uses during development. Dawn is already set up to work with these tools.

### Shopify CLI

[Shopify CLI](https://github.com/Shopify/shopify-cli) helps you build Shopify themes faster and is used to automate and enhance your local development workflow. It comes bundled with a suite of commands for developing Shopify themes—everything from working with themes on a Shopify store (e.g. creating, publishing, deleting themes) or launching a development server for local theme development.

You can follow this [quick start guide for theme developers](https://shopify.dev/docs/themes/tools/cli) to get started.

### Theme Check

We recommend using [Theme Check](https://github.com/shopify/theme-check) as a way to validate and lint your Shopify themes.

We've added Theme Check to Dawn's [list of VS Code extensions](/.vscode/extensions.json) so if you're using Visual Studio Code as your code editor of choice, you'll be prompted to install the [Theme Check VS Code](https://marketplace.visualstudio.com/items?itemName=Shopify.theme-check-vscode) extension upon opening VS Code after you've forked and cloned Dawn.

You can also run it from a terminal with the following Shopify CLI command:

```bash
shopify theme check
```

### Continuous Integration

#### Shopify/theme-check-action

Dawn runs [Theme Check](#theme-check) on every commit via [Shopify/theme-check-action](https://github.com/Shopify/theme-check-action).

<!--- Links: preserve this section at the bottom -->

[Tests badge]: https://github.com/ampagency/opalescence-2025-web/actions/workflows/test.yml/badge.svg
[Tests page]: https://github.com/ampagency/opalescence-2025-web/actions/workflows/test.yml
