export default {
  type: "line",
  data: [
    {
      name: "line",
      fields: {
        y: {
          alias: "基金涨跌",
        },
      },
      values: [
        {
          x: "1号",
          y: 0.012,
        },
        {
          x: "2号",
          y: -0.01,
        },
        {
          x: "3号",
          y: 0.005,
        },
        {
          x: "4号",
          y: 0.007,
        },
        {
          x: "5号",
          y: 0.01,
        },
        {
          x: "6号",
          y: 0.017,
        },
        {
          x: "7号",
          y: 0.022,
        },
        {
          x: "8号预测",
          y: 0.033,
          latest: true,
        },
      ],
    },
  ],
  axes: [
    {
      orient: "right",
      range: {
        min: -0.05,
        max: 0.05,
      },
      label: {
        format: {
          name: "formatNumber",
          type: "percent",
        },
      },
    },
    {
      orient: "bottom",
    },
  ],
  label: {
    visible: false,
    format: {
      name: "formatNumber",
      type: "percent",
    },
  },
  tooltip: {
    visible: true,
  },
  xField: "x",
  yField: "y",
  line: {
    style: {
      lineDash: {
        type: "ordinal",
        field: "latest",
        range: [
          [1, 0],
          [4, 4],
        ],
      },
    },
  },
  color: {
    type: "ordinal",
    field: "latest",
    range: ["#468DFF", "#86DF6C"],
  },
};
