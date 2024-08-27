interface sessionType {
  _id: string;
  sessionTitle: string;
  sessionDescription: string;
  status: string;
  tutorEmail: string;
  tutorName: string;
  registrationStartDate: string;
  registrationEndDate: string;
  registrationFee?: number;
}

export default sessionType;
