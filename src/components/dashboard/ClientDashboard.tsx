
'use client';

import React, { useState } from 'react';
import type { Issue, User } from '@/lib/types';
import { 
  BarChart3, 
  Users, 
  CheckCircle, 
  AlertCircle,
  Settings,
  Database,
  Shield,
  Activity,
  TrendingUp,
  MapPin,
  Calendar,
  Clock,
  Building2,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  UserPlus,
  FileText,
  Bell,
  ChevronDown,
  MoreHorizontal,
  Flag,
  Award,
  Target,
  Zap,
  Globe,
  Star,
  Phone,
  Mail,
  Image,
  Video,
  X,
  Save,
  RefreshCw,
  ExternalLink,
  Archive,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Button } from '../ui/button';

interface ClientDashboardProps {
  summary: string;
  issues: Issue[];
  users: User[];
  analyticsData: {
    issuesByCategory: { name: string; value: number }[];
  };
}


export default function ClientDashboard({ summary, issues: allIssues, users, analyticsData: summaryAnalyticsData }: ClientDashboardProps) {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDistrict, setFilterDistrict] = useState('');

  // Comprehensive system data
  const systemStats = {
    totalIssues: allIssues.length,
    resolvedIssues: allIssues.filter(i => i.status === 'Resolved').length,
    pendingIssues: allIssues.filter(i => i.status !== 'Resolved' && i.status !== 'Rejected').length,
    highPriorityIssues: allIssues.filter(i => (i as any).priority === 'high').length,
    activeUsers: users.length, 
    registeredOfficials: users.filter(u => u.role === 'official').length,
    averageResolutionTime: 4.2, // Sample data
    citizenSatisfaction: 94.5 // Sample data
  };

  const issues = allIssues; // Using passed issues

  const departments = [
    {
      id: 'PWD',
      name: 'Public Works Department',
      head: 'श्री रामेश्वर सिंह',
      officers: 156,
      activeIssues: 345,
      resolvedIssues: 1234,
      avgResolutionTime: 5.2,
      budget: '₹45.6 Cr',
      districts: 24
    },
    {
      id: 'PHE',
      name: 'Public Health Engineering',
      head: 'डॉ. सुनीता देवी',
      officers: 89,
      activeIssues: 234,
      resolvedIssues: 876,
      avgResolutionTime: 3.8,
      budget: '₹32.1 Cr',
      districts: 24
    }
  ];

  const analyticsData = {
    issuesByDistrict: [
      { district: 'Ranchi', count: 2456, resolved: 2234 },
      { district: 'Jamshedpur', count: 1890, resolved: 1678 },
      { district: 'Dhanbad', count: 1567, resolved: 1345 }
    ],
    issuesByCategory: summaryAnalyticsData.issuesByCategory.map(c => ({ category: c.name, count: c.value, percentage: (c.value / allIssues.length * 100).toFixed(0) })),
    monthlyTrends: [
      { month: 'Jan', issues: 1234, resolved: 1156 },
      { month: 'Feb', issues: 1345, resolved: 1289 },
      { month: 'Mar', issues: 1567, resolved: 1434 }
    ]
  };

  const getStatusColor = (status: any) => {
    switch (status) {
      case 'Reported': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Assigned': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'In Progress': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: any) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const sidebarItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: BarChart3 },
    { id: 'issues', label: 'Issue Management', icon: AlertCircle },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'departments', label: 'Department Control', icon: Building2 },
    { id: 'analytics', label: 'Analytics & Reports', icon: TrendingUp },
    { id: 'system', label: 'System Settings', icon: Settings },
    { id: 'security', label: 'Security & Access', icon: Shield }
  ];

  const ActionButton = ({ onClick, icon: Icon, label, variant = 'primary', size = 'sm' }: {onClick: any, icon: any, label: any, variant?: any, size?:any}) => (
    <Button
      onClick={onClick}
      size={size}
      variant={variant === 'secondary' ? 'outline' : variant === 'danger' ? 'destructive' : 'default'}
    >
      <Icon className="w-4 h-4 mr-2" />
      <span>{label}</span>
    </Button>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Issues</p>
              <p className="text-3xl font-bold text-gray-900">{systemStats.totalIssues.toLocaleString()}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <AlertCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
              <p className="text-3xl font-bold text-gray-900">{((systemStats.resolvedIssues / systemStats.totalIssues) * 100).toFixed(1)}%</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-3xl font-bold text-gray-900">{systemStats.activeUsers.toLocaleString()}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Resolution Time</p>
              <p className="text-3xl font-bold text-gray-900">{systemStats.averageResolutionTime}d</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* District Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Districts</h3>
          </div>
          <div className="p-6">
            {analyticsData.issuesByDistrict.slice(0, 5).map((district, index) => (
              <div key={district.district} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-blue-100 text-blue-600`}>
                    {index + 1}
                  </div>
                  <span className="font-medium">{district.district}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">{district.resolved}/{district.count}</div>
                  <div className="text-xs text-gray-500">{Math.round((district.resolved/district.count)*100)}% resolved</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Server Uptime</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">99.9%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Database Performance</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Excellent</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">API Response Time</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm font-medium">245ms</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Storage Usage</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-gray-200 rounded-full">
                  <div className="w-3/4 h-full bg-blue-500 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">75%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent System Activity</h3>
            <ActionButton onClick={() => {}} icon={RefreshCw} label="Refresh" variant="secondary" />
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {[
            { type: 'issue_resolved', message: 'Issue IS-3 marked as resolved by Admin', time: '2 minutes ago', icon: CheckCircle2, color: 'text-green-600' },
            { type: 'user_registered', message: 'New citizen registered: सुनीता कुमारी (Bokaro)', time: '5 minutes ago', icon: UserPlus, color: 'text-blue-600' },
            { type: 'high_priority', message: 'High priority issue reported in Dhanbad - Water Supply', time: '12 minutes ago', icon: AlertTriangle, color: 'text-red-600' },
            { type: 'department_update', message: 'PWD department updated resolution guidelines', time: '1 hour ago', icon: Building2, color: 'text-purple-600' }
          ].map((activity, index) => (
            <div key={index} className="p-4 hover:bg-gray-50">
              <div className="flex items-start space-x-3">
                <activity.icon className={`w-5 h-5 mt-0.5 ${activity.color}`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderIssueManagement = () => (
    <div className="space-y-6">
      {/* Filters and Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search issues, ID, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 w-64"
              />
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All Status</option>
              <option value="Reported">Reported</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Rejected">Rejected</option>
            </select>
            
            <select
              value={filterDistrict}
              onChange={(e) => setFilterDistrict(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="">All Districts</option>
              <option value="Springfield">Springfield</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <ActionButton onClick={() => {}} icon={Download} label="Export" variant="secondary" />
            <ActionButton onClick={() => {}} icon={Plus} label="Add Issue" variant="default"/>
          </div>
        </div>
      </div>

      {/* Issues Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Citizen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {issues.map((issue) => (
                <tr key={issue.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-mono text-gray-500">{issue.id}</span>
                            <Image className="w-4 h-4 text-blue-600" />
                            <Video className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="text-sm font-medium text-gray-900 mt-1">{issue.title}</div>
                        <div className="text-xs text-gray-500">{issue.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900">{issue.reporter.name}</div>
                      <div className="text-gray-500">{(issue.reporter as any).phone || '+91 999 888 7777'}</div>
                      <div className="text-xs text-gray-400 mt-1">{new Date(issue.reportedAt).toLocaleDateString()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-gray-900">{issue.address}</div>
                      <div className="text-gray-500">{issue.address.split(',')[1]?.trim()}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(issue.status)}`}>
                      {issue.status}
                    </span>
                    {issue.status === 'Resolved' && (
                      <div className="text-xs text-gray-500 mt-1">
                        Resolved: {new Date(issue.updatedAt).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                        <div className="font-medium text-gray-900">{(issue as any).assignedTo || 'Unassigned'}</div>
                        <div className="text-gray-500">{issue.department}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setSelectedIssue(issue)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => { setSelectedIssue(issue); setShowEditModal(true); }}
                        className="text-green-600 hover:text-green-800"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{systemStats.activeUsers.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Government Officials</p>
              <p className="text-2xl font-bold text-gray-900">{systemStats.registeredOfficials}</p>
            </div>
            <UserCheck className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New This Month</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
            <UserPlus className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* User Management Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
          <div className="flex items-center space-x-2">
            <ActionButton onClick={() => setShowUserModal(true)} icon={UserPlus} label="Add User" variant='default' />
            <ActionButton onClick={() => {}} icon={Download} label="Export Users" variant="secondary" />
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role & Department</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user: any) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-green-400 rounded-full flex items-center justify-center text-white font-medium">
                          {user.username.charAt(0)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.username}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="font-medium text-gray-900 capitalize">{user.role}</div>
                      {user.department && <div className="text-gray-500">{user.department}</div>}
                    </div>
                  </td>
                 
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <div className="text-xs text-gray-500">Joined: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800`}>
                        active
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderDepartmentControl = () => (
    <div className="space-y-6">
      {/* Department Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {departments.map((dept) => (
          <div key={dept.id} className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{dept.name}</h3>
                <p className="text-sm text-gray-600">Head: {dept.head}</p>
              </div>
              <Building2 className="w-8 h-8 text-gray-400" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{dept.officers}</div>
                <div className="text-xs text-blue-600">Officers</div>
              </div>
              <div className="text-center p-3 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{dept.activeIssues}</div>
                <div className="text-xs text-orange-600">Active Issues</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{dept.resolvedIssues}</div>
                <div className="text-xs text-green-600">Resolved</div>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{dept.avgResolutionTime}d</div>
                <div className="text-xs text-purple-600">Avg Time</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Budget: {dept.budget}</span>
              <span>Coverage: {dept.districts} districts</span>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <ActionButton onClick={() => {}} icon={Eye} label="View Details" size="sm" variant="secondary" />
              <ActionButton onClick={() => {}} icon={Edit} label="Manage" size="sm" variant="default" />
            </div>
          </div>
        ))}
      </div>

      {/* Department Performance Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Department Performance Comparison</h3>
        <div className="space-y-4">
          {departments.map((dept) => {
            const resolutionRate = (dept.resolvedIssues / (dept.resolvedIssues + dept.activeIssues)) * 100;
            return (
              <div key={dept.id} className="flex items-center space-x-4">
                <div className="w-32 text-sm font-medium text-gray-700">{dept.id}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-green-500 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${resolutionRate}%` }}
                  ></div>
                </div>
                <div className="w-16 text-sm font-medium text-gray-900">
                  {resolutionRate.toFixed(1)}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Analytics & Reporting</h3>
            <p className="text-sm text-gray-600">Comprehensive insights into system performance</p>
          </div>
          <div className="flex items-center space-x-2">
            <ActionButton onClick={() => setShowAnalyticsModal(true)} icon={TrendingUp} label="Advanced Analytics" variant='default' />
            <ActionButton onClick={() => {}} icon={Download} label="Export Report" variant="secondary" />
          </div>
        </div>
      </div>

      {/* Issue Category Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Issues by Category</h4>
          <div className="space-y-4">
            {analyticsData.issuesByCategory.map((category: any, index) => (
              <div key={category.category} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full bg-blue-500`}></div>
                  <span className="text-sm font-medium text-gray-900">{category.category}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">{category.count}</div>
                  <div className="text-xs text-gray-500">{category.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">District Performance</h4>
          <div className="space-y-3">
            {analyticsData.issuesByDistrict.map((district, index) => (
              <div key={district.district} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{district.district}</div>
                  <div className="text-xs text-gray-500">Total: {district.count}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-green-600">{district.resolved}</div>
                  <div className="text-xs text-gray-500">
                    {Math.round((district.resolved/district.count)*100)}% resolved
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Monthly Issue Trends</h4>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {analyticsData.monthlyTrends.map((month) => (
            <div key={month.month} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold text-gray-900">{month.month}</div>
              <div className="text-sm text-blue-600">Issues: {month.issues}</div>
              <div className="text-sm text-green-600">Resolved: {month.resolved}</div>
              <div className="text-xs text-gray-500 mt-1">
                {Math.round((month.resolved/month.issues)*100)}% rate
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">System Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">General Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Auto-assign issues</span>
                <div className="w-10 h-6 bg-green-500 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">Email notifications</span>
                <div className="w-10 h-6 bg-green-500 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">SMS notifications</span>
                <div className="w-10 h-6 bg-gray-300 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Performance Settings</h4>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auto-resolve timeout (days)
                </label>
                <input 
                  type="number" 
                  defaultValue="30"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  High priority escalation (hours)
                </label>
                <input 
                  type="number" 
                  defaultValue="24"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex space-x-3">
          <ActionButton onClick={() => {}} icon={Save} label="Save Settings" variant='default' />
          <ActionButton onClick={() => {}} icon={RefreshCw} label="Reset to Default" variant="secondary" />
        </div>
      </div>
      
      {/* System Health */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health & Maintenance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl font-bold text-green-600">99.9%</div>
            <div className="text-sm text-green-600">Uptime</div>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">245ms</div>
            <div className="text-sm text-blue-600">Response Time</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
            <div className="text-2xl font-bold text-orange-600">1.2TB</div>
            <div className="text-sm text-orange-600">Storage Used</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
          <main className="flex-1 overflow-y-auto">
            <div className="p-6">
              {activeSection === 'overview' && renderOverview()}
              {activeSection === 'issues' && renderIssueManagement()}
              {activeSection === 'users' && renderUserManagement()}
              {activeSection === 'departments' && renderDepartmentControl()}
              {activeSection === 'analytics' && renderAnalytics()}
              {activeSection === 'system' && renderSystemSettings()}
            </div>
          </main>
      </div>

      {/* Sidebar - separate for layout control */}
      <div className="w-72 bg-white border-l border-gray-200 flex flex-col flex-shrink-0">
         <div className="p-6 border-b">
          <h3 className="text-lg font-semibold">Admin Menu</h3>
        </div>
        <nav className="flex-1 px-4 py-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors mb-2 ${
                activeSection === item.id
                  ? 'bg-primary/10 text-primary border border-primary/20'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>


      {/* Issue Detail Modal */}
      {selectedIssue && !showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedIssue.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">ID: {selectedIssue.id}</p>
                </div>
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-gray-700">{selectedIssue.description}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Admin Notes</h4>
                    <p className="text-gray-600 text-sm bg-yellow-50 p-3 rounded-lg">
                      {selectedIssue.adminNotes || 'No admin notes.'}
                    </p>
                  </div>
                  {selectedIssue.resolutionNotes && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Resolution Notes</h4>
                      <p className="text-green-700 text-sm bg-green-50 p-3 rounded-lg">
                        {selectedIssue.resolutionNotes}
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold text-gray-900">Issue Metrics</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Public Views:</span>
                        <span className="font-medium ml-2">{selectedIssue.publicViews || 0}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Urgency Score:</span>
                        <span className="font-medium ml-2">{selectedIssue.urgencyScore || 'N/A'}/10</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Priority:</span>
                        <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getPriorityColor(selectedIssue.priority)}`}>
                          {selectedIssue.priority || 'N/A'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedIssue.status)}`}>
                          {selectedIssue.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};