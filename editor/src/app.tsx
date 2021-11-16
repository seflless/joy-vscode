import * as React from "react";
import { vscode } from "./utils/vscode";
import { defaultDocument } from "./utils/defaultDocument";
import { UI_EVENT } from "./types";
import "./styles.css";
import clone from "rfdc/default";
import Turtle from "./turtle";
import Demos from "./demos";

// Will be placed in global scope by extension
declare let currentFile: any;

export default function App(): JSX.Element {
  const rTLDrawState = React.useRef<any>();
  const rCanvas = React.useRef<any>(null);

  React.useEffect(() => {
    // If no initial document content was set, initialize it to the default file content
    // The extension will set the initial currentFile to null if so
    currentFile = currentFile || clone(defaultDocument);

    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////

    try{

    Joy.module("turtle", function () {
      Joy.add({
        name: "Move",
        type: "turtle/forward",
        tags: ["turtle", "action"],
        init: "Move forward {id:'steps', type:'number', min:0, placeholder:50} steps",
        onact: function (my) {
          // Previewing? How much to preview?
          var param = 1;
          if (my.data._PREVIEW !== undefined) param = my.data._PREVIEW;

          // Move!
          my.target.forward(my.data.steps * param);
        },
      });

      Joy.add({
        name: "Turn",
        type: "turtle/turn",
        tags: ["turtle", "action"],
        init: "Turn {id:'angle', type:'number', placeholder:10} degrees",
        onact: function (my) {
          // Previewing? How much to preview?
          var param = 1;
          if (my.data._PREVIEW !== undefined) param = my.data._PREVIEW;

          // Turn!
          my.target.turn(my.data.angle * param);
        },
      });

      Joy.add({
        name: "Change color",
        type: "turtle/color",
        tags: ["turtle", "action"],
        init: "Change color to {id:'color', type:'color'}",
        onact: function (my) {
          my.target.setColor(my.data.color);
        },
      });

      Joy.add({
        name: "Put brush up/down",
        type: "turtle/pen",
        tags: ["turtle", "action"],
        init: JSON.stringify({
          id: "pen",
          type: "choose",
          options: [
            { label: "Put brush up", value: 0 },
            { label: "Put brush down", value: 1 },
            { label: "Toggle brush", value: -1 },
          ], // TODO: actual boolean widget. AND it auto-toggles for you!
          placeholder: 0,
        }),
        onact: function (my) {
          switch (my.data.pen) {
            case 0:
              my.target.setPen(false);
              break;
            case 1:
              my.target.setPen(true);
              break;
            case -1:
              my.target.setPen(!my.target.pen);
              break;
          }
        },
      });
    });

    // Data
    // var data = Joy.loadFromURL();
    // if (!data) {
    //   var model = _getParameterByName("drawing") || "star";
    //   data = Demos[model];
    // }
    // data = data || {};
    const data = currentFile;
    console.log(currentFile);
    console.log(JSON.stringify(data, null, "    "));

    // Init
    window.turtle = new Turtle({
      width: 500,
      height: 500,
      data: data,
    });
    document.querySelector("#player").appendChild(turtle.canvas);

    // Joy
    window.joy = Joy({
      init: "I'm a turtle! I do the following: {id:'turtleInstructions', type:'actions'} <hr> {type:'save'}",

      data: data,
      container: "#editor",
      modules: ["turtle", "instructions", "math"],

      previewActions: true,
      previewNumbers: true,
      previewVariables: true,

      onupdate: function (my) {
        turtle.start();
        my.turtleInstructions.act(turtle);
        turtle.draw();

        // TOTAL HACK BUT W/E
        if (
          my.actor.activePreview &&
          my.actor.activePreview.type == "actions"
        ) {
          var label = "";
          for (var key in turtle._variables) {
            var value = turtle._variables[key];
            if (value.toString().length > 10)
              value = turtle._variables[key].toFixed(2); // hax
            label += key + ": " + value + "\n";
          }
          turtle.label(label);
        }
      },
    });
    turtle.ondrag = function () {
      joy.update();
    };

    

    // Draw initial document strokes
    syncVisualsToState();

    // The is typically incrementally drawing, not redrawing all strokes
    // every time there is a change. This function is used to initially
    // sync the canvas pixels to the underlying file. But it is also used
    // when a whole sale state change occurrs like an undo/redo
    function syncVisualsToState() {
      // ctx.fillStyle = "black";
      // ctx.fillRect(0,0,canvas.width, canvas.height);
      // currentFile.strokes.forEach( stroke => {
      //   ctx.beginPath();
      //   ctx.moveTo( stroke[0].x, stroke[0].y );
      //   for(let i = 1; i<stroke.length-1; i++){
      //     ctx.lineTo(stroke[i].x, stroke[i].y)
      //   }
      //   ctx.stroke();
      // })
    }

    const handleExtensionMessage = (message) => {
      switch (message.data.eventType) {
        case "FILE_UNDO":
        case "FILE_REDO":
          currentFile =
            message.data.text === ""
              ? clone(defaultDocument)
              : JSON.parse(message.data.text);
          syncVisualsToState();
          break;
      }
    };
    window.addEventListener("message", handleExtensionMessage);

    // Note: We aren't cleaning up the event registrations as we don't
    // have HMR support so there won't be any triggering of this effect
    // after the first call

    } catch(error){
      console.error(error);
    }
  }, []);

  // When the editor's document changes, post the stringified document to the vscode extension.
  function sendDocumentChanges() {
    vscode.postMessage({
      type: UI_EVENT.EDITOR_UPDATED,
      text: JSON.stringify(currentFile),
    });
  }

  function resetFile() {
    currentFile = defaultDocument;

    const ctx = rCanvas.current.getContext("2d");
    ctx.fillRect(0, 0, rCanvas.current.width, rCanvas.current.height);

    sendDocumentChanges();
  }

  return (
    <div id="content">
      <div id="container">
        <div id="player"></div>
        <div id="editor"></div>
      </div>
    </div>
  );
}
