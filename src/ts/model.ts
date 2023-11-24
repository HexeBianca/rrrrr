import {
  step,
  FlowEvaluator,
  IntegrationEngineInputArray,
  IntegrationEngineOutputArray,
} from './box-model/box-model';

type ModelElementIds = ReadonlyArray<string>;

type Writeable<T> = { -readonly [P in keyof T]: T[P] };
type TupleToUnion<T extends ModelElementIds> = Writeable<T>[number];
type TupleToObject<T extends ModelElementIds, V> = {
  [P in TupleToUnion<T>]: V;
};
type TupleToNumberArray<T extends ReadonlyArray<string>> = T extends readonly [
  string,
  ...infer R,
]
  ? R extends ReadonlyArray<string>
    ? [number, ...TupleToNumberArray<R>]
    : never
  : [];

type ModelElementId<I extends ModelElementIds> = TupleToUnion<I>;
type ModelElementObject<I extends ModelElementIds> = TupleToObject<I, number>;
type ModelElementArray<I extends ModelElementIds> = TupleToNumberArray<I>;

type ModelRecord<
  S extends ModelElementIds,
  F extends ModelElementIds,
  V extends ModelElementIds,
  P extends ModelElementIds,
> = {
  t: number;
  stocks: ModelElementObject<S>;
  flows: ModelElementObject<F>;
  variables: ModelElementObject<V>;
  parameters: ModelElementObject<P>;
};

abstract class Model<
  S extends ModelElementIds,
  F extends ModelElementIds,
  V extends ModelElementIds,
  P extends ModelElementIds,
> {
  public static elementIds = [
    'stocks',
    'parameters',
    'variables',
    'flows',
  ] as const;

  public readonly stockIds: S;

  public readonly flowIds: F;

  public readonly variableIds: V;

  public readonly parameterIds: P;

  protected constructor(
    stocksIds: S,
    flowIds: F,
    variableIds: V,
    parameterIds: P,
  ) {
    this.stockIds = stocksIds;
    this.flowIds = flowIds;
    this.variableIds = variableIds;
    this.parameterIds = parameterIds;
  }

  public static elementObjectToArray<I extends ModelElementIds>(
    ids: I,
    object: Readonly<ModelElementObject<I>>,
  ): ModelElementArray<I> {
    return ids.map(
      (id: ModelElementId<I>) => object[id],
    ) as ModelElementArray<I>;
  }

  public static arrayToElementObject<I extends ModelElementIds>(
    ids: I,
    array: IntegrationEngineInputArray<ModelElementArray<I>>,
  ): ModelElementObject<I> {
    const result = ids.reduce(
      (object, id: ModelElementId<I>, i) => {
        // eslint-disable-next-line no-param-reassign
        object[id] = array[i];
        return object;
      },
      {} as Partial<TupleToObject<I, number>>,
    );
    return result as TupleToObject<I, number>;
  }

  public stocksToStockArray(
    stocks: Readonly<ModelElementObject<S>>,
  ): ModelElementArray<S> {
    return Model.elementObjectToArray(this.stockIds, stocks);
  }

  public stockArrayToStocks(
    stockArray: IntegrationEngineInputArray<ModelElementArray<S>>,
  ): ModelElementObject<S> {
    return Model.arrayToElementObject(this.stockIds, stockArray);
  }

  public flowsToFlowArray(
    flows: Readonly<ModelElementObject<F>>,
  ): ModelElementArray<F> {
    return Model.elementObjectToArray(this.flowIds, flows);
  }

  public flowArrayToFlows(
    flowArray: IntegrationEngineInputArray<ModelElementArray<F>>,
  ): ModelElementObject<F> {
    return Model.arrayToElementObject(this.flowIds, flowArray);
  }

  public variablesToVariableArray(
    variables: Readonly<ModelElementObject<V>>,
  ): ModelElementArray<V> {
    return Model.elementObjectToArray(this.variableIds, variables);
  }

  public variableArrayToVariables(
    variableArray: IntegrationEngineInputArray<ModelElementArray<V>>,
  ): ModelElementObject<V> {
    return Model.arrayToElementObject(this.variableIds, variableArray);
  }

  public parametersToParameterArray(
    parameters: Readonly<ModelElementObject<P>>,
  ): ModelElementArray<P> {
    return Model.elementObjectToArray(this.parameterIds, parameters);
  }

  public parameterArrayToParameters(
    parameterArray: IntegrationEngineInputArray<ModelElementArray<P>>,
  ): ModelElementObject<P> {
    return Model.arrayToElementObject(this.parameterIds, parameterArray);
  }

  public abstract evaluate(
    stocks: ModelElementObject<S>,
    parameters: ModelElementObject<P>,
    t: number,
  ): ModelRecord<S, F, V, P>;

  public abstract accumulateFlowsPerStock(
    flows: ModelElementObject<F>,
  ): ModelElementObject<S>;

  public evaluateFlowPerStock(
    stocks: ModelElementObject<S>,
    parameters: ModelElementObject<P>,
    t: number,
  ): ModelElementObject<S> {
    const { flows } = this.evaluate(stocks, parameters, t);
    return this.accumulateFlowsPerStock(flows);
  }

  public createFlowEvaluator(
    parameters: Readonly<ModelElementObject<P>>,
  ): FlowEvaluator<ModelElementArray<S>> {
    const result = (
      stocksArray: IntegrationEngineInputArray<ModelElementArray<S>>,
      t: number,
    ): IntegrationEngineOutputArray<ModelElementArray<S>> => {
      const stocks = this.stockArrayToStocks(stocksArray);
      const flowsPerStock = this.evaluateFlowPerStock(stocks, parameters, t);
      const flowPerStockArray = this.stocksToStockArray(flowsPerStock);
      // @ts-expect-error TypeScript seems to have issues inferring the generic type
      return flowPerStockArray;
    };
    return result;
  }

  public step(
    stocks: Readonly<ModelElementObject<S>>,
    t: number,
    h: number,
    flowEvaluator: FlowEvaluator<ModelElementArray<S>>,
  ): ModelElementObject<S> {
    // @ts-expect-error TypeScript seems to have issues inferring the generic type
    const stocksArray: IntegrationEngineInputArray<ModelElementArray<S>> =
      this.stocksToStockArray(stocks);
    const newStocksArray = step<ModelElementArray<S>>(
      stocksArray,
      t,
      h,
      flowEvaluator,
    );
    return this.stockArrayToStocks(newStocksArray);
  }
}

export type {
  ModelElementIds,
  ModelElementId,
  ModelElementObject,
  ModelElementArray,
  ModelRecord,
};

export { Model };
