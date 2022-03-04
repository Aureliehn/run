export namespace RUN {
  export interface Age {
    id: number
    name: string
  }
  export interface Categorie {
    id: number
    name: string
  }
  export interface User {
    id: number
    email: string
    password: string  
  }
  export interface PointInteret {
      id: number
      title: string
      content: string
      age_id: number
      categorie_id: number
      lat: number
      lng: number
      creation_date: Date
  
      age: Age
      categorie: Categorie
    
  }
  export interface PIC {
      id: number
      name: string
      categorie: string
      lat: number
      lng: number
    
  }
}

