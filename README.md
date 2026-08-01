# Quotation Mark Converter

[![build](https://github.com/remarkablemark/quotation-mark-converter/actions/workflows/build.yml/badge.svg)](https://github.com/remarkablemark/quotation-mark-converter/actions/workflows/build.yml)
[![test](https://github.com/remarkablemark/quotation-mark-converter/actions/workflows/test.yml/badge.svg)](https://github.com/remarkablemark/quotation-mark-converter/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/remarkablemark/quotation-mark-converter/graph/badge.svg?token=TxJbWIZZsP)](https://codecov.io/gh/remarkablemark/quotation-mark-converter)

💬 Convert straight quotation marks to curly typographic ones and vice versa.

- [Quotation Mark Converter](https://remarkablemark.org/quotation-mark-converter/)

## Features

- Convert straight quotes (`"`, `'`) to curly quotes (`“`, `”`, `‘`, `’`).
- Convert curly quotes back to straight quotes.
- Handles apostrophes (`can't` → `can’t`).
- Toggle conversion direction.
- Copy the converted output to the clipboard.
- Dark mode support.

## Example

| Input                                 | Output                                |
| ------------------------------------- | ------------------------------------- |
| `"A tiger can't change its stripes."` | `“A tiger can’t change its stripes.”` |
| `“A tiger can’t change its stripes.”` | `"A tiger can't change its stripes."` |

## Install

Clone the repository:

```sh
git clone https://github.com/remarkablemark/quotation-mark-converter.git
cd quotation-mark-converter
```

Install the dependencies:

```sh
npm install
```

## Run

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.

Open [http://127.0.0.1:5173](http://127.0.0.1:5173) to view it in the browser.

The page will reload if you make edits.

You will also see any errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.

It correctly bundles in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

Your app is ready to be deployed!

### `npm run lint`

Checks code quality.

### `npm run lint:tsc`

Checks for type errors.

### `npm test`

Runs tests.

### `npm run test:ci`

Runs tests with coverage.

## License

[MIT](LICENSE)
