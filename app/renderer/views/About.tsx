/**
 * About View - Application Information and Credits
 */

import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { logger } from '../../shared/logger';
import {
  Heart,
  Code,
  Shield,
  Cpu,
  Zap,
  Globe,
  Users,
  BookOpen,
  Coffee,
  Star,
  Award,
  Clock,
  Package,
  ExternalLink,
  ChevronRight,
  Github,
  Twitter,
  Linkedin,
  Mail
} from 'lucide-react';

interface Dependency {
  name: string;
  version: string;
  description: string;
  license: string;
  url: string;
}

interface Contributor {
  name: string;
  role: string;
  avatar: string;
  github?: string;
  twitter?: string;
  linkedin?: string;
}

const About: React.FC = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'about' | 'dependencies' | 'contributors' | 'license'>('about');
  
  const appVersion = '1.0.0';
  const electronVersion = process.versions.electron;
  const chromeVersion = process.versions.chrome;
  const nodeVersion = process.versions.node;
  
  const dependencies: Dependency[] = [
    { name: 'React', version: '18.2.0', description: 'UI Library', license: 'MIT', url: 'https://reactjs.org' },
    { name: 'TypeScript', version: '5.0.2', description: 'Type Safety', license: 'Apache-2.0', url: 'https://typescriptlang.org' },
    { name: 'Electron', version: '25.3.1', description: 'Desktop Framework', license: 'MIT', url: 'https://electronjs.org' },
    { name: 'Tailwind CSS', version: '3.3.0', description: 'CSS Framework', license: 'MIT', url: 'https://tailwindcss.com' },
    { name: 'SQLite3', version: '5.1.6', description: 'Database', license: 'Public Domain', url: 'https://sqlite.org' },
    { name: 'Sharp', version: '0.32.1', description: 'Image Processing', license: 'Apache-2.0', url: 'https://sharp.pixelplumbing.com' },
    { name: 'Zod', version: '3.21.4', description: 'Validation', license: 'MIT', url: 'https://zod.dev' },
    { name: 'Axios', version: '1.3.4', description: 'HTTP Client', license: 'MIT', url: 'https://axios-http.com' },
  ];
  
  const contributors: Contributor[] = [
    { 
      name: 'Abu Retaj', 
      role: 'Lead Developer', 
      avatar: '👨‍💻',
      github: 'aburetaj',
      twitter: 'aburetaj',
      linkedin: 'aburetaj'
    },
    { 
      name: 'Sarah Chen', 
      role: 'UI/UX Design', 
      avatar: '🎨',
      github: 'sarahchen',
      linkedin: 'sarahchen'
    },
    { 
      name: 'Marcus Lee', 
      role: 'AI Engineer', 
      avatar: '🤖',
      github: 'marcuslee',
      twitter: 'marcuslee'
    },
    { 
      name: 'OpenAI', 
      role: 'AI Models', 
      avatar: '🧠',
      url: 'https://openai.com'
    },
  ];

  const features = [
    { icon: <Zap className="w-5 h-5" />, title: 'Lightning Fast', description: 'Optimized for performance' },
    { icon: <Shield className="w-5 h-5" />, title: 'Secure', description: 'End-to-end encryption' },
    { icon: <Cpu className="w-5 h-5" />, title: 'Intelligent', description: 'AI-powered analysis' },
    { icon: <Globe className="w-5 h-5" />, title: 'Cross-Platform', description: 'Windows, macOS, Linux' },
    { icon: <Code className="w-5 h-5" />, title: 'Open Source', description: 'MIT Licensed' },
    { icon: <Users className="w-5 h-5" />, title: 'Community', description: 'Active development' },
  ];

  const handleOpenLink = (url: string) => {
    window.knoux.showDialog({
      type: 'info',
      title: 'External Link',
      message: `Open ${url} in your browser?`,
      buttons: ['Cancel', 'Open']
    }).then(response => {
      if (response.response === 1) {
        // In Electron, we'd use shell.openExternal
        logger.info('Opening external link:', url);
      }
    });
  };

  const handleCheckUpdates = () => {
    logger.info('Checking for updates...');
    // Update check logic would go here
  };

  const handleExportDiagnostics = () => {
    const diagnostics = {
      appVersion,
      electronVersion,
      chromeVersion,
      nodeVersion,
      platform: navigator.platform,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      settings: window.knoux.getSettings()
    };
    
    const data = JSON.stringify(diagnostics, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `knoux-diagnostics-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl mb-6">
            <div className="text-4xl">📋</div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Knoux Clipboard AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Intelligent clipboard manager with AI-powered content analysis
          </p>
          <div className="inline-flex items-center space-x-4 bg-white dark:bg-gray-800 rounded-full px-6 py-3 shadow-lg">
            <span className="text-gray-700 dark:text-gray-300">Version {appVersion}</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span className="text-gray-700 dark:text-gray-300">Premium Edition</span>
            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
            <span className="flex items-center text-green-600 dark:text-green-400">
              <Star className="w-4 h-4 mr-1 fill-current" />
              Active
            </span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mb-3">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px">
              {(['about', 'dependencies', 'contributors', 'license'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 px-6 text-center font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab
                      ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    About Knoux Clipboard AI
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    A premium clipboard management application that leverages artificial intelligence 
                    to analyze, enhance, and organize your clipboard content. Built with cutting-edge 
                    technology and designed for productivity professionals.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    This application represents the pinnacle of desktop software engineering, 
                    combining robust performance with intelligent features to transform how 
                    you interact with your clipboard.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                      Development Philosophy
                    </h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">Privacy-first design</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">Offline-capable AI</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">Native performance</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">Open architecture</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" />
                      Technical Specs
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Electron</span>
                        <span className="font-mono text-gray-900 dark:text-white">{electronVersion}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Chrome</span>
                        <span className="font-mono text-gray-900 dark:text-white">{chromeVersion}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Node.js</span>
                        <span className="font-mono text-gray-900 dark:text-white">{nodeVersion}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">TypeScript</span>
                        <span className="font-mono text-gray-900 dark:text-white">5.0.2</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleCheckUpdates}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium"
                  >
                    Check for Updates
                  </button>
                  <button
                    onClick={handleExportDiagnostics}
                    className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300 font-medium"
                  >
                    Export Diagnostics
                  </button>
                </div>
              </div>
            )}

            {/* Dependencies Tab */}
            {activeTab === 'dependencies' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Open Source Dependencies
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  This application is built upon amazing open source projects. 
                  We extend our gratitude to all the maintainers and contributors.
                </p>
                
                <div className="space-y-4">
                  {dependencies.map((dep, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <Package className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {dep.name}
                          </h3>
                          <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                            v{dep.version}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                          {dep.description}
                        </p>
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          License: {dep.license}
                        </span>
                      </div>
                      <button
                        onClick={() => handleOpenLink(dep.url)}
                        className="ml-4 p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="Visit website"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                  <div className="flex items-start">
                    <Heart className="w-6 h-6 text-green-600 dark:text-green-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Support Open Source
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Consider supporting the open source projects that make this application possible. 
                        Every contribution helps maintain the ecosystem.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contributors Tab */}
            {activeTab === 'contributors' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Contributors & Credits
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {contributors.map((contributor, index) => (
                    <div 
                      key={index}
                      className="flex items-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl"
                    >
                      <div className="w-16 h-16 flex items-center justify-center text-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full mr-4">
                        {contributor.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {contributor.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {contributor.role}
                        </p>
                        <div className="flex space-x-2">
                          {contributor.github && (
                            <button
                              onClick={() => handleOpenLink(`https://github.com/${contributor.github}`)}
                              className="p-1 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                              title="GitHub"
                            >
                              <Github className="w-4 h-4" />
                            </button>
                          )}
                          {contributor.twitter && (
                            <button
                              onClick={() => handleOpenLink(`https://twitter.com/${contributor.twitter}`)}
                              className="p-1 text-gray-500 hover:text-blue-500 transition-colors"
                              title="Twitter"
                            >
                              <Twitter className="w-4 h-4" />
                            </button>
                          )}
                          {contributor.linkedin && (
                            <button
                              onClick={() => handleOpenLink(`https://linkedin.com/in/${contributor.linkedin}`)}
                              className="p-1 text-gray-500 hover:text-blue-700 transition-colors"
                              title="LinkedIn"
                            >
                              <Linkedin className="w-4 h-4" />
                            </button>
                          )}
                          {contributor.url && (
                            <button
                              onClick={() => handleOpenLink(contributor.url!)}
                              className="p-1 text-gray-500 hover:text-purple-600 transition-colors"
                              title="Website"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                  <div className="flex items-start">
                    <Users className="w-6 h-6 text-blue-600 dark:text-blue-400 mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                        Join Our Community
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        We welcome contributions from developers, designers, and AI enthusiasts. 
                        Help us make Knoux Clipboard AI even better!
                      </p>
                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleOpenLink('https://github.com/knoux/clipboard-ai')}
                          className="flex items-center px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          GitHub Repository
                        </button>
                        <button
                          onClick={() => handleOpenLink('mailto:contributors@knoux.com')}
                          className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Contact Team
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* License Tab */}
            {activeTab === 'license' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  License Information
                </h2>
                
                <div className="prose dark:prose-invert max-w-none">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 mb-6">
                    <h3 className="font-bold text-lg mb-4">Knoux Clipboard AI - Premium License</h3>
                    <p className="mb-4">
                      Copyright © 2024 Abu Retaj. All rights reserved.
                    </p>
                    <p className="mb-4">
                      This software is proprietary and confidential. Unauthorized copying, 
                      distribution, modification, or use of this software is strictly prohibited.
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-2">
                      <li>For personal and commercial use</li>
                      <li>Single-user license per purchase</li>
                      <li>Includes 1 year of updates and support</li>
                      <li>Source code available for inspection</li>
                      <li>No redistribution rights</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 mb-6">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Third-Party Licenses
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      This product includes software developed by third parties. 
                      Each dependency retains its original license.
                    </p>
                    <button
                      onClick={() => handleOpenLink('https://opensource.org/licenses')}
                      className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                    >
                      View all open source licenses
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </button>
                  </div>

                  <div className="text-center p-6 border border-gray-200 dark:border-gray-700 rounded-xl">
                    <Coffee className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-700 dark:text-gray-300 italic">
                      "Built with passion and thousands of cups of coffee."
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                      — The Knoux Development Team
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p className="mb-2">
            Made with <Heart className="w-4 h-4 inline text-red-500" /> by Abu Retaj
          </p>
          <p className="text-sm">
            © 2024 Knoux Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
