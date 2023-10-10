import type { IView } from '@visactor/vgrammar-core';
import type {
  CompilerListenerParameters,
  CompilerModel,
  IGrammarItem,
  IRenderContainer,
  IRenderOption
} from './interface';
import type { IBoundsLike } from '@visactor/vutils';
import type { EventSourceType } from '../event/interface';
import type { IChart } from '../chart/interface';
import type { VChart } from '../core/vchart';
import type { IColor, Stage } from '@visactor/vrender-core';
import type { IMorphConfig } from '../animation/spec';
type EventListener = {
  type: string;
  callback: (...args: any[]) => void;
};
export declare class Compiler {
  protected _view: IView;
  getVGrammarView(): IView;
  protected _viewListeners: Map<(...args: any[]) => any, EventListener>;
  protected _windowListeners: Map<(...args: any[]) => any, EventListener>;
  protected _canvasListeners: Map<(...args: any[]) => any, EventListener>;
  isInited: boolean;
  isReleased: boolean;
  protected _width: number;
  protected _height: number;
  protected _container: IRenderContainer;
  protected _option: IRenderOption;
  protected _model: CompilerModel;
  getModel(): CompilerModel;
  private _compileChart;
  private _rafId;
  constructor(container: IRenderContainer, option: IRenderOption);
  getRenderer(): import('@visactor/vgrammar-core').IRenderer;
  getCanvas(): HTMLCanvasElement | undefined;
  getStage(): Stage | undefined;
  initView(): void;
  private _setCanvasStyle;
  compile(
    ctx: {
      chart: IChart;
      vChart: VChart;
    },
    option: any
  ): void;
  clear(ctx: { chart: IChart; vChart: VChart }): void;
  renderAsync(morphConfig?: IMorphConfig): Promise<any>;
  renderSync(morphConfig?: IMorphConfig): void;
  updateViewBox(viewBox: IBoundsLike, reRender?: boolean): void;
  resize(width: number, height: number, reRender?: boolean): this | Promise<any>;
  setBackground(color: IColor): void;
  setSize(width: number, height: number): void;
  setViewBox(viewBox: IBoundsLike, reRender?: boolean): void;
  addEventListener(source: EventSourceType, type: string, callback: (params: CompilerListenerParameters) => void): void;
  removeEventListener(
    source: EventSourceType,
    type: string,
    callback: (params: CompilerListenerParameters) => void
  ): void;
  protected releaseEvent(): void;
  release(): void;
  releaseGrammar(): void;
  protected _releaseModel(): void;
  addGrammarItem(grammarItem: IGrammarItem): void;
  removeGrammarItem(grammarItem: IGrammarItem, reserveVGrammarModel?: boolean): void;
  updateDepend(items?: IGrammarItem[]): boolean;
  private _getGlobalThis;
}
export {};
