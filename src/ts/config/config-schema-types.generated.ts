/* tslint:disable */
/* eslint-disable */
/**
 * This file is generated by core-types-ts on behalf of typeconv, DO NOT EDIT.
 * For more information, see:
 *  - {@link https://github.com/grantila/core-types-ts}
 *  - {@link https://github.com/grantila/typeconv}
 */

export interface ParameterTransform {
  id: string;
  script: string;
}

export interface InitialParameters {
  abandonExcessRate: number;
  abandonRate: number;
  acquireRate: number;
  breakRate: number;
  capacityAdjustmentRate: number;
  disposeIncentive: number;
  disposeRate: number;
  landfillIncentive: number;
  landfillRate: number;
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
}

export interface InitialStocks {
  capacityOfNewlyProducedPhones: number;
  capacityOfRecycledMaterials: number;
  capacityOfRefurbishedPhones: number;
  capacityOfRepairedPhones: number;
  phonesInUse: number;
  supplyOfBrokenPhones: number;
  supplyOfDisposedPhones: number;
  supplyOfHibernatingPhones: number;
  supplyOfNewlyProducedPhones: number;
  supplyOfRecycledMaterials: number;
  supplyOfRefurbishedPhones: number;
  supplyOfRepairedPhones: number;
}

export interface Config {
  general: {
    backgroundImage: string;
  };
  parameterTransforms: ParameterTransform[];
  model: {
    initialParameters: InitialParameters;
    initialStocks: InitialStocks;
  };
  simulation: {
    deltaPerSecond: number;
    maxStepSize: number;
  };
}
