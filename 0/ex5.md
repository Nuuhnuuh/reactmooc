sequenceDiagram
  browser participant
  server participant

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
  activate server
  server-->>browser: html document
  deactivate server

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  activate server
  server-->>browser: main.css file
  deactivate server

  Browser fetches spa.js in order to load message data

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
  activate server
  server-->>browser: spa.js file
  deactivate server

  Browser fetches data.json for the spa.js to use it

  browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.css
  activate server
  server-->>browser: data.json file
  deactivate server

  
