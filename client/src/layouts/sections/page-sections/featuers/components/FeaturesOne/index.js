import React, { useState } from "react";
import MKTypography from "components/MKTypography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import MKBox from "components/MKBox";
import ListOfClasses from "./listOfClass";
import NamesOfGroups from "./nameOfGroup";
import jsonData from "./data.json";

const FeaturesOne = () => {
  const [selectedClass, setSelectedClass] = useState(null);

  const handleSelectClass = (classId) => {
    setSelectedClass(classId);
  };

  return (
    <MKBox component="section" py={{ xs: 3, md: 12 }}>
      <Container>
        <Grid container spacing={4}>
          {/* Left column - List of Classes */}
          <Grid item xs={12} md={4}>
            <Paper>
              <ListOfClasses classes={jsonData.classes} onSelectClass={handleSelectClass} />
            </Paper>
          </Grid>

          {/* Right column - Names of Groups */}
          <Grid item xs={12} md={8}>
            <Paper>
              {selectedClass ? (
                <NamesOfGroups
                  selectedClass={selectedClass}
                  groups={jsonData.groups}
                  projects={jsonData.projects}
                  mentors={jsonData.mentors}
                />
              ) : (
                <MKTypography variant="body2">Select a class to view groups.</MKTypography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
};

export default FeaturesOne;
