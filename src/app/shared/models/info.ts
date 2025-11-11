export interface infoRes {
  success: boolean;
  message: string;
  data: info_card[];
}

export interface info_card {
  id: number;
  name: string;
}

export interface subSectorRes {
  success: boolean;
  message: string;
  data: Data;
}

export interface Data {
  sub_sectors: info_card[];
}


