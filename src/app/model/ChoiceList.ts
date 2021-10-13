import {Entry} from './Entry';

export class ChoiceList {
  id: string;
  name: string;
  positiveEntries: Entry[];
  negativeEntries: Entry[];
  choice: boolean;
}
