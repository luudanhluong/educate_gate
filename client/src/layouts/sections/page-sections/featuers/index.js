// YourNewComponent.js
import React, { useState } from "react";
import MKBox from "components/MKBox";
import Grid from "@mui/material/Grid";
import jsonData from "./data.json";
import ListOfClasses from "./components/FeaturesOne/listOfClass";
import NamesOfGroups from "./components/FeaturesOne/nameOfGroup";
import GroupDetails from "./components/FeaturesOne/groupDetail";
import "../featuers/components/FeaturesOne/studentList.css";

const YourNewComponent = () => {
  const [selectedClass, setSelectedClass] = useState(null);

  const handleSelectClass = (classId) => {
    console.log("Selected Class:", classId);
    setSelectedClass(classId);
  };

  return (
    <MKBox height="100vh" p={3}>
      <Grid container spacing={3}>
        <Grid item xs={1}>
          <div className="left-content">
            <ListOfClasses classes={jsonData.classes} onSelectClass={handleSelectClass} />
          </div>
        </Grid>

        <Grid item xs={11}>
          <MKBox>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <MKBox p={3} className="main-content">
                  {selectedClass && (
                    <NamesOfGroups
                      selectedClass={selectedClass}
                      groups={jsonData.groups}
                      projects={jsonData.projects}
                      mentors={jsonData.mentors}
                    />
                  )}
                </MKBox>
              </Grid>

              <Grid item xs={12}>
                <MKBox p={3} className="main-content">
                  {selectedClass && (
                    <GroupDetails
                      students={jsonData.students.filter(
                        (student) => student.classId === selectedClass
                      )}
                      groups={jsonData.groups}
                    />
                  )}
                </MKBox>
              </Grid>
            </Grid>
          </MKBox>
        </Grid>
      </Grid>
    </MKBox>
  );
};

export default YourNewComponent;
