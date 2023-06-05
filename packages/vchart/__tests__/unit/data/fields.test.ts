import { LineChart } from '../../../src/chart/line/line';
import { DataSet, dataViewParser } from '@visactor/vdataset';
import { EventDispatcher } from '../../../src/event/event-dispatcher';
import { VChart } from '../../../src/vchart-all';
import * as bt from '../../../src/vchart-all';
import { getTestCompiler } from '../../util/factory/compiler';
import { GlobalScale } from '../../../src/scale/global-scale';
bt;

const dataSet = new DataSet();
dataSet.registerParser('dataview', dataViewParser);
describe('data fields test', () => {
  test('data fields filter', () => {
    const chart = new LineChart(
      {
        type: 'line',
        xField: 'x',
        yField: 'value',
        data: [
          {
            id: 'id0',
            values: [
              { x: '0', type: 'A', value: 0.6 },
              { x: '1', type: 'A', value: 0.6 },
              { x: '2', type: 'A', value: 0.6 },
              { x: '3', type: 'A', value: 1.6 },

              { x: '0', type: 'B', value: 0.6 },
              { x: '1', type: 'B', value: 0.6 },
              { x: '2', type: 'B', value: 0.6 },
              { x: '3', type: 'B', value: 0.6 }
            ],
            fields: {
              type: {
                domain: ['A']
              },
              value: {
                type: 'linear',
                domain: [0, 1]
              }
            }
          }
        ],
        axes: [
          {
            orient: 'left',
            sampling: 'simple'
          },
          {
            orient: 'bottom',
            sampling: 'simple'
          }
        ],
        animation: false
      } as any,
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        eventDispatcher: new EventDispatcher({} as any, { addEventListener: () => {} } as any),
        globalInstance: {
          getContainer: () => ({}),
          getTooltipHandlerByUser: (() => undefined) as () => undefined
        },
        render: {} as any,
        dataSet,
        map: new Map(),
        container: null,
        mode: 'desktop-browser',
        getCompiler: getTestCompiler,
        globalScale: new GlobalScale([], { getAllSeries: () => [] as any[] } as any),
        getTheme: () => VChart.ThemeManager.getCurrentTheme()
      } as any
    );
    chart.created();
    chart.init();

    const lastData = chart.getAllSeries()[0].getRawData()?.latestData;

    expect(lastData.length).toEqual(3);
  });

  test('data fields sort', () => {
    const chart = new LineChart(
      {
        type: 'line',
        xField: 'x',
        yField: 'value',
        data: [
          {
            id: 'id1',
            values: [
              { x: '0', type: 'A', value: 0.6 },
              { x: '1', type: 'A', value: 0.6 },
              { x: '2', type: 'A', value: 0.6 },
              { x: '3', type: 'A', value: 1.6 },

              { x: '0', type: 'B', value: 0.6 },
              { x: '1', type: 'B', value: 0.6 },
              { x: '2', type: 'B', value: 0.6 },
              { x: '3', type: 'B', value: 0.6 },

              { x: '0', type: 'C', value: -0.6 },
              { x: '1', type: 'C', value: 0.6 },
              { x: '2', type: 'C', value: 0.6 },
              { x: '3', type: 'C', value: 0.6 }
            ],
            fields: {
              type: {
                domain: ['C', 'A'],
                sortIndex: 0
              },
              value: {
                type: 'linear',
                domain: [0, 1]
              }
            }
          }
        ],
        axes: [
          {
            orient: 'left',
            sampling: 'simple'
          },
          {
            orient: 'bottom',
            sampling: 'simple'
          }
        ],
        animation: false
      } as any,
      {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        eventDispatcher: new EventDispatcher({} as any, { addEventListener: () => {} } as any),
        globalInstance: {
          getContainer: () => ({}),
          getTooltipHandlerByUser: (() => undefined) as () => undefined
        },
        render: {} as any,
        dataSet,
        map: new Map(),
        container: null,
        mode: 'desktop-browser',
        getCompiler: getTestCompiler,
        globalScale: new GlobalScale([], { getAllSeries: () => [] as any[] } as any),
        getTheme: () => VChart.ThemeManager.getCurrentTheme()
      } as any
    );
    chart.created();
    chart.init();

    const lastData = chart.getAllSeries()[0].getRawData()?.latestData;

    expect(lastData.length).toEqual(6);
    for (let i = 0; i < 3; i++) {
      expect(lastData[i].type).toEqual('C');
      expect(lastData[i].value).toEqual(0.6);
      expect(lastData[i + 3].type).toEqual('A');
      expect(lastData[i + 3].value).toEqual(0.6);
    }
  });
});
