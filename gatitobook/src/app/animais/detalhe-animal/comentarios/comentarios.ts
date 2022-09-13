export interface Comentario {
  id: number;
  date: Date;
  text: string;
  userName: string;
}

export type Comentarios = Array<Comentario>;
