# Setup

## Useful Tools
* VS Code
* GitHub Desktop

## Mac OS Setup
1. Download Homebrew if you don't already have it 
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```
2. Install npm if you don't already have it
```
brew install npm
```

## Linux Setup
1. Install `npm` if you haven't already

# Running (webpack-dev-server)
1. Go repository root.
2. Run `npm i`
3. Run `npm start`
4. Open [http://localhost:8765/] in a browser

# Building
1. Go to repository root.
2. Run `npm i`
3. Run `npm run webpack`
4. Open `dist/index.html` in a browser

If you want the typechecker/builder to run all the time whenever you change a file,
you can do `npm run watch` in step 2.

# Commiting code
Please create your own branch prefixed with your name or github name (e.g. `8/my-brach`), and then merge it in using the interface on [github.com](https://github.com/8gian/sourdough_finisher). Try not to commit code that doesn't compile.

## Creating a new branch
1. ```git checkout -b your-name/your-branch```

## Rebaseing
Rebasing is very helpful if you want to include someone else's changes in your current code base.
1. Stash or commit your changes
2. ```git checkout master```
3. ```git pull```
4. ```git checkout your-branch```
5. ```git rebase master```
6. Deal with any merge conflicts and recommit
7. ```git push -f```