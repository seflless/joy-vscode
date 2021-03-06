import * as vscode from 'vscode'

/**
 * Get the static html used for the editor webviews.
 *
 * IMPORTANT: Notice that how this runs while developing is much different than
 * when deployed, review below to understand the differences.
 */
export function getHtmlForWebview(
  context: vscode.ExtensionContext,
  webview: vscode.Webview,
  document: vscode.TextDocument
): string {
  // For now we're going to tread badly formed editor files as freshly created files.
  // This will happen if say a user creates a new editor file using New File or if they
  // have a bad auto-merge that messes up the json of an existing editor file
  // We pass null as the initialDocument value if we can't parse as json.
  let documentContent
  try {
    JSON.parse(document.getText())
    documentContent = document.getText()
  } catch (error) {
    documentContent = 'null'
  }

  if(process.env.NODE_ENV === 'production'){
    return getProductionModeHTML(context, webview, documentContent);
  } else {
    return getDevModeHTML(context, webview, documentContent)
  }
  
}

/**
 * This returns the initial html page of the extension, in dev mode. The editor's css/js is loaded
 * from a running server, so that we at least get rebuilding on file changes, but not yet HMR, so 
 * manual VS Code windo reloading is required for now.
 * 
 * TODO: Add HMR support to this version. We might need to nest inside an iframe in developer mode
 */
function getDevModeHTML(
  context: vscode.ExtensionContext,
  webview: vscode.Webview,
  documentContent: string
): string {
  const host = 'http://localhost:5420'
  const jsUrl = webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, 'static/joy.js')
  )

  const fontUrl = webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, 'FuturaHandwritten.ttf')
  )

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="${host}/index.css" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Joy Editor</title>
    <style>
      @font-face{
        font-family: 'FuturaHandwritten';
        font-style: normal;
        src: url('${fontUrl}') format('truetype');
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <script>currentFile = ${documentContent};</script>
    <script src="${jsUrl}""></script>
    <script src="${host}/index.js"></script>
  </body>
</html>`
}

/**
 * This returns the initial html page of the extension, in production mode
 * 
 * In production mode the extension is run from a statically generated version
 * of the editor, that is much more optimized
 */

function getProductionModeHTML(
  context: vscode.ExtensionContext,
  webview: vscode.Webview,
  documentContent: string
): string {
  const cssUrl = webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, 'editor/', 'index.css')
  )

  const jsUrl = webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, 'editor/', 'index.js')
  )

  const joyUrl = webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, 'static/joy.js')
  )

  const fontUrl = webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, 'FuturaHandwritten.ttf')
  )
  

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <link rel="stylesheet" href="${cssUrl}" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Joy Editor</title>
      <style>
      @font-face{
        font-family: 'FuturaHandwritten';
        font-style: normal;
        src: url('${fontUrl}') format('truetype');
      }
    </style>
    </head>
    <body>
      <div id="root"></div>
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <script>currentFile = ${documentContent};</script>
	  <script src="${joyUrl}""></script>
      <script src="${jsUrl}""></script>
    </body>
  </html>
  `
}
