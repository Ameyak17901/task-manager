export interface Task {
  _id?: string;
  date: string;
  entityName: string;
  taskType: string;
  time: string;
  contactPerson: string;
  notes?: string;
  status: 'Open' | 'Closed';
}
