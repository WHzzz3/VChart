import type { EditorChart } from './chart';
import { EventEmitter } from '@visactor/vutils';
import type { VRenderPointerEvent } from '../interface';

export class ChartEvent {
  emitter: EventEmitter = new EventEmitter();

  protected _chart: EditorChart;

  constructor(chart: EditorChart) {
    this._chart = chart;
  }

  initWithVChart(): void {
    this._chart.option.layer.getStage().addEventListener('pointermove', this._overEvent as any);
    this._chart.option.layer.getStage().addEventListener('pointerdown', this._downEvent as any);
  }

  private _overEvent = (e: VRenderPointerEvent) => {
    const info = this._getPickModel(e);
    if (info) {
      this.emitter.emit('overModel', info, e);
    } else {
      this.emitter.emit('unOverChart', e);
    }
  };

  private _downEvent = (e: VRenderPointerEvent) => {
    if (!this._checkEventEnable(e)) {
      return;
    }
    const info = this._getPickModel(e);
    if (info) {
      this.emitter.emit('pickModel', info, e);
    } else {
      this.emitter.emit('unPickModel', e);
    }
  };

  private _checkEventEnable(e: VRenderPointerEvent) {
    if (!e.target) {
      return true;
    }
    if (e.target.type === 'rect' && e.target.name === 'regionBackground') {
      return true;
    }
    if ((e.target.type === 'group' && e.target.name === 'axis-container') || e.target.name === undefined) {
      return true;
    }
    return false;
  }

  protected _getPickModel(e: PointerEvent) {
    const point = { x: e.x, y: e.y };
    const chart = this._chart;
    const layoutMeta = chart.layout.getOverModel(point, this._chart.option.layer);
    if (!layoutMeta) {
      return null;
    }
    const regions = chart.vchart.getChart().getAllRegions() as any[];
    const items = regions.concat(chart.vchart.getChart().getAllComponents());
    const model = items.find(item => item.userId === layoutMeta.id);
    return { model, layoutMeta };
  }

  release() {
    this._chart.option.layer.getStage().removeEventListener('pointermove', this._overEvent as any);
    this._chart.option.layer.getStage().removeEventListener('pointerdown', this._downEvent as any);
    this.emitter.removeAllListeners();
    this.emitter = null;
  }
}
