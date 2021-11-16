const Demos = {
    star: {
      frameX: 152,
      frameY: 378,
      turtleInstructions: {
        actions: [
          {
            type: "instructions/comment",
            value:
              "Welcome to The Joy of Turtle! You can hover over (1) (2) (3) etc... to see me draw something step-by-step. Or, you can change my instructions, colors, numbers, and see the result INSTANTLY. Have fun!",
          },
          {
            type: "turtle/color",
            color: { value: [49, 0.99, 1], type: "color" },
          },
          {
            type: "turtle/turn",
            angle: {
              type: "number",
              chain: [{ type: "number_raw", value: 18 }],
            },
          },
          {
            type: "instructions/repeat",
            count: {
              type: "number",
              chain: [{ type: "number_raw", value: 5 }],
            },
            actions: {
              actions: [
                {
                  type: "turtle/forward",
                  steps: {
                    type: "number",
                    chain: [{ type: "number_raw", value: 300 }],
                  },
                },
                {
                  type: "turtle/turn",
                  angle: {
                    type: "number",
                    chain: [{ type: "number_raw", value: 144 }],
                  },
                },
              ],
              resetVariables: false,
              type: "actions",
            },
          },
        ],
        resetVariables: true,
        type: "actions",
      },
      _references: {},
    },
    spiral: {
      frameX: 231,
      frameY: 299,
      turtleInstructions: {
        actions: [
          {
            type: "turtle/color",
            color: { value: [205, 0.59, 1], type: "color" },
          },
          {
            type: "turtle/turn",
            angle: {
              type: "number",
              chain: [{ type: "number_raw", value: 30 }],
            },
          },
          {
            type: "instructions/comment",
            value:
              "What this does, basically, is make me go in a triangle... but every time I draw a side, I draw it slightly bigger than the last one. Result: a triangular spiral!",
          },
          {
            type: "math/set",
            varname: { type: "variableName", refID: "id0" },
            value: {
              type: "number",
              chain: [{ type: "number_raw", value: 20 }],
            },
          },
          {
            type: "instructions/repeat",
            count: {
              type: "number",
              chain: [{ type: "number_raw", value: 23 }],
            },
            actions: {
              actions: [
                {
                  type: "turtle/forward",
                  steps: {
                    type: "number",
                    chain: [{ type: "variableName", refID: "id0" }],
                  },
                },
                {
                  type: "instructions/comment",
                  value:
                    "Changing this number below is pretty fun ;) Can you make a square spiral? Or a pentagonal spiral?",
                },
                {
                  type: "turtle/turn",
                  angle: {
                    type: "number",
                    chain: [{ type: "number_raw", value: 120 }],
                  },
                },
                {
                  type: "math/operation",
                  operation: { value: "+", type: "choose" },
                  varname: { type: "variableName", refID: "id0" },
                  value: {
                    type: "number",
                    chain: [{ type: "number_raw", value: 20 }],
                  },
                },
              ],
              resetVariables: false,
              type: "actions",
            },
          },
        ],
        resetVariables: true,
        type: "actions",
      },
      _references: {
        id0: {
          id: "id0",
          tags: ["number"],
          data: { value: "side size", color: [202, 0.83, 1] },
          connected: 3,
        },
      },
    },
    spiral2: {
      frameX: 255,
      frameY: 256,
      turtleInstructions: {
        actions: [
          {
            type: "instructions/comment",
            value:
              "Same idea as the triangular spiral, except this time with a really small turning angle and really small side size, I can make a CIRCULAR spiral!",
          },
          {
            type: "turtle/color",
            color: { value: [9, 0.81, 1], type: "color" },
          },
          {
            type: "math/set",
            varname: { type: "variableName", refID: "id0" },
            value: {
              type: "number",
              chain: [{ type: "number_raw", value: 0 }],
            },
          },
          {
            type: "instructions/repeat",
            count: {
              type: "number",
              chain: [{ type: "number_raw", value: 520 }],
            },
            actions: {
              actions: [
                {
                  type: "turtle/forward",
                  steps: {
                    type: "number",
                    chain: [{ type: "variableName", refID: "id0" }],
                  },
                },
                {
                  type: "turtle/turn",
                  angle: {
                    type: "number",
                    chain: [{ type: "number_raw", value: 5.1 }],
                  },
                },
                {
                  type: "math/operation",
                  operation: { value: "+", type: "choose" },
                  varname: { type: "variableName", refID: "id0" },
                  value: {
                    type: "number",
                    chain: [{ type: "number_raw", value: 0.04 }],
                  },
                },
                {
                  type: "instructions/comment",
                  value:
                    "Putting my brush up/down to create a cool dashed-line pattern:",
                },
                { type: "turtle/pen", pen: { value: -1, type: "choose" } },
              ],
              resetVariables: false,
              type: "actions",
            },
          },
        ],
        resetVariables: true,
        type: "actions",
      },
      _references: {
        id0: {
          id: "id0",
          tags: ["number"],
          data: { value: "side size", color: [13, 0.92, 1] },
          connected: 3,
        },
      },
    },
    flower: {
      turtleInstructions: {
        actions: [
          { type: "instructions/comment", value: "Draw the flower stem:" },
          {
            type: "turtle/color",
            color: { value: [79, 0.77, 0.94], type: "color" },
          },
          {
            type: "turtle/forward",
            steps: {
              type: "number",
              chain: [{ type: "number_raw", value: 243 }],
            },
          },
          { type: "instructions/comment", value: "Draw the flower head:" },
          {
            type: "turtle/color",
            color: { value: [50, 0.92, 1], type: "color" },
          },
          {
            type: "turtle/turn",
            angle: {
              type: "number",
              chain: [{ type: "number_raw", value: -90 }],
            },
          },
          {
            type: "instructions/repeat",
            count: {
              type: "number",
              chain: [{ type: "number_raw", value: 360 }],
            },
            actions: {
              actions: [
                {
                  type: "turtle/forward",
                  steps: {
                    type: "number",
                    chain: [{ type: "number_raw", value: 1 }],
                  },
                },
                {
                  type: "turtle/turn",
                  angle: {
                    type: "number",
                    chain: [{ type: "number_raw", value: 1 }],
                  },
                },
              ],
              resetVariables: false,
              type: "actions",
            },
          },
          { type: "instructions/comment", value: "Draw the flower petals:" },
          {
            type: "turtle/color",
            color: { value: [23, 0.97, 1], type: "color" },
          },
          {
            type: "turtle/turn",
            angle: {
              type: "number",
              chain: [{ type: "number_raw", value: -90 }],
            },
          },
          {
            type: "instructions/repeat",
            count: {
              type: "number",
              chain: [{ type: "number_raw", value: 9 }],
            },
            actions: {
              actions: [
                {
                  type: "instructions/repeat",
                  count: {
                    type: "number",
                    chain: [{ type: "number_raw", value: 105 }],
                  },
                  actions: {
                    actions: [
                      {
                        type: "turtle/forward",
                        steps: {
                          type: "number",
                          chain: [{ type: "number_raw", value: 2.2 }],
                        },
                      },
                      {
                        type: "turtle/turn",
                        angle: {
                          type: "number",
                          chain: [{ type: "number_raw", value: 2.5 }],
                        },
                      },
                    ],
                    resetVariables: false,
                    type: "actions",
                  },
                },
                {
                  type: "turtle/turn",
                  angle: {
                    type: "number",
                    chain: [{ type: "number_raw", value: -182.5 }],
                  },
                },
              ],
              resetVariables: false,
              type: "actions",
            },
          },
        ],
        resetVariables: true,
        type: "actions",
      },
      _references: {},
      frameX: 250,
      frameY: 469,
    },
    blank: {},
  };

  export default Demos;