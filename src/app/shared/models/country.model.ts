export interface ICountry {
  code: string;
  name: string;
  selected: boolean;
}

export class Country implements ICountry {
    constructor(
        public code: string,
        public name: string,
        public selected: boolean = false
    ) {
    }
}
