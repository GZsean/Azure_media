import React from "react";
import "./index.css";
import { Col, ColorPicker, Divider, Row, Space, theme } from "antd";
import { generate, green, presetPalettes, red, cyan } from "@ant-design/colors";


const genPresets = (presets = presetPalettes) => Object.entries(presets).map(([label, colors]) => ({
    colors,
}));
  


const presets = genPresets({
  color: ["#ff0000", "#00ff00", "#0000ff"],
});

const customPanelRender = (_, { components: { Picker, Presets } }) => (
  <div style={{ width: "200px" }}>
    <div>
      <Picker />
    </div>
    <div>
      <Presets />
    </div>
  </div>
);


<ColorPicker
  defaultValue={token.colorPrimary}
  styles={{
    popupOverlayInner: {
      width: 200,
    },
  }}
  presets={presets}
  panelRender={customPanelRender}
/>



);
