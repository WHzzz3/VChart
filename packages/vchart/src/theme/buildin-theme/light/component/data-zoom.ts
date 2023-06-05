import type { IDataZoomTheme } from '../../../../component/data-zoom';

export const dataZoom: IDataZoomTheme = {
  showDetail: 'auto',
  middleHandler: {
    visible: false,
    background: {
      size: 5,
      style: {
        // fill: 'white',
        stroke: '#D1D5DA',
        cornerRadius: 2
      }
    },
    icon: {
      style: {
        size: 8,
        fill: 'white',
        stroke: '#D1D5DA',
        symbolType:
          // eslint-disable-next-line max-len
          'M 0.3 -0.5 C 0.41 -0.5 0.5 -0.41 0.5 -0.3 C 0.5 -0.3 0.5 0.3 0.5 0.3 C 0.5 0.41 0.41 0.5 0.3 0.5 C 0.3 0.5 -0.3 0.5 -0.3 0.5 C -0.41 0.5 -0.5 0.41 -0.5 0.3 C -0.5 0.3 -0.5 -0.3 -0.5 -0.3 C -0.5 -0.41 -0.41 -0.5 -0.3 -0.5 C -0.3 -0.5 0.3 -0.5 0.3 -0.5 Z',
        lineWidth: 0.5
      }
    }
  },
  background: {
    size: 20,
    style: {
      fill: '#F6F8FA',
      stroke: '#F6F8FA',
      lineWidth: 1
    }
  },
  startHandler: {
    style: {
      symbolType:
        // eslint-disable-next-line max-len
        'M-651.40493822 1451.33576377m0-418.93088554l0-2094.65442779q0-418.93088556 418.93088555-418.93088733l418.93088556 0q418.93088556 0 418.93088553 418.93088733l0 2094.65442779q0 418.93088556-418.93088553 418.93088554l-418.93088556 0q-418.93088556 0-418.93088555-418.93088554Z M-546.67221684 1032.40487819a314.19816417 314.19816417 0 0 0 314.19816418 314.19816421l418.93088555 1e-8a314.19816417 314.19816417 0 0 0 314.19816418-314.19816418l-1e-8-2094.65442779a314.19816417 314.19816417 0 0 0-314.19816417-314.19816596l-418.93088556 0a314.19816417 314.19816417 0 0 0-314.19816417 314.19816596l0 2094.65442775m-104.73272138 4e-8l0-2094.65442779a418.93088556 418.93088556 0 0 1 418.93088555-418.93088733l418.93088556 0a418.93088556 418.93088556 0 0 1 418.93088553 418.93088733l0 2094.65442779a418.93088556 418.93088556 0 0 1-418.93088553 418.93088554l-418.93088556 0a418.93088556 418.93088556 0 0 1-418.93088555-418.93088554z M-232.47405266 404.00854987l-1e-8-837.86177109 104.73272138 0 0 837.86177109z M81.72411149 404.00854987l0-837.86177109 104.7327214 0 0 837.8617711z',
      fill: '#FFF',
      stroke: '#AEB8C6',
      lineWidth: 0.8
    }
  },
  endHandler: {
    style: {
      symbolType:
        // eslint-disable-next-line max-len
        'M-651.40493822 1451.33576377m0-418.93088554l0-2094.65442779q0-418.93088556 418.93088555-418.93088733l418.93088556 0q418.93088556 0 418.93088553 418.93088733l0 2094.65442779q0 418.93088556-418.93088553 418.93088554l-418.93088556 0q-418.93088556 0-418.93088555-418.93088554Z M-546.67221684 1032.40487819a314.19816417 314.19816417 0 0 0 314.19816418 314.19816421l418.93088555 1e-8a314.19816417 314.19816417 0 0 0 314.19816418-314.19816418l-1e-8-2094.65442779a314.19816417 314.19816417 0 0 0-314.19816417-314.19816596l-418.93088556 0a314.19816417 314.19816417 0 0 0-314.19816417 314.19816596l0 2094.65442775m-104.73272138 4e-8l0-2094.65442779a418.93088556 418.93088556 0 0 1 418.93088555-418.93088733l418.93088556 0a418.93088556 418.93088556 0 0 1 418.93088553 418.93088733l0 2094.65442779a418.93088556 418.93088556 0 0 1-418.93088553 418.93088554l-418.93088556 0a418.93088556 418.93088556 0 0 1-418.93088555-418.93088554z M-232.47405266 404.00854987l-1e-8-837.86177109 104.73272138 0 0 837.86177109z M81.72411149 404.00854987l0-837.86177109 104.7327214 0 0 837.8617711z',
      fill: '#FFF',
      stroke: '#AEB8C6',
      lineWidth: 0.8
    }
  },
  startText: {
    padding: 8,
    style: {
      fontSize: 10,
      fill: '#6F6F6F'
    }
  },
  endText: {
    padding: 8,
    style: {
      fontSize: 10,
      fill: '#6F6F6F'
    }
  },
  selectedBackground: {
    style: {
      fill: '#E1E4E8',
      fillOpacity: 0.5
    }
  },
  dragMask: {
    style: {
      fill: '#E1E4E8',
      fillOpacity: 0.2
    }
  },
  backgroundChart: {
    area: {
      style: {
        lineWidth: 1,
        fill: '#D1D5DA'
      }
    },
    line: {
      style: {
        stroke: '#D1D5DA',
        lineWidth: 1
      }
    }
  },
  selectedBackgroundChart: {
    area: {
      style: {
        lineWidth: 1,
        fill: '#D1D5DA'
      }
    },
    line: {
      style: {
        stroke: '#D1D5DA',
        lineWidth: 1
      }
    }
  }
};
