# Joy Editor
This is an experimental editor based on trying to make [Joy](https://ncase.me/joy/) work in a file editor form. For now this only supports the Turtle system.

<img src="docs/demo-capture.gif"/>

*This editor isn't available on the VS Code Marketplace, so for now you'll have to build from source if interested. See 'Setup' instructions below.*

**New Features Added (So far)**
 - You can now save, load, and version controlling your .joy files
 - You can use the editor via VS Code for desktop, vscode.dev, github.dev, and Github Codespaces
   - This allows easy forking/modifying .joy files via following a browser link
 - Added basic undo/redo

## Setup

```
git clone
cd joy-editor
yarn start
# Press F5 or Run -> Start Debugging
# Open up the examples folder within the VS Code window that is launche
```

**Todo**
 - The color picker's layout is very broken, fix it
 - The undo/redo system needs some work to feel like it's native to Joy
 - Add support for functions and then modules (including other .joy files)
 - Add pointer lock to UI controls, especially number scrubbing
