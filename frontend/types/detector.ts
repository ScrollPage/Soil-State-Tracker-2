export interface IDetectorData {
  id: number;
  timestamp: string;
  first_temp: number;
  second_temp: number;
  third_temp: number;
  humidity: number;
  lightning: number;
  pH: number;
}

export interface IDetector {
  id: number;
  x: number;
  y: number;
}

