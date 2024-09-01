interface sessionType {
  _id: string;
  sessionTitle: string;
  sessionDescription: string;
  status: string;
  tutorEmail: string;
  tutorName: string;
  registrationStartDate: string;
  registrationEndDate: string;
  classStartDate: string;
  classEndDate: string;
  registrationFee?: number;
}

type bookedSession = {
  _id: string;
  sessionTitle: string;
  sessionId: string;
  sessionDescription: string;
  status: string;
  tutorEmail: string;
  tutorName: string;
  registrationStartDate: string;
  registrationEndDate: string;
  classStartDate: string;
  classEndDate: string;
  sessionDuration: string;
  studentName: string;
  studentEmail: string;
  registrationFee?: number;
};

export type { bookedSession };

export default sessionType;
