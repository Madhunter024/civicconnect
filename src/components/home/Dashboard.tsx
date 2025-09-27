

'use client';

import React from 'react';
import type { Issue, User } from '@/lib/types';
import { 
  AlertCircle, 
  CheckCircle, 
  Plus, 
  Calendar, 
  MapPin, 
  Clock,
  BarChart3,
  LogOut,
  List,
  FilePlus2
} from 'lucide-react';
import Link from 'next/link';
import { logout } from '@/app/login/actions';
import { Button } from '@/components/ui/button';
import Logo from '@/components/layout/Logo';

interface DashboardProps {
    user: User;
    pendingIssues: Issue[];
    resolvedIssues: Issue[];
}

const Dashboard = ({ user, pendingIssues, resolvedIssues }: DashboardProps) => {

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
      case 'Reported': return 'text-gray-500 bg-gray-100/50';
      default: return 'text-gray-500 bg-gray-100/50';
    }
  };

  const IssueCard = ({ issue, isResolved = false }: { issue: any, isResolved?: boolean }) => (
    <div className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
      <Link href={`/issues/${issue.id}`} className="block">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-card-foreground text-lg">{issue.title}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(issue.priority || 'medium')}`}>
            {issue.priority ? (issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)) : 'Medium'}
          </span>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            {issue.address}
          </div>
          <div className="flex items-center text-muted-foreground text-sm">
            <Calendar className="w-4 h-4 mr-2" />
            Reported: {new Date(issue.reportedAt).toLocaleDateString()}
          </div>
          {isResolved && issue.updatedAt && (
            <div className="flex items-center text-green-600 text-sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Resolved: {new Date(issue.updatedAt).toLocaleDateString()}
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
      </Link>
    </div>
  );
  
  const totalIssues = pendingIssues.length + resolvedIssues.length;
  const resolutionRate = totalIssues > 0 ? Math.round((resolvedIssues.length / totalIssues) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 bg-card border-r hidden md:flex flex-col">
           <div className="h-16 flex items-center px-6 border-b">
             <Logo />
           </div>
           <nav className="flex-grow p-4">
              <div className="space-y-2">
                <Button variant="secondary" className="w-full justify-start">
                  <BarChart3 className="mr-2" /> Overview
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/dashboard/report"><FilePlus2 className="mr-2" /> Report an Issue</Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="/issues"><List className="mr-2" /> View All Issues</Link>
                </Button>
              </div>
           </nav>
           <div className="p-4 border-t">
              <form action={logout}>
                <Button variant="ghost" className="w-full justify-start" type="submit">
                  <LogOut className="mr-2" /> Logout
                </Button>
              </form>
           </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6 bg-background space-y-8">
              <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold text-foreground">Welcome, {user.username}!</h1>
                  <Button asChild>
                    <Link href="/dashboard/report">
                      <Plus className="mr-2" />
                      <span>Report Issue</span>
                    </Link>
                  </Button>
              </div>

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
                      <p className="text-3xl font-bold text-foreground">{resolutionRate}%</p>
                    </div>
                     <div className="p-3 bg-blue-100 rounded-lg">
                      <BarChart3 className="w-6 h-6 text-blue-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Pending Issues */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Your Pending Issues</h2>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    {pendingIssues.length} Active
                  </span>
                </div>
                {pendingIssues.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingIssues.map((issue) => (
                        <IssueCard key={issue.id} issue={issue} />
                    ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-card rounded-xl border border-border">
                        <p className="text-muted-foreground">You have no pending issues.</p>
                    </div>
                )}
              </div>

              {/* Resolved Issues */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">Your Resolved Issues</h2>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {resolvedIssues.length} Completed
                  </span>
                </div>
                {resolvedIssues.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resolvedIssues.map((issue) => (
                        <IssueCard key={issue.id} issue={issue} isResolved={true} />
                    ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-card rounded-xl border border-border">
                        <p className="text-muted-foreground">You have no resolved issues yet.</p>
                    </div>
                )}
              </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
