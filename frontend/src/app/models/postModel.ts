export class Post{
  id?:number | null | undefined;
  title: string | null | undefined;
  description: string | null | undefined;
  image: string[] | null | undefined;
  likes: number;
  dislikes: number;
  status: string;
  user_id: number;
  created_at: Date;
  updated_at: Date;
}



export interface graphicDateArray{
  month: number;
  value: number;
}

export interface graphicDataRequest{
  user_id: number;
  year: number;
}

export interface graphicDataset{

}
