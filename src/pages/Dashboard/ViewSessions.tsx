import useDocumentTitle from "dynamic-title-react";
import useSessions from "../../hooks/useSessions";
import SessionCard from "../../components/Dashboard/SessionCard";

const ViewSessions = () => {
  useDocumentTitle("View All Sessions | TSC");
  // const [selectedTab, setSelectedTab] = useState("approved");
  const { sessions } = useSessions();

  return (
    <section className="p-4 lg:p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sessions.map(
          (session: {
            _id: string;
            sessionTitle: string;
            sessionDescription: string;
            status: string;
            tutorEmail: string;
          }) => (
            <SessionCard key={session._id} data={session} />
          )
        )}
      </div>
    </section>
  );

  // return (
  //   <div className="p-4">
  //     <div role="tablist" className="tabs tabs-boxed">
  //       {/* tab for approved sessions */}
  //       <a
  //         role="tab"
  //         className={`tab ${selectedTab == "approved" && "tab-active"}`}
  //         onClick={() => {
  //           setSelectedTab("approved");
  //           // refetch();
  //         }}
  //       >
  //         Approved
  //       </a>
  //       {/* content for approved sessions */}
  //       <div className="tab-content pt-6">
  //         {sessions.map(
  //           (session: {
  //             _id: string;
  //             sessionTitle: string;
  //             sessionDescription: string;
  //             status: string;
  //           }) => (
  //             <SessionCard key={session._id} data={session} />
  //           )
  //         )}
  //       </div>
  //       {/* content for approved sessions ends */}

  //       {/* tab for rejected session */}
  //       <a
  //         role="tab"
  //         className={`tab ${selectedTab == "rejected" && "tab-active"}`}
  //         onClick={() => {
  //           setSelectedTab("rejected");
  //           // refetch();
  //         }}
  //       >
  //         Rejected
  //       </a>

  //       {/* content for rejected sessions */}
  //       <div className="tab-content pt-6">
  //         {sessions.map(
  //           (session: {
  //             _id: string;
  //             sessionTitle: string;
  //             sessionDescription: string;
  //             status: string;
  //           }) => (
  //             <SessionCard key={session._id} data={session} />
  //           )
  //         )}
  //       </div>
  //       {/* content for rejected sessins ends */}

  //       {/* tab for pending session */}
  //       <a
  //         role="tab"
  //         className={`tab ${selectedTab == "pending" && "tab-active"}`}
  //         onClick={() => {
  //           setSelectedTab("pending");
  //           // refetch();
  //         }}
  //       >
  //         Pending
  //       </a>

  //       {/* content for pending session */}
  //       <div className="tab-content pt-6">
  //         {sessions.map(
  //           (session: {
  //             _id: string;
  //             sessionTitle: string;
  //             sessionDescription: string;
  //             status: string;
  //           }) => (
  //             <SessionCard key={session._id} data={session} />
  //           )
  //         )}
  //       </div>
  //       {/* content for pending session ends here */}
  //     </div>
  //   </div>
  // );
};

export default ViewSessions;
