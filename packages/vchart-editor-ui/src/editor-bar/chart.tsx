import { Popover } from '@douyinfe/semi-ui';
import type { IEditorBarChartProps } from '../typings/editor-bar';
import { IconChevronDown, IconHistogram } from '@douyinfe/semi-icons';

const selectedStyle = {
  width: 144,
  height: 32
};

const unselectedStyle = {
  width: 144,
  height: 32
};

export function EditorBarChart(props: IEditorBarChartProps) {
  const onChartSelected = (chart: string) => {
    //
  };

  return (
    <Popover
      spacing={10}
      content={
        <div className="vchart-editor-ui-editor-bar-panel-container">
          {(props.chartList ?? []).map(chart => (
            <div
              key={chart.type}
              onClick={() => onChartSelected(chart.type)}
              className="vchart-editor-ui-editor-bar-row"
              style={props.chart === chart.type ? selectedStyle : unselectedStyle}
            >
              {chart.icon}
              {chart.label}
            </div>
          ))}
        </div>
      }
    >
      <span className="vchart-editor-ui-editor-bar-tool">
        <IconHistogram />
        <IconChevronDown className="vchart-editor-ui-editor-bar-open-icon" />
      </span>
    </Popover>
  );
}
