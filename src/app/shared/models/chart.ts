export interface chartRes {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  governorate_stats: GovernorateStats;
  centers_stats?: CentersStat[];
  local_units_stats?: LocalUnitStat[];
  villages_stats?: villagesStat[];
}

export interface GovernorateStats {
  Ezab_count?: string;
  gender?: {
    male?: string;
    female?: string;
  };
  families_count?: string;
}

export interface CentersStat {
  id: number;
  name: string;
  Ezab_count?: string;
  male?: string;
  female?: string;
  families_count?: string;
}

export interface LocalUnitStat {
  id: number;
  name: string;
  Ezab_count?: string;
  male?: string;
  female?: string;
  families_count?: string;
}

export interface villagesStat {
  id: number;
  name: string;
  Ezab_count?: string;
  male?: string;
  female?: string;
  families_count?: string;
}
