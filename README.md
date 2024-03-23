# Steps to create a React Typescript npm library

```bash
mkdir <lib name>
cd <lib name>
npm init -y
pnpm i -D react react-dom typescript @types/react
```

\$ touch .prettierignore ___with following:___

\$ vi package.json ___with following:___

```json
{
   ...
   "type": "module"
   ...
}
```

\$ touch tsconfig.json ___with following:___

```json
{
   "include": ["src"],
   "exclude": ["dist", "node_modules"],
   "compilerOptions": {
      "module": "esnext",
      "lib": ["dom", "esnext"],
      "importHelpers": true,
      "declaration": true,
      "sourceMap": true,
      "rootDir": "./src",
      "outDir": "./dist/esm",
      "strict": true,
      "noImplicitReturns": true,
      "noFallthroughCasesInSwitch": true,
      "noUnusedLocals": true,
      "noUnusedParameters": true,
      "moduleResolution": "node",
      "jsx": "react",
      "esModuleInterop": true,
      "skipLibCheck": true,
      "forceConsistentCasingInFileNames": true
   }
}
```

\$ touch App.tsx ___with following:___

```js
import React, { useState } from "react";

export type Props = {
   value?: number,
};
const MyCounter = ({ value = 0 }: Props) => {
   const [counter, setCounter] = useState(value);

   const onMinus = () => {
      setCounter((prev) => prev - 1);
   };

   const onPlus = () => {
      setCounter((prev) => prev + 1);
   };

   return (
      <div>
         <h1>Counter: {counter}</h1>
         <button onClick={onMinus}>-</button>
         <button onClick={onPlus}>+</button>
      </div>
   );
};
```

\$ touch src/index.ts ___with following:___

```js
export * from './components/MyCounter'
```

\$ vi package.json ___with following:___

```json
{
   ...
   "scripts": {
      ...
      "build": "tsc",
      ...
   },
   ...
}
```

\$ pnpm run build

\$ git init

\$ touch .gitignore ___with following:___

```text
node_modules
.vscode
dist
yarn-error.log
```

\$ pnpm add -D eslint eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser

\$ touch .eslintrc ___with following:___

```json
{
  "root": true,
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "react",
    "react-hooks"
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "env": {
    "browser": true,
    "node": true
  },
  "globals": {
    "JSX": true
  }
}
```

\$ touch .eslintignore ___with following:___

```text
node_modules
dist
README.md
```

\$ vi package.json ___with following:___

```json
{
   ...
   "scripts": {
      ...
      "lint": "eslint \"{**/*,*}.{js,ts,jsx,tsx}\""
      ...
   },
   ...
}
```

\$ pnpm run lint

\$ pnpm add -D eslint-config-prettier eslint-plugin-prettier prettier

\$ touch .prettierrc ___with following:___

```json
{
   "bracketSpacing": true,
   "singleQuote": true,
   "trailingComma": "none",
   "tabWidth": 2,
   "semi": false,
   "printWidth": 120,
   "jsxSingleQuote": true,
   "endOfLine": "auto"
}
```

\$ vi .eslintrc ___with following:___

```json
{
  "root": true,
  "extends": [
    "prettier",
    "plugin:prettier/recommended",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "prettier",
    "react",
    "react-hooks"
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off"
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "env": {
    "browser": true,
    "node": true
  },
  "globals": {
    "JSX": true
  }
}
```

\$ vi package.json ___with following:___

```json
{
   ...
   "scripts": {
      ...
      "prettier": "prettier --write \"{src,tests,example/src}/**/*.{js,ts,jsx,tsx}\""
      ...
   },
   ...
}
```

\$ pnpm run prettier


\$ pnpm add -D jest jest-canvas-mock jest-environment-jsdom ts-jest @types/jest @testing-library/react tslib

\$ touch jestconfig.json ___with following:___

```json
{
  "transform": {
    "^.+\\.(t|j)sx?$": "ts-jest"
  },
  "testRegex": "(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"],
  "testEnvironment": "jsdom"
}
```

\$ mkdir tests

\$ cd tests

\$ touch common.test.tsx ___with following:___

```js
import * as React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { MyCounter } from '../src'

describe('Common render', () => {
  it('renders without crashing', () => {
    render(<MyCounter />)
  })
})
```

\$ vi package.json ___with following:___

```json
{
   ...
   "scripts": {
      ...
      "test": "jest --config jestconfig.json"
      ...
   },
   ...
}
```

\$ pnpm run test

\$ vi package.json ___with following:___

```json
{
   ...
   "scripts": {
      ...
      "build": "pnpm run build:esm && pnpm run build:cjs",
      "build:esm": "tsc",
      "build:cjs": "tsc --module commonjs --outDir dist/cjs",
      ...
   },
   ...
}
```

\$ pnpm run build

\$ vi package.json ___with following:___

```json
{
   "name": "learn-to-npm-packaging-react-ts-library",
   "version": "0.0.1",
   "description": "This is just an sample project to learn how to build and deploy a react typescript library",
   "main": "./dist/cjs/index.js",
   "module": "./dist/esm/index.js",
   "types": "./dist/esm/index.d.ts",
   ...
   "repository": {
      "type": "git",
      "url": "git+https://github.com/JustOpposite/learn-to-npm-packaging-react-ts-library.git"
   },
   "peerDependencies": {
      "react": ">=16"
   },
   "files": [
      "dist",
      "LICENSE",
      "README.md"
   ],
   "keywords": [
      "react",
      "typescript",
      "learn-npm-packaging-react"
   ],
   "author": "Just Opposite (justopposite)",
   ...
   "scripts": {
      ...
      "prepare": "pnpm run build",
      "prePublishOnly": "pnpm run test && pnpm run prettier && pnpm run lint",
      ...
   },
   ...
}
```

\$ git add .
\$ git commit -m "Initial commit"
\$ git remote add origin git@github.com:JustOpposite/learn-to-npm-packaging-react-ts-library.git
\$ git push -u origin main