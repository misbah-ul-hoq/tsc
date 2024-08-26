interface sessionType {
  _id: string;
  sessionTitle: string;
  sessionDescription: string;
  status: string;
  tutorEmail: string;
  registrationFee?: number;
}

export default sessionType;
