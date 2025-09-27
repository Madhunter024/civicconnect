
'use client';

import type { Issue, User } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  CheckCircle, 
  AlertCircle,
  Clock,
  Filter,
  Search,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Eye,
  Forward,
  X,
  Building2,
  UserCheck,
  Bell,
  Download,
  Flag,
  Send,
  ChevronDown,
  Star,
  MessageSquare,
  Image,
  Video,
  FileText
} from 'lucide-react';
import { departments as departmentList } from '@/lib/departments';

interface OfficialDashboardProps {
  user: User;
  issues: Issue[];
}

const statusVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
    Reported: 'outline',
    'In Progress': 'default',
    Resolved: 'secondary',
    Rejected: 'destructive'
};

const getPriorityColor = (priority: string | undefined) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

const getStatusColor = (status: string) => {
    switch (status) {
      case 'Reported': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Assigned': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'In Progress': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Resolved': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
};

export default function OfficialDashboard({ user, issues: initialIssues }: OfficialDashboardProps) {
  const [activeTab, setActiveTab] = useState('Reported');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showForwardModal, setShowForwardModal] = useState(false);
  const [filterDistrict, setFilterDistrict] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [issues, setIssues] = useState(initialIssues);

  useEffect(() => {
    setIssues(initialIssues);
  }, [initialIssues]);

  const [forwardData, setForwardData] = useState({
    assignedTo: '',
    department: '',
    priority: 'Medium',
    deadline: '',
    notes: ''
  });

  // Field officers data - Can be moved to a separate file or fetched from an API
  const fieldOfficers = {
    'Department of Road Construction': [
      { id: 'pwd1', name: 'अजय कुमार', designation: 'Assistant Engineer', district: 'Ranchi', phone: '+91 9876543210' },
      { id: 'pwd2', name: 'Rajesh Singh', designation: 'Junior Engineer', district: 'Jamshedpur', phone: '+91 8765432109' }
    ],
    'Department of Drinking Water and Sanitation': [
      { id: 'phe1', name: 'राज कुमार सिंह', designation: 'Water Supply Officer', district: 'Dhanbad', phone: '+91 7654321098' },
      { id: 'phe2', name: 'Anita Kumari', designation: 'Assistant Engineer', district: 'Ranchi', phone: '+91 6543210987' }
    ],
    'Department of Energy': [
      { id: 'elec1', name: 'Vikash Prasad', designation: 'Lineman', district: 'Jamshedpur', phone: '+91 5432109876' },
      { id: 'elec2', name: 'सुरेश यादव', designation: 'Technical Officer', district: 'Ranchi', phone: '+91 4321098765' }
    ]
  };

  const districts = [...new Set(issues.map(i => i.address.split(',')[1]?.trim()))].filter(Boolean);
  const categories = [...new Set(issues.map(i => i.category))];

  const filteredIssues = issues.filter(issue => {
    const matchesTab = activeTab === 'All' || issue.status === activeTab;
    const matchesDistrict = !filterDistrict || issue.address.includes(filterDistrict);
    const matchesCategory = !filterCategory || issue.category === filterCategory;
    const matchesPriority = !filterPriority || (issue as any).priority === filterPriority; // 'priority' is not on Issue type
    const matchesSearch = !searchTerm || 
                         issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         issue.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (issue as any)._id.toString().toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesDistrict && matchesCategory && matchesPriority && matchesSearch;
  });

  const handleForwardIssue = () => {
    if (!selectedIssue) return;
    console.log('Forwarding issue:', (selectedIssue as any)._id, forwardData);
    // Here you would typically update the issue status and save it
    // For now, we'll just close the modal
    const issueIndex = issues.findIndex(i => (i as any)._id === (selectedIssue as any)._id);
    if (issueIndex > -1) {
        const newIssues = [...issues];
        newIssues[issueIndex].status = 'In Progress';
        (newIssues[issueIndex] as any).assignedTo = forwardData.assignedTo;
        (newIssues[issueIndex] as any).assignedDept = forwardData.department;
        setIssues(newIssues);
    }

    setShowForwardModal(false);
    setSelectedIssue(null);
    setForwardData({
      assignedTo: '',
      department: '',
      priority: 'Medium',
      deadline: '',
      notes: ''
    });
  };

  const IssueCard = ({ issue }: { issue: Issue & { _id: any } }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer"
         onClick={() => setSelectedIssue(issue)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-sm font-mono text-gray-500">{issue._id.toString()}</span>
            <Image className="w-4 h-4 text-blue-600" />
            {issue._id.toString().endsWith('2') && <Video className="w-4 h-4 text-purple-600" />}
          </div>
          <h3 className="font-semibold text-gray-900 text-lg mb-2">{issue.title}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{issue.description}</p>
        </div>
        <div className="ml-4 flex flex-col items-end space-y-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor((issue as any).priority)}`}>
            {(issue as any).priority || 'Medium'}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(issue.status)}`}>
            {issue.status}
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4" />
          <span>{issue.address}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4" />
          <span>{new Date(issue.reportedAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4" />
          <span>{issue.reporter.name}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Building2 className="w-4 h-4" />
          <span>{issue.address.split(',')[1]?.trim() || 'N/A'}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium text-gray-700">
            Urgency: {(Math.random() * 4 + 5).toFixed(1)}/10
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-gray-500">{issue.category}</span>
        </div>
      </div>
    </div>
  );


  return (
    <div>
        <div className="mb-8">
            <h1 className="text-3xl font-bold font-headline">Official Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome, {user.username}. Viewing issues for the <span className="font-semibold text-foreground">{user.department}</span>.
            </p>
        </div>

      {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">New Issues</p>
                <p className="text-3xl font-bold text-blue-600">{issues.filter(i => i.status === 'Reported').length}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">Assigned</p>
                <p className="text-3xl font-bold text-purple-600">{issues.filter(i => i.status === 'Assigned').length}</p>
              </div>
              <UserCheck className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">In Progress</p>
                <p className="text-3xl font-bold text-orange-600">{issues.filter(i => i.status === 'In Progress').length}</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </div>
          
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm font-medium">High Priority</p>
                <p className="text-3xl font-bold text-red-600">{issues.filter(i => (i as any).priority === 'High').length}</p>
              </div>
              <Flag className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-card rounded-xl p-6 border border-border mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search issues, location, ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring w-64 bg-background"
                />
              </div>
              
              <select
                value={filterDistrict}
                onChange={(e) => setFilterDistrict(e.target.value)}
                className="px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring bg-background"
              >
                <option value="">All Districts</option>
                {districts.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring bg-background"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 border border-input rounded-lg focus:ring-2 focus:ring-ring bg-background"
              >
                <option value="">All Priorities</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <button className="flex items-center space-x-2 px-4 py-2 border border-input rounded-lg hover:bg-muted">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-8 mb-8">
          {[
            { id: 'Reported', label: 'New Issues', count: issues.filter(i => i.status === 'Reported').length },
            { id: 'In Progress', label: 'In Progress', count: issues.filter(i => i.status === 'In Progress').length },
            { id: 'Resolved', label: 'Resolved', count: issues.filter(i => i.status === 'Resolved').length },
            { id: 'All', label: 'All Issues', count: issues.length }
          ].map(({ id, label, count }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-primary hover:bg-secondary'
              }`}
            >
              <span>{label}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeTab === id ? 'bg-primary-foreground/20' : 'bg-muted'
              }`}>
                {count}
              </span>
            </button>
          ))}
        </nav>

        {/* Issues Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredIssues.map((issue) => (
            <IssueCard key={(issue as any)._id.toString()} issue={issue as Issue & { _id: any }} />
          ))}
        </div>

        {filteredIssues.length === 0 && (
          <div className="text-center py-12 bg-card rounded-lg mt-8">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No issues found matching your filters</p>
          </div>
        )}

      {/* Issue Detail Modal */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b p-6 rounded-t-xl z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-card-foreground">{selectedIssue.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">ID: {(selectedIssue as any)._id.toString()}</p>
                </div>
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Issue Details */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-3">Issue Description</h4>
                    <p className="text-foreground leading-relaxed">{selectedIssue.description}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-card-foreground mb-3">Location Details</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedIssue.address}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Building2 className="w-4 h-4" />
                        <span>{selectedIssue.address.split(',')[1]?.trim() || 'N/A'} District</span>
                      </div>
                      <div className="text-sm text-muted-foreground/80">
                        Coordinates: {selectedIssue.location.lat}, {selectedIssue.location.lng}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-card-foreground mb-3">Media Files</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted rounded-lg p-4 flex items-center space-x-3">
                            <Image className="w-6 h-6 text-blue-600" />
                            <span className="text-sm text-foreground truncate">evidence.jpg</span>
                        </div>
                         {selectedIssue.id === 'IS-2' && <div className="bg-muted rounded-lg p-4 flex items-center space-x-3">
                            <Video className="w-6 h-6 text-purple-600" />
                            <span className="text-sm text-foreground truncate">location.mp4</span>
                        </div>}
                    </div>
                  </div>
                </div>

                {/* Citizen & Status Info */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-card-foreground mb-3">Citizen Information</h4>
                    <div className="bg-muted rounded-lg p-4 space-y-3">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">{selectedIssue.reporter.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">+91 98765 43210</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{selectedIssue.reporter.name?.toLowerCase().replace(' ','-')}@email.com</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-card-foreground mb-3">Issue Status</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Priority:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor((selectedIssue as any).priority)}`}>
                            {(selectedIssue as any).priority || 'Medium'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedIssue.status)}`}>
                          {selectedIssue.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Category:</span>
                        <span className="font-medium text-foreground">{selectedIssue.category}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Reported:</span>
                        <span className="text-foreground">{new Date(selectedIssue.reportedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Urgency Score:</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="font-medium text-foreground">{(Math.random() * 4 + 5).toFixed(1)}/10</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedIssue.status === 'Assigned' && (
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-3">Assignment Details</h4>
                      <div className="bg-purple-50 rounded-lg p-4 space-y-2 text-purple-800">
                        <div className="flex items-center justify-between">
                          <span className="text-purple-700">Assigned to:</span>
                          <span className="font-medium">{(selectedIssue as any).assignedTo}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-purple-700">Department:</span>
                          <span className="font-medium">{(selectedIssue as any).assignedDept}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-8 pt-6 border-t">
                <button
                  onClick={() => setShowForwardModal(true)}
                  disabled={selectedIssue.status !== 'Reported'}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground ${
                    selectedIssue.status === 'Reported'
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : ''
                  }`}
                >
                  <Forward className="w-4 h-4" />
                  <span>Forward to Field Officer</span>
                </button>
                
                <button className="flex items-center space-x-2 px-6 py-3 border border-input rounded-lg text-foreground hover:bg-muted">
                  <MessageSquare className="w-4 h-4" />
                  <span>Add Comment</span>
                </button>
                
                <button className="flex items-center space-x-2 px-6 py-3 border border-input rounded-lg text-foreground hover:bg-muted">
                  <Eye className="w-4 h-4" />
                  <span>View on Map</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Forward Issue Modal */}
      {showForwardModal && selectedIssue && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Forward Issue to Field Officer</h3>
              <button
                onClick={() => setShowForwardModal(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-2">Issue Summary</h4>
                <p className="text-sm text-muted-foreground mb-2">{selectedIssue.title}</p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>{selectedIssue.address}</span>
                  <span>•</span>
                  <span>{selectedIssue.category}</span>
                  <span>•</span>
                  <span className={`px-2 py-1 rounded ${getPriorityColor((selectedIssue as any).priority)}`}>
                    {(selectedIssue as any).priority || 'Medium'} Priority
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Department
                  </label>
                  <select
                    value={forwardData.department}
                    onChange={(e) => setForwardData({...forwardData, department: e.target.value, assignedTo: ''})}
                    className="w-full px-3 py-2 border border-input bg-background rounded-lg focus:ring-2 focus:ring-ring"
                    required
                  >
                    <option value="">Select Department</option>
                    {departmentList.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Assign to Officer
                  </label>
                  <select
                    value={forwardData.assignedTo}
                    onChange={(e) => setForwardData({...forwardData, assignedTo: e.target.value})}
                    className="w-full px-3 py-2 border border-input bg-background rounded-lg focus:ring-2 focus:ring-ring"
                    required
                    disabled={!forwardData.department}
                  >
                    <option value="">Select Officer</option>
                    {forwardData.department && (fieldOfficers as any)[forwardData.department] && 
                     (fieldOfficers as any)[forwardData.department].map((officer: any) => (
                      <option key={officer.id} value={officer.name}>
                        {officer.name} - {officer.designation} ({officer.district})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Priority Level
                  </label>
                  <select
                    value={forwardData.priority}
                    onChange={(e) => setForwardData({...forwardData, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-input bg-background rounded-lg focus:ring-2 focus:ring-ring"
                  >
                    <option value="Low">Low Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="High">High Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Expected Completion
                  </label>
                  <input
                    type="date"
                    value={forwardData.deadline}
                    onChange={(e) => setForwardData({...forwardData, deadline: e.target.value})}
                    className="w-full px-3 py-2 border border-input bg-background rounded-lg focus:ring-2 focus:ring-ring"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Instructions / Notes (Optional)
                </label>
                <textarea
                  value={forwardData.notes}
                  onChange={(e) => setForwardData({...forwardData, notes: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-input bg-background rounded-lg focus:ring-2 focus:ring-ring"
                  placeholder="Add any specific instructions for the field officer..."
                />
              </div>

              {forwardData.department && forwardData.assignedTo && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-medium text-green-900 mb-2">Assignment Preview</h5>
                  <div className="text-sm text-green-800 space-y-1">
                    <p><strong>Officer:</strong> {forwardData.assignedTo}</p>
                    <p><strong>Department:</strong> {forwardData.department}</p>
                    <p><strong>Priority:</strong> {forwardData.priority}</p>
                    {forwardData.deadline && <p><strong>Deadline:</strong> {new Date(forwardData.deadline).toLocaleDateString()}</p>}
                  </div>
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowForwardModal(false)}
                  className="flex-1 px-4 py-3 border border-input rounded-lg hover:bg-muted font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleForwardIssue}
                  disabled={!forwardData.department || !forwardData.assignedTo}
                  className={`flex-1 px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground ${
                    forwardData.department && forwardData.assignedTo
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : ''
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>Forward Issue</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
