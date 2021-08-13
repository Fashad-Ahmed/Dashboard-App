import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Chart from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

function WidgetSocial(props) {
  const chartConfigs = {
    type: "column3d",
    width: "100%",
    height: "150",
    dataFormat: "json",
    dataSource: {
      // Chart Configuration
      chart: {
        bgColor: "#2a2a2a",
        theme: "fusion"
      },

      data: props.data
    }
  };

  return (
    <div>
      <div className="widgetWrap">
        <div className="widgetTitle">{props.title}</div>
        <div className="widgetValue">
          <ReactFC {...chartConfigs} />
        </div>
      </div>
    </div>
  );
}

export default WidgetSocial;
