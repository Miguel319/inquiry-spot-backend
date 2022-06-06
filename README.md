# Inquiry Spot

<p align="center">
<img src="https://res.cloudinary.com/dvoo3wu0v/image/upload/v1654549684/Screen_Shot_2022-06-06_at_5.04.51_PM_gh58n8.png" width="320" alt="Inquiry Spot">
</p>

## Description

Inquiry Spot is an application that allows multiple users to view and publish real estate ads (apartments, houses, condominiums, farms, lots, premises, etc.) and vehicles. The app implements QR codes for users to scan the posts they see on the streets. Additionally, the application has a blog dedicated exclusively to real estate and vehicle publications.

**Build and install prerequisites**

- It is essential to have the place permissions to be able to access the repository. If you do not have these permissions, please contact the support department: support@abc.com.

- It is recommended to access the repository through SSH. For that, follow these steps:
  - Open terminal or command line interface.
  - Type `ssh-keygen` and press enter repeatedly until there are no more questions.
  - Go to the path where the generated ssh resides: `cd "ssh path"`.
  - Press `open .` if you are on Mac or `start .` if you are on Windows.
  - Open the .pub file, copying its content.
  - Open Azure Devops, press the "User Settings" button, located at the top right of the navigation bar (it is the penultimate button) and then press SSH public "keys".
  - Press "New Key". In the _Name_ part, assign any value, while in the _Public Key Data_ part, paste the value copied from the .pub.

## Step by step compilation and installation

- Go to the repository in Azure DevOps.
- Select the ssh box and copy the given value to do the cloning.
- Open terminal or command line interface.
- Write `git clone {previously_copied_value}`.
- Open preferred text editor or preferred integrated development environment. In case of, for example, having Visual Studio Code, run `code .`.
- Type `yarn` either in the previously opened terminal or in the text editor or IDE.
- Type `yarn dev` either in the previously opened terminal or in the text editor or IDE.

## Branching strategy

The project uses **Trunk-based development** as a branching strategy. This is a version control management practice where developers combine small, frequent updates into a central "trunk" or main branch. It is a common practice among DevOps teams and part of the DevOps lifecycle as it streamlines the merge and integration phases.

- **Branches to use:** `master`, `feature` and `fix`.
- **Permissions required by branches:**: `master` is prohibited from direct commits.
- **Workflow**: When pushing the feature or fix, a pull request must be made, specifying the potential reviewers. It is recommended to set autocomplete on the pull request so that, once approved, it will automatically run on the `master` branch without the need for an external entity.
- **Tagging process (semantic versioning):** Semantic versioning is a way of providing context to the user about the scope of a given change. This is divided into X,Y and Z. X is a major version, which can alter the correct functioning of components belonging to previous versions. And it is a minor version, which is used to add functionalities compatible with the existing ones. Finally, Z refers to a patch version, where defects reported internally or externally are corrected. The current version is 1.0.0, where the 1 represents X, the first 0 represents Y, and the last 0 represents Z.

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn dev

# build
$ yarn build

# production mode
$ yarn start:prod
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```
