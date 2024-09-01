import { ReactElement } from "react";

export type Element = {
    userId: number;
    id: number;
    title: string;
    body: string;
  };
  
  export type GetElementsResponse = Element[];
  
  export type ElementsState = {
    elements: Element[];
    loading: boolean;
    error: string | null;
  };
  

  export type CartElement = (el: Element) => ReactElement