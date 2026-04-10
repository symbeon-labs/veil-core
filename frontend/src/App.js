import React from 'react';
import { Toaster } from './components/ui/sonner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ExpressionSimulator from './components/ExpressionSimulator';
import Features from './components/Features';
import ExpressionModel from './components/ExpressionModel';
import HardwareSupport from './components/HardwareSupport';
import CodeExamples from './components/CodeExamples';
import UseCases from './components/UseCases';
import Roadmap from './components/Roadmap';
import Community from './components/Community';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <ExpressionSimulator />
        <Features />
        <ExpressionModel />
        <HardwareSupport />
        <CodeExamples />
        <UseCases />
        <Roadmap />
        <Community />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
