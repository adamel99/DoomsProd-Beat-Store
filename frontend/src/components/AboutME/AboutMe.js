// AboutMe.js
import React from "react";
import "./AboutMe.css"; // optional if you want custom styling
import { Link } from "react-router-dom";

const AboutMe = () => {
    return (
        <div className="about-me-container">
            <h1>About Me</h1>
            <p>
                I’m a multidisciplinary technologist with a passion for building experiences that live at the intersection of creativity, code, and security. With a background spanning full-stack development, audio plugin engineering, music production, and cybersecurity, I bring a holistic perspective to solving modern digital challenges — whether I’m architecting a web application, developing a VST/AU plugin, producing immersive audio environments, or hardening systems against evolving threats.
            </p>
            <h1>Full-Stack Developer: Building Across the Stack</h1>
            <p>
                As a full-stack developer, I specialize in designing and developing modern web applications that are scalable, secure, and user-focused. I’ve worked extensively with React, MySQL, Express, and a variety of frontend and backend frameworks to build efficient, clean solutions that work well across devices and use cases. My approach prioritizes seamless integration between the UI and backend systems, with attention to code quality, maintainability, and performance optimization.
                Whether developing interactive dashboards, building REST APIs, or deploying cloud-native infrastructure, I take pride in creating systems that are not only technically sound but also intuitive to use. I’m constantly exploring new tools, libraries, and best practices to stay ahead of the curve in an ever-evolving tech landscape.
            </p>
            <h1>Audio Plugin Development: Innovation Through Sound</h1>
            <p>
                I am currently in the works of creating my first professional plugin Aurora — an audio effect plugin designed for deep, expressive sound manipulation through granular synthesis. Built using the JUCE framework, Aurora empowers music producers, artists, and sound designers to modulate pitch, texture, and timing with fluid real-time control.
                Inspired by industry-defining tools like Portal I’ve engineered Aurora to deliver a responsive, high-quality sound-shaping experience that blends DSP performance with polished UX. Every line of DSP code, grain envelope, and visual feedback loop is written with the end-user in mind — musicians who want tools that disappear into their creative workflow.
                From optimizing FFT performance using FFTW to implementing intelligent thread management and real-time UI rendering, I take plugin development seriously — combining creative vision with deep technical implementation.
            </p>
            <h1>Music Producer: Emotion in Every Frequency</h1>
            <p>
                Outside of code, I’m also an active music producer with a catalog of beats inspired by artists of all genres including Jazz, RnB, Afrobeats, and Latin Pop. I specialize in producing emotionally driven instrumentals with rich harmonics, wide stereo imaging, and clean mixes that hold their own in professional playback environments.
                I publish beats consistently to YouTube, building a brand that merges musical emotion with technical quality. My production pipeline is informed by my plugin development skills — giving me an edge in sculpting truly unique sounds and understanding both the artist and engineer perspectives.

            </p>
            <h1>Cybersecurity: Securing What I Build</h1>
            <p>
                As someone who builds systems, I’m equally invested in securing them. I’m currently advancing my cybersecurity expertise through a CompTIA Security+ program, where I’m sharpening my understanding of secure networking, operating system hardening, SIEMs, and modern threat landscapes.
                I believe modern technologists need to be just as familiar with firewalls, subnets, encryption, and access control as they are with APIs and front-end frameworks. My cybersecurity journey is fueled by a desire to build resilient systems from the ground up — whether it's secure-by-design web apps, hardened client environments, or understanding how attackers think so I can better defend against them.
            </p>
            <img
                src="/your-photo.jpg" // Place this image in your public folder or import it
                alt="Your Portrait"
                className="about-me-photo"
            />

            <p>
                Feel free to explore my products <Link to="/products">here</Link>, or read more about the project on my <a href="https://github.com/adamel99" target="_blank" rel="noreferrer">GitHub</a>.
            </p>
        </div>
    );
};

export default AboutMe;
