import React, { useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, LinearProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

// === Styled Card ===
const ProjectCard = styled(Card)(({ theme }) => ({
  maxWidth: 800,
  width: "100%",
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2),
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  borderRadius: theme.shape.borderRadius * 2,
}));

// === SkillBar Component with Animation ===
const SkillBar = ({ label, value }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000; // milliseconds
    const stepTime = 10;
    const steps = duration / stepTime;
    const increment = value / steps;

    const animate = () => {
      start += increment;
      if (start < value) {
        setProgress(start);
        setTimeout(animate, stepTime);
      } else {
        setProgress(value);
      }
    };

    animate();
  }, [value]);

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle2" gutterBottom>{label}</Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 20,
          borderRadius: 5,
          backgroundColor: "#1e1e1e",
          "& .MuiLinearProgress-bar": {
            background: "linear-gradient(to right, #00e5ff, #ff4081)",
          },
        }}
      />
    </Box>
  );
};

// === Skills Section ===
const Skills = () => {
  return (
    <Box sx={{ px: 3, py: 5, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h3" gutterBottom sx={{ mb: 5, textAlign: "center" }}>
        SKILLS // TECH STACK // PROJECTS
      </Typography>

      {/* === Project: Stereo Imager Plugin === */}
      <ProjectCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Imagination Stereo Imager (JUCE Plugin)
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            A stereo imaging plugin that visually represents stereo spread and allows precise manipulation of a sound's width. Built with the JUCE framework in C++, it features a dynamic UI, FFT-based analysis, and real-time performance optimizations.
          </Typography>

          <img
            src='/Images/Imager.jpg'
            alt="Imagination Stereo Imager"
            style={{
              width: "100%",
              maxHeight: 300,
              objectFit: "contain",
              borderRadius: 12,
              marginBottom: 20,
            }}
          />

          <SkillBar label="JUCE Framework" value={50} />
          <SkillBar label="C++" value={100} />
        </CardContent>
      </ProjectCard>

      {/* === Project: Reverb Plugin === */}
      <ProjectCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Custom Reverb Plugin (JUCE Plugin)
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            A reverb effect plugin created from scratch using JUCE and C++. It features custom parameter smoothing, modulation, early/late reflection simulation, and tailored UI elements with real-time responsiveness.
          </Typography>

          <SkillBar label="JUCE Framework" value={50} />
          <SkillBar label="C++" value={100} />
        </CardContent>
      </ProjectCard>

      {/* === Project: Full Stack Web App === */}
      <ProjectCard>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Adam's Hub
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            This very full-stack website is a project I am proud to present! Utilizing backend and frontend tech stacks including React, Node.Js and MySQL helped create this project. The UI was implemented using CSS and MaterialUI!
          </Typography>

          <SkillBar label="React / Redux" value={80} />
          <SkillBar label="Express / Node.js" value={60} />
          <SkillBar label="PostgreSQL" value={40} />
          <SkillBar label="Material UI" value={30} />
        </CardContent>
      </ProjectCard>
    </Box>
  );
};

export default Skills;
