# Basic JSON viewer and editor
A minimal JSON form-like editor featuring fully resposive UI, using just React.

## Demo
Visit https://andrewlowndes.github.io/json_editor/ to use the pre-built editor online. Copy your JSON into the right panel and edit on the left.

## Install and run from source
Checkout the repo, ensure NodeJS is installed and run `npm i`. Debug in a local dev server with automatic re-compilation by running  `npm start`. Build a dist bundle by running `npm run build` and then open dist/index.html in your browser.

## Features
- live edit all JSON data types
- breadcrumb-like navigation for fast sub-object traversal

## Not yet implemented
- drag-and-drop array item sorting
- delete confirmation
- import local file
- extend breadcrumbs as dropdowns with other property names on the same level
- add extra input types for string
  - date, time, date/time
  - textarea
  - uuid
- ios/andriod app via React native
