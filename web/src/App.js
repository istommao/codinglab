import "./App.css";
import React from "react";

import Editor from "@monaco-editor/react";

import {
  Badge,
  MantineProvider,
  ActionIcon,
  Select,
  Button,
  Input,
  Card,
} from "@mantine/core";

import {
  getRunCodeResult,
  SaveCodeService,
  GetCodeListService,
} from "./services";

import {
  IoSettingsOutline,
  IoCodeSlashSharp,
  IoTerminalOutline,
  IoReloadSharp,
  IoTextSharp,
} from "react-icons/io5";

function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CodeDataList: [],
      code_name: "",
      lang: "python",
      CodeUUID: "",
      CodeData: "",
      code_result: "",
      runStatus: {
        color: "blue",
        text: "state",
      },
      EditorOptions: {
        fontSize: "14px",
      },
    };
  }

  editorDidMount(editor, monaco) {
    console.log("editorDidMount", editor);
    editor.focus();
  }
  onChange(newValue, e) {
    console.log("onChange", newValue, e);
  }

  async componentDidMount() {
    const resp = await GetCodeListService();

    this.setState({ CodeDataList: resp.data.result });
  }

  render() {
    const changeCodeFile = (uuid) => {
      const item = this.state.CodeDataList.find((item) => item.uuid === uuid);
      this.setState({
        code_name: item.name,
        CodeData: item.code_data,
        lang: item.language,
      });

      this.setState({ CodeUUID: item.uuid });
    };

    const ChangeFontSize = () => {
      let result = parseInt(this.state.EditorOptions.fontSize) + 2;
      if (result > 24) {
        result = 14;
      }
      this.setState({ EditorOptions: { fontSize: result + "px" } });
    };

    const SaveCode = async () => {
      const params = {
        language: this.state.lang,
        code_data: this.state.CodeData,
        name: this.state.code_name,
        uuid: this.state.CodeUUID,
      };
      const resp = await SaveCodeService(params);
      await timeout(200);

      this.setState({ runStatus: { color: "teal", text: "done" } });

      console.log(resp);
    };

    const RunCode = async () => {
      this.setState({ runStatus: { text: "running" } });

      const params = {
        language: this.state.lang,
        code_data: this.state.CodeData,
      };
      const resp = await getRunCodeResult(params);
      await timeout(200);

      this.setState({ runStatus: { color: "teal", text: "done" } });
      this.setState({ code_result: resp.data });
    };
    const LangOptions = [
      { value: "python", label: "Python" },
      { value: "javascript", label: "JavaScript" },
      { value: "golang", label: "Go" },
      { value: "rust", label: "Rust" },
    ];

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
            <div style={{ width: "150px" }}>
              {this.state.CodeDataList.map((item) => (
                <Card key={item.uuid} shadow="sm" padding="lg">
                  {item.name}
                  <Button
                    onClick={() => changeCodeFile(item.uuid)}
                    variant="light"
                    color="blue"
                    fullWidth
                    style={{ marginTop: 14 }}
                  >
                    Load
                  </Button>
                </Card>
              ))}
            </div>
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
                <Input
                  value={this.state.code_name}
                  onChange={(event) =>
                    this.setState({ code_name: event.currentTarget.value })
                  }
                  size="xs"
                  style={{
                    width: "140px",
                    margin: "7px 0 0 5px",
                  }}
                  placeholder="Name"
                />
                <ActionIcon
                  variant="transparent"
                  size={45}
                  onClick={ChangeFontSize}
                >
                  <IoTextSharp />
                </ActionIcon>

                <ActionIcon variant="transparent" size={45}>
                  <IoReloadSharp />
                </ActionIcon>
                <Select
                  value={this.state.lang}
                  onChange={(value) => this.setState({ lang: value })}
                  placeholder="Language"
                  size="xs"
                  style={{
                    marginTop: "7px",
                    width: "100px",
                  }}
                  data={LangOptions}
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
                    onClick={SaveCode}
                  >
                    Save
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    size="xs"
                    style={{
                      marginTop: "7px",
                    }}
                    onClick={RunCode}
                    variant="outline"
                    color="blue"
                  >
                    Run
                  </Button>
                </div>
              </div>
              <Editor
                options={this.state.EditorOptions}
                height="calc(100% - 45px)"
                theme="vs-dark"
                language={this.state.lang}
                value={this.state.CodeData}
                onChange={(value) => this.setState({ CodeData: value })}
              />
            </div>
            <div style={{ width: "400px", padding: "5px 15px" }}>
              <Badge variant="dot" color={this.state.runStatus.color}>
                {this.state.runStatus.text}
              </Badge>
              <div
                style={{
                  width: "100%",
                  height: "calc(100% - 34px)",
                  overflow: "auto",
                }}
              >
                <p
                  style={{
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {this.state.code_result}
                </p>
              </div>
            </div>
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
