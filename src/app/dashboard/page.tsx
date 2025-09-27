'use client';

import React, { useState } from 'react';
import { 
  AlertCircle, 
  CheckCircle, 
  Plus, 
  Calendar, 
  MapPin, 
  User,
  Clock,
  BarChart3,
  X,
  Camera,
  Send
} from 'lucide-react';

const CivicDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showReportModal, setShowReportModal] = useState(false);
  const [newIssue, setNewIssue] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    priority: 'medium'
  });

  // Sample data
  const pendingIssues = [
    {
      id: 1,
      title: "Pothole on Main Street",
      category: "Road Maintenance",
      location: "Main St & 5th Ave",
      reportedDate: "2024-09-20",
      priority: "high",
      status: "In Progress"
    },
    {
      id: 2,
      title: "Broken Street Light",
      category: "Public Safety",
      location: "Park Avenue",
      reportedDate: "2024-09-18",
      priority: "medium",
      status: "Pending Review"
    },
    {
      id: 3,
      title: "Overflowing Trash Bin",
      category: "Sanitation",
      location: "Central Park",
      reportedDate: "2024-09-15",
      priority: "low",
      status: "Assigned"
    }
  ];

  const resolvedIssues = [
    {
      id: 4,
      title: "Traffic Signal Malfunction",
      category: "Traffic Management",
      location: "Downtown Plaza",
      reportedDate: "2024-08-25",
      resolvedDate: "2024-09-10",
      priority: "high"
    },
    {
      id: 5,
      title: "Graffiti Removal",
      category: "Public Property",
      location: "Community Center",
      reportedDate: "2024-08-20",
      resolvedDate: "2024-09-05",
      priority: "medium"
    }
  ];

  const categories = [
    "Road Maintenance",
    "Public Safety",
    "Sanitation",
    "Traffic Management",
    "Public Property",
    "Environmental",
    "Utilities",
    "Other"
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-100/50';
      case 'medium': return 'text-yellow-500 bg-yellow-100/50';
      case 'low': return 'text-green-500 bg-green-100/50';
      default: return 'text-gray-500 bg-gray-100/50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'text-blue-500 bg-blue-100/50';
      case 'Pending Review': return 'text-orange-500 bg-orange-100/50';
      case 'Assigned': return 'text-purple-500 bg-purple-100/50';
      default: return 'text-gray-500 bg-gray-100/50';
    }
  };

  const handleSubmitIssue = () => {
    console.log('New issue submitted:', newIssue);
    setShowReportModal(false);
    setNewIssue({
      title: '',
      category: '',
      description: '',
      location: '',
      priority: 'medium'
    });
  };

  const IssueCard = ({ issue, isResolved = false }: { issue: any, isResolved?: boolean }) => (
    <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-card-foreground text-lg">{issue.title}</h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority)}`}>
          {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          {issue.location}
        </div>
        <div className="flex items-center text-muted-foreground text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          Reported: {new Date(issue.reportedDate).toLocaleDateString()}
        </div>
        {isResolved && (
          <div className="flex items-center text-green-600 text-sm">
            <CheckCircle className="w-4 h-4 mr-2" />
            Resolved: {new Date(issue.resolvedDate).toLocaleDateString()}
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{issue.category}</span>
        {!isResolved && (
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
            {issue.status}
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background -m-6">
      {/* Header */}
      <header className="bg-card shadow-sm border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-primary p-2 rounded-lg">
                <BarChart3 className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Civic Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-foreground">
                <User className="w-5 h-5" />
                <span className="font-medium">John Doe</span>
              </div>
              <button
                onClick={() => setShowReportModal(true)}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Report Issue</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex space-x-2 mb-8 bg-muted p-1 rounded-lg max-w-md">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'pending', label: 'Pending', icon: Clock },
            { id: 'resolved', label: 'Resolved', icon: CheckCircle }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex justify-center items-center space-x-2 px-4 py-2 rounded-md font-medium transition-colors text-sm ${
                activeTab === id
                  ? 'bg-card text-primary shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm font-medium">Pending Issues</p>
                    <p className="text-3xl font-bold text-foreground">{pendingIssues.length}</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-orange-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm font-medium">Resolved Issues</p>
                    <p className="text-3xl font-bold text-foreground">{resolvedIssues.length}</p>
                  </div>
                   <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm font-medium">Resolution Rate</p>
                    <p className="text-3xl font-bold text-foreground">67%</p>
                  </div>
                   <div className="p-3 bg-blue-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h2 className="text-xl font-bold text-foreground mb-4">Recent Activity</h2>
              <div className="space-y-3">
                {[...pendingIssues.slice(0, 2), ...resolvedIssues.slice(0, 1)].map((issue) => (
                  <div key={issue.id} className="flex items-center space-x-4 p-3 bg-background rounded-lg">
                    <div className="flex-shrink-0">
                      {resolvedIssues.some(r => r.id === issue.id) ? (
                        <div className="p-2 bg-green-100 rounded-full"><CheckCircle className="w-5 h-5 text-green-500" /></div>
                      ) : (
                         <div className="p-2 bg-orange-100 rounded-full"><Clock className="w-5 h-5 text-orange-500" /></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{issue.title}</p>
                      <p className="text-sm text-muted-foreground">{issue.location}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(issue.reportedDate).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Pending Issues Tab */}
        {activeTab === 'pending' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Pending Issues</h2>
              <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                {pendingIssues.length} Active
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingIssues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} />
              ))}
            </div>
          </div>
        )}

        {/* Resolved Issues Tab */}
        {activeTab === 'resolved' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Resolved Issues</h2>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {resolvedIssues.length} Completed
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resolvedIssues.map((issue) => (
                <IssueCard key={issue.id} issue={issue} isResolved={true} />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Report Issue Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-xl shadow-2xl max-w-md w-full p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-foreground">Report New Issue</h3>
              <button
                onClick={() => setShowReportModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Issue Title
                </label>
                <input
                  type="text"
                  value={newIssue.title}
                  onChange={(e) => setNewIssue({...newIssue, title: e.target.value})}
                  className="w-full px-4 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="e.g., Large pothole on Elm St"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Category
                </label>
                <select
                  value={newIssue.category}
                  onChange={(e) => setNewIssue({...newIssue, category: e.target.value})}
                  className="w-full px-4 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={newIssue.location}
                  onChange={(e) => setNewIssue({...newIssue, location: e.target.value})}
                  className="w-full px-4 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Street address or nearest landmark"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Priority
                </label>
                <select
                  value={newIssue.priority}
                  onChange={(e) => setNewIssue({...newIssue, priority: e.target.value})}
                   className="w-full px-4 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Description
                </label>
                <textarea
                  value={newIssue.description}
                  onChange={(e) => setNewIssue({...newIssue, description: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Provide as much detail as possible..."
                  required
                />
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg text-foreground bg-background hover:bg-secondary"
                >
                  <Camera className="w-4 h-4" />
                  <span>Add Photo</span>
                </button>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="flex-1 px-4 py-3 border border-border rounded-lg text-foreground bg-background hover:bg-secondary font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmitIssue}
                  className="flex-1 bg-primary text-primary-foreground px-4 py-3 rounded-lg hover:bg-primary/90 font-medium flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Report</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CivicDashboard;
