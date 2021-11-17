# Joy Editor
This is an experimental editor based on trying to make [Joy](https://ncase.me/joy/) work in a file editor form. For now this only supports the Turtle system.

*This editor isn't available on the VS Code Marketplace as of now. If interested you'll have to build from source, see 'Setup' instructions below.*

<img src="docs/demo-capture.gif"/>



**New Features Added (So far)**
 - You can now save, load, and version controlling your .joy files
 - You can use the editor via VS Code for desktop, vscode.dev, github.dev, and Github Codespaces
   - This allows easy forking/modifying .joy files via following a browser link
 - Added basic undo/redo

## Setup

```
git clone git@github.com:seflless/joy-vscode.git
cd joy-editor
yarn start
# Press F5 or Run -> Start Debugging
# Open up the examples folder within the VS Code window that is launche
```

**Todo**
 - The color picker's layout is very broken, fix it
 - The undo/redo system needs some work to feel like it's native to Joy. Two top things come to mind
   - Undo/redo boundaries should be on stopping scrubbing (pointerup) on scrubbing numbers or color picking. For text something smarter or based on commit or focus change
   - Text focus/selection state should maintained across undo/redo sync and the UI recreation approach
   - Camera pan (and zoom when it comes) should be part of undo/redo, but not part of serialization state (I think)
 - Add pointer lock to UI controls, especially number scrubbing
 - Add support for functions and then modules (including other .joy files)
 - Make it work well enough on mobile
 - Perhaps font size could be a tad smaller?
 - A global scrubber/time-stepper would be amazing, if possible to hack in
   - Sub scrubbers for loops would be cool too (each loop nested and not could maintain it's own scrub state for easy step through)
 - Support if not standardize on embedding in an SVG (.joy.svg?)

