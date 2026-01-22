
export interface PricingData {
  baseMonthlySales: number;
  numBranches: number;
  numCNPJMatriz: number;
  hasDifferentState: boolean;
  hasDifferentCity: boolean;
  includeTravel: boolean;
  hasDP: boolean;
}

export interface CalculationResult {
  basePrice: number;
  volumeAddition: number;
  branchAddition: number;
  cnpjAddition: number;
  complexityAddition: number;
  totalMonthly: number;
  diagnosisFee: number;
  requiredStaff: {
    fiscal: number;
    dp: number;
  };
}
