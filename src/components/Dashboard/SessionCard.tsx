interface dataProps {
  _id: string;
  sessionTitle: string;
  sessionDescription: string;
  status: string;
}

const SessionCard = ({ data }: { data: dataProps }) => {
  const { _id, sessionTitle, sessionDescription, status } = data;
  const handleApply = () => {};
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{sessionTitle}</h2>
        <p>{sessionDescription}</p>
        <div className="card-actions justify-end">
          <button
            className={`btn btn-sm ${
              status == "pending"
                ? "btn-primary"
                : status == "approved"
                ? "btn-success"
                : "btn-error"
            }`}
          >
            {status}
          </button>
          {status == "rejected" && (
            <button className="btn btn-sm btn-secondary" onClick={handleApply}>
              Re apply?
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
