---
title: "Git"
date: "06/01/2022"
excerpts: "Learn version control for collaboration and CI/CD"
author: "Samson Okunola"
author_contact: 'https://twitter.com/pablo-clueless'
cover_image: '/images/posts/git.png'
---
## What is Git

Being a programmer or developer involves saving, keeping track, updating and sharing of your codes. There are several resources called version control tools to help you do that and the most popular and efficient one is Git.

> Git is an open-source version control software for tracking changes in any set of files, usually used for coordinating work among programmers collaboratively developing source code during software development. Its goals include speed, data integrity, and support for distributed, non-linear workflows (thousands of parallel branches running on different systems).

![git.jpg](https://cdn.hashnode.com/res/hashnode/image/upload/v1640699609799/9oUgmhrfX.jpeg)

## How to install Git

You can download the Git from [here](https://git-scm.com/downloads) and download the package for your OS. When installing, you may leave all default settings as they are except where it asks for your default editor, then you have to select your preferred code editor from the dropdown list.

![git code editor.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1640700075965/wqLEaqIMX.png)

## Configuring Git

Going forward you'll need a Github account to setup Git on your machine. If you don't have one go to [Github](https://github.com/) join (other options are Gitlab and Bitbucket). Once you have completed the installation process, open your Windows PowerShell or CMD(Windows key + x will open a menu containing the powershell). Then create a test directory, *git-test*, using the command `mkdir` like so:

```sh
mkdir git-test
```

Then go into that directory by using the command below:

```sh
cd git-test
```

Once in the folder, you should execute the following command in this same order:

```sh
git config --global user.name "github_username"
```

```sh
git config --global user.email "email_address"
```

You should replace *"github_username"* with your github username and *"email_address"* with your email address. The `--global` flag, added to the command make sure it persists through the machine and is available on every Git usage. Now that you have set up Git on your machine. Let's look at some of the commands you'll be using frequently, whether you're working alone or with a team.

## List of useful Git commands

- `git init` - Initializes a new Git repository. If you want to place a project under revision control, this is the first command you need to learn. It tells Git you want to start a new repository for the current directory you're working on.

- `git add <file-name>` or `git add *` - Moves changes from the working directory to the staging area. This means it prepares it for *upload* to the remote repository.  You can either add a specific file by affixing the file name after the command or add all files where changes have been made by using the `*` flag. The `*` tells Git to add all files where changes were made to the staging area, ready to be commited.

- `git commit` -  Git will not automatically save your changes, it needs explicit command to do so. This command saves the changes that were made and added to the staging area. And `git commit` will only save the changes to your local repository of Git, whatever is on the remote repository remains the same even after a commit.

- `git push` - The `git push` command is used to upload local repository content to a remote repository. Pushing is how you transfer commits from your local repository to a remote repo. Only after a push will your code be updated on the remote repo. One can also push to a specific branch by adding the branch name like so:

```sh
git push origin //this pushes the changes to your remote repo
git push origin <branch-name> //this pushes the changes to a specific branch on the working tree
```

- `git pull` - Used to update the local version of a repository from a remote repo. For example if you're working with a team and someone made some changes or adds new code to the remote repo and you want those changes in your local repo, you use `git pull` and just like push you can specify which branch you wan to pull from like so:

```sh

```
