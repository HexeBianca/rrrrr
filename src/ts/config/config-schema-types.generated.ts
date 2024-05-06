/* tslint:disable */
/* eslint-disable */
/**
 * This file is generated by core-types-ts on behalf of typeconv, DO NOT EDIT.
 * For more information, see:
 *  - {@link https://github.com/grantila/core-types-ts}
 *  - {@link https://github.com/grantila/typeconv}
 */

export interface I18nConfig {
  [key: string]: string;
}

export interface GeneralConfig {
  assetBaseDir: string;
  primaryLanguage: string;
  secondaryLanguage: string;
  description: I18nConfig;
  scoreLabels: {
    circularity: I18nConfig;
    coverage: I18nConfig;
  };
  autoReset: {
    timeoutSeconds: number;
    condition: string;
    title: I18nConfig;
    description: I18nConfig;
  };
}

export interface InitialParametersConfig {
  abandonExcessRate: number;
  abandonRate: number;
  acquireRate: number;
  breakRate: number;
  capacityAdjustmentRate: number;
  disposeIncentive: number;
  disposeRate: number;
  landfillIncentive: number;
  landfillRate: number;
  naturalResourceMiningRate: number;
  naturalResourcesIncentive: number;
  newPhoneProductionRate: number;
  newlyProducedPhoneIncentive: number;
  numberOfUsers: number;
  phonesPerUserGoal: number;
  recycleRate: number;
  recyclingIncentive: number;
  refurbishmentIncentive: number;
  refurbishmentRate: number;
  repairIncentive: number;
  repairRate: number;
  reuseIncentive: number;
  userdata: number;
}

export interface InitialStocksConfig {
  capacityOfNaturalResources: number;
  capacityOfNewlyProducedPhones: number;
  capacityOfPhonesInUse: number;
  capacityOfRecycledMaterials: number;
  capacityOfRefurbishedPhones: number;
  capacityOfRepairedPhones: number;
  phonesInUse: number;
  supplyOfBrokenPhones: number;
  supplyOfDisposedPhones: number;
  supplyOfHibernatingPhones: number;
  supplyOfNaturalResources: number;
  supplyOfNewlyProducedPhones: number;
  supplyOfRecycledMaterials: number;
  supplyOfRefurbishedPhones: number;
  supplyOfRepairedPhones: number;
}

export interface ParameterTransformConfig {
  id: string;
  script: string;
}

export interface SlotGroupAssetConfig {
  markerSlotActive: {
    url: string;
  };
  markerSlotInactive: {
    url: string;
  };
}

export interface MarkerSlotConfig {
  id: string;
  x: number;
  y: number;
  angle: number;
}

export interface BasicSlotGroupConfig {
  id: string;
  type: 'basic';
  label: I18nConfig;
  assets: SlotGroupAssetConfig;
  markerSlots: MarkerSlotConfig[];
  parameterTransformIds: string[];
}

export interface CardSlotConfig {
  id: string;
  x: number;
  y: number;
  angle: number;
}

export interface CardConfig {
  parameterTransformId: string;
  url: string;
}

export interface ActionCardSlotGroupConfig {
  id: string;
  type: 'action-card';
  label: I18nConfig;
  assets: SlotGroupAssetConfig;
  slots: {
    markerSlot: MarkerSlotConfig;
    cardSlot: CardSlotConfig;
  }[];
  cards: CardConfig[];
}

export interface EventCardSlotGroupConfig {
  id: string;
  type: 'event-card';
  label: I18nConfig;
  assets: SlotGroupAssetConfig;
  markerSlot: MarkerSlotConfig;
  cardSlots: CardSlotConfig[];
  cards: CardConfig[];
}

export type SlotGroupConfig =
  | BasicSlotGroupConfig
  | ActionCardSlotGroupConfig
  | EventCardSlotGroupConfig;

export interface InteractionConfig {
  actionCardDelayMs: number;
  eventCardMinDelayMs: number;
  eventCardMaxDelayMs: number;
  eventCardMinDurationMs: number;
  eventCardMaxDurationMs: number;
  slotGroups: SlotGroupConfig[];
}

export type ModelVisualizationLayerConfig = 'modelVisualization';

export interface ConditionalLayerConfig {
  url: string;
  condition: string;
}

export interface Config {
  general: GeneralConfig;
  model: {
    initialParameters: InitialParametersConfig;
    initialStocks: InitialStocksConfig;
  };
  simulation: {
    deltaPerSecond: number;
    maxStepSize: number;
  };
  parameterTransforms: ParameterTransformConfig[];
  interaction: InteractionConfig;
  layers: (ModelVisualizationLayerConfig | ConditionalLayerConfig)[];
}
