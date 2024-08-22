import useDocumentTitle from "dynamic-title-react";
import { useState } from "react";

const tabs = [
  {
    name: "Approved",
    key: "approved",
  },
  {
    name: "Rejected",
    key: "rejected",
  },
  {
    name: "Pending",
    key: "pending",
  },
];

const ViewSessions = () => {
  useDocumentTitle("View All Sessions | TSC");
  const [selectedTab, setSelectedTab] = useState("approved");
  return (
    <div className="p-4">
      {/* <div role="tablist" className="tabs tabs-boxed">
        {tabs.map((tab) => (
          <a
            onClick={() => {
              setSelectedTab(tab.key);
            }}
            key={tab.key}
            role="tab"
            className={`tab ${tab.key == selectedTab && "tab-active"}`}
          >
            {tab.name}
          </a>
        ))}
        <div className="tab-content"></div>
      </div> */}

      <div role="tablist" className="tabs tabs-lifted">
        {tabs.map((tab) => {
          return (
            <>
              {" "}
              <input
                key={tab.key}
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab"
                aria-label={tab.name}
                onClick={() => {
                  setSelectedTab(tab.key);
                }}
              />
              {selectedTab == "approved" && (
                <div
                  role="tabpanel"
                  className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                >
                  Content for Approved tab
                </div>
              )}
              {selectedTab == "rejected" && (
                <div
                  role="tabpanel"
                  className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                >
                  Content for rejected tab
                </div>
              )}
              {selectedTab == "pending" && (
                <div
                  role="tabpanel"
                  className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                >
                  Content for pending tab
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ViewSessions;
