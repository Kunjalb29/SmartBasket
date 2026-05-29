export const NUTRITION_DAILY_VALUES = {
  CALORIES: 2000, // kcal
  FAT: 78, // g
  SATURATED_FAT: 20, // g
  CARBS: 275, // g
  SUGAR: 50, // g
  PROTEIN: 50, // g
  SODIUM: 2300, // mg
  FIBER: 28 // g
} as const;

export const HEALTH_THRESHOLDS = {
  OPTIMAL: 80,
  MODERATE: 50,
  WARN_SODIUM: 500, // alert if single item > 500mg
  WARN_SUGAR: 15 // alert if single item > 15g
} as const;
