export interface CurriculumIdentification {
  name: string;
  abbreviation: string;
  presentialHours: string;
  theoreticalHours: string;
  practicalHours: string;
  extensionHours: string;
  totalHours: string;
  weeklyHours: string;
  professorName: string;
  siapeCode: string;
  syllabus: string;
}

export interface ExtensionActivitiesData {
  selectedActivities: string[];
  justification: string;
}

export interface ScheduleEntry {
  date: string;
  activity: string;
}

export interface BibliographyData {
  basic: string;
  complementary: string;
}

export interface SignaturesData {
  professorName: string;
  coordinatorName: string;
  courseName: string;
}

export interface TeachingPlan {
  id: string;
  createdAt: string;
  updatedAt: string;
  identification: CurriculumIdentification;
  objectives: string;
  teachingModality: string;
  extensionActivities: ExtensionActivitiesData;
  content: {
    organization: string;
    interdisciplinaryRelation: string;
  };
  methodologicalProcedures: string;
  resources: string;
  technicalVisits: Array<{
    location: string;
    date: string;
    materials: string;
  }>;
  schedule: ScheduleEntry[];
  bibliography: BibliographyData;
  signatures: SignaturesData;
}

export interface User {
  username: string;
  password: string;
}

export interface AuthContextType {
  user: string | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}