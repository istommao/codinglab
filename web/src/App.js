import "./App.css";
import React from "react";

import Editor from "@monaco-editor/react";

import {
  MantineProvider,
  ActionIcon,
  Select,
  Button,
} from "@mantine/core";

import {
  IoSettingsOutline,
  IoCodeSlashSharp,
  IoTerminalOutline,
  IoReloadSharp,
  IoTextSharp,
} from "react-icons/io5";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: `import os`,
    };
  }
  editorDidMount(editor, monaco) {
    console.log("editorDidMount", editor);
    editor.focus();
  }
  onChange(newValue, e) {
    console.log("onChange", newValue, e);
  }

  ChangeFontSize(e) {
    console.log(e);
  }

  render() {
    const code = this.state.code;
    const options = {
      fontSize: "15px",
    };

    return (
      <div
        style={{
          height: "100vh",
        }}
      >
        <MantineProvider theme={{ colorScheme: "light" }}>
          <div
            style={{
              height: "60px",
            }}
          >
            TopBar
          </div>
          <div
            style={{
              height: "calc(100% - 105px)",
              display: "flex",
              borderTop: "1px solid #ececec",
              borderBottom: "1px solid #ececec",
            }}
          >
            <div style={{ width: "200px" }}>Menu</div>
            <div
              style={{
                width: "calc(100% - 560px)",
                borderLeft: "1px solid #ececec",
                borderRight: "1px solid #ececec",
              }}
            >
              <div
                style={{
                  height: "45px",
                  display: "flex",
                  position: "relative",
                  borderBottom: "1px solid #ececec",
                }}
              >
                <ActionIcon variant="transparent" size={45} onClick={this.ChangeFontSize}>
                  <IoTextSharp />
                </ActionIcon>

                <ActionIcon variant="transparent" size={45}>
                  <IoReloadSharp />
                </ActionIcon>
                <Select
                  placeholder="Language"
                  size="xs"
                  style={{
                    marginTop: "7px",
                    width: '100px'
                  }}
                  data={[
                    { value: "python", label: "Python" },
                    { value: "javascript", label: "JavaScript" },
                    { value: "vue", label: "Vue" },
                    { value: "react", label: "React" },
                  ]}
                />
                <div
                  style={{
                    position: "absolute",
                    right: "15px",
                  }}
                >
                  <Button
                    size="xs"
                    style={{
                      marginTop: "7px",
                    }}
                    variant="outline"
                    color="indigo"
                  >
                    Run
                  </Button>
                </div>
              </div>
              <Editor
                options={options}
                height="calc(100% - 45px)"
                theme="vs-dark"
                defaultLanguage="python"
                defaultValue={code}
              />
            </div>
            <div style={{ width: "350px" }}>Right</div>
          </div>
          <div
            style={{
              height: "45px",
              display: "flex",
            }}
          >
            <div
              style={{ width: "200px", borderRight: "1px solid #ececec" }}
            ></div>
            <div
              style={{
                width: "calc(100% - 550px)",
                display: "flex",
                position: "relative",
                fontSize: "16px",
                borderTop: "1px solid #ececec",
              }}
            >
              <ActionIcon variant="transparent" size={45}>
                <IoTerminalOutline />
              </ActionIcon>

              <ActionIcon variant="transparent" size={45}>
                <IoSettingsOutline />
              </ActionIcon>
              <ActionIcon variant="transparent" size={45}>
                <IoCodeSlashSharp />
              </ActionIcon>
            </div>
          </div>
        </MantineProvider>
      </div>
    );
  }
}
export default App;
