export interface Task {
  _id?: string;
  date: string;
  entityName: string;
  taskType: 'Call' | 'Meeting' | 'Video Call';
  time: string;
  contactPerson: string;
  notes?: string;
  status: 'Open' | 'Closed';
}
