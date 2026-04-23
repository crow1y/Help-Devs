// Interface que define como é um Recurso
export interface IRecurso {
  id: number;
  titulo: string;
  descricao: string;
  url: string;
  categoria: string;
  concluido: boolean;
  salvo: boolean;
}